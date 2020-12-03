import React from "react";
import { render, screen } from "@testing-library/react";
import Render from "./Render";

describe("Rendering", () => {
  it("should render all the elements correctly", () => {
    render(<Render />);
    // screen.debug();
    //各ロールは以下を確認
    // https://github.com/A11yance/aria-query
    // screen.debug(screen.getByRole("heading"));
    // 検証できる一覧
    // https://jestjs.io/docs/ja/expect
    expect(screen.getByRole("heading")).toBeTruthy();
    expect(screen.getByRole("textbox")).toBeTruthy();
    expect(screen.getAllByRole("button")[0]).toBeTruthy();
    expect(screen.getAllByRole("button")[1]).toBeTruthy();
    // screen.debug(screen.getByText("Udemy"));
    expect(screen.getByText("Udemy")).toBeTruthy();
    expect(screen.queryByText("Udeny")).toBeNull();
    expect(screen.getByTestId("copyright")).toBeTruthy();
  });
});
