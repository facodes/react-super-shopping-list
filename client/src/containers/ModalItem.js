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
     `opacity .15s  ease-in`
    :`opacity .15s  ease-in, transform 0s .15s`
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

 	constructor(){
 		super();
 		this.state = {
	    modal: false,
	    update:false,
	    name:'',
	    price:'',
	    quantity:1,
	  }
	  window.toggleItemModal = this.toggle.bind(this);
 	}
 

 toggle = (mode, payload) => {
 		if (mode === 'close'){
 			this.setState({
 				modal: !this.state.modal
 			})

 			setTimeout(()=>{
 				this.setState({
 					update: false,
 					name:'',
 					price:'',
 					quantity:1
 				})
 			}, 300)

 		}
 		else if (mode === 'open'){
 			this.setState({
 				modal: !this.state.modal
 			})
 		}
 		else if (mode === 'update'){
 			this.setState({
 				modal: !this.state.modal,
 				update: true,
 				...payload,
 			})
 		}
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
    	this.setState({quantity: e.target.value});
    }
  }

  onSubmit = e => {
    e.preventDefault();
    if (this.state.update)
    	console.log (`update ${this.state._id} with the values ${this.state.name}, ${this.state.price}, ${this.state.quantity}`);
    else
    	this.props.onAddNewItem(this.state.name);
    e.target.reset();
    // Closing the modal
    this.toggle('close');
  };

  render() {
    return (
      <div>
          <IconButton 
          onClick={()=> this.toggle('open')}
          icon="plus"
          bg="primary"
        />
        <Modal isOpen={this.state.modal} toggle={this.toggle} centered>
          <ModalHeader toggle={this.toggle}>
            <Heading fontSize={2.4}>
              { 
              	!this.state.update ? 
              	`Add to ${this.props.shoppingList.name}`
              	: 
              	`Update item`
              }
            </Heading>   
            <IconButton icon="times" size="2x" onClick={() => this.toggle('close')}/>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <CustomInput
                  label="name"
                  type="text"
                  name="name"
                  value={this.state.name.toString()}
                  onChange={this.onInputChange}
                  required
                />
              </FormGroup> 
              <FormGroup>
                <CustomInput
                  label="price"
                  type="number"
                  name="price"
                  value={this.state.price ? this.state.price : ``}
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
                    min="1" 
                    onChange={this.onQuantityInputChange}
                    onBlur={()=> {
                    	if (this.state.quantity <= 0)
                    		this.setState({quantity: 1})
                    }}

                    />  
                  <IconButton 
                    icon="plus" size="2x" type="button"
                    onClick={this.onQuantityInputChange.bind(this, 'add')}
                  
                  />
                </QuantityInputWrapper>
                </FormGroup> 
                <FormGroup>
                  <Button type="submit" color="accent">
                    {this.state.update ? `save` : `add`}
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