import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

const CustomSwitcher = ({style}) => {
  return (
    <Container style={style} colors={['#4c669f', '#3b5998', '#192f6a']}>

    </Container>
  )
};

const Container = styled(LinearGradient)`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  backgroundColor: white;
  border-width: 1px;
  border-radius: 10px
  border-color: black
  alignSelf: center
`;

export default CustomSwitcher
