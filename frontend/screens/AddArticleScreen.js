import React from 'react'
import { View, ScrollView, Text, Button, StyleSheet, TextInput, Pressable, SafeAreaView, Modal, TouchableOpacity } from 'react-native'
import { useState, useContext } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ArticleImagePicker from '../Components/Articles/ArticleImagePicker'
import { useCallback } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Dimensions } from 'react-native';
import { useMoralisDapp } from '../providers/MoralisDappProvider/MoralisDappProvider'
import { ArticlesContext } from '../store/context/articles-context'
import { useMoralis, useNewMoralisObject, useMoralisQuery, useMoralisFile } from "react-moralis";
// import * as ImagePicker from 'react-native-image-picker';
import { storeArticle } from '../utils/http';

const windowWidth = Dimensions.get('window').width;

export function getFormattedDate(date) {
    return date.toISOString().slice(0, 10);
}

const AddArticleScreen = ({ route, navigation, ...props }) => {

    const articlesCtx = useContext(ArticlesContext)

    const [title, setTitle] = useState('')
    const [featuredImageUrl, setFeaturedImageUrl] = useState('')
    const [featuredImage, setFeaturedImage] = useState('')
    const [articleBase64, setArticleBase64] = useState();

    const [content, setContent] = useState('')
    const [dateWritten, setDate] = useState('')

    const { Moralis } = useMoralis();
    const { data } = useMoralisQuery("User");
    const currentUserId = String(data.map((data) => data.id));
    const { walletAddress, chainId } = useMoralisDapp();
    const { isSaving, error, save } = useNewMoralisObject('Posts');
    const [pickerResponse, setPickerResponse] = useState(null)
    const [visible, setVisible] = useState(false)




    function titleChangedHandler(enteredTitle) {
        setTitle(enteredTitle)
    }

    function contentChangedHandler(enteredContent) {
        setContent(enteredContent)
    }

    function dateChangedHandler(enteredDate) {
        let formatedDate = getFormattedDate(enteredDate)
        setDate(formatedDate)
    }

    const onImageLibraryPress = () => {

        const options = {
            selectionLimit: 1,
            mediaType: 'mixed',
            //maybe change this
            includeBase64: true,
            width: 150,
            height: 150,

            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }

        //maybe ImagePicker.launchImageLibrary
        launchImageLibrary(options, response => {
            if (response.errorCode) {
                console.log(response.errorMessage)
            } else if (response.didCancel) {
                console.log("User Cancelled")
            } else {
                // const path = response.assets[0].uri
                const stringUri = String(response.assets.map((data) => data.uri))
                setFeaturedImageUrl(stringUri)
                setArticleBase64(response.assets.map(data => data.base64))
                setFeaturedImage(response)
                // setArticle(response)

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
                setFeaturedImage(uri)
                setVisible(false)

            }
        })
    }

    function submitHandler() {
        //add article properties here
        const articleData = {
            //check id ask mentor
            // id: key,
            userId: currentUserId,
            title: title,
            image: featuredImageUrl,
            userName: walletAddress,
            // dateWritten: new Date(date),
            content: content
        }
        confirmHandler(articleData)
        postArticle()
    }

    async function confirmHandler(articleData) {
        //ceramic here
        const id = await storeArticle(articleData)
        articlesCtx.addArticle({ ...articleData, id })

        navigation.goBack()


    }

    //IPFS
    const postArticle = async () => {
        //change article to image
        const data = featuredImage.assets.map((data) => data)
        const fileName = encodeURI(data.map((res) => res.fileName));
        const media = new Moralis.File(fileName, { base64: String(articleBase64) });
        await media.saveIPFS();

        save({
            // 'id': id,
            'userId': currentUserId,
            'title': title,
            'featuredImageUrl': media._ipfs,
            'userName': walletAddress,
            // 'dateWritten': dateWritten,
            'content': content
        });
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                {/* <form> */}
                <View>
                    <Text style={styles.text}>Title</Text>
                    <TextInput
                        placeholder='Title'
                        placeholderTextColor={'gray'}
                        style={styles.input}
                        onChangeText={titleChangedHandler}
                        value={title}
                        selectionColor={'white'}
                        inputStyle={{ color: 'red' }}

                    />

                </View>

                {/* image */}
                <View>
                    <Text style={{ color: 'white', marginTop: 20, textAlign: 'center', fontSize: 20, marginBottom: 20 }}>Headline Image</Text>
                    <ArticleImagePicker
                        //revise this
                        uri={featuredImageUrl}
                        onPress={() => setVisible(true)} />
                </View>

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

                <View>
                    <Text style={styles.text}>Article Content</Text>
                    <TextInput
                        placeholder='Article Content'
                        placeholderTextColor={'gray'}
                        style={[styles.input, styles.inputMultiline]}
                        onChangeText={contentChangedHandler}
                        value={content}
                        selectionColor={'white'}
                        inputStyle={{ color: 'red' }}
                        multiline={true} />
                </View>

                {/* buttons */}
                <View style={{ marginTop: 200, marginBottom: 100, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginHorizontal: 16 }} >
                    <TouchableOpacity onPress={''} style={{ minWidth: 140, minHeight: 40, padding: 10, backgroundColor: 'gray', borderRadius: 5 }} >
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>Draft</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => postArticle()} style={{ minWidth: 140, minHeight: 40, padding: 10, backgroundColor: 'white', borderRadius: 5 }}  >
                        <Text style={{ color: 'black', textAlign: 'center', fontSize: 16 }}>Post</Text>
                    </TouchableOpacity>
                </View>

                {/* modal */}
                <View >
                    <Modal
                        visible={visible}
                        onBackButtonPress={() => setVisible(!visible)}
                        onBackdropPress={() => setVisible(!visible)}
                        style={styles.modal}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={() => {
                            setVisible(false);
                        }}
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




            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        // marginBottom: 20
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
    //buttons edit modal content
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