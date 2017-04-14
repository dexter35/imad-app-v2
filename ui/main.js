console.log('Loaded!');

var x=document.getElementById('main-text');
x.innerHTML="new value";

var image=document.getElementById('img');
image.onclick=function(){
  image.style.marginLeft='100px';  
};