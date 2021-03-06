import { connect } from 'react-redux';
import ItemDetail from './item_detail';
import { selectPokemonItem } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => ({
  itemDetail: selectPokemonItem(state, ownProps.params.itemId)
});

export default connect(
  mapStateToProps
)(ItemDetail);
