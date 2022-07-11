import axios from "axios";

const domain = process.env.REACT_APP_API_BASE_URL;

const client = axios.create({
  baseURL: domain,
});

const superheroApi = {
  getSuperhero(superheroId: Number) {
    return client.get(`/${superheroId}`);
  },
};

export default superheroApi;