const express = require('express');

const {connection} = require('./database/db.js');
const Oil = require('./database/models/oil-data.js');
const cors = require('cors');

const app = express();
app.use(cors())
const getInfo = async (req,res)=> {
    const info = await Oil.find();
    return res.status(200).json(info)
}

app.get('/',getInfo)




connection(process.env.MONGODB_CONNECTION_STRING);


app.listen(3000,()=>{
	console.log('Server is listening')
})