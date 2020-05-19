import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "./utils/axiosWithAuth";
import JokesList from "./JokesList";


const JokesPage = (props) => {
  const [usersList, setJokesList] = useState([]);
  // fetch your data from the server when the component mounts

  useEffect(() => {
    // make a GET request to fetch the users data 
    axiosWithAuth()
      .get("/api/jokes")
      .then(res => {
        // set that data to the usersList state property
        setJokesList(res.data);
        console.log(res);

      })
      .catch(err => {
        console.log(err);
      });
  });
 

  return (
    <>
      
      <JokesList users={usersList} updateJokes={setJokesList} />
   

    </>
  );
};

export default JokesPage;
