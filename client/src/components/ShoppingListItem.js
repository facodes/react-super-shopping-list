import React , { useState } from 'react';
import styled from 'styled-components';

// Components
import { Button, IconButton} from  './Buttons';

const Wrapper = styled.div`
	position:relative;
	overflow:hidden;
	padding: 2rem 3rem; 
	/* height: 12.5rem; */
	display:flex;
	align-items: flex-start;
	&:not(:last-child){
		border-bottom: 2px solid var(--color-black-lg);
	}	
`

const ItemWrapper =  styled.div`
	width:100%;
`

const ItemName = styled.p`
	display: block;
	font-size: 2.4rem;
	font-weight: var(--bold);
	text-transform:capitalize;
	display:flex;
	align-items:center;
	justify-content: space-between;
`
const ListProgress = styled.div`
	 display:flex;
`
const ItemCount = styled.span`
	font-size:1.8rem;
	color:var(--color-primary);

`
const ItemBar = styled.div`
	
`

const Budget = styled.span`
	font-size: 1.8rem;
	color: var(--color-grey);
	
	span {
		color: var(--color-accent);
	}
`
const OptionsWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: var(--color-primary);
	transition: all .3s ease-in-out;
	opacity: ${props => props.open ? 1 : 0 };
	transform: ${props => props.open ? `translateY(0)` : `translateY(-100%)` };
	display:flex;
	justify-content: center;
	align-items: center;
`
const OptionsButton = styled.div `
	z-index:1;
	margin-right: .5rem;
`
const ShoppingListItem = ({onSelectShoppingList, shoppingList, onRemoveShoppingList}) => {

	const itemsCount = shoppingList.items.length;
	const [isOptionsOpen, setIsOptionsOpen] = useState(false);


	// const update ;

  return (
   	<Wrapper >
      <ItemWrapper onClick={() => onSelectShoppingList(shoppingList)}>
        <ItemName >{shoppingList.name}</ItemName>
        <ListProgress>
					<ItemCount>
						{ 
							itemsCount !== 1 ? (`${itemsCount} items`) : (`${itemsCount} item`) 
						} 
					</ItemCount>
        </ListProgress>
        <Budget>
					budget: 
					<span>{
						shoppingList.budget ? ` ${shoppingList.budget}$` : ' not assigned'
					}
					</span>
				</Budget>
      </ItemWrapper>
			<OptionsWrapper open={isOptionsOpen}>
				<Button  
					color="primary" 
					size="sm"
					onClick={() => onRemoveShoppingList(shoppingList._id)}
				>
					Delete
				</Button>
				<Button  
					color="dark" 
					size="sm"
				>
					edit
				</Button>
			</OptionsWrapper>
      <OptionsButton 
      	onClick={() => setIsOptionsOpen(!isOptionsOpen)}
      >
      	{
					isOptionsOpen ?
					<IconButton 
						icon="times"
					/>
					:<IconButton icon="bars"/>
				}
			</OptionsButton>
    </Wrapper>
  )
}

export default ShoppingListItem;