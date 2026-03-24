import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { omdbInstance, youtubeInstance } from "../axios";
import requests from "../requests";
import { useTheme } from "../contexts/ThemeContext";

function Banner() {
  const [movie, setMovie] = useState({});
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const [showTrailerToast, setShowTrailerToast] = useState(false);
  const navigate = useNavigate();
  const trailerToastTimer = useRef(null);
  const { theme } = useTheme();

  const fetchYoutubeTrailer = async (movieTitle) => {
    try {
      const response = await youtubeInstance.get("/search", {
        params: {
          q: `${movieTitle} trailer`,
          part: "snippet",
          type: "video",
          key: import.meta.env.VITE_YOUTUBE_API_KEY,
          maxResults: 1,
        },
      });
      if (response.data.items && response.data.items.length > 0) {
        const videoId = response.data.items[0].id.videoId;
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
      }
    } catch (error) {
      console.error("Error fetching YouTube trailer:", error);
    }
    return null;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await omdbInstance.get(requests.trending);
        const movies = response.data.Search || [];
        if (movies.length > 0) {
          const randomMovie = movies[Math.floor(Math.random() * movies.length)];
          setMovie(randomMovie);
        } else {
          setMovie({
            Title: "Popular Movies",
            Plot: "Browse our collection of great films",
            Poster: "https://via.placeholder.com/500x750?text=Movies",
          });
        }
      } catch (error) {
        console.error("Error fetching banner movie:", error);
        setMovie({
          Title: "Popular Movies",
          Plot: "Browse our collection of great films",
          Poster: "https://via.placeholder.com/500x750?text=Movies",
        });
      }
    }

    fetchData();
  }, []);

  const showTrailerUnavailableToast = () => {
    setShowTrailerToast(true);
    if (trailerToastTimer.current) {
      clearTimeout(trailerToastTimer.current);
    }
    trailerToastTimer.current = setTimeout(() => {
      setShowTrailerToast(false);
      trailerToastTimer.current = null;
    }, 3000);
  };

  const handlePlayTrailer = async () => {
    if (!movie?.Title) {
      showTrailerUnavailableToast();
      return;
    }

    try {
      const trailerUrl = await fetchYoutubeTrailer(movie.Title);
      if (trailerUrl) {
        setTrailerUrl(trailerUrl);
        setIsPlayingTrailer(true);
        setShowTrailerToast(false);
      } else {
        showTrailerUnavailableToast();
      }
    } catch (error) {
      console.error("Error playing trailer:", error);
      showTrailerUnavailableToast();
    }
  };

  useEffect(() => {
    return () => {
      if (trailerToastTimer.current) {
        clearTimeout(trailerToastTimer.current);
      }
    };
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const bannerBackgroundImage = movie?.Poster
    ? theme === "light"
      ? `url("${movie.Poster}")`
      : `url("${movie.Poster}"), linear-gradient(90deg, rgba(0,0,0,0.7), rgba(0,0,0,0.7))`
    : "linear-gradient(90deg, #000, #111)";

  const bannerBackgroundBlendMode = theme === "light" ? "normal" : "darken";

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "contain",
        backgroundImage: bannerBackgroundImage,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: bannerBackgroundBlendMode,
      }}
    >
      {isPlayingTrailer && trailerUrl && (
        <>
          <iframe
            className="banner__trailer"
            src={trailerUrl}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <button
            className="banner__closeTrailer"
            onClick={() => setIsPlayingTrailer(false)}
          >
            ✕
          </button>
        </>
      )}

      {showTrailerToast && (
        <div className="banner__toast">
          The Trailer will be available soon for the selected movie
        </div>
      )}

      <div className="banner__contents">
        <h1 className="banner__title">{movie?.Title || "Loading..."}</h1>
        <div className="banner__bottom">
          <h1 className="banner__description">
            {truncate(movie?.Plot, 150) ||
              "Browse our collection of great films"}
          </h1>
          <div className="banner__buttons">
            <button className="banner__button" onClick={handlePlayTrailer}>
              Play Trailer
            </button>
            <button
              className="banner__button"
              onClick={() => navigate("/subscription")}
            >
              Watch Full Movie
            </button>
          </div>
        </div>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
