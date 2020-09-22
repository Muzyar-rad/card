import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";
import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  Typography,
  IconButton,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    textAlign: "center",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(1.5)",
  },
  title: {
    fontSize: 14,
  },
  expand: {
    transform: "rotate(0deg)",
    margin: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  pos: {
    marginBottom: 12,
  },
}));
const CardUser = () => {
  const [data, setData] = useState({});
  const [address, setAddress] = useState({});
  const [company, setCompany] = useState({});
  const [expanded, setExpanded] = React.useState(false);

  useEffect(() => {
    const getResult = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users/1", {
        method: "GET",
      });
      const response = await res.json();
      setData(response);
      setAddress(response.address);
      setCompany(response.company);
    };
    getResult();
  }, []);
  const classes = useStyles();
  const bull = <span className={classes.bullet}>____________________</span>;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {company.catchPhrase}
        </Typography>
        <Typography>{bull}</Typography>
        <Typography mt="17px" variant="h5" component="h2">
          {company.name}
        </Typography>
        <Typography>{bull}</Typography>
        <Typography className={classes.pos} color="textSecondary">
          {data.phone} {"/"} {data.email}
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" component="p">
            {address.suite} {address.street}
            <br />
            {address.city}
            <br />
            {address.zipcode}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CardUser;
