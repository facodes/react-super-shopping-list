import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addNewItem } from '../actions/items';

// Components
import Heading from '../components/Heading';
import { Button, IconButton } from '../components/Buttons';
import CustomInput from '../components/form/CustomInput'

const Modal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;
  background-color: rgba(0,0,0 , 0.6);
  color: var(--color-light);
  position: fixed;
  top: 50%;
  left: 0;
  right: 0;
  height:100vh;
  z-index: 9999;
  transform: ${props => props.isOpen ? `translate(0, -50%)` : `translate(-100%, -50%)`};   
  opacity: ${props => props.isOpen ?  1 :  0};
  transition: ${props =>
    props.isOpen ?
     `opacity .3s  ease-in-out`
    :`opacity .3s  ease-in-out, transform 0s 0.3s`
  };

`
const ModalHeader = styled.div`
  width:100%;
  padding: 3.125em 3rem;
  background: var(--color-dark);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid var(--color-black-lg);

`;

const ModalBody = styled.div`
  width: 100%;
  padding: 3.125em 3rem;
  background: var(--color-dark);
  text-align: center;
`;

const Form = styled.form`

`
const FormGroup = styled.div`
  &:not(:last-child) {
    margin-bottom: 4rem;
  }
`;

const QuantityInputWrapper = styled.div`
  display: inline-block;
  background: var(--color-black-lg);
  margin: 0 auto;
  padding: 0 1em;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom: 4px solid var(--color-primary);
`
const QuantityInput = styled.input`
  width: 6rem;
  outline: none;
  border: none;
  background: none;
  color: var(--colog-light);
  font-size: 3.2rem;
  padding: .2em 0;
  margin: 0 1rem;
  text-align: center;
  border-right: 2px solid var(--color-black);
  border-left: 2px solid var(--color-black);
`

 class ModalItem extends Component {
  state = {
    modal: false,
    name: '',
    price:0,
    quantity: 1,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onQuantityInputChange =  e  =>{

    if (e === 'substract'){
      if (this.state.quantity <= 1)
        return
      this.setState({ quantity: this.state.quantity - 1 });
    }else if ( e === 'add'){
      this.setState({ quantity: this.state.quantity + 1 });
    }else{
    	if (e.target.value !== ''){
	      this.setState({quantity: parseInt(e.target.value)});  
    	}else{
    		this.setState({quantity: e.target.value});
    	}
    }
  }

  onSubmit = e => {
    e.preventDefault();
    if ( this.state.name && this.state.name.toString().trim() !== ''){
      this.props.onAddNewItem(this.state.name);
      this.setState({name:'', price:0, quantity:1 });
      e.target.reset();
    }else{
      return
    }

    // Closing the modal
    this.toggle();
  };

  render() {
    return (
      <div>
          <IconButton 
          onClick={this.toggle}
          icon="plus"
          bg="primary"
        />
        <Modal isOpen={this.state.modal} toggle={this.toggle} centered>
          <ModalHeader toggle={this.toggle}>
            <Heading fontSize={2.4}>
              {`Add to ${this.props.shoppingList.name}`}
            </Heading>   
            <IconButton icon="times" size="2x" onClick={this.toggle}/>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <CustomInput
                  label="name"
                  type="text"
                  name="name"
                  onChange={this.onInputChange}
                  required
                />
              </FormGroup> 
              <FormGroup>
                <CustomInput
                  label="price"
                  type="number"
                  name="price"
                  onChange={this.onInputChange}
                />
              </FormGroup>
              <FormGroup>
                <QuantityInputWrapper>
                  <IconButton 
                    icon="minus" size="2x" type="button"
                    onClick={this.onQuantityInputChange.bind(this, 'substract')}
                  />
                  <QuantityInput 
                    type="number" name="quantity"
                    value={this.state.quantity}
                    onChange={this.onQuantityInputChange}
                    min="1" 
                    />  
                  <IconButton 
                    icon="plus" size="2x" type="button"
                    onClick={this.onQuantityInputChange.bind(this, 'add')}
                  
                  />
                </QuantityInputWrapper>
                </FormGroup> 
                <FormGroup>
                  <Button type="submit" color="accent">
                    add
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