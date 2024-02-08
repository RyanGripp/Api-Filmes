import { useEffect, useState } from 'react';
import api from '../../services/api.js';
import { Link } from 'react-router-dom';
import './home.css';

function Home(){
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params:{
                    api_key: "50835d71c65f2a655ed8f627d799ffbb",
                    language: "pt-BR",
                    page: 1
                }
            })
            //console.log(response.data.results.slice(0,10));
            setFilmes(response.data.results.slice(0,20));
        }
        setLoading(false);
        loadFilmes();
    }, [])

    if(loading){
        return(
            <div className="loading">
                <h2>Carregando Filmes...</h2>
            </div>
        );
    }

    return(
        <div className="lista-filmes">
            {filmes.map((filme) => {
                return (
                    <Link to={`filme/${filme.id}`} className="filme-card" key={filme.id}>
                      <img src={`https://image.tmdb.org/t/p/original${filme.poster_path}`} alt={filme.title} />
                      <h3>{filme.title}</h3>
                      <p>{filme.overview}</p>
                    </Link>
                  );
                  
            })}
        </div>
    )
}

export default Home;