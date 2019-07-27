//loads the config file
require('dotenv').config();

const expressEdge = require('express-edge');
const express = require('express');
const edge = require('edge.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const connectFlash = require('connect-flash');
const cloudinary = require('cloudinary');

//DECLARING MIDDLEWARES
const storePost = require('./middleware/storePost');
const auth = require('./middleware/auth');
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated');
//DECLARING CONTROLLERS
const createPostController = require('./controllers/createPost');
const homepageController = require('./controllers/homepage');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const createUserController = require('./controllers/createUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const contactController = require('./controllers/contact');
const aboutController = require('./controllers/about');
const logoutController = require('./controllers/logout');
const app = new express();
//mongoose.connect('mongodbb://localhost/node-js-blog');
mongoose.connect(process.env.DB_URI,{ useNewUrlParser: true });
//mongoose.connect("mongodb://localhost:27017/node-js-blog", { useNewUrlParser: true });
app.use(connectFlash());
app.use(fileUpload());
app.use(express.static('public'));
const mongoStore = connectMongo(expressSession);
app.use(expressSession({
    secret:'secret',
    store: new mongoStore({mongooseConnection:mongoose.connection})
}));
//cloudinary configuration details

cloudinary.config({
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_NAME,
})


app.use(expressEdge);
//means to call this middleware over all requests.
app.use('*',(req,res,next)=>{
    
    edge.global('auth',req.session.userId);
    next();
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

app.set('views',`${__dirname}/views`);

app.get('/',homepageController);
app.get('/post/:id',getPostController);
app.get('/auth/logout' ,auth, logoutController);
app.get('/posts/new',auth, createPostController);
app.post('/posts/store', auth,storePost,storePostController);
app.get('/contact', contactController);
app.get('/about', aboutController);
app.get('/auth/login' ,redirectIfAuthenticated, loginController);
app.post('/users/login',redirectIfAuthenticated,loginUserController);
app.get('/auth/register',redirectIfAuthenticated, createUserController);
app.post('/users/register',redirectIfAuthenticated, storeUserController);
app.use((req,res)=> res.render('not-found'));
app.listen(process.env.PORT,()=>{
    console.log("App is running at port "); //${process.env.PORT});
});
    