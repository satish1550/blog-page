const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const authRoute = require('./routes/auth');

const app = express();

const dbURI = "mongodb+srv://apiusers:Satish1550@userinfo.2yruu.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbURI, {useNewUrlParser: true, useUniFiedTopology: true})
  .then((result) => {
    console.log("connected to mongodb");
    app.listen(3000, () => {
      console.log('server startup at port no. 3000')
    });
  })
  .catch((err) => console.log(err));

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded( { extended: true } ));
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(morgan('dev'));

app.get('/', (req, res)=>{
  res.redirect('/blogs')
});

app.get('/about', (req, res)=>{
  res.render('about', {title: 'About'});
});

app.get('/logout', (req, res)=> {
  res.render('logout', {title: 'logout'});
});

app.use('/blogs', blogRoutes);

app.use('/user', authRoute);

app.use((req, res) =>{
  res.status(404).render('404',{title: '404'});
});