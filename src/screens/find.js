import React, { PureComponent } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { connect } from "react-redux";
import { heartIcon, mailIcon, noUser, dish, star } from '../common/image';
export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { ScrollView } from 'react-native-gesture-handler';
import HeaderBar from './header';
import MyNavigator from './tabNavigator'
import * as commonColors from "../styles/colors";
import * as commonStyles from "../styles/styles";
import * as DiscoverAction from '../store/discover/actions';
const starArray = [
    [1],
    [1, 2],
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3, 4],
    [1, 2, 3, 4, 5],
]

const Comment = ({ item }) => {
    const { comment, comment_date, comment_user, images, score } = item;
    let source = undefined;
    if (images && images[0] && images[0].url) {
        source = { uri: images[0].url };
    }

    return (
        <View style={{ paddingTop: 15, backgroundColor: 'white' }}>
            <View style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 1 }}>
                    <View style={{ height: 6 }}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        <Image source={noUser} style={{ width: 44, height: 44, borderRadius: 22 }} />
                        <View style={{ width: 10 }} />
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                <Text style={[commonStyles.accentFont, { fontSize: 14 }]}>{comment_user}</Text>
                                <View style={{ flex: 1 }} />
                                <Text style={{ fontSize: 14, color: 'black' }}></Text>
                            </View>
                            <Text style={[commonStyles.contentFont, { fontSize: 14, marginTop: 3 }]}>{comment_date}</Text>
                        </View>
                    </View>
                    <Text style={{ color: commonColors.contentColor, marginVertical: 10 }}>{comment}</Text>
                </View>
            </View>
            {source && <Image source={dish} style={{ width: screenWidth, height: 200 }} />}
            <View style={{ flexDirection: 'row', paddingTop: 20, paddingLeft: 20 }}>
                {
                    starArray[parseInt(score)].map((item, index) => (
                        <Image source={star} style={styles.starContainer} key={index} />
                    ))
                }
            </View>
            <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image source={heartIcon} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                <View style={{ width: 20 }} />
                <Text style={{ fontSize: 14 }}>6666</Text>
                <View style={{ width: 20 }} />
                <Image source={mailIcon} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                <View style={{ width: 20 }} />
                <Text style={{ fontSize: 14 }}>9999</Text>
                <View style={{ flex: 1 }} />
            </View>
        </View>
    )
}

const Article = ({ item }) => {
    const { author_name, created_at, title, description, images } = item;
    let source = undefined;
    if (images && images[0] && images[0].url) {
        source = { uri: images[0].url };
    }
    const loves = 6666, comments = 9999;
    const date = new Date(created_at);
    const hour = date.getHours();
    const mins = date.getMinutes();
    const strHour = (hour < 1) ? '00' : (hour < 10) ? `0${hour}` : hour;
    const strMins = (mins < 1) ? '00' : (mins < 10) ? `0${mins}` : mins;
    const strDate = `${date.getFullYear()}年 ${date.getMonth()}月 ${date.getDate()}日 ${strHour}:${strMins}`;

    return (
        <View style={{ paddingTop: 15, backgroundColor: 'white' }}>
            <View style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 1 }}>
                    <View style={{ height: 6 }}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        <Image source={noUser} style={{ width: 44, height: 44, borderRadius: 22 }} />
                        <View style={{ width: 10 }} />
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                <Text style={[commonStyles.accentFont, { fontSize: 14 }]}>{author_name}</Text>
                                <View style={{ flex: 1 }} />
                                <Text style={{ fontSize: 14, color: 'black' }}></Text>
                            </View>
                            <Text style={[commonStyles.contentFont, { fontSize: 14, marginTop: 3 }]}>{strDate}</Text>
                        </View>
                    </View>
                    <Text style={{ color: commonColors.contentColor, marginTop: 10, fontWeight: '500' }}>{title}</Text>
                    <Text style={{ color: commonColors.contentColor, marginTop: 5, marginBottom: 10 }}>{description}</Text>
                </View>
            </View>
            {source && <Image source={source} style={{ width: screenWidth, height: 200 }} />}
            <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={heartIcon} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                <View style={{ width: 20 }} />
                <Text style={{ fontSize: 14 }}>{loves}</Text>
                <View style={{ width: 20 }} />
                <Image source={mailIcon} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                <View style={{ width: 20 }} />
                <Text style={{ fontSize: 14 }}>{comments}</Text>
                <View style={{ flex: 1 }} />
            </View>
        </View>
    )
}

class Find extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            mode: 'status',
        }
    }

    componentDidMount() {
        const { token, getArticles, getComments } = this.props;
        getArticles(token, 0, 20);
        getComments(token, 0, 20);
    }

    renderMode() {
        return (
            <View style={styles.tabbar}>
                <TouchableOpacity onPress={() => { this.setState({ mode: 'status' }) }} style={styles.tab}>
                    <View style={{ flex: 1 }} />
                    <Text style={styles.searchOption}>动态</Text>
                    <View style={{ height: 5 }} />
                    {
                        this.state.mode === 'status' &&
                        <View style={{ height: 3, width: 60, backgroundColor: commonColors.limeGreen }}></View>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.setState({ mode: 'review' }) }} style={styles.tab}>
                    <View style={{ flex: 1 }} />
                    <Text style={styles.searchOption}>评论</Text>
                    <View style={{ height: 5 }} />
                    {
                        this.state.mode === 'review' &&
                        <View style={{ height: 3, width: 60, backgroundColor: commonColors.limeGreen }}></View>
                    }
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { mode } = this.state;
        const { articles, comments } = this.props;
        return (
            <View style={styles.root}>
                <HeaderBar title={'发现'} />
                {this.renderMode()}
                <View style={{ height: 10, backgroundColor: 'transparent' }} />
                <ScrollView>
                    {mode === 'status' && (
                        articles.map(article => (
                            <Article key={article.id} item={article} />
                        ))
                    )}
                    {mode === 'review' && (
                        comments.map(comment => (
                            <Comment key={comment.id} item={comment} />
                        ))
                    )}
                    {/* <Comment name={'小胖砸'} comment={'一盒香，新品推出，关注令惊喜'} time={"2019.2.14"} />
                    <Comment name={'小胖砸'} comment={'一盒香，新品推出，关注令惊喜'} time={"2019.2.14"} /> */}
                </ScrollView>
                <MyNavigator mode={2} />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
    articles: state.discover.articles,
    comments: state.discover.comments
});

const mapDispatchToProps = dispatch => ({
    getArticles: (token, start, size) => dispatch(DiscoverAction.getArticles(token, start, size)),
    getComments: (token, start, size) => dispatch(DiscoverAction.getComments(token, start, size))
});

export default connect(mapStateToProps, mapDispatchToProps)(Find);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'white',
    },
    tabbar: {
        flexDirection: 'row',
        width: '100%',
        // height: 40,
        paddingTop: 10,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    starContainer: {
        width: 15,
        height: 15,
        marginHorizontal: 2
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#FFF'
    },
    searchOption: {
        fontSize: 18,
        textAlign: 'center'
    }
})