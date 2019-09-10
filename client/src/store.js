import uuid from 'uuid';

const ADD_NEW_ITEM = 'ADD_NEW_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM'; 

const initialState = {
  items:[
    {id: uuid(), name: 'Milk'},
    {id: uuid(), name: 'Eggs'},
    {id: uuid(), name: 'Steak'},
    {id: uuid(), name: 'Orange Juice'},
    {id: uuid(), name: 'Apple Juice'},
    {id: uuid(), name: 'Jam'},
  ]
}

export const actions = {
  addNewItem(){
    const newItem = {
      id:uuid(), 
      name: prompt('Enter An Item')
    }
    if(newItem.name)
      return{
         type:ADD_NEW_ITEM,
         newItem
      }
    else
      return{
        type: 'default'
      }
  },
  removeItem(id){
    return{
      type:REMOVE_ITEM,
      id
    }
  }
}

export function reducer (state = initialState, action){
  switch (action.type) {
    case ADD_NEW_ITEM:{
      return{
        ...state,
        items: [...state.items, action.newItem]
      } 
    }
    case REMOVE_ITEM:{
      return{
        ...state,
        items: state.items.filter(item => item.id !== action.id)
      }
    }
      
  
    default: 
      return state;
  }

}