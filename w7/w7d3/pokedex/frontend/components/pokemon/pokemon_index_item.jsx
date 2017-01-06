import React from 'react';
import { Link } from 'react-router';

class PokemonIndexItem extends React.Component {
  constructor() {
    super();
  }
  render() {
    let { pokemon } = this.props;
    return (
      <li>
        <Link to={`/pokemon/${pokemon.id}`}>
          <span>{pokemon.id}</span>
          <img className="pokemon-image" src={pokemon.image_url}/>
          <span>{pokemon.name}</span>
        </Link>
      </li>
    );
  }
}

export default PokemonIndexItem;
