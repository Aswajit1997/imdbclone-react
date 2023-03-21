import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/MovieList";

const Home = () => {

    const [popularMovies,setPopularMovies]=useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=0bc5859e7987954797722ab1252c9ddf&language=en-US&page=1"
      )
      .then((res) => setPopularMovies(res.data.results));
  }, []);
  return(
    <>
        <div className="poster">
            <Carousel
                showThumbs={false}
                autoPlay={true}
                transitionTime={3}
                infiniteLoop={true}
                showStatus={false}
            >
                {
                popularMovies.map(movie=>(
                    <Link style={{textDecoration:'none',color:"white"}} to={`/movie/${movie.id}` } >
                    <div className="posterImage">
                        <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} />
                    </div>
                    <div className="posterImage-overlay" >
                        <div className="posterImage_title">{movie ? movie.original_title : ""}</div>
                        <div className="posterImage_runtime">
                            {movie ? movie.release_date : ""}
                            <span className="posterImage_rating">
                                {movie ? movie.vote_average :" "}
                                <i className="fas fa-star" />{""}
                            </span>
                        </div>
                        <div className="posterImage_description">{movie ? movie.overview  :"Movie overview"}</div>
                    </div>
                    </Link>
                ))
                }
            </Carousel>
            <MovieList/>
        </div>
    </>
  );
};

export default Home;
