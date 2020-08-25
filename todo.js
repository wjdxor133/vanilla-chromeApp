const toDoForm = document.querySelector(".js-toDoForm"), // 할일 submit 할 수 있는 Form태그를 가져옴
    toDoInput = toDoForm.querySelector("input"), // 할일 적는 input태그를 가져옴
    toDoList = document.querySelector(".js-toDoList"); // 리스트로 나열하는 ul태그 가져옴


const TODOS_LS = 'toDos'; // localStorage의 이름


let toDos = []; // 해야할 일을 생성했을 때, array에 추가하기

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li); // 해당 li는 삭제됨
    const cleanToDos = toDos.filter(function(toDo){
        // 함수가 ture(참)를 return하는 아이템들이 있는 배열을 만듬
        console.log(toDo.id, li.id);
        return toDo.id !== parseInt(li.id); 
        // toDo의 모든 아이템과 체크된 아이템의 아이디와 같지 않은 항목들을 남김
    });
    toDos = cleanToDos; // 변경된 내용을 다시 담고
    savaToDos(); // toDos를 저장
    // toDos.filter는 배열의 모든 요소에 대한 함수를 호출합니다.
    // filter함수는 array의 모든 아이템을 통해 함수를 실행하고
    // 그리고 true인 아이템들만 가지고 새로운 array를 만듬
    // filter가 하는 것은 toDos안에 있는 아이템을 가지고  filterFn에서 체크가 된 아이템들의 array를 주는 것
}

function savaToDos(){
    // toDos를 가져와서 로컬에 저장하는 함수
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    // JSON.stringify() 자바스크립트 Object를 string으로 바꿔주는 기능
}


function paintToDo(text){
    // text는 submit해서 넘어 온 값
    const li = document.createElement("li"); // 비어있는 li태그를 만들었고
    const delBtn = document.createElement("button"); // 버튼도 생성
    delBtn.innerText = "X";
    delBtn.addEventListener("click", deleteToDo); 
    const span = document.createElement("span"); // 들어갈 텍스트도 생성
    span.innerText = text;
    const newId = toDos.length + 1;
    // appendChild 부모 태그 안에 자식 태그 넣는 메소드
    // 비어있는 li에 추가
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId; // 나중에 지울 때, 아이디 값으로 지우기 위해서
    toDoList.appendChild(li); // 마지막에 ul태그에 li추가
    const toDoObj = {
      text : text,
      id :  newId// 비어 있을 땐, index가 0부터
    }
    toDos.push(toDoObj);
    savaToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

// JSON은 JavaScript Object Notation의 준말
// 데이터를 전달할 때, 자바스크립트가 그것 다룰 수 있도록 object로 바꿔주는 기능
// 그래서, Object -> string , string -> Object로 변환해줌.
function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS); // localStorage에서 value값 : toDos를 얻어옴
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
         // JSON.parse()은 string을 다시 Object로 변경
         parsedToDos.forEach(function(toDo) {
             paintToDo(toDo.text);
         });
         // array가 가진 것 중에서, forEach라는 기능이 있음
         // array에 담겨있는 것들 각각에 한번씩 실행시켜주는 함수
         // 지금 만들 이 함수를, parseToDos에 있는 것들 각각에 대해 실행해줄 것이므로, 그 각각을 toDo로 지칭
         console.log(parsedToDos);
    } else{
           console.log("undifined") 
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();