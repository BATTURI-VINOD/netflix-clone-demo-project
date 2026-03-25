# Netflix Clone

A React-based Netflix clone application that displays movies and TV shows using the OMDb API for movie data and the YouTube API for trailers.

Features

Browse movies and TV shows
View Netflix Originals (custom category or predefined search)
Explore different genres: Action, Comedy, Horror, Romance, Documentaries (via search queries)
Responsive design with hover effects
Dynamic banner with random featured content
Watch trailers using YouTube integration

Setup

Clone the repository

Install dependencies:

npm install

Get API keys:

Go to OMDb API
Create an account and get your API key

Go to Google Cloud Console
Create a project
Enable YouTube Data API v3
Generate an API key

Go to Google Cloud Console
Create a project
Enable YouTube Data API v3
Generate an API key

Copy the API keys

Create a .env file in the root directory and add your API keys:

VITE_OMDB_API_KEY=your_api_key_here
VITE_YOUTUBE_API_KEY=your_api_key_here

Start the development server:

npm run dev

Technologies Used

React
Vite
Axios
OMDb API
YouTube Data API v3
CSS

Available Scripts

npm run dev - Start development server
npm run build - Build for production
npm run preview - Preview production build
npm run lint - Run ESLint

If you want it even closer to Netflix (like real genre rows using OMDb workaround), I can tweak that too.

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

3. Get a OMDB API key:
   - Go to [OMDB](https://www.omdbapi.com/)
   - Create an account
   - Go to Settings > API
   - Request an API key
   - Copy the API key

4. Create a `.env` file in the root directory and add your API key:

   ```
   VITE_OMDB_API_KEY=your_api_key_here
   VITE_YOUTUBE_API_KEY=your_api_key_here
   ```

5. Start the development server:
   ```
   npm run dev
   ```

## Technologies Used

- React
- Vite
- Axios
- OMDB API
- YouTube Data API v3
- CSS

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
