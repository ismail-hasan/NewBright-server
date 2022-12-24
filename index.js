const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000
const app = express()

// midleWare 
app.use(cors())
app.use(express.json())

// MongoDB setup 
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.w4v9v80.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {

    const productCollection = client.db('brightProducts').collection('allBrightProducts')
    const blogCollection = client.db('brightBlog').collection('allBrightBlogs')
    const cartCollection = client.db('brightCart').collection('allBrightCartProducts')
    const reviewCollection = client.db('brighReview').collection('allBrightReviewProducts')
    const wishListCollection = client.db('brightWishList').collection('allBrightWishList')

    try {

        // all product data 
        app.get('/products', async (req, res) => {
            const query = {}
            const reslut = await productCollection.find(query).toArray()
            res.send(reslut)
        })


        //one  product data 
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await productCollection.findOne(query)
            res.send(result)
        })

        // query by category 
        app.get("/product", async (req, res) => {
            const cata = req.query.category
            const query = { category: cata }
            const result = await productCollection.find(query).toArray()
            res.send(result)
        })


        // cart api start 
        // data get by client side cart data

        app.post('/cart', async (req, res) => {
            const body = req.body
            const result = await cartCollection.insertOne(body)
            res.send(result)
        })

        // get cart product data in databases 
        app.get('/allcarts', async (req, res) => {
            const query = {}
            const result = await cartCollection.find(query).toArray()
            res.send(result)
        })

        // cart query by email
        app.get("/cart", async (req, res) => {
            const email = req.query.email
            const query = { email: email }
            const reslut = await cartCollection.find(query).toArray()
            res.send(reslut)
        })

        app.delete('/deletecart/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await cartCollection.deleteOne(query)
            res.send(result)
        })

        /* //
        // wishlist data api  start
        // */

        app.post('/wish', async (req, res) => {
            const body = req.body
            const result = await wishListCollection.insertOne(body)
            res.send(result)
        })

        app.get('/wish', async (req, res) => {
            const email = req.query.email
            const query = { email: email }
            const result = await wishListCollection.find(query).toArray()
            res.send(result)
        })

        app.delete('/wishdelete/:id', async (req, res) => {
            const id = req.params.id
            const query = { mainId: id }
            const result = await wishListCollection.deleteOne(query)
            if (id === query) {
                res.send("already added")
                console.log("dfsf")
            }
            res.send(result)
        })



        // app.put('/wishlists/:id', async (req, res) => {
        //     const email = req.body.email
        //     console.log("fg", email)
        //     const id = req.params.id
        //     const query = { _id: ObjectId(id) }
        //     const options = { upsert: true };
        //     const updateDoc = {
        //         $set: {
        //             wishlist: true,
        //             email
        //         },
        //     };
        //     const result = await productCollection.updateOne(query, updateDoc, options)
        //     res.send(result)
        // })

        /* //
        // wishlist data api  end
        // */


        /* //
        // review data api  start
        // */


        // review post api 
        app.post('/review', async (req, res) => {
            const body = req.body
            const reslut = await reviewCollection.insertOne(body)
            res.send(reslut)
        })

        // review get api 
        app.get("/review", async (req, res) => {
            const query = {}
            const result = await reviewCollection.find(query).toArray()
            res.send(result)
        })


        /* //
          // review data api  end
          // */





        /* //
        // register data api  start
        // */

        app.post('/register', async (req, res) => {
            const body = req.body
            // const result = await cartCollection.insertOne(body)
            // res.send(result)
        })


        /* //////////////
        // register data api  end
        /////////////////
    
        /* //
        // blog data api  start
        // */

        app.get('/blogs', async (req, res) => {
            const query = {}
            const result = await blogCollection.find(query).toArray()
            res.send(result)
        })

        app.get('/limitbLog', async (req, res) => {
            const query = {}
            const cursor = await blogCollection.find(query).limit(4).toArray()
            res.send(cursor)
        })

        app.get('/blogs/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await blogCollection.findOne(query)
            res.send(result)
        })

        /* //
        // blog data api end
        // */
    }
    finally { }
}
run().catch(e => console.log(e))



// all product hare 



// basic api 
app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
    console.log(`server is running ${port}`)
})


