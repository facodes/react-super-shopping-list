import React, { useState } from 'react';
import styled from 'styled-components';

// Components
import ModalShoppingList from '../containers/ModalShoppingList';
import ModalItem from '../containers/ModalItem';
import ShoppingList from './ShoppingList';
import ItemList from './ItemList';
import Heading from './Heading';
import { IconButton } from './Buttons';

const Wrapper = styled.div`
  display: flex;
  max-width: 936px;
  margin: 0 auto;
  width: 100%;
  height: 600px;

  color: var(--color-light);
  background: var(--color-dark);
  border-radius: 32px;
`;

const LeftSideWrapper = styled.aside`
  flex-basis: 500px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 6px;
    background: linear-gradient(
      to bottom,
      var(--color-primary),
      var(--color-secondary)
    );
    right: -10px;
  }
`;

const LeftSideHeader = styled.div`
  border-top-left-radius: 32px;
  background: var(--color-black-lg);
  padding: 3em 3em;
  height: 115px;
`;
const ShoppingListHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftSideBody = styled.div`
  border-bottom-left-radius: 32px;
  background: var(--color-dark);
  height: 485px;
  padding: 0 3em 2.5em 3em;
  overflow-y: scroll;

  /* width */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
    margin-right: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgba(239, 241, 243, 0.5);
    border-radius: 4px;
    max-height: 70px;
  }
`;
const RightSideWrapper = styled.aside`
  flex-basis: 100%;
`;

const RightSideHeader = styled.div`
  border-top-right-radius: 32px;
  background: var(--color-black-lg);
  height: 115px;
  padding: 3em 3em 3em 4em;
`;
const RightSideBody = styled.div`
  border-bottom-right-radius: 32px;
  background: var(--color-dark);
  height: 485px;
  padding: 0 3em 2.5em 3em;
  overflow-y: scroll;

  /* width */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
    margin-right: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgba(239, 241, 243, 0.5);
    border-radius: 4px;
    max-height: 70px;
  }
`;

const ListCount = styled.span`
  font-size: 1.8rem;
  color: var(--color-grey);
  span {
    color: var(--color-primary);
  }
`;

const ItemCount = styled.span`
  font-size: 1.8rem;
  color: var(--color-primary);
  display: flex;
  p {
    margin-left: 2rem;
    color: var(--color-grey);
    span {
      margin-left: 10px;
      color: var(--color-light);
    }
  }
`;

const ButtonList = styled.ul`
  list-style: none;
  display: flex;
  li {
    &:not(:last-child) {
      margin-right: 2rem;
    }
  }
`;

const getListTotal = shoppingList => {
  return shoppingList.items.reduce((acc, item) => {
    if (!item.price) return acc;
    return acc + item.price * item.quantity;
  }, 0);
};

const round = (number, decimals) => {
  return +(Math.round(number + 'e+' + decimals) + 'e-' + decimals);
};

const DesktopDashBoard = props => {
  const [isListDeleting, setIsListDeleting] = useState(null);
  return (
    <Wrapper>
      <LeftSideWrapper>
        <LeftSideHeader>
          <ShoppingListHeader>
            <Heading fontSize={2.4}>Shopping Lists</Heading>
            <ModalShoppingList />
          </ShoppingListHeader>
          <ListCount>
            You have <span>{props.shoppingLists.length}</span> lists
          </ListCount>
        </LeftSideHeader>
        <LeftSideBody>
          <ShoppingList
            isListDeleting={isListDeleting}
            isLoading={props.isLoading}
            isShoppingListSelected={props.isShoppingListSelected}
            shoppingLists={props.shoppingLists}
            onRemoveShoppingList={props.onRemoveShoppingList}
            onSelectShoppingList={props.onSelectShoppingList}
          />
        </LeftSideBody>
      </LeftSideWrapper>
      <RightSideWrapper>
        <RightSideHeader>
          {props.isShoppingListSelected && (
            <>
              <ShoppingListHeader>
                <Heading fontSize={2.4}>
                  {props.shoppingListSelected.name}
                </Heading>
                <ButtonList>
                  <li>
                    <ModalItem shoppingList={props.shoppingListSelected} />
                  </li>
                  <li>
                    <IconButton
                      icon="pencil-alt"
                      bg="secondary"
                      size="lg"
                      onClick={() =>
                        window.toggleShoppingListModal(
                          'update',
                          props.shoppingListSelected
                        )
                      }
                    />
                  </li>
                  <li>
                    <IconButton
                      icon="trash"
                      bg="secondary"
                      size="lg"
                      onClick={async () => {
                        setIsListDeleting(props.shoppingListSelected._id);
                        await props.onRemoveShoppingList(
                          props.shoppingListSelected._id
                        );
                        setIsListDeleting(null);
                      }}
                    />
                  </li>
                </ButtonList>
              </ShoppingListHeader>
              <ItemCount>
                {props.shoppingListSelected.items.length !== 1
                  ? `${props.shoppingListSelected.items.length} items`
                  : `${props.shoppingListSelected.items.length} item`}

                <p>
                  list total:
                  <span>
                    {round(getListTotal(props.shoppingListSelected), 2)}$
                  </span>
                </p>
              </ItemCount>
            </>
          )}
        </RightSideHeader>
        <RightSideBody>
          {props.isShoppingListSelected && (
            <ItemList
              isShoppingListSelected={props.isShoppingListSelected}
              shoppingList={props.shoppingListSelected}
              onRemoveItem={props.onRemoveItem}
              onToggleTodoDone={props.onToggleTodoDone}
            />
          )}
        </RightSideBody>
      </RightSideWrapper>
    </Wrapper>
  );
};

export default DesktopDashBoard;
