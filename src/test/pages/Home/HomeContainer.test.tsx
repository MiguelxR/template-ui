import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import HomeContainer from "../../../pages/Home/HomeContainer.page";

describe("HomeContainer Component", () => {
  it("renders without crashing", () => {
    render(<HomeContainer />);
  });
});
