import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3006/api/v1', // Backend URL
});

export default API;
