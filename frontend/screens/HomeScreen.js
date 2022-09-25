import React, { useState, useEffect, useContext, useRef } from 'react'

import { View, Text, Button, StyleSheet, FlatList, Image, StatusBar } from 'react-native'

import ArticleItem from '../Components/Articles/ArticleItem'

import { ARTICLES } from '../data/articleFBData'
import { useMoralis } from "react-moralis";
import { SafeAreaView } from 'react-native-safe-area-context';

import axios from 'axios'
import { ScrollView } from 'react-native-gesture-handler';
import { ArticlesContext } from '../store/context/articles-context';
import { fetchArticles } from '../utils/http';






const HomeScreen = ({ route, navigation, ...props }) => {



    // const { Moralis, account } = useMoralis();
    // const [updated, setUpdated] = useState(false);
    // const [articles, setArticles] = useState();
    // const flatListRef = useRef();
    // // const contractProcessor = useWeb3ExecuteFunction();



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

    const renderArticleItem = ({ item }) => {

        function selectedArticleHandler() {
            navigation.navigate('ArticleDetailsScreen', {
                articleId: item.id,
            })
        }

        return (
            //maybe change key and id
            <View style={styles.viewContainer}>

                <ArticleItem
                    id={item[0].id}
                    title={item[0].title}
                    image={item[0].featuredImageUrl}
                    //maybe  change userName to .ethAddress
                    userName={item[0].userName}
                    dateWritten={item[0].dateWritten}
                    content={item[0].content}
                    onPress={selectedArticleHandler}

                />



            </View>
        )
    }







    return (


        //itemData and item prop are provided by ReactN

        <SafeAreaView style={[StyleSheet.absoluteFill, styles.container]}>

            <View style={styles.viewContainer}>

                {/* <FlatList
                    data={articles}
                    renderItem={itemData => (
                        <ArticleItem 
                            id = {itemData.item.id}
                            image={itemData.item.featuredImageUrl}
                            title={itemData.item.title}
                            userName={itemData.item.userName}
                            dateWritten={itemData.item.dateWritten}
                            content={itemData.item.content}
                            onShare = {()=>{}}
                            onMoreOptions = {()=>{}}
                        />
                    )}
                    // keyExtractor={(item)=>item.id}
                    keyExtractor={item => item.id}
                    inverted={true}
                    ref={flatListRef}
                /> */}
                {/* 
            <FlatList 
                data={articles} 
                keyExtractor={item =>  item.id} 
                renderItem={renderArticleItem}
                    
                inverted={true}
                ref={flatListRef}
            /> */}


                <FlatList
                    data={articlesCtx.articles}
                    keyExtractor={item => item.id}
                    renderItem={itemData => (
                        <ArticleItem
                            id={itemData.item.id}
                            image={itemData.item.featuredImageUrl}
                            title={itemData.item.title}
                            userName={itemData.item.userName}
                            dateWritten={itemData.item.dateWritten}
                            content={itemData.item.content}
                            onShare={() => { }}
                            onMoreOptions={() => { }}
                        />
                    )}
                    ref={flatListRef}
                />



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