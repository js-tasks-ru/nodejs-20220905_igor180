const app = require('./app');
const socket = require('./socket');

const server = app.listen(3000, () => {
  console.log('App is running on http://127.0.0.1:3000');
});

socket(server);
