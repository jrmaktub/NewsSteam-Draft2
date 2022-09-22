class Article {
    constructor(
        id, 
        userId, 
        title, 
        featuredImageUrl, 
        userName, 
        dateWritten, 
        content 

        ) 
        
        {
        this.id = id,
        this.userId = userId,
        this.title =  title,
        this.featuredImageUrl = featuredImageUrl,
        this.userName =  userName, 
        this.dateWritten = dateWritten
        this.content = content

        }
}

export default Article;