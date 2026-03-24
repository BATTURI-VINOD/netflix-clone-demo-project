import { useEffect, useState } from "react";
import { omdbInstance } from "../axios";

function Row({
  title,
  fetchUrl,
  isLargeRow,
  onMovieClick,
  movies: propMovies,
}) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (propMovies) {
      setMovies(propMovies);
      setError(false);
    } else if (fetchUrl) {
      async function fetchData() {
        try {
          const response = await omdbInstance.get(fetchUrl);
          const results = response.data.Search || [];
          setMovies(results);
          setError(false);
        } catch (err) {
          console.error(`Error fetching ${title}:`, err);
          setError(true);
          setMovies([]);
        }
      }
      fetchData();
    }
  }, [fetchUrl, title, propMovies]);

  if (error) {
    return (
      <div className="row">
        <h2>{title}</h2>
        <p style={{ color: "red", padding: "20px" }}>
          Failed to load movies. Check your OMDb API key.
        </p>
      </div>
    );
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => {
          return (
            <div
              className="row__posterWrapper"
              key={movie.id || movie.imdbID || movie.Title}
              onClick={() => onMovieClick(movie)}
            >
              <img
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={
                  movie.Poster && movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.Title || "Movie poster"}
                loading="lazy"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x450?text=No+Image";
                }}
              />
              <div className="playButton">▶</div>
              <div className="row__posterOverlay">
                <p className="row__posterTitle">{movie.Title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Row;
