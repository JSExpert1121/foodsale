import React, { PureComponent, createRef } from 'react'
import {
  View,
  ImageBackground,
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

const ResponsiveImage = ({ targetWidth, originWidth, originHeight, uri }) => {
  var targetHeight = targetWidth * originHeight / originWidth
  return (
    <Image source={uri} style={{ width: targetWidth, height: targetHeight, resizeMode: 'stretch' }}></Image>
  )
}

const WalletLine = ({ }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 20, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
    <View>
      <Text style={{ color: commonColors.accentColor, fontSize: 18 }}>充值</Text>
      <Text style={{ color: commonColors.contentColor, fontSize: 12 }}>2019-02-14 11:45:20</Text>
    </View>
    <View style={{ flex: 1 }} />
    <View>
      <Text style={{ color: commonColors.limeGreen, fontSize: 18 }}>+ 1.00</Text>
    </View>
  </View>
)

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
            <Ionicons name="md-close" size={30} color={"black"} />
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}><Text style={{ fontSize: 18 }}>钱包明细</Text></TouchableOpacity>
        </View>
        <WalletLine></WalletLine>
        <WalletLine></WalletLine>
        {/* <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'white',paddingVertical:15,paddingHorizontal:20,borderBottomColor:commonColors.contentColor,borderBottomWidth:1}}>
                      <View>
                         <Text style={{color:commonColors.accentColor,fontSize:18}}>充值</Text>
                         <Text style={{color:commonColors.contentColor,fontSize:12}}>2019-02-14 11:45:20</Text>
                      </View>
                      <View style={{flex:1}}/>
                      <View>
                        <Text style={{color:commonColors.limeGreen,fontSize:18}}>+ 1.00</Text>
                      </View>   
                </View> */}
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