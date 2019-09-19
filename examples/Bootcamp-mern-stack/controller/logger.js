const log4js = require('log4js');
log4js.configure({
  appenders: { user: { type: 'file', filename: 'user.log' }, 
    profile: {type: 'file', filename: 'profile.log',  layout: { type: 'pattern',pattern: '%d %p %c %X{person} %m%n' }}
},
  
  categories: { default: { appenders: ['user','profile'], level: 'error' } }
});
