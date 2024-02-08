import './header.css';
import { Link } from 'react-router-dom';

function Header(){
    return(
        <header>
            <Link className='home' to='/'>Home</Link>
            <Link className='btn-favoritos' to='/favoritos'>Favoritos</Link>
        </header>
    )
}

export default Header;