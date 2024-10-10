import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import userRouter from "./routes/user.routes"
const app = express()

app.use(express.json());
app.use(cors())

app.get("/",userRouter )

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})