import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "./utils/axiosWithAuth";
import axios from 'axios'
import JokesList from "./JokesList";


const JokesPage = ({jokes}) => {
  const [jokesList, setJokesList] = useState([]);
  // fetch your data from the server when the component mounts


  return (
    <>
      
      <JokesList jokes={JokesList} updateJokes={setJokesList} />
   

    </>
  );
};

export default JokesPage;
