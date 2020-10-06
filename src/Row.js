import React, { useState, useEffect } from "react";
import axios from "./axios.js";
import Youtube from "react-youtube";
import "./Row.css";
import movieTrailer from "movie-trailer";

const base_URL = "https://image.tmdb.org/t/p/original/";
function Row(props) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(props.fetchUrl);
      //console.log(request);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [props.fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: { autoplay: 1 },
  };
  //console.log(movies);

  const handleClick = (movie) => {
    console.log(movie);
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.original_title || "")
        .then((url) => {
          console.log(url);
          console.log(new URL(url).search);
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log(urlParams.get("v"));
          setTrailerUrl(urlParams.get("v"));
        })
        .catch(console.error);

      /**
      movieTrailer(movie?.name || "");
      
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url.search));
          //setTrailerUrl(urlParams.get("v"));
          
        })
        .cath((error) => console.log(error));
        */
    }
  };

  return (
    <div className="row">
      {/**Title */}
      <h2>{props.title}</h2>
      {/**Conteiner - > posters */}
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${props.isLargeRow && "row__posterLarge"}`}
            onClick={() => handleClick(movie)}
            src={`${base_URL}${
              props.isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
