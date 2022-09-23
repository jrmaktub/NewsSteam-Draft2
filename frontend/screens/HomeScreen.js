import React, { useState, useEffect, useContext } from 'react'

import { View, Text, Button, StyleSheet, FlatList, Image, StatusBar } from 'react-native'

import ArticleItem from '../Components/Articles/ArticleItem'

import { ARTICLES } from '../data/articleFBData'

import { SafeAreaView } from 'react-native-safe-area-context';

import axios from 'axios'
import { ScrollView } from 'react-native-gesture-handler';
import { ArticlesContext } from '../store/context/articles-context';
import { fetchArticles } from '../utils/http';

const renderArticleItem = ({ item }) => {
    return (
        //maybe change key and id
        <View key={item[0].id} style={styles.viewContainer}>

            <ArticleItem
                id={item[0].id}
                title={item[0].title}
                image={item[0].featuredImageUrl}
                //maybe  change userName to .ethAddress
                userName={item[0].userName}
                dateWritten={item[0].dateWritten}
                content={item[0].content}

            />

        </View>
    )
}


const HomeScreen = ({ route, navigation, ...props }) => {


    const { Moralis } = useMoralis();
    const [updated, setUpdated] = useState(false);
    const [articles, setArticles] = useState();
    const flatListRef = useRef();

    const getAllArticles = async () => {
        const posts = await Moralis.Cloud.run("getAllArticles");
        setArticles(posts)
    }

    const subscribeToPosts = async () => {
        //ask tutor
        let query = new Moralis.Query('Posts');
        let subscription = await query.subscribe();
        subscription.on('create', notifyOnCreate);
    }

    const notifyOnCreate = (result) => {
        setUpdated(result)
    }

    useEffect(() => {
        getAllArticles();
        //flatListRef.current.scrollToOffset({ animated: false, offset: 0 });
    }, [updated])

    useEffect(() => {
        subscribeToPosts()
    }, [updated])

    //context starts here
    const articlesCtx = useContext(ArticlesContext)

    // const articles = ARTICLES

    // const [fetchedArticles, setFetchedArticles]  = useState([])


    // useEffect( ()=>{
    //     async function getArticles(){
    //      const articles =  await fetchArticles();
    //      articlesCtx.setArticles(articles)
    //     //  setFetchedArticles(articles)
    //     }

    //     getArticles();

    // }, []);


    // //will be fetched with web3 api
    // const [blogs, setBlogs] = useState([
    //     {
    //         externalUrl: "https://ipfs.io/ipfs/Qmd7DuscoYu3bqBavGxcxvoR1yZDhp8B4sNncyorZphucM",
    //         author_of: "xxxx"
    //     }
    // ])

    // //will use axios to fetch token URI and title and blog post itself and store it
    // const [blogsContent, setBlogsContent] = useState()

    // const fetchArticlesContent = async () => {

    //     const limit7 = blogs?.slice(0, 7);
    //     let contentBlog = [];

    //     if (limit7) {
    //         limit7.map(async (blog) => {
    //             if (blog) {
    //                 const { externalUrl, author_of } = blog;
    //                 const res = await axios.get(externalUrl);
    //                 const text = res.data.text.toString();
    //                 const title = res.data.title;
    //                 contentBlog.push({ title, text, author_of, externalUrl });
    //             }
    //         })
    //     }

    //     setBlogsContent(contentBlog)
    // };

    // useEffect(() => {
    //     if (blogs && !blogsContent) {
    //         fetchArticlesContent
    //     }
    // }, []);





    return (


        //itemData and item prop are provided by ReactN

        <SafeAreaView style={[StyleSheet.absoluteFill, styles.container]}>

            <View style={styles.viewContainer}>

                <FlatList
                    data={articles}
                    renderItem={renderArticleItem}
                    // keyExtractor={(item)=>item.id}
                    keyExtractor={item => item.id}
                    inverted={true}
                    ref={flatListRef}
                />


                {/* <FlatList
                    data = {articlesCtx.articles}
                    // data={articles}
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
                /> */}

                {/* <ScrollView>
                    {blogsContent &&
                        blogsContent.map((blog, i) => {
                            const { title, text, author_of, externalUrl, id } = blog
                            return (
                                <ArticleItem
                                    key={id}
                                    id={key}
                                    title={title}
                                    userName={author_of}
                                    content={text}
                                    externalUrl={externalUrl}

                                />
                            )
                        })

                    }
                </ScrollView> */}

            </View>
        </SafeAreaView>



    )



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        marginTop: StatusBar.currentHeight || 0,
        marginBottom: 72,

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