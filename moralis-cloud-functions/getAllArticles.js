//Get All Memes
// Moralis.Cloud.define("getAllArticles", async (request) => {
//     const query = new Moralis.Query("Posts");
//     const result = await query.find({ useMasterKey: true });

//     const userQuery = new Parse.Query("User");
//     const userResult = await userQuery.find({ useMasterKey: true });

//     const articles = result.map((data) => {
//         return {
//             id: data.attributes.objectId,
//             userId: data.attributes.userId,
//             title: data.attributes.title,
//             featuredImageUrl: data.attributes.featuredImageUrl,
//             userName: data.attributes.userName,
//             dateWritten: data.attributes.createdAt,
//             content: data.attributes.content
//         }

//     })



    
//     return  articles, result
// });

//test99
Moralis.Cloud.define("getAllArticles", async (request) => {

    const Posts = Moralis.Object.extend("Posts");
    let query = new Parse.Query(Posts);
    query.select('objectId', 'userId', 'title', 'featuredImageUrl', 'userName','createdAt', 'content');
    const queryResults = await query.find({useMasterKey:true});
    const results = [];  

    for (let i = 0; i < queryResults.length; ++i) {
      
           
          results.push({
            "id": queryResults[i].attributes.objectId,
            "title": queryResults[i].attributes.title, 
            "featuredImageUrl": queryResults[i].attributes.featuredImageUrl,
            "userName": queryResults[i].attributes.userName,
            "content": queryResults[i].attributes.content,
            "userId": queryResults[i].attributes.userId,   
            "createdAt": queryResults[i].attributes.createdAt,
            
          });
       
      
    }
    return results;
  });


