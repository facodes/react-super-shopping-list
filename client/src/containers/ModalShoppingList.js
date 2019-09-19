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
  width: 100%;
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

  &:last-child{
  	display: flex;
  	justify-content: center;
  }
`;

class ModalShoppingList extends Component {

	constructor(){
		super();
	 	this.state = {
	    modal: false,
	    name: '',
	    budget: '',
	    heading: '',
	    update: false,
	  };

	  window.toggleShoppingListModal = this.toggle.bind(this);
	}

  toggle = (mode, payload) => {

    if(this.props.isLoading){
      return;
    }

		if (mode === 'close'){
			this.setState({
				modal: !this.state.modal
			});

			setTimeout(()=>{
				this.setState({
					update: false,
					heading: '',
					name: '',
					budget:'',
				});
			}, 300)

		}
		else if (mode === 'open'){
			this.setState({
				modal: !this.state.modal,
				heading: 'Add a new List',
				name: '',
			});

		}
		else if (mode === 'update'){
			this.setState({
				modal: !this.state.modal,
				heading: `${payload.name}`,
				update: true,
				...payload // spreading budget and name properties
			});
		}
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    e.persist();

    if(this.props.isLoading){
      return;
    }

    if (this.state.update)
    	// Here we will handle update 
    	console.log(`Submit form with ${this.state.name}, ${this.state._id} , ${this.state.budget} `);
    else
    	this.props.onAddNewShoppingList(this.state.name)
    		.then(() => { 
    			e.target.reset();
    			this.toggle('close'); 
        });
  }; 
  render() {
    return (
      <>
        <IconButton 
          onClick={() => this.toggle('open')}
          icon="plus"
          bg="primary"
        />
        <Modal isOpen={this.state.modal}>
          <ModalHeader>
            <Heading  fontSize={2.4}>
              {this.state.heading.toString()}
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
                  label="budget"
                  type="number"
                  name="budget"
                  icon="dollar-sign"
                  value={this.state.budget ? this.state.budget : ``}
                  onChange={this.onInputChange}
                />
              </FormGroup>   
              <FormGroup>
                <Button type="submit" color="accent" spinner>
                  {this.state.update ? `save` : `add`}
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
    isLoading: state.control.isLoading,
  }
}

function mapDispatchToProps(dispatch){
  return{
    async onAddNewShoppingList(name){
        await dispatch(addNewShoppingList(name));
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(ModalShoppingList);