var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;

var config={
    user:'dexter35',
    database:'dexter35',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password: 'db-dexter35-75506'
};


var articles={
    'article-one':{
        title:'Article One | Arpit Chikara',
        heading:'Article One',
        content:`<p>This is the additional page that the server will server now -ARTICLE ONE</p>
            <p>Article One will be served here. Article One will be served here. Article One will be served here. Article One will be served here.</p>
            <p>Article One will be served here. Article One will be served here. Article One will be served here. Article One will be served here.</p>`
    },
    'article-two':{
         title:'Article Two | Arpit Chikara',
        heading:'Article Two',
        content:`<p>This is the additional page that the server will server now -ARTICLE TWO</p>
            <p>Article Two will be served here.`
    },
    'article-three':{
        title:'Article Three | Arpit Chikara',
        heading:'Article Three',
        content:`<p>This is the additional page that the server will server now -ARTICLE THREE</p>
            <p>Article Three will be served here.`
    }
};
function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var content=data.content;
    var htmlTemplate=`<html>
    <head>
        <title>${title}</title>
        <meta name="viewport" control="width=device-width,initial-scale=1"/>
        <link href="/ui/style.css" rel="stylesheet"/>
    </head>
    <body>
        <div class="container">
            <div>
                <a href="/">HOME</a>
            </div>
            <hr/>
            <h3>
                ${heading}
            </h3>
            ${content}
        </div>
    </body>
</html>`;
return htmlTemplate;
}

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool=new Pool(config);
app.get('/test-db',function(req,res){
    //make a select request
    //return a response with the reslts
    pool.query('SELECT * FROM test',function(err,result){
        if(err){
            res.status(500).send(err.toString());
            
        }
        else{
            res.send(JSON.stringify(result));
        }
    });
});

var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});

app.get('/submit-name',function(req,res){
    //get names from the request
 //if extracting from the paramaeter   var name=req.params.name;  with the req as /submit-name/:name
 //if extracting from the query:
 var name=req.query.name;   //without anything added in the request
    
    names.push(name);
    //JSON:JavaScript Object Notation bcoz we cannot send objects or string of objects as response. only bytes or files
    res.send(JSON.stringify(names));
});

app.get('/articles/:articleName',function(req,res){
    var articleName=req.params.articleName;
    pool.query("SELECT * FROM article WHERE title= $1", [req.params.articlName], function(err,result){
        
       if(err){
           res.status(500).send(err.toString());
       } 
       else{
           if(result.rows.length===0){
           res.status(404).send('article not found');
           
       }
       else{
           var articleData=result.rows[0];
           res.send(createTemplate(articleData));
       }
       }
    });
    
    
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js',function(req,res){
    res.sendFile(path.join(__dirname,'ui','main.js'));
});

var names=[];


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
