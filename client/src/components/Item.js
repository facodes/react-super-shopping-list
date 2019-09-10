import React, { Component } from 'react'
import { Button,} from 'reactstrap'

export class Item extends Component {

  getStyle = (item) => {
    return {
      textDecoration: item.done ? 'line-through' : 'none'
    }
  }

  render() {
    const { item } = this.props;
    return (
      <div className="d-flex align-items-center">  
        <input 
          className="mr-2"
          name={item.name}
          type="checkbox"  
          id="checker" 
          checked={item.done}
          onChange={()=>{;}}
          onClick={this.props.onToggleTodoDone.bind(this, item._id)}
        />
        <h5  style={this.getStyle(item)} className="mb-0">{item.name}</h5>
        <Button
          className="ml-auto" size="sm"
          color="danger"
          onClick={this.props.onRemoveItem.bind(this, item._id)}
        >
          <i className="fas fa-times"/>
        </Button>
      </div>
    )
  }
}


export default Item
  