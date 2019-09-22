import React, { useState } from 'react';

import { SlideRightAnimation } from '../utils/animations';

// Components
import ShoppingListItem from './ShoppingListItem';

const ShoppingList = ({ shoppingLists , ...props}) => {

	const [listOpenId, setListOpenId] = useState(null);

	function openOptionsForList (id){
		setListOpenId(id);
	}

  return (
    <SlideRightAnimation> 
      {
        shoppingLists.map((shoppingList) => { 
          return(
            <ShoppingListItem
              key={shoppingList._id}
              isOptionsOpen = { listOpenId === shoppingList._id ? true : false }
              openOptionsForList={openOptionsForList}
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
