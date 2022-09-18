class Article {
    constructor(
        id, 
        userId, 
        title, 
        featuredImageUrl, 
        userName, 
        dateWritten, 
        content, 
        categoryIds, 
        description, 
        likes, 
        comments 
        ) 
        
        {
        this.id = id,
        this.userId = userId,
        this.title =  title,
        this.featuredImageUrl = featuredImageUrl,
        this.userName =  userName, 
        this.dateWritten = dateWritten
        this.content = content,
        this.categoryIds = categoryIds,
        this.description = description,
        this.likes  = likes,
        this.comments = comments
    }
}

export default Article;