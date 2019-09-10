import React, { Component } from 'react'
import { Button } from 'reactstrap'

export class ShoppingList extends Component {

  render() {
    const { shoppingLists } = this.props;
    return (
      <div> 
        <h5 className="mb-4" >{`These are Your Shopping Lists`}</h5>
        <section className="row">
          {
            shoppingLists.map( (shoppingList , index) => { 
              const itemDoneCount = shoppingList.items.filter(item => (item.done)).length              
              const totalItems = shoppingList.items.length;
              return(
                <div className="col-md-6 col-sm-12 col-xs-12" key={index}>
                  <div className="card border-success mb-4" style={{cursor:'pointer'}}>
                    <div className="card-body" 
                      onClick={this.props.onSelectShoppingList.bind(this,shoppingList)}
                    >
                      <h4 className="card-title">{shoppingList.name}</h4>
                    </div>
                    <div className="card-footer bg-transparent">
                      { `${itemDoneCount}/${totalItems}`}
                      <Button close aria-label="Cancel"
                        onClick={this.props.onRemoveShoppingList.bind(this,shoppingList._id)}
                      >
                        <span aria-hidden>&times;</span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            )
          }
        </section>
        
      </div>
    )
  }
}

export default ShoppingList
