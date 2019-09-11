import React from 'react';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import styled from 'styled-components';

const Title = styled.h1`
  color : ${(props) => props.theme.colors.accent};
`;


function App() {
  return (
    <Grid>
      <Row>
        <Col xs={12} md={3}>
          <Title>Hello world</Title>
        </Col>
      </Row>
    </Grid>
  );
}

export default App;
