import React, { useState } from "react";
import { axiosWithAuth } from "./utils/axiosWithAuth";

const initialJoke = {
  joke: "",
  status: "",
};

const JokesList = ({ jokes }) => {
  // console.log(jokes);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(true);
  const [jokeToEdit, setJokeToEdit] = useState(initialJoke);
  const [jokeToAdd, setJokeToAdd] = useState(initialJoke);

 /*  const logout = () => {
   

    console.log("logout")
     */
    /*   // logout joke 
      axiosWithAuth()    
        .put(`/api/jokes/logout}`)
         .then(res => {
          setJokeToEdit(jokeToEdit);
         
          
        }) 
        .catch(err => {
          console.log(err);
        });
    } */

    /*   const editJoke = joke => {
        setEditing(true);
        setJokeToEdit(joke);
        
      }; */


    /*   const saveEdit = (e, joke) => {
        e.preventDefault();
        // Make a put request to save your updated joke
        // think about where will you get the id from...
        // where is is saved right now?
        console.log("saveEdit")
        
        // edit joke 
        axiosWithAuth()    
          .put(`/api/jokes/${jokeToEdit.id}`, jokeToEdit)
          .then(res => {
            setJokeToEdit(jokeToEdit);
           editJoke(jokeToEdit)
            
          })
          .catch(err => {
            console.log(err);
          });
      }; */

    /*   const deleteJoke = joke => {
        // make a delete request to delete this joke
        axiosWithAuth()
        .delete(`/api/jokes/${joke.joke}`)
        .then(res => {
          console.log(res);
          setEditing(false)
          setJokeToEdit({})
    
        })
        .catch(err => {
          console.log(err);
        });
      }; */
    /* 
      const addJoke = (e,joke) => {
      e.preventDefault()
       
        axiosWithAuth()
        .post(`/auth/register/`, jokeToAdd)
        .then(res => {
          console.log(res);
          setJokeToAdd(jokeToAdd);
    
        })
        .catch(err => {
          console.log(err);
        });
      }; */


    return (
      <div className="jokes-wrap">
        <p>jokes</p>

        {console.log(jokes)}
        <ul>
          {
          
            jokes.map((joke) => (
              <li key={joke.id}>
                <span>
                  {" "}
                  {joke.joke}
                 
                  
                </span>
              </li>
            ))}
        </ul>
       
            <div className="button-row">
              <button type="submit">save</button>
              <button onClick={() => setEditing(false)}>cancel</button>
            </div>
       
        )}
        <button
          onClick={(props) => {
            localStorage.removeItem("token");
            window.location.replace("/jokes");
          }
          }
        >
          LOG OUT
      </button>
        <div className="spacer" />
      </div>
    );
}






export default JokesList;
