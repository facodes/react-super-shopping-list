import React, { Component } from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addNewShoppingList } from '../actions/shoppingList';

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

class ModalShoppingList extends Component {


  

  state = {
    modal: false,
    name: '',
    budget: 0
  };

  componentDidMount(){
    
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.name && this.state.name.toString().trim() !== ''){
      this.props.onAddNewShoppingList(this.state.name);
      this.setState({name:'', budget:0});
      e.target.reset();
    }else{
      return
    }
    // Close modal
    this.toggle();
  }; 
  render() {
    return (
      <>
        <IconButton 
          onClick={this.toggle}
          icon="plus"
          bg="primary"
        />
        <Modal isOpen={this.state.modal}>
          <ModalHeader>
            <Heading  fontSize={2.4}>
              Add A New List  
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
                  label="budget"
                  type="number"
                  name="budget"
                  onChange={this.onInputChange}
                />
              </FormGroup>   
              <FormGroup>
                <Button type="submit" color="accent">
                   add
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </>
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