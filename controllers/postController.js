const Post = require('../models/post');
const cron = require('node-cron');
const nodemailer = require("nodemailer");

const getAll = async (req, res) => {
  
  const posts = await Post.find();
     
  res.send({
    error: false,
    message: `All posts from the database`,
    posts: posts
  });
};

const sendMail = async (req, res) => {

  

  cron.schedule('*/2 * * * * *',async () => {
    var timeNow = new Date();
    timeNow.setMinutes(timeNow.getMinutes() - 2);
    const post2minsAgo = await Post.find({ created_at: {$gte: timeNow} });
    

    

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: 'halle.kuhic26@ethereal.email', // generated ethereal user
          pass: 'SXFnRvJTkStW8rpanj', // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: `All post from the last 2 min ${post2minsAgo} `, // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...


  });
};


const getById = async (req, res) => {

    const posts = await Post.findById(req.params.id);

    res.send({
      error: false,
      message: `Post with id #${posts._id}, has been fetched`,
      posts: posts,
    });
  };


const postCreate = async (req, res) => {

  const post = await Post.create(req.body);

  res.send({
    error: false,
    message: 'New post has been created',
    post: post
  });
};

const postUpdate = async (req, res) => {
  await Post.findByIdAndUpdate(req.params.id, req.body);
  const post = await Post.findById(req.params.id);
                                                      
  res.send({
    error: false,
    message: `Post with id #${post._id} has been updated`,
    post: post
  });
};

const getDeleted = async (req, res) => {

  await Post.findByIdAndDelete(req.params.id);

  res.send({
    error: false,
    message: `Post with id #${req.params.id} has been deleted`
  });
};

module.exports = { 
    getAll,
    sendMail,
    getById, 
    postCreate, 
    postUpdate, 
    getDeleted
}