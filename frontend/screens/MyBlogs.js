import React, { useContext, useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Image, FlatList, ScrollView, Button } from 'react-native'
import axios from 'axios'
import ArticleItem from '../Components/Articles/ArticleItem'


const MyBlogs = (router,navigation,...props) => {

    //will be fetched with web3 api
    const [blogs, setBlogs] = useState([
        {
            externalUrl: "https://ipfs.io/ipfs/Qmd7DuscoYu3bqBavGxcxvoR1yZDhp8B4sNncyorZphucM",
            author_of: "xxxx"
        }
    ])
    //will use axios to fetch token URI and title and blog post itself and store it
    const [blogsContent, setBlogsContent] = useState()


    const fetchArticlesContent = async () => {

        const limit7 = blogs?.slice(0, 7);
        let contentBlog = [];

        if (limit7) {
            limit7.map(async (blog) => {
                if (blog) {
                    const { externalUrl, author_of } = blog;
                    const res = await axios.get(externalUrl);
                    const text = res.data.text.toString();
                    const title = res.data.title;
                    contentBlog.push({ title, text, author_of, externalUrl });
                }
            })
        }

        setBlogsContent(contentBlog)
    };

    useEffect(() => {
        if (blogs && !blogsContent) {
            fetchArticlesContent
        }
    }, []);


    const clickHandler = () =>{
        navigation.navigate('AddArticleScreen', {

        })
    }

    return (
        <View style={styles.viewContainer}>
            <View style={styles.titleContainer}>
                <Text numberOfLines={3} style={styles.title}>Your blogs </Text>
            </View>

            <ScrollView>
                {blogsContent && blogsContent?.length > 0 ? (
                    blogsContent.map((blog, i) => {
                        const { title, text, author_of, externalUrl } = blog
                        return (
                            <ArticleItem
                                key={i}
                                id={key}
                                title={title}
                                userName={author_of}
                                content={text}
                                externalUrl={externalUrl}

                            />
                        )
                    })

                ): (
                    <View style={styles.titleContainer}>
                        <Text numberOfLines={3} style={styles.title}>No Blogs Yet. When Airdrop? </Text>
                        <Button onPress={clickHandler}>Create One</Button>
                    </View>
                )}
            </ScrollView>

        </View>
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
})


export default MyBlogs;