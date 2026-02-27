# flowify

이 설계도는 **리액트의 자주사용됐던 명령형 로직의 파편화를 해결**하고, **JSX의 구조적 가독성과 타입 안정성을 극대화**하는 것을 목표로 합니다.

pnpm으로 제작
npm에 publish
pnpm changeset추가
번들링 고려


---

## 1. Logic & Type-Guards (분기 및 타입 가드)

### `<Guard<T> />`

- **명령형의 문제:** 데이터가 없을 때 `if (!data) return null;`과 같은 얼리 리턴(Early Return)이 강제됨. 컴포넌트 중간에 로직이 섞여 흐름이 끊기고, 조건문 이후의 모든 코드가 특정 데이터에 종속됨.
- **선언적 목적:** **[얼리 리턴 제거]** 특정 데이터가 존재할 때만 렌더링되어야 하는 영역을 JSX 상에서 명확히 격리함.
- **타입 이점:** `children` 함수의 인자로 `NonNullable<T>`를 주입하여, 하위 노드에서 타입 단언 없이 데이터를 안전하게 사용.
- **Props:** `when: T`, `fallback: ReactNode`, `children: (data: NonNullable<T>) => ReactNode`

```tsx
// Before (명령형)
function UserProfile({ user }: { user: User | null }) {
  if (!user) return <Skeleton />;
  // user는 이 아래에서만 Non-null이지만, 흐름이 끊김
  return <div>{user.name}</div>;
}

// After (선언적)
function UserProfile({ user }: { user: User | null }) {
  return (
    <Guard when={user} fallback={<Skeleton />}>
      {(user) => <div>{user.name}</div>}
      {/*    ^ 타입: NonNullable<User> — 단언 불필요 */}
    </Guard>
  );
}
```

### `<Show />`

- **명령형의 문제:** 삼항 연산자(`? :`)나 `&&` 연산자가 중첩되면 JSX 가독성이 급격히 떨어짐.
- **선언적 목적:** **[삼항 연산자 지옥 탈출]** 조건부 렌더링의 의도를 명확한 태그 이름(`Show`, `fallback`)으로 표현.
- **Props:** `when: boolean`, `fallback: ReactNode`, `children: ReactNode`

```tsx
// Before (명령형)
function Banner({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div>
      {isLoggedIn ? (
        <p>Welcome back!</p>
      ) : (
        <p>Please sign in.</p>
      )}
    </div>
  );
}

// After (선언적)
function Banner({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div>
      <Show when={isLoggedIn} fallback={<p>Please sign in.</p>}>
        <p>Welcome back!</p>
      </Show>
    </div>
  );
}
```

### `<Switch />`

- **명령형의 문제:** 여러 상태에 따른 분기를 처리할 때 `if-else if` 혹은 복잡한 `switch` 문이 컴포넌트 상단에 위치하여 UI와 로직이 분리됨.
- **선언적 목적:** **[다중 분기 시각화]** 상태별 UI 매핑을 한눈에 파악 가능하게 구조화.
- **패턴:** `<Switch value={state} by={{ A: <UI />, B: <UI /> }} />` 혹은 합성 패턴.

```tsx
// Before (명령형)
function StatusBadge({ status }: { status: "idle" | "loading" | "error" | "success" }) {
  if (status === "idle") return <Gray>Idle</Gray>;
  if (status === "loading") return <Spinner />;
  if (status === "error") return <Red>Error</Red>;
  if (status === "success") return <Green>Done</Green>;
  return null;
}

// After (선언적)
function StatusBadge({ status }: { status: "idle" | "loading" | "error" | "success" }) {
  return (
    <Switch
      value={status}
      by={{
        idle:    <Gray>Idle</Gray>,
        loading: <Spinner />,
        error:   <Red>Error</Red>,
        success: <Green>Done</Green>,
      }}
    />
  );
}
```

---

## 2. Async & Concurrency (비동기 및 동시성)

### `<Use<T> />`

- **명령형의 문제:** React 19의 `use(promise)` 훅은 호출 시 해당 컴포넌트를 중단(Suspend)시킴. 따라서 훅 호출 이후의 코드가 실행되지 않게 하려면 반드시 별도의 자식 컴포넌트(`Comments` 등)를 새로 선언해야만 함.
- **선언적 목적:** **[컴포넌트 파편화 방지]** 별도의 컴포넌트를 새로 만들지 않고도(2 Depth 방지), 인라인에서 프로미스를 해제(Unwrap)하여 즉시 사용.
- **Props:** `promise: Promise<T>`, `children: (data: T) => ReactNode`

```tsx
// Before (명령형) — 별도 컴포넌트 분리 필수
function Comments({ commentsPromise }: { commentsPromise: Promise<Comment[]> }) {
  const comments = use(commentsPromise); // 여기서 Suspend → 아래 코드 실행 안 됨
  return <ul>{comments.map((c) => <li key={c.id}>{c.body}</li>)}</ul>;
}

function Post({ post }: { post: Post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <Suspense fallback={<Spinner />}>
        <Comments commentsPromise={fetchComments(post.id)} />
      </Suspense>
    </article>
  );
}

// After (선언적) — 인라인에서 프로미스 해제
function Post({ post }: { post: Post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <Suspense fallback={<Spinner />}>
        <Use promise={fetchComments(post.id)}>
          {(comments) => (
            <ul>{comments.map((c) => <li key={c.id}>{c.body}</li>)}</ul>
          )}
        </Use>
      </Suspense>
    </article>
  );
}
```

### `<AsyncBoundary />`

- **명령형의 문제:** `Suspense`와 `ErrorBoundary`를 각각 감싸는 구조는 보일러플레이트가 심하고 계층 구조가 깊어짐.
- **선언적 목적:** **[비동기 로직 캡슐화]** 비동기 컴포넌트의 "로딩-에러-성공" 상태를 하나의 경계 안에서 관리.
- **Props:** `pendingFallback`, `rejectedFallback`, `children`

```tsx
// Before (명령형) — 중첩 보일러플레이트
function UserPage() {
  return (
    <ErrorBoundary fallback={<ErrorScreen />}>
      <Suspense fallback={<Skeleton />}>
        <UserContent />
      </Suspense>
    </ErrorBoundary>
  );
}

// After (선언적) — 하나의 경계로 통합
function UserPage() {
  return (
    <AsyncBoundary
      pendingFallback={<Skeleton />}
      rejectedFallback={<ErrorScreen />}
    >
      <UserContent />
    </AsyncBoundary>
  );
}
```

### `<Transition />` / `<Deferred />`

- **명령형의 문제:** `isPending` 상태를 관리하기 위해 컴포넌트 상단에 훅을 선언하고 관리해야 함.
- **선언적 목적:** **[우선순위 제어 선언]** 어떤 업데이트가 '긴급하지 않은지' 혹은 '지연되어야 하는지'를 UI 트리 레벨에서 결정.

```tsx
// Before (명령형) — 훅으로 isPending 관리
function SearchPage() {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);

  const handleChange = (e) => {
    startTransition(() => setQuery(e.target.value));
  };

  return (
    <div>
      <input onChange={handleChange} />
      {isPending && <Spinner />}
      <SearchResults query={deferredQuery} />
    </div>
  );
}

// After (선언적) — UI 트리에서 우선순위 결정
function SearchPage() {
  const [query, setQuery] = useState("");

  return (
    <div>
      <input onChange={(e) => setQuery(e.target.value)} />
      <Transition fallback={<Spinner />}>
        <Deferred value={query}>
          {(deferredQuery) => <SearchResults query={deferredQuery} />}
        </Deferred>
      </Transition>
    </div>
  );
}
```

---

## 3. Collection (반복 및 구조)

### `<Each<T> />`

- **명령형의 문제:** `items.map()` 사용 시 빈 배열 처리(`items.length === 0 ? ...`)와 `key` 할당 로직이 섞여 지저분해짐. 아이템 사이의 구분선(Separator)을 넣으려면 인덱스 체크 로직이 추가되어야 함.
- **선언적 목적:** **[반복 로직 표준화]** 빈 상태 처리와 구분선 삽입을 컴포넌트 프롭으로 해결.
- **Props:** `items: T[]`, `renderEmpty: ReactNode`, `children: (item: T, index: number) => ReactNode`
- **합성 패턴:** `<Each.Separator>`를 통한 선언적 구분선 삽입.

```tsx
// Before (명령형) — map + 빈 배열 처리 + 구분선 인덱스 체크
function TodoList({ todos }: { todos: Todo[] }) {
  if (todos.length === 0) return <p>할 일이 없습니다.</p>;

  return (
    <ul>
      {todos.map((todo, i) => (
        <Fragment key={todo.id}>
          <li>{todo.title}</li>
          {i < todos.length - 1 && <hr />}
        </Fragment>
      ))}
    </ul>
  );
}

// After (선언적) — 빈 상태 + 구분선을 프롭으로 해결
function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul>
      <Each items={todos} renderEmpty={<p>할 일이 없습니다.</p>}>
        {(todo) => <li>{todo.title}</li>}
        <Each.Separator>
          <hr />
        </Each.Separator>
      </Each>
    </ul>
  );
}
```

---

## 4. Interaction & UX (인터랙션 및 환경)

### `<OutsideClick />`

- **명령형의 문제:** `useRef` 선언, `useEffect` 리스너 등록, ref 연결 등 UI와 상관없는 명령형 코드가 컴포넌트 상단에 다수 포진함.
- **선언적 목적:** **[이벤트 경계 선언]** "이 영역 밖을 누르면 닫힌다"는 동작을 감싸는(Wrap) 행위만으로 정의.
- **Props:** `onOutsideClick: () => void`, `children: ReactElement`

```tsx
// Before (명령형) — useRef + useEffect 보일러플레이트
function Dropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref}>
      <button onClick={() => setOpen(true)}>Open</button>
      {open && <div className="menu">Menu Content</div>}
    </div>
  );
}

// After (선언적) — 감싸는 것만으로 동작 정의
function Dropdown() {
  const [open, setOpen] = useState(false);

  return (
    <OutsideClick onOutsideClick={() => setOpen(false)}>
      <div>
        <button onClick={() => setOpen(true)}>Open</button>
        {open && <div className="menu">Menu Content</div>}
      </div>
    </OutsideClick>
  );
}
```

### `<Responsive />`

- **명령형의 문제:** 미디어 쿼리를 CSS에서 관리하거나 JS 훅으로 화면 너비를 체크하여 분기하는 로직이 UI와 멀리 떨어져 있음.
- **선언적 목적:** **[디바이스 분기 시각화]** 특정 UI가 어느 환경에서 노출되는지 JSX 구조상에서 즉시 확인.
- **합성 패턴:** `<Responsive.Desktop>`, `<Responsive.Mobile>`

```tsx
// Before (명령형) — 훅으로 화면 너비 체크
function Navigation() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <nav>
      {isMobile ? (
        <HamburgerMenu />
      ) : (
        <FullNavBar />
      )}
    </nav>
  );
}

// After (선언적) — JSX 구조상에서 디바이스 분기 즉시 확인
function Navigation() {
  return (
    <nav>
      <Responsive.Mobile>
        <HamburgerMenu />
      </Responsive.Mobile>
      <Responsive.Desktop>
        <FullNavBar />
      </Responsive.Desktop>
    </nav>
  );
}
```

### `<Throw />` / `<Suspend />`

- **명령형의 문제:** 에러 화면이나 로딩 화면을 테스트하기 위해 임시로 `throw new Error()` 등의 코드를 비즈니스 로직에 억지로 끼워 넣어야 함.
- **선언적 목적:** **[디버깅 선언화]** UI 상에 태그를 넣는 것만으로 특정 상태를 유발하여 Fallback UI를 간편하게 테스트.

```tsx
// Before (명령형) — 비즈니스 로직에 임시 코드 삽입
function Dashboard() {
  // 에러 Fallback 테스트하려면 이런 코드를 억지로 삽입…
  // throw new Error("test error");

  return <div>Dashboard Content</div>;
}

// After (선언적) — 태그 하나로 상태 유발
function Dashboard() {
  return (
    <div>
      {/* 에러 Fallback UI 테스트 */}
      <Throw error={new Error("test error")} />

      {/* 로딩 Fallback UI 테스트 */}
      <Suspend />

      <div>Dashboard Content</div>
    </div>
  );
}
```

---

## 5. Summary Specification Table

| Category | Component | Purpose | Core Elimination (제거되는 것) |
|---|---|---|---|
| Logic | `Guard` | Safe data access | Early returns (`if(!data)`) |
| Logic | `Show` | Visual clarity | Conditional chains (`&&`, `? :`) |
| Async | `Use` | Flat component structure | Extra child component declaration |
| Async | `AsyncBoundary` | Unified async state | Nested `Suspense`/`ErrorBoundary` blocks |
| Collection | `Each` | Iterate with metadata | `map()` condition checks & index-based separators |
| Interaction | `OutsideClick` | Behavioral boundary | `useRef` + `useEffect` event listeners |
| Env | `Responsive` | Layout branching | Media query hooks & CSS branching |
