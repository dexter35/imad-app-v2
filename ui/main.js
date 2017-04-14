console.log('Loaded!');

var x=document.getElementById('main-text');
x.innerHTML="new value";

var image=document.getElementById('img');
function moveRight(){
    var marginLeft=0;
    marginLeft=marginLeft+10;
    image.style.marginLeft=marginLeft+'px';
}
image.onclick=function(){
    var interval=setInterval(moveRight,50);
 // image.style.marginLeft='100px';  
};