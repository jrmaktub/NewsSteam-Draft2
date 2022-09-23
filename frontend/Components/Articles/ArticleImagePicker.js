import React from 'react'
import { View, Text, Button, StyleSheet, TextInput, Pressable, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native'

import { useState } from 'react'

import Icon from 'react-native-vector-icons/Ionicons';


const ArticleImagePicker = ({ uri, onPress }) => {

    // const [image, setImage] = useState('');

    const uriImage =  ''
    
    return (
        <View style={{alignItems: 'center',}}>
        <TouchableOpacity onPress={onPress}>
            <View style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 24,
                marginTop: 24,
                borderColor: 'white',
                borderWidth: 1,
                borderStyle: 'dashed'
              }} >
            <ImageBackground
                // source={{
                //     uri: image,
                //   }}
                // source={uri ? { uri } : image}
                // source={uri ? { uri } : uriImage}
                source={{uri}}
                style={{height: 150, width: 150, }}
                imageStyle={{ borderRadius: 15, height: 150, width: 150, }}>
                    
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: 'white',
                    
                  }} >

                    {/* <FontAwesomeIcon 
                        icon={faCreditCard} 
                        color={color} 
                        size={20} 
                    /> */}

                    <Icon
                        name="camera"
                        size={35}
                        color="white"
                        style={{
                            opacity: 0.7,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: '#fff',
                            borderRadius: 10,
                        }} />

                </View>

            </ImageBackground>
            </View>
        </TouchableOpacity>
        </View>



    )
}
const styles = StyleSheet.create({
    ImageBackground: {
        flex: 1,
    },
    imageContainer: {
        height: 100,
        width: 100,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'dashed'
    },
    avatar: {
        marginTop: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },

})

export default ArticleImagePicker;