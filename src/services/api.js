import axios from "axios";

//Base url: https://api.themoviedb.org/3/
//https://api.themoviedb.org/3/movie/now_playing?api_key=50835d71c65f2a655ed8f627d799ffbb&language=pt-BR
//chave: 50835d71c65f2a655ed8f627d799ffbb

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;