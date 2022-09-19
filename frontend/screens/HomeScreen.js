import React from 'react'

import { View, Text, Button, StyleSheet, FlatList, Image, StatusBar } from 'react-native'

import ArticleItem from '../Components/Articles/ArticleItem'

import { useEffect } from 'react';
import {ARTICLES} from '../data/articleFBData'

import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ route, navigation, ...props }) => {

    const articles = ARTICLES




    return (


        //itemData and item prop are provided by ReactN

        <SafeAreaView style={[StyleSheet.absoluteFill, styles.container]}>

            <FlatList
                data={articles}
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
            />
        </SafeAreaView>



    )



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        marginBottom: 72,
        marginTop: StatusBar.currentHeight || 0,
        

    },
    categoriesContainer: {
        marginTop: 20,
        height: 64
    }

})


//testing
export default HomeScreen;