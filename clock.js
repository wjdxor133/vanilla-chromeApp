const clockContainer = document.querySelector(".js-clock"),
   clockTitle = clockContainer.querySelector("h1");

// 현재 시각을 얻어오는 함수
function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes}:${
            seconds < 10 ?`0${seconds}`: seconds}`;
}

/* setInterval()
-> 첫번째 인자로 실행할 함수를 받고, 그리고 두번째 인자로 그 함수를 실행하고 싶은 시간 간격을 의미
*/

function init(){
    getTime();
    setInterval(getTime, 1000);
}

init();