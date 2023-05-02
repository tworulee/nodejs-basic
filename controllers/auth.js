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
