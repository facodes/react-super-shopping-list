import React, { Component } from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addNewShoppingList, updateShoppingList } from '../actions/shoppingList';

// Components
import Heading from '../components/Heading';
import { Button, IconButton } from '../components/Buttons';
import CustomInput from '../components/form/CustomInput'

const ModalWrapper = styled.div`
  position: fixed;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0 , 0.6);
  z-index: 9999;
  opacity: ${props => props.isOpen ?  1 :  0};
  transform: ${props => props.isOpen ? `translateY(0)` : `translateY(-100%)`}; 
  transition: ${props =>
    props.isOpen ?
     `opacity .3s  ease-in-out`
    :`opacity .3s  ease-in-out, transform 0s 0.3s`
  };
`

const Modal = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  max-width: 420px;
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
			document.body.style.overflow = 'visible';
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
			document.body.style.overflow = 'hidden';
			this.setState({
				modal: !this.state.modal,
				heading: 'Add a new List',
				name: '',
			});

		}
		else if (mode === 'update'){
			document.body.style.overflow = 'hidden';
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
    	this.props.onUpdateShoppingList({
    		id: this.state._id,
    		name: this.state.name,
    		budget: this.state.budget,
    	}).then(() => { 
    			e.target.reset();
    			this.toggle('close'); 
        });

    else
    	this.props.onAddNewShoppingList({
    		name:this.state.name,
    		budget:this.state.budget
    	}).then(() => { 
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
        <ModalWrapper isOpen={this.state.modal}>
          <Modal>
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
        </ModalWrapper>

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
    async onAddNewShoppingList(payload){
        await dispatch(addNewShoppingList(payload));
    },
    async onUpdateShoppingList(payload){
    	await dispatch(updateShoppingList(payload));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalShoppingList);