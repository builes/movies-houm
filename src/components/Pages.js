import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Pages({ handlePage, pages }) {
  const handleClick = (e) => {
    console.log(e.target.textContent);
    let page = e.target.textContent;
    handlePage(page);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Pagination count={pages} onClick={handleClick} />
    </div>
  );
}
