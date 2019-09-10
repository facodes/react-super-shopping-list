import React, { Component } from 'react'
import { ListGroup, ListGroupItem} from 'reactstrap'
import {TransitionGroup , CSSTransition} from 'react-transition-group'


// components
import Item from './Item';

export class ItemList extends Component {
  render() {    
    const { name , items } = this.props.shoppingList;
    return (
      <React.Fragment>
        <h5 >{`${name} items`}</h5>
        <ListGroup>
          <TransitionGroup>
            {
              items.map((item,index) => {
                return (
                  <CSSTransition key={index} timeout={250} classNames='fade'>
                    <ListGroupItem className="mb-2">
                      <Item
                        item={item}
                        onRemoveItem={this.props.onRemoveItem}
                        onToggleTodoDone = {this.props.onToggleTodoDone}
                      />
                    </ListGroupItem>
                  </CSSTransition>)
              })
            }
          </TransitionGroup>
        </ListGroup>
      </React.Fragment>

    )
  }
}

export default ItemList
