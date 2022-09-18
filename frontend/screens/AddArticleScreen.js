import React from 'react'
import { View, ScrollView, Text, Button, StyleSheet, TextInput, Pressable, SafeAreaView, Modal, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ArticleImagePicker from '../components/Articles/ArticleImagePicker'
import { useCallback } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Dimensions } from 'react-native';



let windowHeight = Dimensions.get('window').height;

const AddArticleScreen = ({ navigation }) => {

    const windowWidth = Dimensions.get('window').width;
   



    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const [userId, setUserId] = useState('')

    const [pickerResponse, setPickerResponse] = useState(null)
    const [visible, setVisible] = useState(false)

    const [image, setImage] = useState('')

    

    const onAuthorChanged = e => setUserId(e.target.value)

    const onImageLibraryPress = () => {
        const options = {
            selectionLimit: 1,
            mediaType: 'mixed',
            includeBase64: false,
            width: 150,
            height: 150,

            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }

        launchImageLibrary(options, response => {
            if (response.errorCode) {
                console.log(response.errorMessage)
            } else if (response.didCancel) {
                console.log("User Cancelled")
            } else {
                const path = response.assets[0].uri
                setImage(path)
                setVisible(false)
            }
        })
        // launchImageLibrary(options, response =>{

        //     response
        // })
    }

    const onCameraPress = () => {

        const options = {

            mediaType: 'mixed',
            includeBase64: true,
            width: 150,
            height: 150,

            storageOptions: {
                skipBackup: true,
                path: 'images',
                cameraRoll: true,
                saveToPhotos: true
            }
        }

        launchCamera(options, response => {

            if (response.errorCode) {
                console.log(response.errorMessage)
            } else if (response.didCancel) {
                console.log('User Cancelled')
            } else {
                const uri = response.assets[0].uri
                setImage(uri)
                setVisible(false)

            }
        })
    }

   


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* <form> */}
                <View>
                    <Text style={styles.text}>Title</Text>
                    <TextInput placeholder='Title' placeholderTextColor={'gray'} style={styles.input} onChangeText={setTitle} value={title} selectionColor={'white'} inputStyle={{ color: 'red' }} />
                </View>

                <View>
                    <Text style={{ color: 'white', marginTop: 20, textAlign: 'center', fontSize: 20, marginBottom: 20 }}>Headline Image</Text>
                    <ArticleImagePicker uri={image} onPress={() => setVisible(true)} />
                    
                </View>

                <View >
                    <Modal
                        visible={visible}
                        onBackButtonPress={() => setVisible(!visible)}
                        onBackdropPress={() => setVisible(!visible)}
                        style={styles.modal}
                        animationType="slide"
                        transparent={true}
                    >
                        <View style={styles.buttons}>
                            <Pressable style={styles.button} onPress={onImageLibraryPress}>
                                {/* <View > */}
                                <Icon
                                    name='image-outline'
                                    color={'white'}
                                    size={32}
                                />
                                <Text style={styles.buttonText}>Library</Text>
                                {/* </View> */}
                            </Pressable>

                            <Pressable style={styles.button} onPress={onCameraPress}>
                                {/* <View  > */}
                                <Icon
                                    name='camera-outline'
                                    color={'white'}
                                    size={32}
                                />
                                <Text style={styles.buttonText}>Camera</Text>
                                {/* </View> */}
                            </Pressable>

                        </View>

                    </Modal>
                </View>

                <View>
                    <Text style={styles.text}>Article Content</Text>
                    <TextInput placeholder='Article Content' placeholderTextColor={'gray'} style={[styles.input, styles.inputMultiline]} onChangeText={setContent} value={content} selectionColor={'white'} inputStyle={{ color: 'red' }} multiline={true} />
                </View>

          

                <View style={{ marginTop: 200, marginBottom: 100, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginHorizontal: 16 }} >
                    <TouchableOpacity style={{ minWidth: 140, minHeight: 40, padding: 10, backgroundColor: 'gray', borderRadius: 5 }} >
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>Draft</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onSaveArticleClicked} style={{ minWidth: 140, minHeight: 40, padding: 10, backgroundColor: 'white', borderRadius: 5 }}  >
                        <Text style={{ color: 'black', textAlign: 'center', fontSize: 16 }}>Post</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        marginBottom: 20
    },
    text: {
        color: 'white',
        marginTop: 20,
        textAlign: 'center',
        fontSize: 20
    },
    input: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        height: 40,
        marginTop: 5,
        padding: 10,
        color: 'white',
        fontSize: 16
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    //modal
    modalContainer: {
        height: 40,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'

    },
    modal: {
        justifyContent: 'flex-end',
        height: 40,
        margin: 0,

    },
    buttonIcon: {
        width: 30,
        height: 30,
        margin: 10,

    },
    //buttons edit modalcontent
    buttons: {
        backgroundColor: 'gray',
        flexDirection: 'row',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,

        width: '100%',
        height: 100,
        justifyContent: 'flex-end',
        top: 620,
        // top: windowHeight*0.15

    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',

    },
    inputMultiline: {
        minHeight: 240,
        textAlignVertical: 'top',
        marginBottom: 20,
    }
})

export default AddArticleScreen;