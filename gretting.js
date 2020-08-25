const form = document.querySelector(".js-form"), // form태그
    input = form.querySelector("input"), // input태그
    greeting = document.querySelector(".js-greetings"); //h4태그

// querySelector()는 css처럼 클래스, 태그, 아이디 모두 가져옴
// querySelector()은 찾은 첫번째 것만 가져옴
// querySelectorAll()은 모두를 가져옴
// querySelectorAll()은 클래스명에 따른 엘리머트들을 가져와 배열로 줌

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text){
    // 누군가 submit을 했을 때, 이름 저장
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    // 누군가 submit을 했을 때
    event.preventDefault(); //리셋되어 버리는 기본 동작 제어
    const currentValue = input.value; // input태그에 적혀진 값
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    //유저가 없을 때, 유저의 이름을 요청하는 함수
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);

}

//만약 user가 null이 아니라면, 이름을 색칠
function paintGreeting(text){
    form.classList.remove(SHOWING_CN); // form을 지우고
    greeting.classList.add(SHOWING_CN); //greeting에 해당하는 태그의 클래스 리스트에 추가
    // 나에게 greeting을 보여주고
    greeting.innerHTML = `Hello! ${text}`;
    // 내가 보낸 텍스트를 넣을거다
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){ 
        // 로컬 스토리지에 유저가 없을 때, 동작
        askForName();
    }else{ 
        // 로컬 스토리지에 유저가 있을 때, 동작
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();