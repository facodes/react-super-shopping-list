import React, { Component } from 'react'
import { connect } from 'react-redux'

import ModalShoppingList from './ModalShoppingList'
import ModalItem from './ModalItem'
import ShoppingList from '../components/ShoppingList'
import ItemList from '../components/ItemList'

import { removeShoppingList } from '../actions/shoppingList'
import { selectShoppingList } from '../actions/control';
import { removeItem , toggleTodoDone} from '../actions/items';

export class DashBoard extends Component {

  render() {
    const { name , shopping_lists } = this.props.user;
    const { isShoppingListSelected, shoppingListSelected } = this.props.control; 
    return (
      <div>
        <section className="mb-2 d-flex align-content-center">
          <h3>{name}</h3>
            <div className="ml-auto">
              {
                !isShoppingListSelected ? (
                  <ModalShoppingList></ModalShoppingList>
                ) : ( 
                  <div className="d-flex">
                    <button 
                      className="btn btn-secondary"
                      onClick={this.props.onSelectShoppingList.bind(this,null)}  
                      ><i className="fas fa-arrow-left"/>
                    </button>
                      <ModalItem shoppingList={shoppingListSelected}></ModalItem>
                  </div>
                )
              }
            </div>
        </section>
        <hr className="border border-secondary"></hr>
          {
            !isShoppingListSelected ? 
              (
              <ShoppingList 
                shoppingLists={shopping_lists}
                onRemoveShoppingList={this.props.onRemoveShoppingList}
                onSelectShoppingList={this.props.onSelectShoppingList}
              />)
            :
              (<ItemList 
                  shoppingList={shoppingListSelected}
                  onRemoveItem={this.props.onRemoveItem}
                  onToggleTodoDone = {this.props.onToggleTodoDone}
                />
              )  
          }
      </div>
    )
  }
}

function mapStateToProps (state) {
  return{
    user: state.user,
    control: state.control,
  }
}

function mapDispatchToProps(dispatch){
  return{
    onSelectShoppingList(shoppingList){
      dispatch(selectShoppingList(shoppingList))      
    },
    onRemoveShoppingList(id){
      dispatch(removeShoppingList(id));
    },
    onRemoveItem(id){
      dispatch(removeItem(id));
    },
    onToggleTodoDone(id){      
      dispatch(toggleTodoDone(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);