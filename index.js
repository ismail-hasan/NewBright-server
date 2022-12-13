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
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {

    const productCollection = client.db('brightProducts').collection('allBrightProducts')
    const blogCollection = client.db('brightBlog').collection('allBrightBlogs')

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
            console.log(id)
            const query = { _id: ObjectId(id) }
            const result = await productCollection.findOne(query)
            res.send(result)
        })

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


