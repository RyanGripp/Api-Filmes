import { useEffect, useState } from 'react';
import api from '../../services/api.js';
import { useParams, useNavigate } from 'react-router-dom';
import './filme.css';
import formatarData from '../../functions/formatar-data.js';
import { toast } from 'react-toastify';

function Filme(){
    const { id } = useParams();
    const navigation = useNavigate();
    const [filme, setFilme] = useState({});
    const [scrollPosition, setScrollPosition] = useState(0);
    const [loading, setLoading] = useState(true);
    const [favoritado, setFavoritado] = useState();    

    useEffect(()=>{

        window.addEventListener('scroll', handleScroll);

        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "50835d71c65f2a655ed8f627d799ffbb",
                    language: "pt-BR",
                    page: 1
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
                console.log(response.data);

                const favoritos = localStorage.getItem("favoritos");
                const filmesSalvos = JSON.parse(favoritos) || [];
                const filmeFavorito = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === response.data.id);
                setFavoritado(filmeFavorito);
            })
            .catch(()=>{
                console.log("filme nao encontrado");
                navigation("/", { replace: true });
                return;
            })
        }
        loadFilme();
        
        return() => {
            window.removeEventListener('scroll', handleScroll);
            console.log('componente foi desmontado');
        }
    }, [navigation, id])

    const handleScroll = () => {
        setScrollPosition(window.scrollY);
    };

    const Generos = ({ generos }) => {
        return (
          <p className="info-label generos">
            {generos.map((genero, index) => (
              <span key={index}>{genero.name}</span>
            ))}
          </p>
        );
    };

    function salvarFilme() {
        const favoritos = localStorage.getItem("favoritos");
        let filmesSalvos = JSON.parse(favoritos) || [];
    
        filmesSalvos.push(filme);
        localStorage.setItem("favoritos", JSON.stringify(filmesSalvos));
        setFavoritado(true);

        toast.success("Filme adicionado aos Favoritos");
    }    

    const Favoritos = ({ favoritado }) => {
        if (favoritado) {
            return (
                <button className='salvo'><span></span>Salvo</button>
            );
        } else {
            return (
                <button onClick={salvarFilme} className='salvar'><span></span>Adicionar aos Favoritos</button>
            );
        }
    };
    

    if(loading){
        return(
            <div className="loading">
                <h1>Carregando...</h1>
            </div>
        )
    }

    return(
        <div className="filme-details">
            <div className="background-image" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${filme.backdrop_path})`,
                transform: `translateY(${scrollPosition * 0.3}px)`,}}>
            </div>
            <div className='apresentacao'>
                <h1>{filme.title}</h1>
            </div>
            <div className='main'>
                <img src={`https://image.tmdb.org/t/p/original${filme.poster_path}`} alt="Imagem do Filme" />
                <div className='description'>
                    <div className="info-label sinopse">
                        <h2>Sinopse:</h2>
                        <p>{filme.overview}</p>
                    </div>
                    <div className="info-label genero">
                        <h2>Gêneros:</h2>
                        <Generos generos={filme.genres} />
                    </div>
                    <p className="avaliacao">Avaliação<br/>{filme.vote_average.toFixed(1).replace('.', ',')} / 10</p>
                    <div className='buttons'>
                        <Favoritos favoritado={favoritado} />
                        <a target='blank' rel='external' href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}>Assistir Trailer</a>
                    </div>
                    <p className='info-label'>Data de Lançamento: {formatarData(filme.release_date)}</p>
                </div>
                {/* <h2>{filme.tagline}</h2> */}
            </div>
        </div>
    )
}

export default Filme;