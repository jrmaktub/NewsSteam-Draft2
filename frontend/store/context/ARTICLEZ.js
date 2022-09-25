import React, { useState, useEffect, useContext, useRef } from 'react'

import { useMoralis, useNewMoralisObject, useMoralisQuery, useMoralisFile, useWeb3ExecuteFunction } from "react-moralis";

const ARTICLEZ = ({ route, navigation, ...props }) => {

    const { Moralis, account } = useMoralis();
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


}


export default ARTICLEZ