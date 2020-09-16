import React from 'react';
import { View, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
    flex : 1;
`;

const TopMostContainer = styled(SafeAreaView)`
    flex : 1;
`;

export default Container;
export { TopMostContainer };
