import { render, cleanup, fireEvent } from "@testing-library/react";
import App from "./App";
import { useUserStore, useUserStoreAPI } from "./stores/user.store";
import { renderApp } from "./utils/testing.utils";

const initialStoreState = useUserStore.getState();

describe("zustand test", () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    useUserStore.setState(initialStoreState, true);
  });

  test("login success test", () => {
    useUserStore.setState({ isLoggedIn: true, userDetails: {} });
    const { getByText } = renderApp(<App />);
    expect(getByText("Log out")).toBeTruthy();
  });
  test("logout success test", () => {
    useUserStore.setState({ isLoggedIn: true, userDetails: {} });
    const { getByText, queryByText } = renderApp(<App />);
    expect(getByText("Log out")).toBeTruthy();
    fireEvent.click(getByText("Log out"));
    expect(queryByText("Log out")).not.toBeTruthy();
  });
});
