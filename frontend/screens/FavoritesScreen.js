import React from 'react';
import { useLayoutEffect } from 'react'

import { View, Text, StyleSheet, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ArticleItem from '../components/Articles/ArticleItem'

import { FavoritesContext } from '../store/context/favorites-context'
import {ARTICLES} from '../data/articleFBData'

function FavoritesScreen({ route, navigation, ...props }) {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Saved Articles',
            headerShown: true,
            headerBackVisible: true,
            headerBackTitle: '',
            headerTintColor: 'gold',
            headerStyle: { shadowColor: 'transparent', backgroundColor: 'black' }
        })

    }, [navigation])

    const favoriteArticlesCtx =  useContext(FavoritesContext);
    
    const favoriteArticles = ARTICLES.filter(article => favoriteArticlesCtx.includes(article.id))

    if (favoriteArticles.length === 0) {
        return (
            <View style={styles.rootContainer}>
                <Text style={styles.text}>You have no favorites</Text>
            </View>
        )
    }

    

    return (
        <SafeAreaView  style={styles.rootContainer}>

        <FlatList
            data={favoriteArticles}
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
                    onMoreOptions={() => {}}
                />
            )}
        />

        </SafeAreaView>
    )

    
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: 'black'
    },
    text: {
        color: 'white',
        textAlign: 'center'
    }
})

                {/* date*/}
                {/* <View>
                    <TextInput
                        placeholder='YYYY-MM-DD'
                        maxLength={10}
                        //revise this
                        onChangeText={dateChangedHandler}
                        value={dateWritten}
                    />
                </View> */}

export default FavoritesScreen;