import React, { useEffect, useState, Fragment } from "react";
import MovieItem from "./MovieItem";
import Details from "./Details";
import MoviesList from "./MoviesList";
import AllShows from "./AllShows";
import SearchComponent from "./SearchComponent";
import Button from "@material-ui/core/Button";
import style from "../assets/style.module.css";
import "bootstrap/dist/css/bootstrap.css";
import PageDetails from "./PageDetails";

export default function Body() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState(null);

  return (
    <Fragment>
      <div>{!selectedMovie && <SearchComponent  setMovies={setMovies} />}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {selectedMovie ? (
          <PageDetails
            selectedMovie={selectedMovie}
            setSelectedMovie={setSelectedMovie}
          />
        ) : movies?.length > 0 ? (
          <MoviesList movies={movies} setSelectedMovie={setSelectedMovie} />
        ) : (
          <div>
            <AllShows setSelectedMovie={setSelectedMovie} />
          </div>
        )}
      </div>
    </Fragment>
  );
}
