//imports
const http = require('http');
const express = require('express');
const path = require('path');
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoConnect = require('./util/database').mongoConnect;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', expressHbs({ extname: '.hbs', layoutsDir: 'views/layouts', defaultLayout: 'main', partialsDir: 'views/layouts/partials' }));
app.set('view engine', 'hbs');
app.set('views', 'views');

//routes
const shopRoute = require('./routes/shop.route');
const adminRoute = require('./routes/admin.route');
const User = require('./models/user.model');
//end routes

app.use((request, response, next) => {

  User.find('jlfv')
    .then(user => {
      if (user) {
        request.user = new User(user.username, user.email, user.cart, user._id);
        next();
      } else {
        let newUser = new User('jlfv', 'jose@joes.com')
        newUser.save()
          .then(result => {
            request.user = new User(result.resultname, result.email, result.cart, result._id);
            next();
          })
          .catch(err => console.log(err));
      }
    })
    .catch();
});

app.use('/', shopRoute);
app.use('/admin', adminRoute);

app.use((request, response) => {
  response.status(404).render('404');
});


//creating and configuration server
const server = http.createServer(app);

mongoConnect(() => {
  server.listen(3000);
})

//end creating and configuration server