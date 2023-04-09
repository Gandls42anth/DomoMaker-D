const requiresLogin = (req, res, next) => {
  console.log('requiresLogin');
  if (!req.session.account) {
    console.log('found no account with this session, redirecting to index');
    return res.redirect('/');
  }
  return next();
};

const requiresLogout = (req, res, next) => {
  console.log('requires logout');
  if (req.session.account) {
    console.log('found a session with an account, redirecting to maker');
    return res.redirect('/maker');
  }
  return next();
};

const requiresSecure = (req, res, next) => {
  console.log('in requires secure');
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`http://${req.hostname}${req.url}`);
  }
  return next();
};
const bypassSecure = (req, res, next) => {
  next();
};

module.exports.requiresLogin = requiresLogin;
module.exports.requiresLogout = requiresLogout;

if (process.env.NODE_ENV === 'production') {
  module.exports.requiresSecure = requiresSecure;
} else {
  module.exports.requiresSecure = bypassSecure;
}
