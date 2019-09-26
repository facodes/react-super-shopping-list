import React  from 'react';
import styled from 'styled-components';

// Components
import ModalShoppingList from '../containers/ModalShoppingList';
import ModalItem from '../containers/ModalItem';
import ShoppingList from './ShoppingList';
import ItemList from './ItemList';
import Heading from './Heading';
import { IconButton } from './Buttons';

const  DashBoardWrapper = styled.div`
	width:99%;
	min-height: 63rem;
	margin: 4.7rem auto 0 auto;
	background: var(--color-dark);
	border-radius: 32px;
	color:var(--color-light);
	padding-bottom: 3rem;
	max-width: 375px;
	overflow: hidden;
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


const MobileDashBoard = (props) => {
	return (
		<DashBoardWrapper>
		  { !props.isShoppingListSelected ? 
		    <>
		      <DashBoardHeader>
		        <Heading  fontSize={2.4}>
		          Shopping Lists
		        </Heading>  
		      </DashBoardHeader>
		      <DashBoardPanel>
		       <ListCount>You have <span>{props.shoppingLists.length}</span> lists</ListCount>
		       <ModalShoppingList/> 
		      </DashBoardPanel>
		      <ShoppingList
		        isLoading = {props.isLoading}
		        isShoppingListSelected = {props.isShoppingListSelected}
		        shoppingLists={props.shoppingLists}
		        onRemoveShoppingList={props.onRemoveShoppingList}
		        onSelectShoppingList={props.onSelectShoppingList}
		      />
		    </>
		    :
		    <>
		      <DashBoardHeader>
		        <IconButton 
		          icon="chevron-left"
		          onClick={() => props.onSelectShoppingList(null)}
		        />
		        <Heading  fontSize={2.4} style={{marginLeft:'2rem'}}>
		          { props.shoppingListSelected.name }
		        </Heading>
		      </DashBoardHeader>
		      <DashBoardPanel>
		        <ItemCount>
		        	{
		        		props.shoppingListSelected.items.length !== 1 ? 
		        			(`${props.shoppingListSelected.items.length} items`) 
		        		: (`${props.shoppingListSelected.items.length} item`)
		        	}

		        	<p>list total: 
		        		<span>
		        			{round(getListTotal(props.shoppingListSelected),2)}$
		        		</span>
		        	</p>
		        </ItemCount>
		        <ModalItem shoppingList={props.shoppingListSelected}/>
		      </DashBoardPanel>
		      <ItemList
		        isShoppingListSelected = {props.isShoppingListSelected}
		        shoppingList={props.shoppingListSelected}
		        onRemoveItem={props.onRemoveItem}
		        onToggleTodoDone={props.onToggleTodoDone}
		      />
		    </>
		  }
		</DashBoardWrapper>
	)
}

export default MobileDashBoard;