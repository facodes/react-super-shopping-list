import React  from 'react';
import styled from 'styled-components';

// Components
import ShoppingListItem from './ShoppingListItem';

const ListWrapper = styled.div`
  transform: ${({isShoppingListSelected}) => isShoppingListSelected ? 
    `translateX(100%)` : `translateX(0)`  
  };
  transition: transform 0.3s ease-in-out;
`
const ShoppingList = (
  { shoppingLists , onSelectShoppingList, onRemoveShoppingList , isShoppingListSelected}) => {
  return (
    <ListWrapper isShoppingListSelected={isShoppingListSelected}> 
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
    </ListWrapper>
  )
}

export default ShoppingList
