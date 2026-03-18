import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FormStatus } from "../src/components/FormStatus";

vi.mock("react-dom", async () => {
  const actual = await vi.importActual<typeof import("react-dom")>("react-dom");
  return {
    ...actual,
    useFormStatus: vi.fn(),
  };
});

import { useFormStatus } from "react-dom";
const mockedUseFormStatus = vi.mocked(useFormStatus);

describe("FormStatus", () => {
  it("passes idle status to children when form is not submitting", () => {
    mockedUseFormStatus.mockReturnValue({
      pending: false,
      data: null,
      method: null,
      action: null,
    });

    render(
      <form>
        <FormStatus>
          {({ pending }) => (
            <button disabled={pending}>
              {pending ? "저장 중..." : "저장"}
            </button>
          )}
        </FormStatus>
      </form>
    );

    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
    expect(button).toHaveTextContent("저장");
  });

  it("passes pending status to children when form is submitting", () => {
    mockedUseFormStatus.mockReturnValue({
      pending: true,
      data: new FormData(),
      method: "post",
      action: "https://example.com",
    });

    render(
      <form>
        <FormStatus>
          {({ pending }) => (
            <button disabled={pending}>
              {pending ? "저장 중..." : "저장"}
            </button>
          )}
        </FormStatus>
      </form>
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("저장 중...");
  });

  it("provides all status fields to render prop", () => {
    const formData = new FormData();
    const actionFn = vi.fn();

    mockedUseFormStatus.mockReturnValue({
      pending: true,
      data: formData,
      method: "post",
      action: actionFn,
    });

    const childrenSpy = vi.fn(() => <span>test</span>);

    render(
      <form>
        <FormStatus>{childrenSpy}</FormStatus>
      </form>
    );

    expect(childrenSpy).toHaveBeenCalledWith({
      pending: true,
      data: formData,
      method: "post",
      action: actionFn,
    });
  });
});
