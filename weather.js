const weather = document.querySelector(".js-weather");

const API_KEY = "c51ff4afdafd9c4aee4a317f2669c995";
// API는 다른 서버로부터 손쉽게 데이터를 가져올 수 있는 수단
// 오직 데이터만 가져오는 것
// API는 특정 웹사이트로부터 데이터를 얻거나 컴퓨터끼리 소통하기 위해 고안된 것
const COORDS = 'coords';

// 날씨 정보를 얻어오는 함수
function getWeather(lat, lng){
    // fetch() 데이터를 얻는 함수, fetch안에는 가져올 데이터가 들어가면 됨
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        ).then(function(response){
            // json 데이터를 가져오는 과정 처리 중이라는 뜻
            return response.json();
        }).then(function(json){
            // json 데이터가 잘 준비되면 데이터를 잘 가져온 걸 확인
            // console.log(json);
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} @ ${place}`;
        })
    // App에 ID에 API Key를 넣어주고, 이렇게 하면 API를 제공하는 쪽에서
    // 요청자의 API Key를 통해서, 네가 무슨 상남자 마냥 빡세게 요청하는지 여부를 알 수 있는 것
    // 공짜이기 때문에 자기들 서버에 무기가 갈 만큼 마냥 사용하게 해줄 수 없다는 뜻
    // then()이 하는 역할은 기본적으로 함수를 호출하는 것이지만,
    // fetch의 데이터가 완전히 들어온 다음 호출
    // then()을 사용하는 이유는 fetch() 함수 안에 있는 값들이
    // 정상적으로 실행이 되지 않은 상태에서 다음 작업을 실행할 수 있기 때문
    // javascript에서 뭔가가 끝나길 기다리는 방법은 then을 사용한다.
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))

}

// 내 현재 위치를 받아오는 함수
function handleGeoSucces(position){
    const latitude = position.coords.latitude; // 현재 내 위도
    const longitude = position.coords.longitude; // 현재 내 경도
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
        //자바스크립트 팁!
        //객체의 변수이름과 객체의 key의 이름을 같게 저장할 때,
        /*
        const coordsObj = {
        latitude,
        longitude
        };
        이런식으로 선언이 가능하다.
        */
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoErro(){
    console.log('Cant access geo location');
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoErro);
    // 내 위치 정보를 읽을 수 있음 
    // 나의 위치정보를 읽는 방식
}

// 위치 정보 인식 함수
function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        //위치 정보가 없을 때
        askForCoords();  
    }else{
        // 우리는 이미 좌표값을 가지고 있는 경우
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
    // 만약 local stroage에 아무것도 없으면,
    // askForCoords함수가 실행되고, 
    // getWeather 함수가 실행 됨
    // 이 함수 안에서 정상적으로 위치정보를 가져오게 되면
    // handleGeoSuccess가 실행되는데,
    // 이 안에서 API가 최종적으로 호출되기 때문
    
}


function init(){
    loadCoords();
}

init();