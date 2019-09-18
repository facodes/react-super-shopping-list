import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// Components
import ModalShoppingList from './ModalShoppingList';
import ModalItem from './ModalItem';
import ShoppingList from '../components/ShoppingList';
import ItemList from '../components/ItemList';
import Heading from '../components/Heading';
import { IconButton } from '../components/Buttons';

// Actions
import { removeShoppingList } from '../actions/shoppingList';
import { selectShoppingList } from '../actions/control';
import { removeItem, toggleTodoDone } from '../actions/items';


/* 
  OFFLINE DATA
*/
import { data } from '../API';

const  DashBoardWrapper = styled.div`
	width:99%;
	min-height: 63rem;
	margin:0 auto;
	background: var(--color-dark);
	border-radius: 32px;
	color:var(--color-light);
	margin-top: 4.7rem;
`

const DashBoardHeader = styled.div`
	padding: 3.5em 3rem 3.125em 3rem;
  height: 8.5rem;
  display: flex;
  align-items: center;
`

const DashBoardPanel = styled.div`
	background: var(--color-black-lg);
	padding: 3.125em 3rem;
  height: 10rem;
	display:flex;
	justify-content: space-between;
	align-items:center;
`
const ListCount = styled.span`
	font-size: 2.4rem;
	color: var(--color-grey);
	span{
		color: var(--color-primary);	
	}	
`


export class DashBoard extends Component {
  render() {
    const { shopping_lists : shoppingLists } = this.props.user;
    const { 
      isShoppingListSelected, 
      shoppingListSelected 
    } = this.props.control;
    return (
      <DashBoardWrapper>
        { !isShoppingListSelected ? 
          <>
            <DashBoardHeader>
              <Heading  fontSize={2.4}>
                Your Shopping Lists
              </Heading>  
            </DashBoardHeader>
            <DashBoardPanel>
             <ListCount>You have <span>{shoppingLists.length}</span> lists</ListCount>
             <ModalShoppingList/> 
            </DashBoardPanel>
            <ShoppingList
              isShoppingListSelected = {isShoppingListSelected}
              shoppingLists={shoppingLists}
              onRemoveShoppingList={this.props.onRemoveShoppingList}
              onSelectShoppingList={this.props.onSelectShoppingList}
            />
          </>
          :
          <>
            <DashBoardHeader>
              <IconButton 
                icon="chevron-left"
                onClick={this.props.onSelectShoppingList.bind(this,null)}
              />
              <Heading  fontSize={2.4} style={{marginLeft:'2rem'}}>
                { shoppingListSelected.name }
              </Heading>
            </DashBoardHeader>
            <DashBoardPanel>
              <h1>Something goes here</h1>
              <ModalItem shoppingList={shoppingListSelected}/>
            </DashBoardPanel>
            <ItemList
              isShoppingListSelected = {isShoppingListSelected}
              shoppingList={shoppingListSelected}
              onRemoveItem={this.props.onRemoveItem}
              onToggleTodoDone={this.props.onToggleTodoDone}
            />
          </>
        }
      </DashBoardWrapper>
    );
  }
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
    onRemoveShoppingList(id) {
      dispatch(removeShoppingList(id));
    },
    onRemoveItem(id) {
      dispatch(removeItem(id));
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
