import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null); // State to hold the movie data

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie); // Store the movie data in state

  };

  useEffect(() => {
    getMovie(); // Fetch movie details when the component mounts
  }, [id]); // Adding `id` as a dependency

  console.log(movie)
  return (
    <div className={styles.container}>
      {movie ? (
        <div className={styles.movieDetails}>
          <img src={movie.medium_cover_image} alt={movie.title} className={styles.coverImage} />
          <h1>{movie.title}</h1>
          <p>{movie.description_intro}</p>
          <p><strong>Year:</strong> {movie.year}</p>
          <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
          <p><strong>Rating:</strong> {movie.rating}</p>
          <a href={movie.url} target="_blank" rel="noopener noreferrer">More Details</a>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default Detail;