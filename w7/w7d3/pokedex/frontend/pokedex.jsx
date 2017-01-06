import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import { requestAllPokemon } from './actions/pokemon_actions';

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  window.store = store;
  window.requestAllPokemon = requestAllPokemon;
  
  const rootEl = document.getElementById('root');
  render(<Root store={store}/>, rootEl);
});
