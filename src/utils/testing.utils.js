import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
export * from "@testing-library/react";

export const renderApp = (children) => {
  return { ...render(<BrowserRouter>{children}</BrowserRouter>) };
};
