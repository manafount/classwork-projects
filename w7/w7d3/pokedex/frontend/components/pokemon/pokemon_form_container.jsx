import { connect } from 'react-redux';
import PokemonForm from './pokemon_form';
import { createNewPokemon } from '../../actions/pokemon_actions';


const mapDispatchToProps = dispatch => ({
  createNewPokemon: (newPokemon) => dispatch(createNewPokemon(newPokemon))
});

export default connect(
  null,
  mapDispatchToProps
)(PokemonForm);
