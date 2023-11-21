import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import UserExtRoute from "./routes/UserExtRoute.js";
import AuthRoute from "./routes/AuthRoute.js"
import AppConfigRoute from "./routes/AppConfigRoute.js";
import InstansiRoute from "./routes/InstansiRoute.js";
import KantorRoute from "./routes/KantorRoute.js";
import TntRoute from "./routes/TntRoute.js";
import PencairanDesaRoute from "./routes/PencairanDesaRoute.js";
import ReffDesaRoute from "./routes/ReffDesaRoute.js";
import ReffKecamatanRoute from "./routes/ReffKecamatanRoute.js";
import ReffAbaRoute from "./routes/ReffAbaRoute.js";
import MenuRoute from "./routes/MenuRoute.js";



dotenv.config();


const app = express(); 


const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({    
    db: db
});

(async()=>{
    await db.sync();
})();



app.set('trust proxy', 1);
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    rolling: true,    
    cookie: {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 10*60*1000 // 10 menit
     
    },
    proxy: true
  
}))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    credentials: true,
    origin: 'https://tntd.bprsbtb.co.id'
}));


app.use(cookieParser());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public")); 
app.use(UserRoute);
app.use(UserExtRoute);
app.use(AuthRoute);
app.use(AppConfigRoute);
app.use(InstansiRoute);
app.use(KantorRoute);
app.use(TntRoute);
app.use(MenuRoute);
app.use(PencairanDesaRoute);
app.use(ReffDesaRoute);
app.use(ReffKecamatanRoute);
app.use(ReffAbaRoute);


store.sync();

app.listen(process.env.APP_PORT, ()=> {
    console.log('Server up and running...');
});


const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Jakarta'
    });
    // console.log(nDate);




