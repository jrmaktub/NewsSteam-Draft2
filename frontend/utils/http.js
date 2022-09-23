import axios from 'axios'

const CERAMIC_URL = ''

export async function storeArticle(articleData){
    //url to which the request should be sent to  post
    //ceramic url
    const response = await axios.post(CERAMIC_URL + '/articles.json', articleData);
    //firebase property. change it
    const id =  response.data.name;
    return id
}

export async function fetchArticles(){
   const response = await axios.get(CERAMIC_URL + '/articles.json',)

   const articles = [];

    //data property provided by axios
    for (const key in articles.data){
        const articleObject = {
            // change remove ID,
            //and userId 
            id: key,
            userId: response.data[key].userId, 
            title: response.data[key], 
            featuredImageUrl: response.data[key], 
            userName: response.data[key], 
            dateWritten: new Date(response.data[key]), 
            content: response.data[key] , 

        }

        articles.push(articleObject)
    }

    return articles
}

