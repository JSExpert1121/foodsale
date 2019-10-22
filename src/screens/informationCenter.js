import React, { PureComponent, createRef } from 'react'
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Switch,
  TextInput
} from 'react-native'
import { connect } from "react-redux";
import {
  actionIcon, notificationIcon
} from '../common/image';
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { fetchData } from '../store/auth/actions'
import { Actions } from 'react-native-router-flux';
import * as commonColors from "../styles/colors";
import * as commonStyles from "../styles/styles";
import HeaderBar from './header'
import Ionicons from '@expo/vector-icons/Ionicons';

const ResponsiveImage = ({ targetWidth, originWidth, originHeight, uri }) => {
  var targetHeight = targetWidth * originHeight / originWidth
  return (
    <Image source={uri} style={{ width: targetWidth, height: targetHeight, resizeMode: 'stretch' }}></Image>
  )
}


class InformationCenter extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectedMode: 'weixin',
      showOrderList: false,
      showModal: false,
      price: '',
      code: '0000',
      showModalFlag: false
    }
    this.pinInput = React.createRef();
  }
  cellProps = ({ /*index, isFocused,*/ hasValue }) => {
    if (hasValue) {
      return {
        style: [styles.input, styles.inputNotEmpty],
      };
    }

    return {
      style: styles.input,
    };
  };
  componentWillReceiveProps(props) {

  }
  isValidCode() {

  }
  onFinishCheckingCode() {
    console.log('good on finish checking---')
    Actions.ChargeDetail()
  }
  handlerOnFulfill = code => {
    if (this.isValidCode(code)) {
      console.log(code);
    } else {
      this.clearCode();
    }
  };

  field = createRef();

  clearCode() {
    const { current } = this.field;

    if (current) {
      current.clear();
    }
  }

  pasteCode() {
    const { current } = this.field;

    if (current) {
      current.handlerOnTextChange(value);
    }
  }

  _focusePrevInput() {

  }
  renderModal() {
    const { code } = this.state;
    return (
      <Modal
        transparent={true}
        visible={this.state.showModal}
      >
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: '70%', height: 220, marginTop: 150, backgroundColor: 'white', borderRadius: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 15, borderBottomColor: 'green', borderBottomWidth: 1 }}>
              <View style={{ flex: 1 }} />
              <Text style={{ textAlign: 'center', fontSize: 18 }}>版本更新</Text>
              <View style={{ flex: 1 }} />
            </View>
            <View style={{ paddingLeft: 15, paddingTop: 15 }}>
              <Text style={{ color: commonColors.contentColor, fontSize: 18 }}>1.新增***功能</Text>
              <Text style={{ color: commonColors.contentColor, fontSize: 18 }}>2.新增***功能</Text>
              <Text style={{ color: commonColors.contentColor, fontSize: 18 }}>3.新增***功能</Text>
            </View>
            <View style={{ flex: 1 }}></View>
            <View style={{ height: 50, width: '100%', flexDirection: 'row', borderTopColor: '#eee', borderTopWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text onPress={() => { this.setState({ showModal: false }) }} style={{ flex: 1, textAlign: 'center', color: commonColors.contentColor }}>取消</Text>
              <View style={{ width: 1, backgroundColor: '#eee', height: '100%' }}></View>
              <Text onPress={() => { this.setState({ showModal: false }) }} style={{ flex: 1, textAlign: 'center', color: commonColors.contentColor }}>确认更新</Text>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
  render() {
    var props = this.props
    return (
      <View>
        <HeaderBar
          title={'消息中心'}
        />
        <View>
          <TouchableOpacity style={styles.informationLine}>
            <Image source={actionIcon} style={styles.iconStyle}></Image>
            <View style={{ width: 20 }}></View>
            <Text style={{ color: commonColors.accentColor, fontSize: 14 }}>设置</Text>
            <View style={{ flex: 1 }} />
            <Ionicons name={'ios-arrow-forward'} size={24} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.informationLine}>
            <Image source={notificationIcon} style={styles.iconStyle}></Image>
            <View style={{ width: 20 }}></View>
            <Text style={{ color: commonColors.accentColor, fontSize: 14 }}>通知</Text>
            <View style={{ flex: 1 }} />
            <Ionicons name={'ios-arrow-forward'} size={24} />
          </TouchableOpacity>
        </View>
        <View style={{ height: 40 }}></View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    authData: state.authData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: () => dispatch(fetchData())
  }
}


export default InformationCenter = connect(mapStateToProps, mapDispatchToProps)(InformationCenter);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
  },
  mainPart: {
    paddingHorizontal: 20
  },
  iconStyle: {
    width: 30,
    height: 30
  },
  informationLine: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white'
  },
  wideButton: {
    height: 40,
    paddingHorizontal: 10,
    flexDirection: 'row',
    width: '90%',
    marginLeft: '5%',
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: commonColors.limeGreen,
    borderRadius: 10
  }
})