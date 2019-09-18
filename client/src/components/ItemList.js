import React  from 'react'
import styled from 'styled-components';

// components
import Item from './Item';

const ListWrapper = styled.div`
  transform: ${({isShoppingListSelected}) => !isShoppingListSelected ? 
    `translateX(100%)` : `translateX(0)`  
  };
  transition: transform 0.3s 1s ease-in-out;
`

const ItemList = ({ shoppingList, onRemoveItem, onToggleTodoDone, isShoppingListSelected}) => {
  const { items } = shoppingList ;
  return (
    <ListWrapper isShoppingListSelected={isShoppingListSelected}>
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
    </ListWrapper>
  )
}

export default ItemList
