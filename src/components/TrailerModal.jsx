import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { youtubeInstance } from "../axios";

const TrailerModal = ({ movie, onClose }) => {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const navigate = useNavigate();

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
    if (movie) {
      setTrailerUrl("");
      setShowTrailer(false);
    }
  }, [movie]);

  const handleClose = () => {
    setShowTrailer(false); // Reset trailer state when modal closes
    onClose();
  };

  if (!movie) return null;

  return (
    <div className="modal" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <h2>{movie.Title}</h2>
        {!showTrailer ? (
          <div>
            <button
              className="modal-button"
              onClick={async () => {
                if (!movie?.Title) {
                  alert(
                    "The Trailer for the selected movie is unavailable. Please go through other movies",
                  );
                  return;
                }

                const trailerUrl = await fetchYoutubeTrailer(movie.Title);
                if (trailerUrl) {
                  setTrailerUrl(trailerUrl);
                  setShowTrailer(true);
                } else {
                  alert(
                    "The Trailer for the selected movie is unavailable. Please go through other movies",
                  );
                }
              }}
            >
              Play Trailer
            </button>
            <button
              className="modal-button watch-full-movie-btn"
              onClick={() => navigate("/subscription")}
            >
              Watch Full Movie
            </button>
          </div>
        ) : (
          <iframe
            src={trailerUrl}
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default TrailerModal;
