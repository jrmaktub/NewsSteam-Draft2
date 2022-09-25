import React, { useState, useEffect, useContext, useRef } from 'react'

import { View, Text, Button, StyleSheet, FlatList, Image, StatusBar } from 'react-native'

import ArticleItem from '../Components/Articles/ArticleItem'

import { ARTICLES } from '../data/articleFBData'
import { useMoralis, useNewMoralisObject, useMoralisQuery, useMoralisFile, useWeb3ExecuteFunction } from "react-moralis";
import { SafeAreaView } from 'react-native-safe-area-context';

import axios from 'axios'
import { ScrollView } from 'react-native-gesture-handler';
import { ArticlesContext } from '../store/context/articles-context';
import { fetchArticles } from '../utils/http';

import { ARTICLEZY } from '../store/context/ARTICLEZ';

    //         const id = article.get("objectId");
    //         const userId =  article.get("userId")
    //         const title = article.get("title")
    //         const featuredImageUrl = article.get("featuredImageUrl")
    //         const userName = article.get("userName")
    //         const dateWritten = article.get("createdAt")
    //         const content = article.getc("content")


const HomeScreen = ({ route, navigation, ...props }) => {



    const { Moralis, account } = useMoralis();
    const [updated, setUpdated] = useState(false);
    const [articles, setArticles] = useState();
    const flatListRef = useRef();
    // const contractProcessor = useWeb3ExecuteFunction();

    // const { fetch } = useMoralisQuery("Posts");


    useEffect(() => {
     async function getHistories() {
       const Posts = Moralis.Object.extend("Posts");
       const query = new Moralis.Query(Posts);
       const articles = await query.find({ useMasterKey: true });
       setArticles(articles);
      
     }
     getHistories();
   }, []);

//    const {featuredImageUrl} = articles.attributes


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

    //context starts here
    const articlesCtx = useContext(ArticlesContext)


    // const [fetchedArticles, setFetchedArticles]  = useState([])


    // useEffect( ()=>{
    //     async function getArticles(){
    //      const articles =  await fetchArticles();
    //      articlesCtx.setArticles(articles)
    //     //  setFetchedArticles(articles)
    //     }

    //     getArticles();

    // }, []);

    // function renderArticleItem( itemData ){

    //     function selectedArticleHandler() {
    //         navigation.navigate('ArticleDetailsScreen', {
    //             objectId: itemData.item.id
    //         })
    //     }

    //     return (
    //         //maybe change key and id
    //         <View  style={styles.viewContainer}>

    //             <ArticleItem
    //                 id={itemData.objectId}
    //                 title={itemData.title}
    //                 image={itemData.featuredImageUrl}
    //                 //maybe  change userName to .ethAddress
    //                 userName={itemData.userName}
    //                 dateWritten={itemData.dateWritten}
    //                 content={itemData.content}


    //             />



    //         </View>
    //     )
    // }





    // id, 
    // userId, 
    // title, 
    // featuredImageUrl, 
    // userName, 
    // dateWritten, 
    // content 

    return (


        //itemData and item prop are provided by ReactN

        <SafeAreaView style={[StyleSheet.absoluteFill, styles.container]}>

            <View style={styles.viewContainer}>
                {/* //objectId */}
                <FlatList
                    data={articles}
                    keyExtractor={item =>  item.id}
                    renderItem={itemData => (
                        <ArticleItem 
                        //objectId
                            id = {itemData.item.attributes.objectId}
                            title={itemData.item.attributes.title}
                            image={itemData.item.attributes.featuredImageUrl}
                            userName={itemData.item.attributes.userName}
                            // dateWritten={itemData.item.attributes.dateWritten}
                            content={itemData.item.attributes.content}
                            onShare = {()=>{}}
                            onMoreOptions = {()=>{}}
                        />
                    )}
                    // keyExtractor={(item)=>item.id}
                    
                    inverted={true}
                    ref={flatListRef}
                />
{/*                 
            <FlatList 
                data={articles} 
                keyExtractor={(item) => item?.id} 
                renderItem={renderArticleItem}
                    
                inverted={true}
                ref={flatListRef}
            /> */}


                



            </View>
        </SafeAreaView>



    )



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        marginTop: StatusBar.currentHeight || 0,
        // marginBottom: 72,

    },
    categoriesContainer: {
        marginTop: 20,
        height: 64
    },
    viewContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
        flex: 1,

    },

})


//testing
export default HomeScreen;