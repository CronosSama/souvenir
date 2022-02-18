import express from 'express';
import bodyParser  from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import Error_Handler from './controllers/error_handler.js';
import post_router from './routes/postes_routes.js';
import auth_router from './routes/auth_routes.js';
import donation_router from "./routes/donation_routes.js"
import chalk from 'chalk';
import dotenv from "dotenv";
dotenv.config();
//the first one is because heroku going to add an entry to out env file called PORT
//that our website will be using
const PORT = process.env.PORT;
const app = express();

//Limiting the size of the request/responses to not be more than 30mb
app.use(bodyParser.json({limit : "30mb",extended:true}))
app.use(bodyParser.urlencoded({limit : "30mb",extended:true}))
app.use(cors())

//START of our  Routes will be here
app.use("/api/",donation_router)
app.use('/api/post',post_router)
app.use('/api/auth',auth_router)








//End of our Routes
//// Errors : 
// make an error if the user got here, that will only happens if only the route doesn't exist
// middleware


app.use((req,res,next)=>{
  let err = new Error("[app.use] The Route Not Found !!")
  err.status = 404
  next(err)

})
//middleware will handle All Error
app.use(Error_Handler)


////Connecting to the database and starting the server 
//.connect returns a promise

mongoose.set("debug",true);
// So we can use async and promises instead of callback function
mongoose.Promise = Promise;
const connection_url = process.env.CONNECTION_URL
mongoose.connect(connection_url,{
    keepAlive : true,
    useNewUrlParser: true,
    useUnifiedTopology: true
    //if the connection is successful (server is running), let the app listen in this PORT
}).then(()=>{
  app.listen(PORT,()=>{
    console.log(chalk.magenta.bgBlack(`SERVER IS RUNNING  [${PORT}]`))
  })
}).catch((err)=>console.log("AN ERROR HAPPEND ... ",err))

