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
  phoneIcon, receiverIcon
} from '../common/image';
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { fetchData } from '../store/auth/actions'
import { Actions } from 'react-native-router-flux';
import * as commonColors from "../styles/colors";
import * as commonStyles from "../styles/styles";
import HeaderBar from './header'

const ResponsiveImage = ({ targetWidth, originWidth, originHeight, uri }) => {
  var targetHeight = targetWidth * originHeight / originWidth
  return (
    <Image source={uri} style={{ width: targetWidth, height: targetHeight, resizeMode: 'stretch' }}></Image>
  )
}


class ServiceSetting extends PureComponent {
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

  render() {
    var props = this.props
    return (
      <View>
        <HeaderBar
          title={'客服'}
        />
        <View style={{ backgroundColor: 'white' }}>
          <TouchableOpacity style={styles.informationLine}>
            <Image source={receiverIcon} style={{ width: 30, height: 30, resizeMode: "contain" }} />
            <View style={{ width: 20 }}></View>
            <Text style={{ color: commonColors.accentColor, fontSize: 14 }}>您好，请问有什么可以帮阻您</Text>
            <View style={{ flex: 1 }} />
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


export default ServiceSetting = connect(mapStateToProps, mapDispatchToProps)(ServiceSetting);

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
  informationLine: {
    marginVertical: 7,
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