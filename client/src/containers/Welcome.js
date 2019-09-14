import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';

import FormSwitch from './FormSwitch';
import ReactLoading from 'react-loading';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { clearAlert } from '../actions/alert';

const WelcomeText = styled.p`
  font-size: 1.8rem;
  color: var(--color-grey);
  margin: 3rem 0;
`;

export class Welcome extends Component {
  showAlert = (showAlert, msg, color) => {
    return (
      <Alert color={color} isOpen={showAlert} toggle={this.props.onClearAlert}>
        <h5 className="mb-0">{msg}</h5>
      </Alert>
    );
  };

  render() {
    const { isLoading } = this.props;
    const { showAlert, msg, color } = this.props.alert;
    return (
      <>
        <Grid>
          <Row>
            <Col xs={11}>
              <WelcomeText>
                A shopping list app, that helps you to get track off all your
                needs
              </WelcomeText>
            </Col>
          </Row>
        </Grid>

        <FormSwitch onClearAlert={this.props.onClearAlert} />
        {isLoading ? (
          <ReactLoading type="spin" color="white" height={50} width={50} />
        ) : (
          ''
        )}
        {showAlert && !isLoading ? this.showAlert(showAlert, msg, color) : ''}
      </>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.control.isLoading,
  alert: state.alert
});

const mapDispatchToProps = dispatch => {
  return {
    onClearAlert() {
      dispatch(clearAlert());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
