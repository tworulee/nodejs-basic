import { validationResult } from 'express-validator';
import slugify from 'slugify';

export const getRegisterController = (req, res) => {
  res.render('auth/register');
};

export const getLoginController = (req, res) => {
  res.render('auth/login');
};

export const postLoginController = (req, res) => {
  const { username, password } = req.body;
  res.locals.formData = req.body;
  let error;
  if (!username) {
    error = 'kullanıcı adı bos olamaz';
  } else if (!password) {
    error = 'parola bos olamaz';
  } else if (username !== 'tayfun' || password !== '123') {
    error = 'kullanıcı adı ya da parola yanlıs';
  } else {
    req.session.username = username;
    return res.redirect('/');
  }
  res.render('auth/login', {
    error,
  });
};

export const postRegisterController = (req, res) => {
  res.locals.formData = req.body;

  const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({
  //     errors: errors.array(),
  //   });
  // }

  //Hata yoksa 
  if (errors.isEmpty()) {
    let avatar = req.files.avatar;
    let file = avatar.name.split(".")
    let fileExtension = file.pop()
    let fileName = file.join("")
    let path = "upload/" + Date.now() + "-" + slugify(fileName, {
      lower: true,
      locale: "tr",
      strict:true
    }) + "." + fileExtension;
    avatar.mv(path, err => {
      if (err) {
        return res.status(500).send(err);
      }
      console.log("Kayıt Basarılı")
    })
  }

  res.render('auth/register', {
    errors: errors.array(),
  });
};

export const logoutController = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
