
const exp = require("constants");
const express=require("express");
const app=express();
const path=require("path");
const port=3000;
const { v4: uuidv4 } = require('uuid');
let  methodOverride = require('method-override');

 // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'


app.use(express.static(path.join(__dirname,"public/publiccss")));
app.use(express.static(path.join(__dirname,"public/publicjs")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"))
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

// index.js se export posts 
let posts=require("./index.js"); 

app.get("/posts",(req,res)=>{
  res.render("posts.ejs",{posts}) ;
})

app.get("/posts/new",(req,res)=>{
  res.render("postnew.ejs");
});
app.post("/posts",(req,res)=>{ 
  let id=uuidv4();
 let {username,content,hobbi}=req.body;

console.log(id)
 let alldata={id,username,content,hobbi};
 console.log(alldata);
 posts.push(alldata);
  res.redirect("/posts"); 
});  

app.get("/posts/:id",(req,res)=>{
  let {id}=req.params;
  let postid=posts.find((p)=> id===p.id);
  console.log(postid);
  res.render("showId.ejs",{postid});
});
app.patch("/posts/:id",(req,res)=>{
  let {id}=req.params;
  // console.log(id);
  let newContent=req.body.content;
  console.log(newContent);
  let post=posts.find((p)=> id===p.id );
  post.content=newContent;
  console.log(post);
  res.redirect("/posts");
});
app.get("/posts/:id/edit",(req,res)=>{
  let {id}=req.params;
  let post=posts.find((p)=> id===p.id );
  res.render("editrought.ejs",{post});
});
app.delete("/posts/:id",(req,res)=>{
  let {id}=req.params;
   posts=posts.filter((p)=> id!==p.id);
  console.log(id)
  console.log(posts)
  res.redirect("/posts");
})

app.get("/",(req,res)=>{ 
  res.render("index.ejs")
})
app.listen(port,()=>{console.log("successfull listen ",port)})