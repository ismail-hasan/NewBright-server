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
            console.log(result.category)
            res.send(result)
        })

        // query by category 
        app.get("/product", async (req, res) => {
            const cata = req.query.category
            const query = { category: cata }
            const result = await productCollection.find(query).toArray()
            res.send(result)
        })

        // data get by client side cart data
        app.post('/cart', async (req, res) => {
            const body = req.body
            console.log(body)
            const result = await cartCollection.insertOne(body)
            res.send(result)
        })

        // get cart product data in databases 

        app.get('/carts', async (req, res) => {
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




        /* //
        // wishlist data api  start
        // */

        app.get('/wishlists', async (req, res) => {
            const query = { wishlist: true }
            const result = await productCollection.find(query).toArray()
            res.send(result)
        })



        app.put('/wishlists/:id', async (req, res) => {
            const email = req.body.email
            console.log("fg", email)
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    wishlist: true,
                    email
                },
            };
            const result = await productCollection.updateOne(query, updateDoc, options)
            res.send(result)
        })

        /* //
        // wishlist data api  end
        // */


        /* //
        // register data api  start
        // */

        app.post('/register', async (req, res) => {
            const body = req.body
            console.log(body)
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


