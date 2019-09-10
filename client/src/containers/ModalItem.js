import React, { Component } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addNewItem } from '../actions/items';

 class ModalItem extends Component {

  state = {
    modal: false,
    name: ''
  };


  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if ( this.state.name && this.state.name.toString().trim() !== ''){
      this.props.onAddNewItem(this.state.name);
      this.setState({name:''});
    }else{
      return
    }

    this.toggle();
  };

  render() {
    return (
      <div>
        <Button color ="info" onClick={this.toggle} className="ml-2">
         <i className="fas fa-plus"/>
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} centered>
          <ModalHeader toggle={this.toggle}>
            {`Add to ${this.props.shoppingList.name}`}
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='item'>Item</Label>
                <Input
                  type='text'
                  name='name'
                  id='item'
                  placeholder='Enter an item name'
                  onChange={this.onChange}
                  autoComplete="off"
                />
                <Button color='info'block className="mt-3">
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    item:state.item
  }
}

function mapDispatchToProps(dispatch){
  return{
    onAddNewItem(payload){
      dispatch(addNewItem(payload))
    }
  }
} 
export default connect(mapStateToProps, mapDispatchToProps)(ModalItem);