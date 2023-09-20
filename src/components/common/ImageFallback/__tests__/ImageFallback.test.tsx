import React from "react";
import { render } from "@testing-library/react";
import ImageFallback from "../ImageFallback";

describe("ImageFallback Component", () => {
  it("renders without errors", () => {
    const { container } = render(<ImageFallback/>);
    expect(container).toBeInTheDocument();
  });
});