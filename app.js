const express = require('express');
const app = express();
const taskRoute = require('./routes/tasks');
const connectDB = require('./db/connect');
require("dotenv").config();

app.use(express.json());
app.use(express.static('./public'));

const PORT = 5000;

//ルーティング設計　//第一引数で共通する部分を指定して、第二引数で異なる部分をtaskRouteに引き渡す
app.use('/api/v1/tasks', taskRoute);

//データベースと接続
const start = async () => {
    try{
        await connectDB(process.env.MONGO_VERCEL_URL || process.env.MONGO_URL);
        app.listen(process.env.PORT || PORT, console.log('サーバーが起動しました'));
    } catch(error) {
        console.log(error);
    }
};

start();



