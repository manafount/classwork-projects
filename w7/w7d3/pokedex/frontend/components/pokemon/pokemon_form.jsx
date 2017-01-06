import React from 'react';
import { merge } from 'lodash';

class PokemonForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      image_url: "",
      poke_type: "",
      attack: "",
      defense: "",
      move_1: "",
      move_2: ""
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let moves = [this.state.move_1, this.state.move_2];
    let tempState = merge({}, this.state);
    delete tempState.move_1;
    delete tempState.move_2;
    tempState.moves = moves;

    this.props.createNewPokemon({pokemon: tempState});
  }

  handleInput(property) {
    return e => this.setState({[property]: e.target.value});
  }

  render() {
    return(
      <section className="pokemon-details">
        <form className="pokemon-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={this.state.name}
          onChange={this.handleInput('name')}
          required />
        <input
          type="text"
          placeholder="Image URL"
          value={this.state.image_url}
          onChange={this.handleInput('image_url')}
          required />
        <select onChange={this.handleInput('poke_type')} defaultValue="Select Pokemon Type">
          <option key={1} value="bug">bug</option>
          <option key={2} value="dragon">dragon</option>
          <option key={3} value="electric">electric</option>
          <option key={4} value="fighting">fighting</option>
          <option key={5} value="fire">fire</option>
          <option key={6} value="flying">flying</option>
          <option key={7} value="ghost">ghost</option>
          <option key={8} value="grass">grass</option>
          <option key={9} value="ground">ground</option>
          <option key={10} value="ice">ice</option>
          <option key={11} value="normal">normal</option>
          <option key={12} value="poison">poison</option>
          <option key={13} value="psychic">psychic</option>
          <option key={14} value="rock">rock</option>
          <option key={15} value="steel">steel</option>
          <option key={16} value="water">water</option>
        </select>
        <input
          type="number"
          placeholder="Attack"
          value={this.state.attack}
          onChange={this.handleInput('attack')}
          required/>
        <input
          type="number"
          placeholder="Defense"
          value={this.state.defense}
          onChange={this.handleInput('defense')}
          required/>
        <input
          type="text"
          placeholder="Move 1"
          value={this.state.move_1}
          onChange={this.handleInput('move_1')}
          required/>
        <input
          type="text"
          placeholder="Move 2"
          value={this.state.move_2}
          onChange={this.handleInput('move_2')}
          required/>
        <button type="submit">Create!</button>
      </form>
      </section>
    );
  }
}

export default PokemonForm;
