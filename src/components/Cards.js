import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  root: {
    maxWidth: "95%",
    height: "96%",
    marginLeft: 12,
    marginTop: 30,
  },
  media: {
    height: 440,
    width: "100%",
  },
});

export default function Cards({
  id,
  title,
  overview,
  poster,
  apiKey,
  average,
}) {
  const baseUrlImage = "https://image.tmdb.org/t/p/w500";

  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Link
        to={"movie/" + id + "/" + average}
        style={{ textDecoration: "none" }}
      >
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={baseUrlImage + poster}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {overview.length > 120
                  ? overview.slice(0, 100) + "..."
                  : overview}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon color="inherit" />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon color="inherit" />
            </IconButton>
          </CardActions>
        </Card>
      </Link>
    </Grid>
  );
}
