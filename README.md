# react-flowify

React 컴포넌트에서 반복적으로 사용되는 명령형(imperative) 패턴을 선언형(declarative) JSX 컴포넌트로 대체하기 위해 만든 라이브러리입니다.

[![npm](https://img.shields.io/npm/v/react-flowify)](https://www.npmjs.com/package/react-flowify)
[![license](https://img.shields.io/npm/l/react-flowify)](./LICENSE)

## 설치

```bash
npm install react-flowify
# or
pnpm add react-flowify
# or
yarn add react-flowify
```

## 왜 만들었는가

React 개발 시 조건부 렌더링, 리스트 반복, 비동기 상태 처리 등에서 삼항 연산자, `&&` 연산자, switch문 등 명령형 패턴이 반복적으로 사용됩니다. 이런 패턴은 단순할 때는 괜찮지만, 조건이 중첩되거나 복잡해지면 가독성이 급격히 떨어집니다.

react-flowify는 이러한 패턴들을 선언형 JSX 컴포넌트로 감싸서, 코드의 의도를 명확하게 드러내고 일관된 구조를 유지하는 것을 목표로 합니다.

조건 분기, 리스트 반복, 비동기 처리 같은 흐름 제어를 JavaScript 로직이 아닌 JSX 컴포넌트에 맡기면, 컴포넌트의 렌더링 구조가 곧 UI의 흐름이 됩니다. 개발자는 "어떻게 분기할 것인가"가 아니라 "무엇을 보여줄 것인가"에 집중할 수 있습니다.

---

## 컴포넌트 목록

### Show

단순 조건부 렌더링을 선언적으로 처리합니다.

삼항 연산자나 `&&` 연산자는 조건이 단순할 때는 문제가 없지만, 조건이 여러 개 중첩되면 JSX 트리 안에서 어디가 조건이고 어디가 결과인지 구분하기 어려워집니다. `Show`는 조건과 fallback을 props로 분리하여 렌더링 의도를 명확하게 드러냅니다.

**AS-IS**
```tsx
{isLoggedIn ? <Dashboard /> : <LoginButton />}
```

**TO-BE**
```tsx
<Show when={isLoggedIn} fallback={<LoginButton />}>
  <Dashboard />
</Show>
```

---

### Guard

조건부 렌더링과 동시에 타입 내로잉(type narrowing)을 수행합니다. `when`에 전달된 값이 truthy일 때, `NonNullable<T>` 타입으로 좁혀진 값을 render prop으로 전달합니다.

기존 삼항 연산자로 nullable 값을 처리하면, 분기 이후에도 TypeScript가 해당 값을 여전히 nullable로 추론하는 경우가 있어 불필요한 옵셔널 체이닝이나 단언(`!`)이 필요했습니다. `Guard`는 render prop을 통해 `NonNullable<T>` 타입을 보장하므로, 추가적인 타입 처리 없이 안전하게 값을 사용할 수 있습니다.

**AS-IS**
```tsx
{user ? <Profile name={user.name} /> : <Login />}
```

**TO-BE**
```tsx
<Guard when={user} fallback={<Login />}>
  {(u) => <Profile name={u.name} />}
</Guard>
```

`Show`와의 차이점: `Show`는 단순히 boolean 조건만 판단하지만, `Guard`는 값 자체를 검증하고 타입까지 좁혀서 전달합니다. nullable한 데이터를 안전하게 사용해야 할 때 적합합니다.

**TypeScript 제네릭 사용**
```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User | null = getUser();

// 제네릭을 명시하면 render prop의 인자가 User 타입으로 보장됩니다.
<Guard<User> when={user} fallback={<Login />}>
  {(u) => <Profile name={u.name} email={u.email} />}
</Guard>
```

---

### Switch

여러 상태 값에 따라 다른 UI를 렌더링합니다. switch문이나 중첩 삼항 연산자를 대체합니다.

기존에는 상태 값이 3개 이상이면 삼항 연산자를 중첩하거나 `&&` 조건을 나열해야 했고, switch문을 쓰려면 JSX 밖에서 별도 함수로 분리해야 했습니다. `Switch`는 value-to-UI 매핑을 하나의 객체로 표현하여 상태별 렌더링을 한눈에 파악할 수 있게 합니다. 또한 제네릭으로 타입을 명시하면 누락된 케이스를 컴파일 타임에 잡아낼 수 있습니다.

**AS-IS**
```tsx
{status === "idle" && <IdleView />}
{status === "loading" && <Spinner />}
{status === "error" && <ErrorView />}
{status === "success" && <SuccessView />}
```

**TO-BE**
```tsx
<Switch
  value={status}
  by={{
    idle: <IdleView />,
    loading: <Spinner />,
    error: <ErrorView />,
    success: <SuccessView />,
  }}
/>
```

**TypeScript 제네릭 사용**
```tsx
type Status = "idle" | "loading" | "error" | "success";

// 제네릭을 명시하면 by 객체의 키가 Status 타입으로 제한되어
// 오타나 누락 시 컴파일 에러가 발생합니다.
<Switch<Status>
  value={status}
  by={{
    idle: <IdleView />,
    loading: <Spinner />,
    error: <ErrorView />,
    success: <SuccessView />,
  }}
/>
```

---

### Each

배열 순회를 선언적으로 처리하며, 인덱스 외에도 `isFirst`, `isLast`, `length` 등의 메타 정보를 제공합니다.

기존 `.map()` 패턴은 빈 배열 처리를 별도의 삼항 연산자로 감싸야 하고, 첫 번째/마지막 아이템 여부를 판단하려면 `index === 0`, `index === arr.length - 1` 같은 계산을 매번 직접 해야 했습니다. `Each`는 빈 배열 fallback을 `renderEmpty` prop으로 분리하고, 위치 메타 정보를 자동으로 제공하여 반복 렌더링 로직을 간결하게 만듭니다.

**AS-IS**
```tsx
{users.length === 0 ? (
  <p>유저가 없습니다.</p>
) : (
  users.map((user, index) => <UserCard key={user.id} user={user} />)
)}
```

**TO-BE**
```tsx
<Each items={users} renderEmpty={<p>유저가 없습니다.</p>}>
  {(user, { index, isFirst, isLast }) => (
    <UserCard key={user.id} user={user} highlight={isFirst} />
  )}
</Each>
```

**TypeScript 제네릭 사용**
```tsx
interface User {
  id: number;
  name: string;
  role: "admin" | "member";
}

// 제네릭을 명시하면 render prop의 item이 User 타입으로 추론됩니다.
<Each<User> items={users} renderEmpty={<p>유저가 없습니다.</p>}>
  {(user, { isFirst, isLast }) => (
    <UserCard key={user.id} name={user.name} role={user.role} />
  )}
</Each>
```

---

### Use

React 19의 `use()` 훅을 활용하여 Promise를 선언적으로 언래핑합니다. 반드시 `Suspense`로 감싸서 사용해야 합니다.

React 19의 `use()` 훅은 Promise와 Context를 모두 읽을 수 있지만, Promise를 언래핑할 때는 Suspense 내부에서 사용해야 하므로 별도의 자식 컴포넌트를 만들어야 합니다. `Use` 컴포넌트는 이 불필요한 래퍼 컴포넌트 생성을 제거합니다.

**AS-IS**
```tsx
// use()를 쓰기 위해 별도의 래퍼 컴포넌트를 만들어야 함
function UserContent({ promise }: { promise: Promise<User> }) {
  const user = use(promise);
  return <UserCard name={user.name} />;
}

function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <UserContent promise={fetchUser(id)} />
    </Suspense>
  );
}
```

**TO-BE**
```tsx
<Suspense fallback={<Spinner />}>
  <Use promise={fetchUser(id)}>
    {(user) => <UserCard name={user.name} />}
  </Use>
</Suspense>
```

**TypeScript 제네릭 사용**
```tsx
interface User {
  id: number;
  name: string;
}

// 제네릭을 명시하면 render prop의 인자가 User 타입으로 보장됩니다.
<Suspense fallback={<Spinner />}>
  <Use<User> promise={fetchUser(id)}>
    {(user) => <UserCard name={user.name} />}
  </Use>
</Suspense>
```

---

### AsyncBoundary

`Suspense`와 `ErrorBoundary`를 하나로 결합한 컴포넌트입니다.

기존에는 비동기 컴포넌트를 감쌀 때 `ErrorBoundary`와 `Suspense`를 각각 중첩해야 했고, 이 두 가지의 순서나 구조가 프로젝트 내에서 일관되지 않는 경우가 많았습니다. `AsyncBoundary`는 로딩 상태와 에러 상태 처리를 하나의 컴포넌트로 통합하여 비동기 경계의 구조를 일관되게 유지할 수 있습니다.

**AS-IS**
```tsx
<ErrorBoundary fallback={<div>에러 발생</div>}>
  <Suspense fallback={<Skeleton />}>
    <DataView />
  </Suspense>
</ErrorBoundary>
```

**TO-BE**
```tsx
<AsyncBoundary
  suspense={{ fallback: <Skeleton /> }}
  errorBoundary={{
    fallback: <div>에러 발생</div>,
    onError: (error) => console.error(error),
    resetKeys: [queryKey],
  }}
>
  <DataView />
</AsyncBoundary>
```

---

### Responsive

CSS 미디어 쿼리 기반으로 조건부 렌더링을 수행합니다. 모바일/데스크탑 프리셋 컴포넌트를 제공합니다.

기존에는 반응형 분기를 위해 컴포넌트마다 `useState`, `useEffect`, `matchMedia` 리스너를 직접 작성해야 했고, 뷰포트 판별 로직이 비즈니스 로직과 섞여 컴포넌트가 복잡해졌습니다. `Responsive`는 미디어 쿼리 관리를 컴포넌트 외부로 분리하여, 모바일/데스크탑 분기를 신경 쓰지 않고 렌더링 로직에만 집중할 수 있게 합니다.

**AS-IS**
```tsx
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const mql = window.matchMedia("(max-width: 767px)");
  setIsMobile(mql.matches);
  const handler = (e) => setIsMobile(e.matches);
  mql.addEventListener("change", handler);
  return () => mql.removeEventListener("change", handler);
}, []);

{isMobile ? <MobileNav /> : <DesktopNav />}
```

**TO-BE**
```tsx
<Responsive.Mobile>
  <MobileNav />
</Responsive.Mobile>

<Responsive.Desktop>
  <DesktopNav />
</Responsive.Desktop>

{/* 커스텀 쿼리도 가능 */}
<Responsive query="(min-width: 1024px)">
  <WideLayout />
</Responsive>
```

---

### OutsideClick

요소 외부 클릭을 감지하여 콜백을 실행합니다. 드롭다운, 모달, 팝오버 닫기 등에 활용됩니다.

기존에는 외부 클릭 감지를 위해 `useRef`, `useEffect`, `document.addEventListener`를 조합한 보일러플레이트를 매번 작성해야 했고, 이벤트 리스너의 등록/해제 관리를 빠뜨리면 메모리 누수나 의도치 않은 동작이 발생했습니다. `OutsideClick`은 이 반복적인 패턴을 하나의 컴포넌트로 추상화하여 선언적으로 사용할 수 있게 합니다.

**AS-IS**
```tsx
const ref = useRef(null);

useEffect(() => {
  const handler = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  };
  document.addEventListener("mousedown", handler);
  return () => document.removeEventListener("mousedown", handler);
}, []);

<div ref={ref}>
  <Dropdown />
</div>
```

**TO-BE**
```tsx
<OutsideClick onOutsideClick={() => setOpen(false)}>
  <Dropdown />
</OutsideClick>
```

---

### FormStatus

React 19의 `useFormStatus()`를 render prop으로 노출하여, `<form>` 안에서 제출 상태를 읽기 위해 별도 컴포넌트를 분리하지 않아도 되게 합니다.

기존에는 `useFormStatus()`가 반드시 `<form>`의 자식 컴포넌트 안에서만 호출할 수 있어서, `pending` 상태 하나를 읽으려고도 컴포넌트를 억지로 분리해야 했습니다. `FormStatus`는 이 제약을 render prop 패턴으로 해결하여, form 내부에서 인라인으로 제출 상태를 사용할 수 있게 합니다.

**AS-IS**
```tsx
// useFormStatus()를 쓰기 위해 별도 컴포넌트를 만들어야 함
function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? '저장 중...' : '저장'}</button>;
}

function MyForm() {
  return (
    <form action={action}>
      <input name="title" />
      <SubmitButton />
    </form>
  );
}
```

**TO-BE**
```tsx
// pending만 쓸 때
<form action={action}>
  <input name="title" />
  <FormStatus>
    {({ pending }) => (
      <button disabled={pending}>저장</button>
    )}
  </FormStatus>
</form>

// 모든 상태 필드를 쓸 때
<form action={action}>
  <input name="title" />
  <FormStatus>
    {({ pending, data, method, action }) => (
      <>
        <button disabled={pending}>저장</button>
        <p>{data?.get('title')}으로 저장 중...</p>
      </>
    )}
  </FormStatus>
</form>
```

---

### Throw

렌더 시점에 즉시 에러를 throw합니다.

기존에는 특정 조건에서 ErrorBoundary를 트리거하려면 컴포넌트 내부에서 명령적으로 `throw`를 호출해야 했고, 이를 위한 별도 컴포넌트를 만들거나 상태 관리가 필요했습니다. `Throw`는 JSX 트리 안에서 선언적으로 에러를 발생시킬 수 있어, 테스트나 조건부 에러 처리를 간결하게 표현할 수 있습니다.

```tsx
<ErrorBoundary fallback={<ErrorPage />}>
  <Throw error={new Error("Something went wrong")} />
</ErrorBoundary>
```

---

### Suspend

렌더 시 무한히 suspend 상태를 유지합니다.

기존에는 Suspense의 fallback UI를 확인하려면 실제 비동기 요청을 지연시키거나 네트워크를 throttle해야 했습니다. `Suspend`는 의도적으로 무한 suspend 상태를 만들어, Storybook이나 테스트 환경에서 로딩 UI를 간편하게 시연하고 검증할 수 있습니다.

```tsx
<Suspense fallback={<Skeleton />}>
  <Suspend />
</Suspense>
```

---

## Peer Dependencies

- `react` >= 19
- `react-dom` >= 19

## License

MIT
