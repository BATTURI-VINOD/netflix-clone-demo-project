import Banner from "./components/Banner";
import Row from "./components/Row";
import TrailerModal from "./components/TrailerModal";
import requests from "./requests";
import { useAuth } from "./contexts/AuthContext";
import { useState, useEffect } from "react";
import { omdbInstance } from "./axios";

export default function Home({ searchQuery }) {
  const { user } = useAuth();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    if (searchQuery.trim()) {
      searchMovies(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const searchMovies = async (query) => {
    try {
      const response = await omdbInstance.get(
        `?s=${encodeURIComponent(query)}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`,
      );
      if (response.data.Error) {
        setSearchError(response.data.Error);
        setSearchResults([]);
      } else {
        setSearchError("");
        setSearchResults(response.data.Search || []);
      }
    } catch (error) {
      console.error("Error searching movies:", error);
      setSearchError("Unable to fetch search results. Please try again.");
      setSearchResults([]);
    }
  };

  return (
    <div className="app">
      <Banner />
      {searchQuery.trim() ? (
        <div>
          <h2 style={{ marginLeft: "20px", color: "white" }}>
            Search Results for "{searchQuery}"
          </h2>
          {searchResults.length > 0 ? (
            <Row
              title=""
              movies={searchResults}
              isLargeRow
              onMovieClick={setSelectedMovie}
            />
          ) : (
            <p style={{ marginLeft: "20px", color: "white" }}>
              {searchError
                ? `${searchError}`
                : `No movies found for "${searchQuery}"`}
            </p>
          )}
        </div>
      ) : (
        <>
          <Row
            title="Trending"
            fetchUrl={requests.trending}
            isLargeRow
            onMovieClick={setSelectedMovie}
          />
          <Row
            title="Netflix Originals"
            fetchUrl={requests.netflixOriginals}
            isLargeRow
            onMovieClick={setSelectedMovie}
          />
          <Row
            title="Top Rated"
            fetchUrl={requests.topRated}
            isLargeRow
            onMovieClick={setSelectedMovie}
          />
          <Row
            title="Action Movies"
            fetchUrl={requests.action}
            isLargeRow
            onMovieClick={setSelectedMovie}
          />
          <Row
            title="Comedy Movies"
            fetchUrl={requests.comedy}
            isLargeRow
            onMovieClick={setSelectedMovie}
          />
          <Row
            title="Horror Movies"
            fetchUrl={requests.horror}
            isLargeRow
            onMovieClick={setSelectedMovie}
          />
          <Row
            title="Romance Movies"
            fetchUrl={requests.romance}
            isLargeRow
            onMovieClick={setSelectedMovie}
          />
          <Row
            title="Documentaries"
            fetchUrl={requests.documentaries}
            isLargeRow
            onMovieClick={setSelectedMovie}
          />
        </>
      )}
      <TrailerModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}
