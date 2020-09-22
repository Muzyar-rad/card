import React, { useState, useEffect } from "react";

const Card = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const getResults = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users/1", {
        method: "GET",
      });
      const response = await res.json();
      setData(response);
    };
    getResults();
  }, []);
  return <div>{console.log(data)}</div>;
};

export default Card;
