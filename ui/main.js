console.log('Loaded!');

var x=document.getElementById('main-text');
x.innerHTML="new value";

var image=document.getElementById('img');
var marginLeft=0;
function moveRight(){
    
    marginLeft=marginLeft+1;
    image.style.marginLeft=marginLeft+'px';
}
image.onclick=function(){
    var interval=setInterval(moveRight,25);
 // image.style.marginLeft='100px';  
};