import React, { useEffect, useState } from 'react'
import './Movie.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Movie() {
  const [currentMovie,setCurrentMovie]=useState();
  const {id}=useParams();
  useEffect(()=>{
    getData();
    // window.scrollTo(0,0)
  },[])

  const getData=()=>{
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=0bc5859e7987954797722ab1252c9ddf&language=en-US&page=1`
      )
      .then((res) => setCurrentMovie(res.data));
  }
  return (
    <div className="movie">
            <div className="movie_intro">
                <img className="movie_backdrop" src={`https://image.tmdb.org/t/p/original${currentMovie ? currentMovie.backdrop_path : ""}`} />
            </div>
            <div className="movie_detail">
                <div className="movie_detailLeft">
                    <div className="movie_posterBox">
                        <img className="movie_poster" src={`https://image.tmdb.org/t/p/original${currentMovie ? currentMovie.poster_path : ""}`} />
                    </div>
                </div>
                <div className="movie_detailRight">
                    <div className="movie_detailRightTop">
                        <div className="movie_name">{currentMovie ? currentMovie.original_title : ""}</div>
                        <div className="movie_tagline">{currentMovie ? currentMovie.tagline : ""}</div>
                        <div className="movie_rating">
                            {currentMovie ? currentMovie.vote_average: ""} <i class="fas fa-star" />
                            <span className="movie_voteCount">{currentMovie ? "(" + currentMovie.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className="movie_runtime">{currentMovie ? currentMovie.runtime + " mins" : ""}</div>
                        <div className="movie_releaseDate">{currentMovie ? "Release date: " + currentMovie.release_date : ""}</div>
                        <div className="movie_genres">
                            {
                                currentMovie && currentMovie.genres
                                ? 
                                currentMovie.genres.map(genre => (
                                    <><span className="movie_genre" id={genre.id}>{genre.name}</span></>
                                )) 
                                : 
                                ""
                            }
                        </div>
                    </div>
                    <div className="movie_detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovie ? currentMovie.overview : ""}</div>
                    </div>
                    
                </div>
            </div>
            <div className="movie_links">
                <div className="movie_heading">Useful Links</div>
                {
                    currentMovie && currentMovie.homepage && <a href={currentMovie.homepage} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                {
                    currentMovie && currentMovie.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovie.imdb_id} target="_blank" style={{textDecoration: "none",color:"white"}}><p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
            </div>
            <div className="movie_heading">Production companies</div>
            <div className="movie_production">
                {
                    currentMovie && currentMovie.production_companies && currentMovie.production_companies.map(company => (
                        <>
                            {
                                company.logo_path 
                                && 
                                <span className="productionCompanyImage">
                                    <img className="movie_productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                                    <span>{company.name}</span>
                                </span>
                            }
                        </>
                    ))
                }
            </div>
        </div>
  )
}

export default Movie