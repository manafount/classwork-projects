import React from 'react';
import { Link } from 'react-router';

class PokemonDetail extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.requestPokemon(this.props.params.pokemonId);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.params.pokemonId !== newProps.params.pokemonId) {
      this.props.requestPokemon(newProps.params.pokemonId);
    }
  }

  render() {
    let { pokemonDetail } = this.props;

    const renderItems = () => {
      if (pokemonDetail.items !== undefined) {
        return pokemonDetail.items.map((item, idx) => (
          <li key={"item" + idx}>
            <Link to={`/pokemon/${pokemonDetail.id}/item/${idx}`}>
              <img className="item-image" src={item.image_url}/>
            </Link>
          </li>
        ));
      }
    };
    return (
      <section className="pokemon-details">
        <figure className={`pokemon-figure-${pokemonDetail.poke_type}`}>
          <img src={pokemonDetail.image_url}/>
        </figure>
        <ul>
          <li>
            <h2>{pokemonDetail.name}</h2>
          </li>
          <li>type: {pokemonDetail.poke_type}</li>
          <li>attack: {pokemonDetail.attack}</li>
          <li>defense: {pokemonDetail.defense}</li>
          <li>moves: {pokemonDetail.moves}</li>
        </ul>
        <article className="pokemon-items">
          <h3>Items</h3>
          <ul>
            {renderItems()}
          </ul>
          {this.props.children}
        </article>
      </section>
    );
  }
}

export default PokemonDetail;
