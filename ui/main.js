
var btn=document.getElementById("counter");

btn.onclick=function(){
  //create the request object
  var request=new XMLHttpRequest();
  
  //capture the response and store it in a variable
  request.onreadystatechange=function(){
    if(request.readyState===XMLHttpRequest.DONE){
        //take some action
        if(request.status===200){       //request successfully competed;200
            var counter=request.responseText;       //extract value from request
            var span=document.getElementById("count");
            span.innerHTML=counter.toString();
        }
    }  
    //not done yet
  };
  
  //make the request
  request.open('GET','http://dexter35.imad.hasura-app.io/counter',true);
  request.send(null);
  
  //render the variable in the correct span
  
};

//submit name
var nameInput=document.getElementById('name');
var name=nameInput.value;
var submit=document.getElementById('submit_btn');
submit.onclick=function(){
    //make a request ot hte server and send the name
     var request=new XMLHttpRequest();
  
  //capture the response and store it in a variable
  request.onreadystatechange=function(){
    if(request.readyState===XMLHttpRequest.DONE){
        //take some action
        if(request.status===200){       //request successfully competed;200
            var names=request.responseText;
            names=JSON.parse(names);
            var list='';
            for(var i=0;i<names.length;i++){
                list+='<li>'+names[i]+'</li>';
            }
            var ul=document.getElementById('namelist');
            ul.innerHTML=list;

        }
    }  
    //not done yet
  };
  
  //make the request
  request.open('GET','http://dexter35.imad.hasura-app.io/subnit-name?name='+name,true);
  request.send(null);
  
    //capture a kist of names and render it as a list
    
};