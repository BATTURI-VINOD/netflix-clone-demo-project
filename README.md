# Netflix Clone

A React-based Netflix clone application that displays movies and TV shows using The Movie Database (TMDB) API.

## Features

- Browse trending movies and TV shows
- View Netflix Originals
- Explore different genres: Action, Comedy, Horror, Romance, Documentaries
- Responsive design with hover effects
- Dynamic banner with random featured content

## Setup

1. Clone the repository
2. Install dependencies:

   ```
   npm install
   ```

3. Get a TMDB API key:
   - Go to [TMDB](https://www.themoviedb.org/)
   - Create an account
   - Go to Settings > API
   - Request an API key
   - Copy the API key

4. Create a `.env` file in the root directory and add your API key:

   ```
   VITE_TMDB_API_KEY=your_api_key_here
   ```

5. Start the development server:
   ```
   npm run dev
   ```

## Technologies Used

- React
- Vite
- Axios
- TMDB API
- CSS

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
