import { Grid } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import "../styles/movie.css";
import Back from "./Back";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  stars: {
    display: "flex",
    flexDirection: "column",
    "& > * + *": {},
  },
  text: {
    [theme.breakpoints.down("959")]: {
      margin: `20px`,
    },
  },
}));

export default function Movie() {
  const [movie, setMovie] = useState({});
  const [keyTrailer, setkeyTrailer] = useState("");
  const { id, average } = useParams();

  const classes = useStyles();

  //Datos para api de la pelicula
  const baseUrl = "https://api.themoviedb.org/3/movie/";
  const apiKey = "?api_key=69411c96b258f360f365f6cd31778c19";
  const baseUrlImage = "https://image.tmdb.org/t/p/w500";
  const poster = movie.poster_path;
  const url = baseUrl + id + apiKey;

  //Datos para api Trailer
  let urlTrailer = baseUrl + id + "/videos" + apiKey + "&language=en-US";

  useEffect(() => {
    async function getMovie() {
      try {
        const res = await axios.get(url);
        const resTrailer = await axios.get(urlTrailer);
        console.log(resTrailer.data.results[0].key);
        setMovie(res.data);
        setkeyTrailer(resTrailer.data.results[0].key);
      } catch (error) {
        console.error(error);
      }
    }
    getMovie();
  }, []);

  return (
    <>
      <Back />
      <Grid container justify="space-around" style={{ marginTop: "20px" }}>
        <Grid item xs={6} md={4}>
          <CardMedia
            component="img"
            width="100%"
            image={baseUrlImage + poster}
          />
        </Grid>
        <Grid item xs={12} md={7} className={classes.text}>
          <Typography variant={"h4"}>{movie.title}</Typography>
          <Divider style={{ marginTop: "7px", marginBottom: "7px" }} />
          <Typography align="justify" variant={"body2"}>
            <b>Sypnosis:</b>
            {movie.overview}
          </Typography>
          <Divider style={{ marginTop: "7px", marginBottom: "7px" }} />

          <div
            className={classes.stars}
            style={{
              paddingTop: "1%",
              paddingBottom: "1%",
            }}
          >
            <Rating
              name="half-rating-read"
              defaultValue={Number(average)}
              precision={0.5}
              readOnly
            />
          </div>
          <Divider style={{ marginTop: "7px", marginBottom: "7px" }} />
          <Typography align="justify" variant={"body2"}>
            <b>Relaese:</b> {movie.release_date}
          </Typography>
          <Divider style={{ marginTop: "7px", marginBottom: "7px" }} />

          <a
            href={`https://www.youtube.com/watch?v=${keyTrailer}`}
            target="_blank"
            style={{ textDecoration: "none", color: "#FF452B" }}
          >
            <Button color="primary" size="large" variant="contained">
              Trailer
            </Button>
          </a>
        </Grid>
      </Grid>
    </>
  );
}
