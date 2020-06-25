import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import { Tooltip as RNETooltip } from 'react-native-elements';
import Images from 'res/Images';

const TOOLTIP_WIDTH = 250;
const TOOLTIP_PADDING = 10;

function getPopover(tooltipText) {
  return (
    <Text style={{color: 'white'}}>
      {tooltipText}
    </Text>
  );
}

class CustomTooltip extends Component {
  state = { tooltipHeight: 0 };

  renderHiddenBoxToGetHeight = () => {
    const { tooltipText } = this.props;

    return (
      <View
        style={[
          { width: TOOLTIP_WIDTH, padding: TOOLTIP_PADDING },
          styles.tooltipHiddenBox,
        ]}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          this.setState({
            tooltipHeight: height,
          });
        }}
      >
        <Text style={styles.tooltipHiddenText}>
          {tooltipText}
        </Text>
      </View>
    );
  };

  render() {
    const {
      tooltipText,
    } = this.props;

    const {
      tooltipHeight,
    } = this.state;

    return (
      <RNETooltip
        width={TOOLTIP_WIDTH}
        height={tooltipHeight}
        popover={getPopover(tooltipText)}
        overlayColor={'rgba(255, 255, 255, 0)'}
        backgroundColor={'black'}
        containerStyle={{color: 'white'}}
        skipAndroidStatusBar
      >
        <View>
          {/*<Text>Press Me!</Text>*/}
          {this.props.from === "category" ? <Image style={{width: 27, height: 27, resizeMode: 'contain'}} source={Images.icons.ic_info_green}/> : <Image style={{width: 20, height: 20, resizeMode: 'contain'}} source={Images.icons.ic_info_black}/>}
        </View>
        {this.renderHiddenBoxToGetHeight()}
      </RNETooltip>
    );
  }
}

const styles = StyleSheet.create({
  tooltipHiddenBox: {
    position: 'absolute',
    right: 10000000000,
    color: 'white',
  },
  tooltipHiddenText: {
    color: 'transparent',
  },
});

export default CustomTooltip;
