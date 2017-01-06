import React from 'react';
import PokemonIndexItem from './pokemon_index_item';


export default class PokemonIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestAllPokemon();
  }

  render() {
    let {pokemon} = this.props;
    const pokemonIndexItems = pokemon.map(poke => (
      <PokemonIndexItem key={`pokemon-${poke.id}`} pokemon={poke} />
    ));

    return(
      <section className="pokemon-index">
        <ul className="pokemon-list">
          {pokemonIndexItems}
        </ul>
        {this.props.children}
      </section>
    );
  }
}
