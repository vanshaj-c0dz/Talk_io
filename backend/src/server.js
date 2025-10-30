import "dotenv/config"
import express from "express"
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import chatRoutes from "./routes/chat.route.js"
import cookieparser from "cookie-parser"
import { connectDB } from "./lib/db.js"
import cors from "cors";

import path from "path" 
 
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieparser())

// app.get("/" , (req,res)=>{
//     res.send("Hello World!")
// });

const __dirname = path.resolve()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use("/api/auth" , authRoutes)
app.use("/api/users" , userRoutes)
app.use("/api/chat" , chatRoutes)


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    })
}


app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`)
    connectDB()
});