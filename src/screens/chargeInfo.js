import React, { PureComponent, createRef } from 'react'
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import Constants from 'expo-constants';
import { connect } from "react-redux";
import {
  yuanIcon
} from '../common/image';
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { fetchData } from '../store/auth/actions'
import { Actions } from 'react-native-router-flux';
import * as commonColors from "../styles/colors";
import { Ionicons } from "@expo/vector-icons";


class IssuePayment extends PureComponent {
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
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => { Actions.pop() }} style={styles.leftIcon}>
            <Ionicons name="ios-arrow-back" size={30} color={"black"} />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={() => { Actions.WalletDetail() }}><Text>钱包明细</Text></TouchableOpacity>
        </View>
        <View style={{ width: '100%', height: 150, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={yuanIcon} style={{ width: 50, height: 50 }}></Image>
          <View style={{ height: 14 }} />
          <Text style={{ fontSize: 18, color: commonColors.accentColor }}>我的钱包</Text>
          <View style={{ height: 14 }} />
          <Text style={{ fontSize: 18, color: commonColors.accentColor }}>{'¥ '}<Text style={{ fontSize: 28 }}>4.00</Text></Text>
        </View>

        <View style={{ height: 40 }} />
        <View style={styles.mainPart}>
          <TouchableOpacity onPress={() => { this.setState({ showModal: true }) }} style={styles.wideButton}>
            <Text style={{ color: 'white', fontSize: 18 }}>完成</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }} />

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


export default IssuePayment = connect(mapStateToProps, mapDispatchToProps)(IssuePayment);

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
  informationLine: { marginVertical: 7, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  wideButton: { height: 40, paddingHorizontal: 10, flexDirection: 'row', width: '100%', paddingVertical: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: commonColors.limeGreen, borderRadius: 10 },
  headerContainer: {
    marginTop: Constants.statusBarHeight,
    height: 60,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: "row",
    backgroundColor: 'white',
    elevation: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
})