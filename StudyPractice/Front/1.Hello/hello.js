const button = document.querySelector('button');

button.addEventListener('click',function(){
    const d=document.createElement('div');
    d.innerText='Hello';
    const b=document.querySelector('body');
    b.appendChild(d);

});