import React from 'react'
import { View, Text, Image, StyleSheet, Button, Pressable, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ArticleItem = ({ text, title, userName, externalUrl, route, navigation, ...props }) => {
    //medium tutorial
    const length = 100;
    const trimmedString = text.length > 100 ?
        text.substring(0, length) :
        text;

    const account = `${userName.slice(0, 4)}...${userName.slice(38)}`;

    const navigation = useNavigation()

    function selectedArticleHandler() {
        //takes last segment of the url
        const lastSegment = externalUrl.split("/").pop();
        navigation.navigate('ArticleDetailsScreen', {
            articleId: props.id,
            lastSegment
        })
    }



    return (
        <View style={styles.finalContainer}>
            <Pressable
                android_ripple={{ color: '#ccc' }}
                style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
                onPress={selectedArticleHandler}
            >

                <View style={styles.articleContainer}>


                    <View style={styles.innerContainer}>

                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{ uri: 'https://ipfs.io/ipfs/QmWEsG4ayh75BMk2H1CowAdALPjsi3fD7CSZ6qxNM1yNnz/image/moralis.png' }} />
                            {/* <Image style={styles.image} source={{ uri: props.image }} /> */}
                        </View>


                        <View style={styles.titleContainer} >
                            <Text numberOfLines={3} style={styles.title}>{props.title}</Text>
                            <View style={styles.headingContainer} >
                                {/* insert ENS here baby */}
                                <Text style={styles.userName}>{account}</Text>
                                {/* <Text style={styles.dateStyle}>{props.dateWritten}</Text> */}
                            </View>
                        </View>
                    </View>


                    <View style={styles.actions}>

                        <View style={{ marginRight: 20 }}>
                            <Icon
                                name="arrow-redo"
                                color={'white'}
                                size={20}
                                onPress={() => alert('Login with Facebook')}>

                            </Icon>
                        </View>

                        <View style={{ marginRight: 20 }}>
                            <Icon
                                name="cash-outline"
                                color={'white'}
                                size={20}

                                onPress={() => alert('Login with Facebook')}>
                            </Icon>
                        </View>



                        <Icon
                            name="ellipsis-vertical"
                            color={'white'}
                            size={20}
                            onPress={() => alert('Login with Facebook')}>


                        </Icon>





                    </View>


                </View>



            </Pressable>
        </View>

    )
}

const styles = StyleSheet.create({
    articleContainer: {


        flex: 1,
        borderBottomColor: 'gray',
        borderBottomWidth: 2,
        height: 140,
        marginBottom: 30,
        marginTop: 20,
        marginHorizontal: 10

    },
    finalContainer: {
        flex: 1
    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',



    },
    innerContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    imageContainer: {
        width: "40%",
        height: '100%'
    },
    image: {

        width: '100%',
        height: '100%',
        borderRadius: 5
    },
    title: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
        // marginVertical: 4,

    },
    titleContainer: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'space-between'
    },
    userName: {
        fontSize: 13,
        color: 'white'
    },
    dateStyle: {
        fontSize: 13,
        color: 'white'
    },
    actions: {
        marginTop: 10,
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'flex-end',

    },
    actionButtons: {
        marginHorizontal: 20
    },
    buttonPressed: {
        opacity: 0.5
    }
})

export default ArticleItem