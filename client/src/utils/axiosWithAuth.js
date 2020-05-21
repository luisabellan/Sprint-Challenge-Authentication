import axios from "axios";
import dotenv from 'dotenv'


export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: `http://localhost:${process.env.PORT}/`,
    headers: {
      Authorization: token
    }
  });
};
