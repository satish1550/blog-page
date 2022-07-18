const router = require('express').Router();
const User = require('../models/User');
const jwtToken = require('../models/jwtToken');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require('../validation');

router.get('/register',(req, res) => {
    res.render('blogs/register', {title: 'New User'});
});
router.post('/register', async (req, res) => {

    console.log(req.body);

    const {result} = await registerSchema.validateAsync(req.body);
    if(result) return res.status(400).send(result);

    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(404).send('email is already exist');

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedpassword
    });
    try{
        const saveduser = await user.save();
        console.log('user detals is saved to db');
        // res.send({user: user._id});
        res.redirect('/user/login');
    }
    catch(err){
        res.status(404).send(err);
    }
});

router.get('/login',(req, res) => {
    res.render('blogs/login', {title: 'User Login'});
})
router.post('/login', async (req, res) => {
    const {result} = await loginSchema.validateAsync(req.body);
    if(result) return res.status(400).send(result);

    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(404).send("Email does't exists");

    const validpassword = await bcrypt.compare(req.body.password, user.password);
    if(!validpassword) return res.status(404).send('Invalid password');

    const token = jwt.sign({_id: user._id}, "secretkey");
    res.header('authorization', token).redirect('/blogs');
    console.log("token:", token);

    const jwttoken = new jwtToken({
        token: token
    })
    try{
        const savedtoken = await jwttoken.save();
        console.log('token is saved to db');
    }
    catch(err){
        res.send(err);
        console.log(err);
    }

    // res.send('logined in successful');
});
module.exports = router;