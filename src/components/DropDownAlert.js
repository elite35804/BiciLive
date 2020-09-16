import React, { useRef, useEffect } from 'react';
import { useStores } from '../hooks/Utils';
import DropdownAlert from 'react-native-dropdownalert';
import { useTheme } from 'styled-components/native';
import { when } from 'mobx';
import {observer} from 'mobx-react';

const baseStyle = {
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'transparent',
};

const Alert = props => {
    const { alert } = useStores();
    const theme = props.theme || useTheme();
    const ref = useRef();

    const titleStyle = {
        ...baseStyle,
        fontSize: theme.szTextDropAlertTitle,
    };

    const messaageStyle = {
        ...baseStyle,
        fontSize: theme.szTextDropAlertMessage
    };

    // Subscribe to alert changes
    useEffect(
        () => when(
            () => alert.visible,    // Only react when alert.visible = true
            () => {
                ref.current.alertWithType(alert.type, alert.title, alert.message)
            }
        ),
        [alert.title, alert.message, alert.visible, alert.type]
    );

    return (
        <DropdownAlert
            ref = {node => ref.current = node}
            panResponderEnabled={false}
            titleNumOfLines={0}
            messageNumOfLines={0}
            titleStyle={titleStyle}
            messagesStyle={messaageStyle}
            successColor='#333333'
            onClose={ alert.hide }
            closeInterval={alert.autoClose ? 4000 : 0}
            activeStatusBarStyle={'dark-content'}
        />
    )
};


export default observer(Alert);
