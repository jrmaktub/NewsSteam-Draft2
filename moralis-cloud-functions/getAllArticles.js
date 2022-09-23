//Get All Memes
Moralis.Cloud.define("getAllArticles", async function (request) {
    const query = new Moralis.Query("Posts");
    const result = await query.find();

    const userQuery = new Parse.Query("User");
    const userResult = await userQuery.find({ useMasterKey: true });

    // const posts = result.map((data) => {

    //     return {
    //         id: data.id,
    //         userName: res.attributes.username,
    //         ethAddress: res.attributes.ethAddress,
    //         caption: data.attributes.caption,
    //         meme: data.attributes.assetUrl
    //     }// } .filter(n => n);

    // })

    const articles = result.map((data) => {

        return userResult.map((res) => {
            //   if (data.attributes.createdById === res.id) {
            //maybechange attributes to only post object
            return {
                id: data.id,
                userId: data.attributes.userId,
                title: data.attributes.title,
                featuredImageUrl: data.attributes.featuredImageUrl,
                userName: data.attributes.userName,
                dateWritten: data.attributes.createdAt,
                content: data.attributes.content
            }
            //   }
            //maybe remmove filter

            // 'userId': currentUserId,
            // 'title': title,
            // 'featuredImageUrl': media._ipfs,
            // 'userName': walletAddress,
            // 'dateWritten': dateWritten,
            // 'content': content
        })

    })

    return articles;
});


//Get All Memes
Moralis.Cloud.define("getMyArticles", async function (request) {
    const query = new Moralis.Query("Posts");
    const result = await query.find();

    const userQuery = new Parse.Query("User");
    const userResult = await userQuery.find({ useMasterKey: true });

    const articles = result.map((data) => {

        return userResult.map((res) => {
            if (data.attributes.createdById === res.id) {
                return {
                    id: data.id,
                        userName: res.attributes.username,
                        ethAddress: res.attributes.ethAddress,
                    caption: data.attributes.caption,
                    meme: data.attributes.assetUrl
                }
            }
        }).filter(n => n);

    })

    return articles;
});

