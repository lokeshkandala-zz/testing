import { render, cleanup, fireEvent } from "@testing-library/react";
import { Login } from "./index";
describe("zustand test", () => {
  afterEach(() => {
    cleanup();
  });
  test("show validation errors", () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId("loginButton")).toBeTruthy();
    fireEvent.click(getByTestId("loginButton"));
    expect(getByTestId("passwordError")).toBeTruthy();
  });
  test("show password validation error", () => {
    const { getByTestId, queryByTestId } = render(<Login />);
    fireEvent.change(getByTestId("usernameInput"), {
      target: { value: "test" },
    });
    expect(getByTestId("loginButton")).toBeTruthy();
    fireEvent.click(getByTestId("loginButton"));
    expect(getByTestId("passwordError")).toBeTruthy();
    expect(queryByTestId("usernameError")).not.toBeTruthy();
  });
});
