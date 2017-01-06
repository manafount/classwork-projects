import _ from 'lodash';

export const selectAllPokemon = (pokemon) => {
  return _.values(pokemon);
};

export const selectPokemonItem = (state, itemId) => {
  return state.pokemonDetail.items[itemId];
};
