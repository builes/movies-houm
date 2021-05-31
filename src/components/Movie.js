import { Grid } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import "../styles/movie.css";
import Back from "./Back";

const useStyles = makeStyles({
  media: {
    height: "70vh",
    width: "100%",
  },
  stars: {
    display: "flex",
    flexDirection: "column",
    "& > * + *": {},
  },
  root: {
    marginTop: 15,
  },
});

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
      <Grid container justify="center" className={classes.root}>
        <Grid item>
          <Card className="root">
            <CardActionArea>
              <CardMedia
                className="media1"
                image={baseUrlImage + poster}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {movie.title}
                </Typography>

                <Typography variant="body2" color="textSecondary" component="p">
                  {movie.overview}
                </Typography>

                <div
                  className={classes.stars}
                  style={{
                    borderTop: "solid 1px #ff452b",
                    marginTop: "2%",
                    paddingTop: "2%",
                  }}
                >
                  <Rating
                    name="half-rating-read"
                    defaultValue={Number(average)}
                    precision={0.5}
                    readOnly
                  />
                </div>

                <Typography
                  className="description"
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Release Date : {movie.release_date}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                variant="contained"
                size="large"
              >
                <a
                  href={`https://www.youtube.com/watch?v=${keyTrailer}`}
                  target="_blank"
                  style={{ textDecoration: "none", color: "#FF452B" }}
                >
                  Trailer
                </a>
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
