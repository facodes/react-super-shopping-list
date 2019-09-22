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

const  DashBoardWrapper = styled.div`
	width:99%;
	min-height: 63rem;
	margin: 4.7rem auto 0 auto;
	background: var(--color-dark);
	border-radius: 32px;
	color:var(--color-light);
	padding-bottom: 3rem;
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

const ItemCount = styled.span`
	font-size:1.8rem;
	color:var(--color-primary);
	p{
		color: var(--color-grey);
		span{
			margin-left: 10px;
			color: var(--color-light);
		}
	}
`

const getListTotal = (shoppingList) => {
	return shoppingList.items.reduce((acc, item) => {
		if (!item.price)
			return acc;
		return acc + (item.price * item.quantity);
	}, 0)
}

const round = (number, decimals) => {
  return +(Math.round(number + "e+" + decimals) + "e-" + decimals);
}


export class DashBoard extends Component {
  render() {
    const { shoppingLists } = this.props.user;
    const { 
      isShoppingListSelected, 
      shoppingListSelected,
      isLoading
    } = this.props.control;

    return (
      <DashBoardWrapper>
        { !isShoppingListSelected ? 
          <>
            <DashBoardHeader>
              <Heading  fontSize={2.4}>
                Shopping Lists
              </Heading>  
            </DashBoardHeader>
            <DashBoardPanel>
             <ListCount>You have <span>{shoppingLists.length}</span> lists</ListCount>
             <ModalShoppingList/> 
            </DashBoardPanel>
            <ShoppingList
              isLoading = {isLoading}
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
              <ItemCount>
              	{
              		shoppingListSelected.items.length !== 1 ? 
              			(`${shoppingListSelected.items.length} items`) 
              		: (`${shoppingListSelected.items.length} item`)
              	}

              	<p>list total: 
              		<span>
              			{round(getListTotal(shoppingListSelected),2)}$
              		</span>
              	</p>
              </ItemCount>
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
    async onRemoveShoppingList(id) {
      await dispatch(removeShoppingList(id));
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
