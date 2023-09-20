import React from "react";
import { render, screen } from "@testing-library/react";
import CustomProgress from "../CustomProgress";

describe("CustomProgress Component", () => {
  it("renders without errors", () => {
    render(<CustomProgress/>);
    const customProgressElement = screen.getByTestId("custom-progress");
    expect(customProgressElement).toBeInTheDocument();
  });
});