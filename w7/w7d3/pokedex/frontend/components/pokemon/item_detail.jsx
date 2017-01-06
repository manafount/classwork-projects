import React from 'react';

const ItemDetail = ({itemDetail}) => {
  return (
    <ul>
      <li>{itemDetail.name}</li>
      <li>happiness: {itemDetail.happiness}</li>
      <li>price: {itemDetail.price}</li>
    </ul>
  );
};

export default ItemDetail;
