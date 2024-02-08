import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './favoritos.css';
import { toast } from 'react-toastify';

function Favoritos() {
    const [filmes, setFilmes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedFilme, setSelectedFilme] = useState(null);

    useEffect(() => {
        const minhaLista = localStorage.getItem("favoritos");
        setFilmes(JSON.parse(minhaLista) || []);
    }, []);

    function removerFilme(id) {
        const filmeToRemove = filmes.find(item => item.id === id);
        setSelectedFilme(filmeToRemove);
        setModalOpen(true);
    }

    function handleConfirmRemoval() {
        const filtroFilme = filmes.filter(item => item.id !== selectedFilme.id);
        setFilmes(filtroFilme);
        localStorage.setItem('favoritos', JSON.stringify(filtroFilme));
        setModalOpen(false);
        toast.success("Filme Removido com Sucesso!");
    }

    function handleCloseModal() {
        setModalOpen(false);
    }

    function Modal({ filme, onClose, onConfirm }) {
        return (
            <div className="modal-overlay">
                <div className="modal">
                    <img src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} alt="Imagem do Filme" />
                    <div className='conteudo'>
                        <h3>Tem certeza que deseja remover o filme "{filme.title}" dos favoritos?</h3>
                        <div className="opcoes">
                            <button onClick={onConfirm} className='sim'>Sim</button>
                            <button onClick={onClose} className='nao'>Não</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='favoritos'>
            <h1>Favoritos</h1>
            {filmes.length === 0 && <p>Não há filmes nos favoritos.</p>}
            <ul>
                {filmes && filmes.map((item) => (
                    <li key={item.id}>
                        <img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} alt="Imagem do Filme" />
                        <div className='conteudo'>
                            <h3>{item.title}</h3>
                            <div className='opcoes'>
                                <Link to={`/filme/${item.id}`} className='btn-detalhes'>Ver Detalhes</Link>
                                <button onClick={() => removerFilme(item.id)}>Remover</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {modalOpen && (
                <Modal filme={selectedFilme} onClose={handleCloseModal} onConfirm={handleConfirmRemoval} />
            )}
        </div>
    );
}

export default Favoritos;