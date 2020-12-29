const express = require('express')

const router = express.Router();

const teacher = require('../model/teachers')

require('../data/database')

const {teaValidation} = require('../validation')

 const jwt = require('jsonwebtoken')

 const verify = require('./verifyToken')

 const path = require('path');

 const nodemailer = require('nodemailer');

 const multer = require('multer')

 const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
          cb(null,'./uploads');

    }, 
    filename:(req,file,cb) =>{

           cb(null,new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})


 const fileFilter = (req,file,cb)=>{
     if(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == "image/gif"){
         cb(null,true)
     }else{
         cb(null,false)
     }
 }

 const upload = multer({storage: storage , limits:{fileSize:1024 * 1024 * 5}, fileFilter: fileFilter})



router.get('/:id', function (req, res, next) {
     
    teacher.find({_id:req.params.id}, function (err, data) {
        if (err) {
            res.send(err)
        } else {   
            res.send(data)
        }
    })
})


router.get('/',verify , function (req, res, next) {
     
    teacher.find({}, function (err, data) {
        if (err) {
            res.send(err)
        }else {   
           res.send(data)
        }
    })
})


// check for complete profile if the user already in
router.post('/checkPro' , async (req, res) =>{

    const emailExists = await teacher.findOne({ email: req.body.email });
    if (!emailExists) return res.status(200).json(' edit your profile')
      
     const id = emailExists._id;

     res.status(400).json(id)
    
})

router.post('/sendEmail' , verify, async(req, res) =>{

     let user = {
   
        nickName: req.body.nickName,
        userEmail :req.body.userEmail,
        teacherEmail: req.body.teacherEmail,
        city: req.body.city,
        neighborhood: req.body.neighborhood,
        phone: req.body.phone,
        message: req.body.message
    
  }

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD
        }
      });

    const mailOptions = {

         from: process.env.USER_EMAIL,
         to: user.teacherEmail,
         subject: 'you got new student intersting',
         html: ` <h1> hello teacher : </h1> my name is ${req.body.nickName} i live in : <b>${req.body.city}</b> neighborhood : ${req.body.neighborhood} from FINDTEACHER website <br>  i want to get more information about you can you
                 please answer me on this questions<br><h1> ${req.body.message}</h1> <br> on my email: ${req.body.userEmail}<br> or in my phone ${req.body.phone} <br> thank you`
          };

          try{

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
})


// make new post for teacher after find the token 

  router.post('/post', verify,upload.single('image'), async (req, res) => {


//  check validation for teacher model

    const {error} = teaValidation(req.body);
    if (error) return res.status(401).send(error.details[0].message);

    // check if the email already in

    const emailExists = await teacher.findOne({ email: req.body.email });
    if (emailExists) return res.status(401).json('email already exists')

    const url = req.protocol + '://' + req.get('host') + '/' +  req.file.path;
    var newTich = new teacher({

        name: req.body.name,
        lastName: req.body.lastName,
        topic: req.body.topic,
        city: req.body.city,
        neighborhood: req.body.neighborhood,
        email: req.body.email,
        phone: req.body.phone,
        time: req.body.time,
        description: req.body.description,
        days: req.body.days,
        image: url,
        activeToken: req.body.activeToken
    
     })
    try {

        var data = await newTich.save();
        res.json(data);
       
       } catch (err) {
        res.status(401).send(err)
       }
})

router.put('/update/:id', verify ,upload.single('image'), async (req, res) => {

   
    const id = await teacher.findOne({_id: req.params.id});
    if(!id) return res.status(400).json('your id is not found')

    const url = req.protocol + '://' + req.get('host') + '/' +  req.file.path;

    let teachers = {
        name: req.body.name,
        lastName: req.body.lastName,
        topic: req.body.topic,
        city: req.body.city,
        neighborhood: req.body.neighborhood,
        email: req.body.email,
        phone: req.body.phone,
        time: req.body.time,
        description: req.body.description,
        days: req.body.days,
        image: url,
        activeToken: req.body.activeToken
    }

    let doc = await teacher.updateOne(id, teachers)
    
       try {
        res.json(teachers);
        
    } catch (err) {
        res.status(401).send(err)
    }
});


router.delete('/delete/:id',verify, async(req, res) => {

      const id = await teacher.findOneAndDelete({_id: req.params.id});
      if(!id) return res.status(400).json('your id is not found')

       try {
         res.json('yup');
         
    } catch (err) {
        res.status(401).send(err)
    }
})



module.exports = router;