import React from 'react';
import { createContext, useReducer } from "react";


// import {ARTICLES} from '../data/articleFBData'
const [updated, setUpdated] = useState(false );

  const [ARTICLES, setArticles] = useState();
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

export const ArticlesContext = createContext({
    articles: [],
    // addArticle: ({ id, userId, title, featuredImageUrl,userName, dateWritten, content }) => { },
    // setArticles: (articles)=> ({}),
    // deleteArticle: (id) => { },
    // //maybe add id?
    // updateArticle: (id, { userId, title, featuredImageUrl,userName, dateWritten, content }) => { }
    
})

function articleseReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            //might implement this into user ID
            // const id = new Date.toString + Math.random().toString
            //firebase includes id
            return [action.payload, ...state]

        case 'SET':
            const inverted = action.payload.reverse()
            return inverted

        case 'UPDATE':
            const updatableArticleIndex = state.findIndex((article)=> article.id === action.payload.id);
            
            const updatableArticle = state[updatableArticleIndex]

            const updatedItem ={...updatableArticle, ...action.payload.data}
            const updatedArticles= [...state]
            updatedArticles[updatableArticleIndex] = updatedItem
            return updatedArticles;

        case 'DELETE':
            return state.filter((article) => article.id !== action.payload);
        default:
            return state
    }
}

function ArticlesContextProvider({ children }) {

    // const [articlesState, dispatch] = useReducer(articleseReducer, ARTICLES);
    const [articlesState, dispatch] = useReducer(articleseReducer, ARTICLES);

    function addArticle(articleData) {
        dispatch({ type: 'ADD', payload: articleData })
    }

    function setArticles(articles){
        dispatch({type: 'SET',  payload: articles})
    }

    function deleteArticle(id) {
        dispatch({ type: 'DELETE', payload: id })
    }

    function updateArticle(id, articleData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: articleData } })
    }

    const value ={
        articles: articlesState,
        setArticles: setArticles,
        addArticle: addArticle,
        deleteArticle: deleteArticle,
        updateArticle: updateArticle
    }

    return <ArticlesContext.Provider value={value}>{children}</ArticlesContext.Provider>
}

export default ArticlesContextProvider