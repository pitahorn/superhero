import axios from "axios";

const domain = process.env.REACT_APP_API_BASE_URL;

const client = axios.create({
  baseURL: domain,
});

const superheroApi = {
  getSuperheroes() {
    return client.get("/teams/");
  },
};

export default superheroApi;