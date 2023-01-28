const express = require('express');
const app = express();
require('./db/mongo_db')
require('./db/mysql2_db')
require('./db/sequelize_db')
require('./models/sequelize/user')
require('./models/sequelize/post')
const mongo_router = require("./routes/mongo_router");
const mysql2_router = require("./routes/mysql2_router");
const sequelize_router = require("./routes/sequelize_router");

// middleware
app.use(express.json())


app.use('/mongo',mongo_router);
app.use('/mysql2',mysql2_router);
app.use('/sequelize',sequelize_router);


port =3000;
app.listen(port,()=>{
    console.log("server starts at port no :" + port);
})