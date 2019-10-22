import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Modal
} from 'react-native'
import { connect } from "react-redux";
import {
    uncheck, check, noUser, closeSymbol
} from '../common/image';
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import DateTimePicker from "react-native-modal-datetime-picker";
import * as commonColors from "../styles/colors";
import { Actions } from 'react-native-router-flux';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import { formatDate } from '../helpers/dateformat';
import * as AccountAction from '../store/accounts/actions';
import WideButton from '../components/Button/WideButton';

class PersonInfo extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            nickname: props.user.profile.nick_name,
            gender: props.user.profile.gender || 'male',
            birthday: new Date(props.user.profile.birthday),
            avatar: props.user.profile.avatar,
            showCalendar: false,
            showModal: false
        }
    }

    _askPermission = async (type, failureMessage) => {
        const { status, permissions } = await Permissions.askAsync(type);

        if (status === 'denied') {
            alert(failureMessage);
            return false;
        }

        return true;
    };

    _pickImage = async () => {
        const result = await this._askPermission(
            Permissions.CAMERA_ROLL,
            'We need the camera-roll permission to read pictures from your phone...'
        );

        if (!result) return;

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });

        if (pickerResult.cancelled) return;
        this._handleImagePicked(pickerResult);
    };

    _takePhoto = async () => {
        await this._askPermission(
            Permissions.CAMERA,
            'We need the camera permission to take a picture...'
        );
        await this._askPermission(
            Permissions.CAMERA_ROLL,
            'We need the camera-roll permission to read pictures from your phone...'
        );
        let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });

        if (pickerResult.cancelled) return;
        this._handleImagePicked(pickerResult);
    };

    _handleImagePicked = async picker => {
        const { token, uploadAvatar } = this.props;
        console.log(picker);
        let uriParts = picker.uri.split('.');
        let filename = picker.uri.split('/').pop();
        let fileType = uriParts[uriParts.length - 1];
        uploadAvatar(token, {
            uri: picker.uri,
            name: filename,
            type: `image/${fileType}`
        });
    }

    changeAvatar = (camera) => {
        this.setState({ showModal: false });
        if (camera) {
            this._takePhoto();
        } else {
            this._pickImage();
        }
    }

    updateProfile = () => {
        const { updateProfile, token } = this.props;
        const { birthday, gender, nickname } = this.state;
        updateProfile(token, nickname, gender, birthday);
    }

    selectBirthday = () => {
        this.setState({ showCalendar: true });
    }

    handleDatePicked = date => {
        this.setState({ birthday: date, showCalendar: false });
    }

    changeNickname = text => {
        this.setState({ nickname: text });
    }

    render() {
        const { user } = this.props;
        const account = user.account.slice(0, 3) + '****' + user.account.slice(7);
        const { avatar } = user.profile;
        const extension = avatar && avatar.slice(avatar.length - 3).toLowerCase();
        const source = (extension && (extension === 'jpg' || extension === 'png' || extension === 'peg')) ? { uri: avatar } : noUser;
        const { nickname, birthday, gender } = this.state;
        return (
            <View style={styles.root}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        onPress={() => { Actions.pop() }} style={styles.leftIcon}>
                        <Ionicons name="ios-arrow-back" size={25} color={commonColors.contentColor} />
                    </TouchableOpacity>
                    <Text style={{ flex: 1, textAlign: 'center', marginLeft: 40, fontSize: 20 }}>
                        个人信息
                  </Text>
                    <TouchableOpacity onPress={this.updateProfile}>
                        <Text style={{ fontSize: 20 }}>保存</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: 20 }}>
                        <View style={{ height: 20 }}></View>
                        <View style={styles.liner1}>
                            <Image source={source} style={{ width: 80, height: 80, borderRadius: 40, resizeMode: 'contain' }}></Image>
                        </View>
                        <View style={{ height: 15 }} />
                        <TouchableOpacity activeOpacity={0.6} onPress={() => this.setState({ showModal: true })}>
                            <Text style={{ fontSize: 14, color: commonColors.contentColor, textAlign: 'center' }}>点击修改头像</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 10, backgroundColor: '#eee', marginBottom: 20 }} />
                    <View style={styles.rowLiner}>
                        <Text style={styles.label}>账号</Text>
                        <Text style={styles.content}>{account}</Text>
                    </View>
                    <View style={styles.rowLiner}>
                        <Text style={styles.label}>昵称</Text>
                        <TextInput
                            style={styles.content}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder={"设置昵称"}
                            textAlign="left"
                            underlineColorAndroid="transparent"
                            value={nickname}
                            onChangeText={this.changeNickname}
                        />
                    </View>
                    <View style={styles.rowLiner}>
                        <Text style={styles.label}>性别</Text>
                        <View style={{ marginLeft: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => this.setState({ gender: 'male' })} style={styles.container}>
                                {
                                    gender == 'male' ?
                                        <Image source={check} style={{ width: 25, height: 25 }} /> :
                                        <Image source={uncheck} style={{ width: 25, height: 25 }} />
                                }
                                <Text style={{ marginHorizontal: 15 }}>先生</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({ gender: 'female' })} style={styles.container}>
                                {
                                    gender == 'female' ?
                                        <Image source={check} style={{ width: 25, height: 25 }} /> :
                                        <Image source={uncheck} style={{ width: 25, height: 25 }} />
                                }
                                <Text style={{ marginHorizontal: 15 }}>女士</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.rowLiner}>
                        <Text style={styles.label}>出生日期</Text>
                        <TouchableOpacity activeOpacity={0.6} onPress={this.selectBirthday}>
                            <Text style={[styles.content, { color: commonColors.contentColor }]}>{formatDate(birthday)}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <DateTimePicker
                    confirmTextIOS={'确认'}
                    cancelTextIOS={'取消'}
                    date={new Date(birthday)}
                    isVisible={this.state.showCalendar}
                    onConfirm={this.handleDatePicked}
                    onCancel={() => this.setState({ showCalendar: false })}
                />
                <Modal transparent={true} visible={this.state.showModal}>
                    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <View style={{ width: '70%', height: 220, marginTop: 150, backgroundColor: 'white' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 15, borderBottomColor: 'green', borderBottomWidth: 1 }}>
                                <TouchableOpacity onPress={() => this.setState({ showModal: false })}>
                                    <Image source={closeSymbol} style={{ width: 12, height: 12, marginLeft: 15 }} />
                                </TouchableOpacity>
                                <View style={{ flex: 1 }} />
                                <Text style={{ textAlign: 'center', fontSize: 18 }}>Pick a image</Text>
                                <View style={{ flex: 1 }} />
                            </View>
                            <View style={{ height: 10 }} />
                            <WideButton title='From Camera' handleClick={() => this.changeAvatar(true)} />
                            <WideButton title='From Gallery' handleClick={() => this.changeAvatar(false)} />
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
    uploadAvatar: (token, file) => dispatch(AccountAction.uploadAvatar(token, file)),
    updateProfile: (token, nickname, gender, birthday) => dispatch(AccountAction.uploadProfile(token, nickname, gender, formatDate(birthday)))
});

export default PersonInfo = connect(mapStateToProps, mapDispatchToProps)(PersonInfo);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'white',
    },
    label: {
        marginLeft: 20,
        width: 60,
        marginRight: 20,
        fontSize: 14
    },
    content: {
        marginLeft: 20,
        marginRight: 50,
        fontSize: 14
    },
    iconContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowLiner: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent:'center'
        paddingVertical: 15,
        borderBottomColor: '#eee',
        borderBottomWidth: 1
    },
    iconLabel: {
        marginTop: 10,
        fontSize: 14
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconSize: {
        width: 30,
        height: 30
    },
    liner1: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
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
    modalContainer: { backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
})