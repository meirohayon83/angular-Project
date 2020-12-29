const express = require('express')
const router = express.Router();
const User = require('../model/users')
require('../data/database')
const { registerValidation , loginValidation } = require ('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verify = require('./verifyToken')
const nodemailer = require('nodemailer');




// delete the user account
router.delete('/user/:id',verify, async(req, res) => {

  const id = await User.findOneAndDelete({_id: req.params.id});
  if(!id) return res.status(400).json('your id is not found')

   try {
      res.json('yup');
     
  } catch (err) {
      res.status(401).send(err)
  }
})

// update user account with send email that changed
router.put('/updateUser/:id'  ,verify, async (req, res) => {

   
  const id = await User.findOne({_id: req.params.id});
  if(!id) return res.status(400).json('your id is not found')

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt)

  const saltt = await bcrypt.genSalt(10);
  const hashh = await bcrypt.hash(req.body.confirmPassword, saltt)

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user:  process.env.USER_EMAIL,
          pass:  process.env.USER_PASSWORD
        
        }
      });

    const mailOptions = {

        from: process.env.USER_EMAIL,
          to: id.email,
     subject: 'changeed success',
        text: `your password and nick name got change`

       };


 
    let user = {
   
      nickName: req.body.nickName,
      city: req.body.city,
      neighborhood: req.body.neighborhood,
      phone: req.body.phone,
      password: hash,
      confirmPassword: hashh,
   
  }

   let doc = await User.updateOne(id, user)
  
     try {

      res.json(user);

      transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    
   }catch (err) {
      
      res.send(err)
  }
});


//  get all users 

router.get('/all', function (req, res, next) {

  User.find({}, function (err, data) {

        if (err) {
            res.send(err)
        } else {
           res.send(data)
        }
    })
})


// register 
router.post('/register', async (req, res) => {

  // send mail after reg to sign
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD
        }
      });

       //LETS VALIDATE THE DATA BEFORE WE A USER
      const {error} = registerValidation(req.body)
      if(error) return res.status(400).json(error.details[0].message) 

       // Encrypts the password

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt)

      const saltt = await bcrypt.genSalt(10);
      const hashh = await bcrypt.hash(req.body.confirmPassword, saltt)

        // check if the user already reg with his email

      const emailExists = await User.findOne({email: req.body.email});
      if(emailExists) return res.status(400).send('email already exists')
        
        // get token
      let token = jwt.sign({nickName: req.body.nickName}, process.env.TOKEN_SECRET,{expiresIn:'5m'}  )

      var newUser = new User({

            nickName: req.body.nickName,
            email: req.body.email,
            phone: req.body.phone,
            city: req.body.city,
            neighborhood: req.body.neighborhood,
            password: hash,
            confirmPassword: hashh,
            activeToken: token,
            active:false
        })
      
        // Send an email with a login link
      const mailOptions = {

            from: process.env.USER_EMAIL,
            to: req.body.email,
            subject: 'Subject of your email',
            text: ' please confirm your email address:,<a href = "http://localhost:4200/confir/' + token + '">http://localhost:3334/</a>'
          };
       
       try{
      
        var data = await newUser.save();

            res.json({data , token})
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
            }
          });

     }catch(error){
        res.status(400).json('try again')

        console.log(error)
    }
})

// after register you got email with this url to change active false to true to login
// with nice try to work with refresh token

    router.get('/confir/:token', async (req, res , next) => {

      const user = await User.findOne({activeToken: req.params.token });
      const token = req.params.token
      
      jwt.verify( token, process.env.TOKEN_SECRET ,  function(err, decoded) {

      if(err){

          if(err.name == "TokenExpiredError"){

              var refreshToken = jwt.sign({nickName:user.nickName}, process.env.TOKEN_SECRET,{expiresIn: '1m'});
         }

           this.token = refreshToken;
           next();

        }

         else if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        }         
        
           user.active = true;
           user.save();
           res.status(200).send(decoded);
        }) 
      })
      
  
// check when user try to reg if his email already in
 router.post('/login/testEmail', async  (req, res) => {

      const user = await User.findOne({email: req.body.email});
      if(user) return res.status(400).json('email already in')
   
      res.status(200).json('go')
    
    })


 
// login 
 router.post('/login',  async  (req, res) => {

       let email = req.body.email;
     
      //  check data validation

      const {error} = loginValidation(req.body);
      if(error) return res.status(400).json(error.details[0].message) ;

      // check if its right email

      const user = await User.findOne({email: req.body.email});
      if(!user) return res.status(400).json('email is not found');

        // check if its right password
      const validPass = await  bcrypt.compare(req.body.password , user.password);
      if(!validPass) return res.status(400).json('invalid password');
    
        // check the active should be true after the reg get the link and press enter
      const activation = user.active;
      if(activation === false) return res.status(400).json('go to your email to activate your register');

     // send the token
      const token = jwt.sign({nickName: user.nickName}, process.env.TOKEN_SECRET , {expiresIn: '15m'})

      const nickName = user.nickName;
      const phone = user.phone;
      const city = user.city;
      const neighborhood = user.neighborhood;
      const id = user._id
    
      res.json({token , email , nickName ,id , phone , city , neighborhood} );
  
 });


// if you forget the password enter the email and get email with link to make new password

router.post('/forget' , async (req,res) => {

  const user = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).json('email is not found');

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD
        }
      });

    let token = jwt.sign({nickName: user.nickName}, process.env.TOKEN_SECRET , {expiresIn: '5m'})

         user.activeToken = token;
         user.save()

    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: req.body.email,
        subject: 'Subject of your email',
        html: '<a href = "http://localhost:4200/forget/pass/' + token + '">Click here to confirm your email address.</a>'

      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
      });
  
   res.json({token})
})

// check if in the page of change password the token ok
 router.get('/forget/pass/:token' , async (req,res)=>{

     const user = await User.findOne({activeToken: req.params.token});
     const token = req.params.token;

     jwt.verify( token, process.env.TOKEN_SECRET ,  function(err, decoded) {
 
      if(err){

         if(err.name == "TokenExpiredError"){

            var refreshToken = jwt.sign({nickName:user.nickName}, process.env.TOKEN_SECRET,{expiresIn: '1m'});
          
         }
            this.token = refreshToken;
            next();
        }
         else if (err) {
             return res.json({ success: false, message: 'Failed to authenticate token.' });
        }         

        res.status(200).send(decoded);
      })
})

// change the password
router.post('/changePassword', async (req,res)=> {

     const user = await User.findOne({activeToken: req.body.activeToken})
     if(!user) return res.status(400).json('token is not found');

     const salt = await bcrypt.genSalt(10);
     const hash = await bcrypt.hash(req.body.password, salt)

     const saltt = await bcrypt.genSalt(10);
     const hashh = await bcrypt.hash(req.body.confirmPassword, saltt)

      user.password = hash;
      user.confirmPassword = hashh;

      user.save(function (err, user) {

       if (err) return next(err);

             res.json("access")
  
      })
     }
  )
module.exports = router;