import express from 'express'
import 'dotenv/config'//Dùng để cấu hình các biến ở một file khác

const app = express()
const port = process.env.PORT || 3000;

//Vì khi req gửi dữ liệu về server thì có thể có rât nhiều tham số dùng lẹnh này để giảng lược các tham số gửi về thành .body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Template Engine======================================
import configViewEngine from './config/viewEngine'
configViewEngine(app);

//Init Web Route=======================================
import initWebroute from './route/web'
initWebroute(app);

//Init Connect Database================================
import initConnectDB from './config/connectDB'
initConnectDB();

app.listen(port)