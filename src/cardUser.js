import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
    backgroundColor: "#000051",
    color: "#80d8ff",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(1.5)",
  },
  catchPhraseStyle: {
    fontSize: 14,
    marginBottom: -10,
  },

  expand: {
    transform: "rotate(0deg)",
    margin: "auto",
    color: "#80d8ff",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  phoneEmailStyle: {
    margin: 12,
    fontSize: 14,
  },
  companyNameStyle: {
    marginTop: 17,
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
  const bull = <span className={classes.bullet}>_______________________</span>;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.catchPhraseStyle} gutterBottom>
          {company.catchPhrase}
        </Typography>
        <Typography>{bull}</Typography>
        <Typography
          className={classes.companyNameStyle}
          variant="h4"
          component="h2"
        >
          {company.name}
        </Typography>
        <Typography>{bull}</Typography>
        <Typography className={classes.phoneEmailStyle}>
          {data.phone} {"/"} {data.email}
        </Typography>
        <Typography variant="h6" component="p">
          {data.name}
        </Typography>
        <Typography variant="body2" component="p">
          {data.website}
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
