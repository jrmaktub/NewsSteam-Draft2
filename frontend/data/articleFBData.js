import Article from "../models/Article"
import Category from "../models/Category"


export const CATEGORIES = [
     new Category('c1', 'Latest', '#f5428d' ),
     new Category('c2', 'Crypto', '#fff' ),
     new Category('c3', 'Sports', '#9eecff' ),
     new Category('c4', 'Politics', '#f5d142' ),
     new Category('c5', 'Entertainment', '#368dff' ),
     new Category('c6', 'World', '#f5a442' ),
     new Category('c7', 'Health', '#f5a442' ),
     new Category('c8', 'Technology', '#f5a442' ),
     new Category('c9', 'Business', '#f5a442' ),
     new Category('c10', 'Positive News', '#f5a442' ),
    ]
// id, userId, title, featuredImageUrl, userName, dateWritten, content,  category, description, likes, comments

export const ARTICLES = [
    new Article(
        'a1',
        'u1',
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni a necessitatibus obcaecati, numquam perferendis assumenda suscipit voluptas dolorum quod voluptatibus.',
        'https://s1.ticketm.net/dam/a/c90/965833d9-2f76-4e79-bd87-f2bc61282c90_1339931_TABLET_LANDSCAPE_LARGE_16_9.jpg',
        'Elon Musk',
        'December 25 2022',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui impedit ipsa quisquam obcaecati libero eos excepturi neque, quidem atque rem vero corporis quasi nostrum doloribus optio! Dolorem, assumenda illo, vel laborum eaque deserunt fugit voluptatem, officia earum veritatis cupiditate exercitationem cumque voluptate aspernatur similique. \n \n Blanditiis eos repellendus enim libero, recusandae ut doloremque fuga dicta delectus! Eveniet, ea corrupti deleniti assumenda exercitationem a saepe asperiores veritatis blanditiis quia perspiciatis in quasi, laudantium rem pariatur omnis perferendis temporibus cupiditate sunt. Recusandae vel unde consectetur ratione nihil ipsum a doloribus voluptate, maxime dolor quaerat eum iure, adipisci, harum rerum quidem quas culpa. \n \n Accusantium modi rerum adipisci necessitatibus illum tenetur quaerat eligendi impedit expedita quibusdam, quod amet saepe labore maxime, voluptates consequuntur? Necessitatibus quod magni dolore fuga dolorum. Quidem, a saepe deserunt, minus ad doloremque excepturi maiores commodi quas perferendis, natus numquam placeat dolore qui tempora veniam fuga repudiandae quisquam nobis autem ea alias.',
        ['c1'],
        'Description1',
        5,
        10
    ),
    new Article(
        'a2',
        'u1',
        'Layer 2 Comming Soon',
        'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2021/03/ethereum-1.jpeg',
        'Kobe Bryant',
        'July 11 2006',
        'Content 2',
        ['c2'],
        'Description1',
        5,
        10
    ),
    new Article(
        'a3',
        'u1',
        'Mars Up Close',
        'https://studentwork.prattsi.org/infovis/wp-content/uploads/sites/3/2021/02/spacex-tesmanian_1600x.jpg',
        'Michael Phelps',
        'July 11 2006',
        'Content 2',
        ['c2'],
        'Description1',
        5,
        10
    ),
    new Article(
        'a4',
        'u1',
        'Title 4',
        'https://cyberhoot.com/wp-content/uploads/2021/07/spacex-starlink-cerexio-blog-post-cover-01.jpeg',
        'Rick Sanchezz',
        'July 11 2006',
        'Content 2',
        ['c3'],
        'Description1',
        5,
        10
    )
]

