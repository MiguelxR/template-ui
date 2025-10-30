import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CoreLayout from "../../Layouts/CoreLayout";
import Home from "../../pages/Home/Home.page";

describe("CoreLayout Component", () => {
  it("renders without crashing", () => {
    render(<CoreLayout children={<Home />} />);
  });

  it("has to be a header in the document", () => {
    render(<CoreLayout children={<Home />} />);
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();
  });

  it("has to be a footer in the document", () => {
    render(<CoreLayout children={<Home />} />);
    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toBeInTheDocument();
  });
});
