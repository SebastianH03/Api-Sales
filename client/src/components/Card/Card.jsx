import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const Field = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.strong`
  display: block;
  margin-bottom: 5px;
`;

const Text = styled.div`
  font-size: 16px;
`;

function Card({ date, event, coleccion }) {
  return (
    <CardContainer>
      <Field>
        <Label>Fecha:</Label>
        <Text>{date}</Text>
      </Field>
      <Field>
        <Label>Evento:</Label>
        <Text>{event}</Text>
      </Field>
      <Field>
        <Label>Coleccion:</Label>
        <Text>{coleccion}</Text>
      </Field>
    </CardContainer>
  );
}

export default Card;
