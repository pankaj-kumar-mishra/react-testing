import React from "react";
import { render } from "@testing-library/react";
import MovieDetails from "../components/movie-details";

const selectedMovie = {
  id: 1,
  title: "title",
  description: "description",
  avg_rating: 3,
  no_of_ratings: 2,
};

describe("Movie Details component", () => {
  it("should match a snapshot", () => {
    const { container } = render(<MovieDetails movie={selectedMovie} />);
    expect(container).toMatchSnapshot();
  });

  it("should show title and description", () => {
    const { queryByText } = render(<MovieDetails movie={selectedMovie} />);
    expect(queryByText(selectedMovie.title)).toBeTruthy();
    expect(queryByText(selectedMovie.description)).toBeTruthy();
  });
  it("should show color stars", () => {
    const { container } = render(<MovieDetails movie={selectedMovie} />);
    const selectedStars = container.querySelectorAll(".orange");
    expect(selectedStars.length).toBe(selectedMovie.avg_rating);
  });
  it("should show no of ratings", () => {
    const { getByTestId } = render(<MovieDetails movie={selectedMovie} />);
    expect(getByTestId("no_of_ratings").textContent).toBe(
      `(${selectedMovie.no_of_ratings})`
    );
    expect(getByTestId("no_of_ratings").innerHTML).toBe(
      `(${selectedMovie.no_of_ratings})`
    );
  });
});
