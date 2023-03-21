import React, { useEffect, useState } from "react";
import "./MovieList.css";
import Card from "../card/Card";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData();
  }, [type]);

  const getData = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${
          type ? type : "popular"
        }?api_key=0bc5859e7987954797722ab1252c9ddf&language=en-US&page=1`
      )
      .then((res) => setMovieList(res.data.results));
  };
  return(
    <div className="movie_list">
        <h2 className="list_title">{(type?type:"popular").toLocaleUpperCase()}</h2>
        <div className="list_cards">
            {
                movieList.map(movie=>(
                    <Card movie={movie} />
                ))
            }
        </div>
    </div>
  );s
};

export default MovieList;
