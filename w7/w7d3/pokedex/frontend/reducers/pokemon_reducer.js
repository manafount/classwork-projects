import { RECEIVE_ALL_POKEMON, RECEIVE_NEW_POKEMON } from '../actions/pokemon_actions';
import merge from 'lodash/merge';

const pokemonReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case RECEIVE_ALL_POKEMON:
      return merge(newState, action.pokemon);
    case RECEIVE_NEW_POKEMON:
      const newPokemonState = {pokemon: action.pokemon.id};
      newPokemonState[action.pokemon.id] = action.pokemon;
      return merge(newState, newPokemonState);
    default:
      return state;
  }
};

export default pokemonReducer;
