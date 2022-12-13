const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000
const app = express()

// midleWare 
app.use(cors())
app.use(express.json())

// MongoDB setup 


// all product hare 



// basic api 
app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
    console.log(`server is running ${port}`)
})