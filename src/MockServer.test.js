import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import MockServer from "./MockServer";
import userEvent from "@testing-library/user-event";

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: "Bred dummy" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close());

describe("Mocking API", () => {
  it("[Fetch success] should display fetched data correctly and button disabled", async () => {
    render(<MockServer />);
    userEvent.click(screen.getByRole("button"));
    // findByRoleは非同期処理が終わるまで待ってくれる
    expect(await screen.findByRole("heading")).toHaveTextContent("Bred dummy");
    expect(screen.getByRole("button")).toHaveAttribute("disabled");
  });
  it("[Fetch failure] should display error msg, no render heading and bunnton abled", async () => {
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/users/1",
        (req, res, ctx) => {
          return res(ctx.status(404));
        }
      )
    );
    render(<MockServer />);
    userEvent.click(screen.getByRole("button"));
    expect(await screen.findByTestId("error")).toHaveTextContent(
      "Fetching Failed !"
    );
    expect(screen.queryByRole("heading")).toBeNull();
    expect(screen.getByRole("button")).not.toHaveAttribute("disabled");
  });
});
