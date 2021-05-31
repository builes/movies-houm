import { Box, Grid } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Cards from "./Cards";
import SearchAppBar from "./Search";
import Pages from "./Pages";

export default function GetMovies() {
  //constante para hacer la peticion de las peliculas que aparecen inicialmente
  const apiKey = "api_key=69411c96b258f360f365f6cd31778c19";
  const baseUrl = "https://api.themoviedb.org/3";
  const initialApi = "/discover/movie?sort_by=popularity.desc&";

  const [search, setSearch] = useState("");
  const [page, setPage] = useState("&page=1");
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  //constantes para hacer la peticion de las pelicular por la barra de busqueda
  let urlSearch =
    baseUrl + "/search/movie?" + apiKey + "&query=" + search + page;

  const handlePage = (p) => {
    setPage(`&page=${p}`);
    console.log(page);
  };

  const searchMovie = (text) => {
    setSearch(text);
    console.log(text);
  };

  useEffect(() => {
    async function getMovies() {
      try {
        const res = await axios.get(baseUrl + initialApi + apiKey + page);
        //console.log(res.data.results[0]);
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages);
      } catch (error) {
        console.error(error);
      }
    }
    getMovies();
  }, [page]);

  useEffect(() => {
    if (search.length >= 2) {
      async function getMovies() {
        try {
          const res = await axios.get(urlSearch);
          setTotalPages(res.data.total_pages);
          setMovies(res.data.results);
        } catch (error) {
          console.error(error);
        }
      }
      getMovies();
      //console.log(movies);
    }
  }, [search]);

  return (
    <>
      <SearchAppBar searchMovie={searchMovie} />
      <Grid container>
        {movies.map((movie) => (
          <Cards
            key={movie.id}
            id={movie.id}
            title={movie.title}
            overview={movie.overview}
            poster={movie.poster_path}
            apikey={apiKey}
            average={movie.vote_average / 2}
          />
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" my={4}>
        <Pages handlePage={handlePage} pages={totalPages} />
      </Box>
    </>
  );
}
