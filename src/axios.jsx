import axios from "axios";

const omdbInstance = axios.create({
  baseURL: import.meta.env.VITE_OMDB_BASE_URL || "https://www.omdbapi.com/",
});

const youtubeInstance = axios.create({
  baseURL:
    import.meta.env.VITE_YOUTUBE_BASE_URL ||
    "https://www.googleapis.com/youtube/v3",
});

export { omdbInstance, youtubeInstance };
export default omdbInstance;
