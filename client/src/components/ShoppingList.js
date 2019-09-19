import React  from 'react';

import { SlideRightAnimation } from '../utils/animations';

// Components
import ShoppingListItem from './ShoppingListItem';


const ShoppingList = ({ shoppingLists , onSelectShoppingList, onRemoveShoppingList , isShoppingListSelected}) => {
  return (
    <SlideRightAnimation isShoppingListSelected={isShoppingListSelected}> 
      {
        shoppingLists.map((shoppingList) => { 
          return(
            <ShoppingListItem
              key={shoppingList._id} 
              shoppingList={shoppingList}
              onSelectShoppingList={onSelectShoppingList}
              onRemoveShoppingList={onRemoveShoppingList}
            />
          )}
        )
      }
    </SlideRightAnimation>
  )
}

export default ShoppingList
