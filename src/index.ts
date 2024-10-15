import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import cookieParser  from "cookie-parser"
import userRouter from "./routes/user.routes"
const app = express()

app.use(express.json());
app.use(cookieParser())
app.use(cors())

app.use("/api/user/",userRouter )

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})