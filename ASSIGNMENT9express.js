// const express = require("express");
// const app = express();
// const fs = require("fs");
// const multer = require("multer");
// var session = require("express-session");

// const upload = multer({dest : 'uploads/'});

// const db = require("./models/db");

// const UserModel = require("./models/User");

// app.use(function (req, res, next) {
//     console.log(req.method, req.url);
//     next();
//   });

// app.use(express.static("uploads"));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());  
// app.use(upload.single('pic'));
// app.use(
//   session({
//     secret: "Hello",
//     resave: true,
//     saveUninitialized: true,
//   })
// );

// app.get("/", function (request, response) {
//     response.sendFile(__dirname + "/public/ASSIGNMENT9html.html");
//   });

// app.get("/ASSIGNMENT9todo.js",function(request,response){
//     response.sendFile(__dirname + "/ASSIGNMENT9todo.js");
// });

// app.post("/ASSIGNMENT9todo", function (request, response) {
//   const todo = request.body;
//   const image = request.file;
//   console.log(request.file);
 

//   request.session.fileName = image.filename;
//   todo.fileName=image.filename;
//   saveTodos(todo, function (error) {
//     if (error) {
//       response.status(500);
//       response.json({ error: error });
//     } else {
//       response.status(200);
//       response.send();
//     }
//   });
// });

// app.get("/store",function(request,response){
//   const name = request.query.name;
//   UserModel.find({createdBy : name , isActive : true})
//   .then(todos => {
//     response.status(200);
//     response.json(todos);
//   })
//   .catch(error =>{
//     response.status(500);
//     response.json({ error: error });
//   })
// });

// app.put("/ASSIGNMENT9todo",function(request,response){
//       const todo = request.body;
  
//       const tempid = Number(todo.id);
//       UserModel.find({id : tempid , isActive : true})
//         .then(todo => {
//           if(todo.flag)
//             {
//               UserModel.findOneAndUpdate({id : tempid}, { flag: 0 })
//               .then(()=>{
//                 response.status(200);
//                 response.send();
//               })
//               .catch(error =>{
//                 response.status(500);
//                 response.json({ error: error });
//               })
//             }
//           else
//             {
//               UserModel.findOneAndUpdate({id : tempid}, { flag: 1 })
//               .then(()=>{
//                 response.status(200);
//                 response.send();
//               })
//               .catch(error =>{
//                 response.status(500);
//                 response.json({ error: error });
//               })
//             }
//         })
//         .catch(error =>{
//           response.status(500);
//           response.json({ error: error });
//         })
// });


// app.delete("/ASSIGNMENT9todo",function(request,response){
//   const todo = request.body;
//   const tempid = Number(todo.id);
//   UserModel.findOneAndUpdate({id : tempid}, { isActive: 0 })
//   .then(()=>{
//     response.status(200);
//     response.send();
//   })
//   .catch((error)=>{
//     response.status(500);
//     response.json({ error: error });
//   })
// });

// app.get("/ASSIGNMENT9html",function(request,response){
//      response.json({filename : request.session.fileName});
//      request.session.fileName="";
// });

// app.get("*", function (request, response) {
//     response.sendFile(__dirname + "/public/404.html");
//   });

// db.init().then(function(){
//     app.listen(8000, function () {
//       console.log("Server is running on port 8000");
//   });
//   });

// function saveTodos(todo, callback) {
//   UserModel.create(todo)
// .then(function (){callback();})
// .catch((error)=>{callback(error);})
// }

const express = require("express");
const app = express();
const multer = require("multer");
var session = require("express-session");

const upload = multer({dest : 'uploads/'});

const db = require("./models/db");

const UserModel = require("./models/User");
const UserModel1 = require("./models/Userdata")

app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
  });

  app.set("view engine","ejs");

app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  
app.use(upload.single('pic'));
app.use(
  session({
    secret: "Hello",
    resave: true,
    saveUninitialized: true,
  })
);

app.get("/", function (request, response) {
    response.sendFile(__dirname + "/public/login9.html");
  });

app.get("/ASSIGNMENT9html",function(request,response){
    response.sendFile(__dirname + "/public/ASSIGNMENT9html.html");
  });

app.post("/signup9",function (request,response){
  const user = request.body;
  request.session.username=user.username;
  request.session.password=user.password;
  const todo = {username:request.session.username,password:request.session.password,isActive:1};

  UserModel1.find({username : request.session.username,isActive:true})
  .then(data =>{
    if(data.length===0){
      UserModel1.create(todo)
      // .then(function (){callback();})
      // .catch((error)=>{callback(error);})
      response.redirect("/");
    }
    else{
      response.status(409);
      response.render("signup9",{error : "Username already exits..Try with another"});
      }
  })
  .catch(error=>{
    console.log(error);
  })

});

app.post("/login9",function(request,response){
  const user = request.body;
  request.session.username=user.username;
  request.session.password=user.password;
  UserModel1.find({username:user.username,password:user.password,isActive:true})
  .then(data=>{
    if(data.length!=0){
      console.log(data);
      response.redirect("/ASSIGNMENT9html");
    }
    else
      {
        console.log("heloo");
        response.status(409);
        response.render("login9",{error : "Invalid Username or password"});
      }
  })
  .catch(error=>{
    console.log(error);
  })
})

app.get("/signup9",function(request,response){
  response.sendFile(__dirname + "/public/signup9.html");
}); 

app.get("/ASSIGNMENT9todo.js",function(request,response){
    response.sendFile(__dirname + "/ASSIGNMENT9todo.js");
});

app.post("/ASSIGNMENT9todo", function (request, response) {
  const todo = request.body;
  const image = request.file;
  console.log(request.file);
 

  request.session.fileName = image.filename;
  todo.fileName=image.filename;
  todo.username=request.session.username;
  // todo.password=request.session.password;
  saveTodos(todo, function (error) {
    if (error) {
      response.status(500);
      response.json({ error: error });
    } else {
      response.status(200);
      response.send();
    }
  });
});

app.get("/store",function(request,response){
  const name = request.session.username;
  UserModel.find({username : name , isActive : true})
  .then(todos => {
    response.status(200);
    response.json(todos);
  })
  .catch(error =>{
    response.status(500);
    response.json({ error: error });
  })
});

app.put("/ASSIGNMENT9todo",function(request,response){
      const todo = request.body;
  
      const tempid = Number(todo.id);
      UserModel.find({id : tempid , isActive : true})
        .then(todo => {
          if(todo.flag)
            {
              UserModel.findOneAndUpdate({id : tempid}, { flag: 0 })
              .then(()=>{
                response.status(200);
                response.send();
              })
              .catch(error =>{
                response.status(500);
                response.json({ error: error });
              })
            }
          else
            {
              UserModel.findOneAndUpdate({id : tempid}, { flag: 1 })
              .then(()=>{
                response.status(200);
                response.send();
              })
              .catch(error =>{
                response.status(500);
                response.json({ error: error });
              })
            }
        })
        .catch(error =>{
          response.status(500);
          response.json({ error: error });
        })
});


app.delete("/ASSIGNMENT9todo",function(request,response){
  const todo = request.body;
  const tempid = Number(todo.id);
  UserModel.findOneAndUpdate({id : tempid}, { isActive: 0 })
  .then(()=>{
    response.status(200);
    response.send();
  })
  .catch((error)=>{
    response.status(500);
    response.json({ error: error });
  })
});

app.post("/ASSIGNMENT9html",function(request,response){
     response.json({filename : request.session.fileName});
     request.session.fileName="";
});

app.get("/loggingout",function(request,response){
    response.redirect("/");
    console.log(1);
});

app.get("*", function (request, response) {
    response.sendFile(__dirname + "/public/404.html");
  });

db.init().then(function(){
    app.listen(8000, function () {
      console.log("Server is running on port 8000");
  });
  });

function saveTodos(todo, callback) {
  UserModel.create(todo)
.then(function (){callback();})
.catch((error)=>{callback(error);})
}