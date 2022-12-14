module.exports = function authenticate(strategy, email, displayName, done) {
  done(null, false, `функция аутентификации с помощью ${strategy} не настроена`);
};


const User = require('../../models/User');

module.exports = async function authenticate(strategy, email, displayName, done) {

  if (!email) return done(null, false, 'Не указан email');
  

  try {

    let user = await User.findOne({email});

    if (!user) {

      user = await User.create({ email, displayName });

    }
  
    return done(null, user);
  
  } catch (err) {

    return done(err);
  
  }

};