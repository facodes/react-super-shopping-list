import React  from 'react';

import { SlideRightAnimation } from '../utils/animations';

// Components
import ShoppingListItem from './ShoppingListItem';


const ShoppingList = ({ shoppingLists , ...props}) => {
  return (
    <SlideRightAnimation isShoppingListSelected={props.isShoppingListSelected}> 
      {
        shoppingLists.map((shoppingList) => { 
          return(
            <ShoppingListItem
              key={shoppingList._id} 
              shoppingList={shoppingList}
              {...props}
            />
          )}
        )
      }
    </SlideRightAnimation>
  )
}

export default ShoppingList
