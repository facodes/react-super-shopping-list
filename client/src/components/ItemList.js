import React , { useState } from 'react'

import { SlideRightAnimation } from '../utils/animations';

// components
import Item from './Item';


const ItemList = ({ shoppingList, onRemoveItem, onToggleTodoDone, isShoppingListSelected}) => {

	const [itemOpenId, setItemOpenId] = useState(null);

	function openOptionsForItem (id){
		setItemOpenId(id);
	}

  const { items } = shoppingList ;
  return (
    <SlideRightAnimation>
      {
       items.map((item) => {
          return (
            <Item
              key={item._id}
              item={item}
              isOptionsOpen = {itemOpenId === item._id ? true : false }
              openOptionsForItem={openOptionsForItem}
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
