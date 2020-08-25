const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    //  +1을 하는 이유는 Math.random() 함수가 0을 줄 수 있기 때문
    image.classList.add("bgImage");
    body.prepend(image);
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}


function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();