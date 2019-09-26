import React, { useState,  useEffect } from 'react';
import { connect } from 'react-redux';


// Components
import MobileDashBoard from '../components/MobileDashBoard';
import DesktopDashBoard from '../components/DesktopDashBoard';

// Actions
import { removeShoppingList } from '../actions/shoppingList';
import { selectShoppingList } from '../actions/control';
import { removeItem, toggleTodoDone } from '../actions/items';

const DashBoard = (props) => {

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener(`resize`, handleResize)
    return () => { window.removeEventListener(`resize`, handleResize) }
  }, []);

  const { shoppingLists, name } = props.user;
  const { 
    isShoppingListSelected, 
    shoppingListSelected,
    isLoading
  } = props.control;



  return (
    <>
      { width < 900 ? 
        (<MobileDashBoard
          isShoppingListSelected={isShoppingListSelected}
          shoppingListSelected={shoppingListSelected}
          isLoading={isLoading}
          shoppingLists={shoppingLists}
          onRemoveShoppingList={props.onRemoveShoppingList}
          onSelectShoppingList={props.onSelectShoppingList}
          onRemoveItem={props.onRemoveItem}
          onToggleTodoDone={props.onToggleTodoDone}
        />) : (
        <DesktopDashBoard
        	username = { name }
          isShoppingListSelected={isShoppingListSelected}
          shoppingListSelected={shoppingListSelected}
          isLoading={isLoading}
          shoppingLists={shoppingLists}
          onRemoveShoppingList={props.onRemoveShoppingList}
          onSelectShoppingList={props.onSelectShoppingList}
          onRemoveItem={props.onRemoveItem}
          onToggleTodoDone={props.onToggleTodoDone}
        />)

      }
    </>    
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
    control: state.control
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSelectShoppingList(shoppingList) {
      dispatch(selectShoppingList(shoppingList));
    },
    async onRemoveShoppingList(id) {
      await dispatch(removeShoppingList(id));
    },
    async onRemoveItem(id) {
      await dispatch(removeItem(id));
    },
    onToggleTodoDone(id) {
      dispatch(toggleTodoDone(id));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoard);
