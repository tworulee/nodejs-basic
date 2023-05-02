import express from 'express';
import dotenv from 'dotenv';
import auth from './routes/auth.js';
import session from 'express-session';

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
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

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
