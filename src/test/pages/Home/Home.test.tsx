import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import Home from "../../../pages/Home/Home";

describe("Home Component", () => {
  it("renders without crashing", () => {
    render(<Home />);
  });
});
