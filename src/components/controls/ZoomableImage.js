import React, {useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity, Image, Alert, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native/dist/styled-components.native.esm';
import ImageZoom from 'react-native-image-pan-zoom';
import {get} from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import config from '../../config/Config';

const ZoomableImage = props => {
  const {width, height} = Dimensions.get('window');
  const {scale} = props
  if (scale !== 0) {
    return (
      <>
        <ImageZoom
          cropWidth={width}
          cropHeight={height}
          imageWidth={width}
          imageHeight={height}
          centerOn={{x: 0, y: 0, scale: parseFloat(scale), duration: 1}}
        >
          <ZoomImage source={{uri: config.server + get(props, 'imageUrl', '')}} width={width} height={height}/>
        </ImageZoom>
        <TouchableOpacity onPress={() => props.onClose()}
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius:22,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            right: 20,
                            top: 40
                          }}>
          {/*<Icon name="close" size={20} color="#FFF"/>*/}
          <Text style={{color:'white'}}>X</Text>
        </TouchableOpacity>

      </>
    );
  } else {
    return <View/>
  }


};

const Container = styled(View)`
  flex: 1;
`;

const ZoomImage = styled(Image)`
  width: ${props => props.width};
  height: ${props => props.height};
  resize-mode: contain;
`;

export default ZoomableImage;
