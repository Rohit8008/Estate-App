import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import postRoute from './routes/post.route.js'
import testRoute from './routes/test.route.js'

const app = express();
const Port = 8080 

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin : process.env.CLIENT_URL, credentials: true}));

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/test",testRoute);

app.listen(Port,()=>{
    console.log("Server is running!");
})