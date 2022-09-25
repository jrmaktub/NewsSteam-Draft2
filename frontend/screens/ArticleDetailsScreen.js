import React, { useContext, useState, useRef, useEffect  } from 'react'

import { View, Text, SafeAreaView, StyleSheet, Image, FlatList, ScrollView } from 'react-native'
import { useLayoutEffect } from 'react'
import { ArticlesContext } from '../store/context/articles-context'

import { color } from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/Ionicons';
import { FavoritesContext } from '../store/context/favorites-context'
// import {ARTICLES} from '../data/articleFBData'
import { text } from 'stream/consumers'
import axios from 'axios'
import { useMoralis } from "react-moralis";

//moralis tutorial

export const Url = "https://ipfs.io/ipfs";

function ArticleDetailsScreen({ route, navigation, ...props }) {

    
    const articlesCtx = useContext(ArticlesContext)


    const { Moralis,  account } = useMoralis();
    const [updated, setUpdated] = useState(false);
    const [articles, setArticles] = useState();
    const flatListRef = useRef();

    const articleId = route.params?.articleId

    // const getAllArticles = async () => {
    //     const posts = await Moralis.Cloud.run("getAllArticles");
    //     setArticles(posts)
    // }

    // const subscribeToPosts = async () => {
    //     //ask tutor
    //     let query = new Moralis.Query('Posts');
    //     let subscription = await query.subscribe();
    //     subscription.on('create', notifyOnCreate);
    // }

    // const notifyOnCreate = (result) => {
    //     setUpdated(result)
    // }

    // useEffect(() => {
    //     getAllArticles();
    //     //flatListRef.current.scrollToOffset({ animated: false, offset: 0 });
    // }, [updated])

    // useEffect(() => {
    //     subscribeToPosts()
    // }, [updated])

    




    //MT end

    // const favoriteArticlesCtx =  useContext(FavoritesContext);


    const selectedArticle = articlesCtx.articles.find(
        (article) => article.id === articleId
        )
    
    // const articleIsFavorite = favoriteArticlesCtx.ids.includes(articleId)
    

    function changeFavoriteStatusHandler(){
       if (articleIsFavorite){
        favoriteArticlesCtx.removeFavorite(articleId)
       }else{
        favoriteArticlesCtx.addFavorite(articleId)
       }
    }

    useLayoutEffect(() => {

        navigation.setOptions({
            title: '',
            headerShown: true,
            headerBackVisible: true,
            headerBackTitle: '',
            headerTintColor: 'gold',
            headerStyle: { shadowColor: 'transparent', backgroundColor: 'black' }
        })

    }, [navigation])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                <View>
                    <Text style={styles.title}>{selectedArticle.title}</Text>
                </View>

                <View style={styles.imageContainer}>
                    <Image source={{ uri: selectedArticle.featuredImageUrl }} style={styles.featuredImage} />
                </View>

                <View style={styles.authorDetails}>
                    <Text style={styles.authorInfo}>{selectedArticle.userName}</Text>
                    <Text style={styles.dateInfo}>{selectedArticle.dateWritten}</Text>
                </View>

                <Text style={styles.content}>{selectedArticle.content}</Text>



            </ScrollView>
            <View style={styles.BottomBarcontainer}>

                <Icon
                    // name={mealIsLiked ? 'heart' :'heart-outline'}
                    name={'heart-outline'}
                    color={'white'}
                    size={20}
                    onPress={() => alert('test')}
                >

                </Icon>

                <Icon
                    name='chatbubble-ellipses-outline'
                    color={'white'}
                    size={20}
                    onPress={() => alert('Login')}

                >

                </Icon>

                <Icon
                    name={articleIsFavorite ? 'bookmark' :'bookmark-outline'}
                    color={'white'}
                    size={20}
                    onPress={changeFavoriteStatusHandler}
                >

                </Icon>

                <Icon

                    name='share-outline'
                    color={'white'}
                    size={20}
                    onPress={() => alert('Login')}

                >
                </Icon>

                <Icon
                    name='cash-outline'
                    color={'white'}
                    size={20}
                    onPress={() => alert('Login')}

                >
                </Icon>

                <Icon
                    name='ellipsis-vertical-outline'
                    color={'white'}
                    size={20}
                    onPress={() => alert('Login')}
                >
                </Icon>


            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 8,
        textAlign: 'center'
    },
    authorDetails: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 16
    },
    authorInfo: {
        fontSize: 14,
        color: 'white'
    },
    dateInfo: {
        fontSize: 14,
        color: 'white'
    },
    imageContainer: {
        marginTop: 8,
        marginHorizontal: 20,
        height: 240,
    },
    featuredImage: {

        width: '100%',
        height: '100%',
        borderRadius: 8,

    },
    content: {
        color: 'white',
        fontSize: 16,
        marginTop: 16,
        marginHorizontal: 20,
        marginBottom: 56,
    },
    BottomBarcontainer: {
        flex: 1,
        height: 40,
        backgroundColor: '#201E1E',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        left: 10,
        right: 10,
       
    }

})

export default ArticleDetailsScreen