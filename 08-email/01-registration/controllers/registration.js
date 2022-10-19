const { v4: uuid } = require('uuid');
const User = require('../models/User');
const sendMail = require('../libs/sendMail');

module.exports.register = async (ctx, next) => {

    const verificationToken = uuid();

    const new_user = new User({
      email: ctx.request.body.email,
      displayName: ctx.request.body.displayName,
      verificationToken: verificationToken,
    });
  
    await new_user.setPassword(ctx.request.body.password);
    
    await new_user.save();
  
    await sendMail({
      to: new_user.email,
      subject: 'Подтвердите email',
      locals: {token: verificationToken},
      template: 'confirmation',
    });
  
    ctx.body = {status: 'ok'};
};

module.exports.confirm = async (ctx, next) => {

    const new_user = await User.findOne({
        
        verificationToken: ctx.request.body.verificationToken,

    });
    
    if (!new_user) ctx.throw(400, 'Ссылка подтверждения недействительна или устарела');
      
    new_user.verificationToken = undefined;
    
    await new_user.save();
    
    const token = uuid();
    
    ctx.body = {token};
};
