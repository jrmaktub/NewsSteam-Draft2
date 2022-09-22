import { createContext, useReducer } from "react";


import {ARTICLES} from '../data/articleFBData'

//will be fetched with web3 api
// const [blogs, setBlogs] = useState([
//     {
//         externalUrl: "https://ipfs.io/ipfs/Qmd7DuscoYu3bqBavGxcxvoR1yZDhp8B4sNncyorZphucM",
//         author_of: "xxxx"
//     }
// ])

export const ArticlesContext = createContext({
    articles: [ARTICLES],
    addArticle: ({ title, image, date, content }) => { },
    deleteArticle: (id) => { },
    updateArticle: (id, { title, image, date, content }) => { }
})

function articleseReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date.toString + Math.random().toString
            return [{ ...action.payload, id: id }, ...state]

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

    const [articlesState, dispatch] = useReducer(articleseReducer, ARTICLES);

    function addArticle(articleData) {
        dispatch({ type: 'ADD', payload: articleData })
    }

    function deleteArticle(id) {
        dispatch({ type: 'DELETE', payload: id })
    }

    function updateArticle(id, articleData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: articleData } })
    }

    const value ={
        articles: articlesState,
        addArticle: addArticle,
        deleteArticle: deleteArticle,
        updateArticle: updateArticle
    }

    return <ArticlesContext.Provider value={value}>{children}</ArticlesContext.Provider>
}

export default ArticlesContextProvider