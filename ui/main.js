
var btn=document.getElementById("counter");
var counter=0;
btn.onclick=function(){
  //make a request
  
  
  //capture the response and store it in a variable
  
  
  //render the variable in the correct span
  counter=counter+1;
  var span=document.getElementById("count");
  span.innerHTML=counter.toString();
    
};