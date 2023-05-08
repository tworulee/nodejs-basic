import express from 'express';
import dotenv from 'dotenv';
import auth from './routes/auth.js';
import session from 'express-session';
import fileUpload from 'express-fileupload';

dotenv.config();

//expressi baslatıyor
const app = express();
const port = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.use(
  express.urlencoded({
    extended: true,
  })
);
//upload klasörüne ulasmak iciin
app.use("/assets", express.static("assets"))
app.use("/upload", express.static("upload"))
app.use(fileUpload({
  //setFileNames: true,
  //preserveExtension: true,
  useTempFiles:true
  
}));
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.get('/', (req, res) => {
  res.render('index', {
    title: 'deneme baslik',
    greeting: 'Hosgeldin Gardas',
  });
});

app.use('/auth', auth);

app.listen(port, () =>
  console.log(`http://localhost:${port} portundan dinleniyor`)
);
