import React  from 'react'

import { SlideRightAnimation } from '../utils/animations';

// components
import Item from './Item';


const ItemList = ({ shoppingList, onRemoveItem, onToggleTodoDone, isShoppingListSelected}) => {
  const { items } = shoppingList ;
  return (
    <SlideRightAnimation isShoppingListSelected={isShoppingListSelected}>
      {
       items.map((item, index) => {
          return (
            <Item
              key={index}
              item={item}
              onRemoveItem={onRemoveItem}
              onToggleTodoDone = {onToggleTodoDone}
            />   
          )
        })
      }
    </SlideRightAnimation>
  )
}

export default ItemList
