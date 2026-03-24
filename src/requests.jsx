const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const requests = {
  trending: `?s=popular&type=movie&apikey=${API_KEY}`,
  netflixOriginals: `?s=series&type=series&apikey=${API_KEY}`,
  topRated: `?s=best&type=movie&apikey=${API_KEY}`,
  action: `?s=action&type=movie&apikey=${API_KEY}`,
  comedy: `?s=comedy&type=movie&apikey=${API_KEY}`,
  horror: `?s=horror&type=movie&apikey=${API_KEY}`,
  romance: `?s=romance&type=movie&apikey=${API_KEY}`,
  documentaries: `?s=documentary&type=movie&apikey=${API_KEY}`,
};

export default requests;
