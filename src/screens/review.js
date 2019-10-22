import React, { PureComponent } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Modal,
    ScrollView
} from 'react-native';
import { connect } from "react-redux";
import { wancan, check, star, graystar, closeSymbol, closeIcon } from '../common/image';
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import HeaderBar from './header'
import * as commonColors from "../styles/colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import CommentApi from '../service/comment';
import WideButton from '../components/Button/WideButton';
import { Actions } from 'react-native-router-flux';

const starArray = [
    [1],
    [1, 2],
    [1, 2, 3],
    [1, 2, 3, 4],
    [1, 2, 3, 4, 5],
];

const ImageItem = ({ item, handleDelete }) => {
    const { name, thumbUrl } = item;
    return (
        <View style={{ padding: 10, position: 'relative', width: 120, height: 120 }}>
            <Image source={{ uri: thumbUrl, width: 100, height: 100 }} />
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={handleDelete}
                style={{ position: 'absolute', right: 0, top: 0 }}>
                <Image source={closeIcon} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
        </View>
    )
}

class Review extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            name: undefined,
            showModal: false,
            starCount: 5,
            showAlert: false,
            alertTitle: '',
            alertContent: '',
            images: [],
            isBusy: false,
            done: false
        }
    }

    handleOK = () => {
        if (this.state.done) {
            Actions.pop();
        } else {
            this.setState({ showAlert: false });
        }
    }

    createComment = async () => {
        const { token, order } = this.props;
        const { name, text, starCount, images } = this.state;
        try {
            const imgs = images.map((image, index) => ({ id: index, name: image.name }));
            await CommentApi.create(token, order.id, text, starCount, imgs);
            this.setState({
                text: '',
                name: undefined,
                showAlert: true,
                alertTitle: '成功',
                alertContent: '添加评论成功',
                done: true
            });
        } catch (error) {
            console.log('Review.CreateComment: ', error);
            this.setState({
                showAlert: true,
                alertTitle: '失败',
                alertContent: '添加评论失败'
            });
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
        const { token } = this.props;
        let uriParts = picker.uri.split('.');
        let filename = picker.uri.split('/').pop();
        let fileType = uriParts[uriParts.length - 1];
        try {
            this.setState({ isBusy: true })
            const data = await CommentApi.uploadImage(token, {
                uri: picker.uri,
                name: filename,
                type: `image/${fileType}`
            });

            console.log(data);
            this.setState({
                isBusy: false,
                images: [...this.state.images, data],
                showAlert: true,
                alertTitle: '成功',
                alertContent: '图片上传成功'
            });
        } catch (error) {
            console.log('Review.UploadImage: ', error);
            this.setState({
                isBusy: false,
                name: undefined,
                showAlert: true,
                alertTitle: '失败',
                alertContent: '图片上传失败'
            });
        }
    }

    changeAvatar = (camera) => {
        this.setState({ showModal: false });
        if (camera) {
            this._takePhoto();
        } else {
            this._pickImage();
        }
    }

    removeImage = async item => {
        const { images } = this.state;
        try {
            await CommentApi.removeImage(this.props.token, item.name);
            for (let i = 0; i < images.length; i++) {
                if (item.name === images[i].name) {
                    images.splice(i, 1);
                    this.setState({ images: [...images] });
                    return;
                }
            }
        } catch (error) {
            console.log('Review.RemoveImage: ', error);
        }
    }

    render() {
        const { text, name, showModal, starCount, showAlert, alertTitle, alertContent, images } = this.state;
        const { order } = this.props;
        const enabled = images.length > 0 && text.length > 0;
        return (
            <View style={styles.root}>
                <HeaderBar title={'评价'} />
                <ScrollView>
                    <TouchableOpacity style={styles.foodItem}>
                        <Image source={wancan} style={styles.itemImageContainer} />
                        <View style={{ paddingLeft: 15 }}>
                            <Text style={{ fontSize: 16, color: commonColors.accentColor }}> {order.food_name}</Text>
                            <View style={{ height: 3 }} />
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: commonColors.contentColor, fontSize: 12 }}>下单时间 2019-02-14 8:30</Text>
                            </View>
                            <View style={{ height: 3 }} />
                            <Text style={{ color: commonColors.contentColor, fontSize: 12 }}>总价 ¥ {order.final_amount}</Text>
                        </View>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 80, height: 30, borderRadius: 3 }}>
                                <Image source={check} style={{ width: 15, height: 15 }} />
                                <Text style={{ fontSize: 14, marginLeft: 5 }}>匿名评价</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ width: 15 }} />
                    </TouchableOpacity>
                    <View style={{ height: 20 }}></View>
                    <View style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                        <View style={{ flexDirection: 'row' }}>
                            {
                                starArray[4].map((item, index) => (
                                    <TouchableOpacity key={index} activeOpacity={0.6} onPress={() => this.setState({ starCount: index + 1 })}>
                                        <Image source={index < starCount ? star : graystar} style={styles.starContainer} />
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </View>
                    <View style={{ height: 20 }}></View>
                    <View style={styles.inputWidget}>
                        <TextInput
                            ref="search"
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder={""}
                            placeholderTextColor={commonColors.placeholderText}
                            textAlign="left"
                            style={styles.input}
                            multiline={true}
                            underlineColorAndroid="transparent"
                            value={text}
                            onChangeText={text => this.setState({ text: text.replace(/\t/g, "") })}
                        />
                        <Text style={{ textAlign: 'right', color: commonColors.contentColor }}>{'至少输入8个子'}</Text>
                    </View>
                    <View style={{ height: 10 }} />
                    <View style={{ marginLeft: '7%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => this.setState({ showModal: true })}>
                            <View style={styles.camera}>
                                <Ionicons name={'ios-camera'} size={24} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={{ fontSize: 14 }}>{'上传图片'}</Text>
                            <View style={{ height: 7 }}></View>
                            <Text style={{ fontSize: 12, color: commonColors.contentColor }}>{'内容丰富的评价有机会成为优质评论啊'}</Text>
                        </View>
                        <View style={{ flex: 1 }}></View>
                    </View>
                    {images.length > 0 && (
                        <View style={{ padding: 20, flexWrap: 'wrap', flexDirection: 'row' }}>
                            {images.map(image => (
                                <ImageItem key={image.name} item={image} handleDelete={() => this.removeImage(image)} />
                            ))}
                        </View>
                    )}
                    <WideButton title={'提交'} handleClick={this.createComment} disabled={!enabled} />
                </ScrollView>

                <Modal transparent={true} visible={showModal}>
                    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <View style={{ width: '70%', height: 220, marginTop: 150, backgroundColor: 'white' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 15, borderBottomColor: 'green', borderBottomWidth: 1 }}>
                                <TouchableOpacity onPress={() => this.setState({ showModal: false })}>
                                    <Image source={closeSymbol} style={{ width: 12, height: 12, marginLeft: 15 }} />
                                </TouchableOpacity>
                                <View style={{ flex: 1 }} />
                                <Text style={{ textAlign: 'center', fontSize: 18 }}>选择图片</Text>
                                <View style={{ flex: 1 }} />
                            </View>
                            <View style={{ height: 10 }} />
                            <WideButton title='从相机' handleClick={() => this.changeAvatar(true)} />
                            <WideButton title='从画廊' handleClick={() => this.changeAvatar(false)} />
                        </View>
                    </View>
                </Modal>
                <Modal transparent={true} visible={showAlert}>
                    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <View style={{ width: '70%', marginTop: 150, backgroundColor: 'white' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 15, borderBottomColor: 'green', borderBottomWidth: 1 }}>
                                <Text style={{ textAlign: 'center', fontSize: 18 }}>{alertTitle}</Text>
                            </View>
                            <View style={{ height: 10 }} />
                            <Text style={{ textAlign: 'left', fontSize: 18, paddingHorizontal: 20 }}>{alertContent}</Text>
                            <View style={{ height: 10 }} />
                            <WideButton title='确认' handleClick={this.handleOK} />
                            <View style={{ height: 10 }} />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Review);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'white',
    },
    inputWidget: {
        height: 100,
        paddingHorizontal: 10,
        width: '86%',
        paddingVertical: 8,
        marginLeft: '7%',
        borderWidth: 1,
        borderColor: '#ccc'
    },
    camera: {
        width: 80,
        height: 80,
        borderColor: '#ccc',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    starContainer: {
        width: 25,
        height: 25,
        marginHorizontal: 10
    },
    itemImageContainer: {
        width: 80,
        height: 70,
        marginLeft: 15
    },
    foodItem: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#e5e5e5',
        borderBottomWidth: 1,
        paddingVertical: 10,
        backgroundColor: 'white'

    },
    input: {
        fontSize: 14,
        color: commonColors.title,
        flex: 1,
        //alignSelf: "stretch",
        marginBottom: 3,
        paddingHorizontal: 10,
        paddingLeft: 10,
        //backgroundColor:'red'
    },
})