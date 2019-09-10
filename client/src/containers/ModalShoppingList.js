import React, { Component } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  
} from 'reactstrap';
import { connect } from 'react-redux';
import { addNewShoppingList } from '../actions/shoppingList';

 class ModalShoppingList extends Component {

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

    if (this.state.name && this.state.name.toString().trim() !== ''){
      this.props.onAddNewShoppingList(this.state.name);
      this.setState({name:''});
    }else{
      return
    }
    // Close modal
    this.toggle();
  }; 
  render() {
    return (
      <div>
        <Button color ="success" onClick={this.toggle}>
          <i className="fas fa-plus"></i>
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} centered>
          <ModalHeader toggle={this.toggle}>Add A New Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='item'>Shopping List Name</Label>
                <Input
                  type='text'
                  name='name'
                  id='item'
                  placeholder='Enter a shopping list...'
                  onChange={this.onChange}
                  autoComplete="off"
                  
                />
                <Button color='success'block className="mt-3">
                  Add Shopping List
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
    onAddNewShoppingList(name){
      dispatch(addNewShoppingList(name));
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(ModalShoppingList);