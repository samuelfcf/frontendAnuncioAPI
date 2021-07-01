import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>Gerenciador de Anúncios</h1>
      <hr />
      <div className="links">
        <Link to="/" className="link" activeClassName="active" exact>
          Listar Anúncios
        </Link>
        <Link to="/add" className="link" activeClassName="active">
          Cadastrar Anúncio
        </Link>
      </div>
    </header>
  );
};

export default Header;