import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import Header from "../../Layouts/Header";

describe("Header Component", () => {
  it("renders without crashing", () => {
    render(<Header />);
  });
});
