import axios from "axios";
import { lazy, use, useEffect, useState } from "react";
import { DateTime } from "next-auth/providers/kakao";


export interface Theater{
  "name":string,
  "seats":number,
  "ticketPrice":number,
  "image":string,
  "Address":string,
  "id":string,
  "movies":Movies[]
}

export interface Movies{
"id":string,
"title":string,
"image":string,
"language":string,
"genre":string[],
"director":string,
"trailer":string,
"trailerUrl":string
"description":string,
"duration":number,
"startDate":Date,
"endDate":Date
"theatres":Theater[]
}


export interface Showtime {
"id": string;
"ticketPrice": number;
"startDate": Date;
"endDate": Date;
"startTime":DateTime
"endTIme":DateTime
"theatre": Theater;
"movie": Movies;
}



export const useTheatre = ({id} : {id : string}) => {
    const [loading,setLoading]= useState(true)
    const [theatre,setTheatre]= useState(undefined)

    useEffect(()=>{

        axios.get(`http://localhost:5000/api/theatre/${id}`)
        .then(response=>{
        setTheatre(response.data.theatre)
        console.log(response.data.theatre)
        setLoading(false)
        })
        .catch(e=>{
        console.error("Error while fetching",e)
        })

    },[id])


    return{
        loading,
        theatre
    }
}

export const useMovie = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<Movies | undefined>(undefined);
  const [error, setError] = useState<string | null>(null); // New error state

  useEffect(() => {
    if (id) {
      const fetchMovie = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/movie/${id}`);
          if (response.data.movie) {
            setMovie(response.data.movie);
            setError(null); // Reset any previous errors
          } else {
            setError('Movie not found'); // Handle 404-like case
          }
        } catch (error) {
          console.error("Error fetching movie details:", error);
          setError('An error occurred while fetching the movie details');
        } finally {
          setLoading(false);
        }
      };

      fetchMovie();
    } else {
      setLoading(false);
    }
  }, [id]);

  return {
    loading,
    movie,
    error, // Return the error state
  };
};


export const useAllMovie = () => {
  const [loading,setLoading]= useState(true)
  const [movies,setMovies]= useState(undefined)

  useEffect(() => {
          try {
            axios.get(`http://localhost:5000/api/movie/movies`)
            .then(response => {
              setMovies(response.data.movies);
              console.log(response.data.movies);
              setLoading(false);
            }) 
          } catch (error) {
            console.error("Error fetching movies: ", error);
            setLoading(false);
          }

    }, []);

  return {
      loading,
      movies
  }
}

export const useShowtime = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);

  useEffect(() => {
      axios.get(`http://localhost:5000/api/showtimes/${id}` )
          .then(response => {
            
              setShowtimes(response.data.showtimes);
              setLoading(false);
          })
          .catch(error => {
              console.error('Error fetching showtimes:', error);
              setLoading(false);
          });
  }, [id]);

  return {
      showtimes,
      loading
  };
};
