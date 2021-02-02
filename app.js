//imports
const http = require('http');
const express = require('express');
const path = require('path');
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser');
//end imports

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.engine('hbs', expressHbs({ extname: '.hbs', layoutsDir: 'views/layouts', defaultLayout: 'main', partialsDir: 'views/layouts/partials' }));
app.set('view engine', 'hbs');
app.set('views', 'views');



//routes
const shopRoute = require('./routes/shop-route');
const adminRoute = require('./routes/admin-route');
//end routes



//creating and configuration server
const server = http.createServer(app);

app.use('/', shopRoute);
app.use('/admin', adminRoute);

app.use(express.static(path.join(__dirname, 'public')));

app.use((request, response) => {
  response.status(404).render('404');
});

server.listen(3000);
//end creating and configuration server