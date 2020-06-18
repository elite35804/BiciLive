import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {themeProp} from 'utils/CssUtil';
import styled from 'styled-components/native';
import { Actions } from 'react-native-router-flux';
import {useStores} from 'hooks/Utils';
import {BaseTextInput, BaseSelect } from 'components/controls/BaseTextInput';
import {BlueButton, WhiteButton} from 'components/controls/Button';
import {toJS} from 'mobx';
import {SingleSelectBox, MultiSelectBox, Divider} from '../../components/controls/BaseUtils';
import {get} from 'lodash';

const Welcome = props => {
  const {question, alert, auth} = useStores();
  const [data, setData] = useState(toJS(question.data));
  const [uiData, setUiData] = useState([]);
  const [reset, setReset] = useState(1);
  useEffect(() => {
    const temp = [];
    data.map(item => {
      if (item.id === 'SURVEY_QUESTION' && item.question_id !== 'preferenza' && item.initial_status === 'show') {
        temp.push(item);
      }
    });
    setUiData(temp);
  }, []);
  const preferSelected = (preferData, value) => {
    console.log('value=======', value);
    let blacklist = [];
    preferData.options.map(item => {
      if(item.option_value === value) blacklist = get(item,'turns_off', [])
    })
    const temp = []
    console.log('----------', data);
    data.map(item => {
      if (item.id==="SURVEY_QUESTION"  && item.question_id !== 'preferenza' && !blacklist.includes(item.question_id)) temp.push(item);
    });
    setReset(reset + 1);
    setUiData(temp)
  };

  const onSubmit = () => {
    console.log('submit=====', toJS(question.requestData));
    for (let [key, value] of Object.entries(toJS(question.requestData))) {
      if (value === '' || value === []) {
        alert.showInfo('Per favore completa le risposte', 'Info');
        return
      }
    }
    question.submit(auth.token);
    Actions.Home()
  };

  console.log('length=====', Object.entries(toJS(question.data)).length);
  if (Object.entries(toJS(question.data)).length) {
    console.log('data========', data);
    const titleData1 = data[0];
    const titleData2 = data[1];
    const preferData = data[2];

    return (
      <Container>
        <Title size={'40px'} color={'#323232'}>{titleData1.titolo}</Title>
        <Divider size={15}/>
        <Content>{titleData1.sub}</Content>
        <Title size={'40px'} color={'#323232'}>{titleData2.titolo}</Title>
        <Divider size={-5}/>
        {<SingleSelectBox data={preferData} onChange = {(v) => preferSelected(preferData, v)}/>}
        {uiData.map(item => {
          question.setRequest(item.question_id, '');
          if(item.type === 'single') return <SingleSelectBox data={item} reset={reset} onChange={(v) => question.setRequest(item.question_id, v)}/>
          if(item.type === 'multi') return <MultiSelectBox data={item} reset={reset} onChange={(v) => question.setRequest(item.question_id, v)}/>
        })}
        <View style={{marginBottom: 30}}/>
        <Divider size={10}/>
        <ButtonContainer onPress={() => onSubmit()}><ButtonText>CONTINUA</ButtonText></ButtonContainer>
        <Divider size={50}/>
      </Container>
    );
  } else {
    return <View><Text>No Data</Text></View>
  }
  // useEffect(() => {
  //   question.getData();
  // }, []);

};

const Container = styled(ScrollView)`
    background-color:#00dcd1;
    flex: 1;
    padding-horizontal: 5px;
`;

const ButtonContainer = styled(TouchableOpacity)`
    width: 50%;
    height: 45px;
    border-width: 1px;
    border-color: #323232;
    margin-left: 15px
    align-items: center
`;

const ButtonText = styled(Text)`
    font-size: 30px
    color: #323232;
`;

const Title = styled(Text)`
  font-size: 35px;
  color: ${props => props.color};
  font-family: ${themeProp('fontUniHeavy')};
  margin-top: ${props => props.size}
  padding-left: 8px;
`;

const Content = styled(Text)`
  font-size: 25px;
  color: #323232;
  font-family: ${themeProp('fontUniBook')};
  padding-left: 8px;
`;

export default Welcome;
