export const getLoginController = (req, res) => {
  res.render('auth/login');
};

export const postLoginController = (req, res) => {
  const { username, password } = req.body;
  let error;
  if (!username) {
    error = 'kullanıcı adı bos olamaz';
  } else if (!password) {
    error = 'parola bos olamaz';
  } else if (username !== 'tayfun' || password !== '123') {
    error = 'kullanıcı adı ya da parola yanlıs';
  } else {
  }
  res.render('auth/login', {
    error,
  });
};
