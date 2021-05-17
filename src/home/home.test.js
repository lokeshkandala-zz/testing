import { cleanup, fireEvent } from "@testing-library/react";
import { Home } from "./index";
import { useUserStore, useUserStoreAPI } from "../stores/user.store";
import { renderApp } from "../utils/testing.utils";

const initialStoreState = useUserStore.getState();

describe("Home component test", () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    useUserStore.setState(initialStoreState, true);
  });

  test("Sibebar expand test", () => {
    useUserStore.setState({
      isLoggedIn: true,
      userDetails: { name: "David williams" },
    });
    console.log(useUserStoreAPI.getState(), "terete");
    const { getByTestId, getByText, queryByText } = renderApp(<Home />);
    expect(getByTestId("hamburger")).toBeTruthy();
    fireEvent.click(getByTestId("hamburger"));
    expect(getByText("David williams")).toBeTruthy();
    fireEvent.click(getByTestId("hamburger"));
    expect(queryByText("David williams")).not.toBeTruthy();
  });
});
