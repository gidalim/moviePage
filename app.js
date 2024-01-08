import { config } from './apikey.js';
// console.log(config); //apikey체크용
const AccessToken = config.accessToken;
const firebaseAPIKEY = config.firebaseAPI_KEY;
// console.log(firebaseAPIKEY); //firebase 호스팅 체크


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

const firebaseConfig = {
  apiKey: firebaseAPIKEY,
  authDomain: "mymovie-9fbbd.firebaseapp.com",
  projectId: "mymovie-9fbbd",
  storageBucket: "mymovie-9fbbd.appspot.com",
  messagingSenderId: "977020634886",
  appId: "1:977020634886:web:4f18ccd6a8c7fd12424087"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: AccessToken
  }
};


// 영화정보
const loadingMovieData = async () => {
  try {
    const response = await fetch('https://api.themoviedb.org/3/movie/top_rated', options)
    // console.log(response);
    const dataLoading = await response.json();
    const movieResult = dataLoading.results;
    // console.log(movieResult); //fetch 전송 확인용

    return movieResult;
  }
  catch (err) {
    console.error(err);
    throw err;
  }

};
// loadingMovieData();
//확인용

//생성자함수
class MovieBox {
  constructor(id, overView, poster_path, release_date, title, vote_average) {
    this.id = id; // id
    this.overView = overView; // overview
    this.poster_path = `https://image.tmdb.org/t/p/w500${poster_path}`; // poster_path
    this.release_date = `release Date  ${release_date}`; // release_date
    this.title = title; // title
    this.vote_average = `평점   ${vote_average}`; // vote_average
  }
  createCard() { //id가 점진적으로 늘어날 때 구분이 가능하게끔 기능을 넣어줄 것
    return `
    <div class="postbox" id="${this.id}"> 
      <div class="card">
        <img src="${this.poster_path}"class="movieImage" alt="...">
        <div class="postBody">
          <h5 class="movieName">${this.title}</h5>
          <p class="movieContents" >${this.overView}</p>
          <p class="movieValues">${this.vote_average}</p>
          <p class="releaseDate">${this.release_date}</p>
        </div>
      </div>
    </div>`;
  }

};

const movieDataSet = async () => {
  try {
    const movieData = await loadingMovieData();
    // console.log("fetch에서 async/await를 사용해 불러오는 중", movieData); //확인용

    const movieBoxes = movieData.map((movie) => {
      return new MovieBox(
        movie.id,
        movie.overview,
        movie.poster_path,
        movie.release_date,
        movie.title,
        movie.vote_average
      );
    });
    // console.log(movieBoxes); // 데이터 잘 추출했는지 확인용





    movieBoxes.forEach((movieBox) => {
      const movieContainer = document.getElementById('movieContainer');
      const cardHtml = movieBox.createCard();
      movieContainer.insertAdjacentHTML('beforeend', cardHtml);
      // console.log(movieBox); //박스 잘 만들어 지는지 확인용
      const cardElement = document.getElementById(movieBox.id);
      // console.log(cardElement); //클릭이벤트 확인용입니다.

      cardElement.addEventListener('click', (event) => {
        const clickedCard = event.target.closest('.postbox');
        if (clickedCard) {
          console.log(`클릭 이벤트가 작동중인지 확인중입니다. ID : ${movieBox.id}`);
          alert(`카드의 ID는 ${movieBox.id}입니다!`);
        }
      });
    });

    //검색창구현
    const searchMovie = document.getElementById("searchMovie");
    const searchBtn = document.getElementById("searchBtn");

    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const searchTerm = searchMovie.value.toLowerCase();
      //일괄 소문자로 변경합니다
      movieBoxes.forEach((movieBox) => {
        const cardElement = document.getElementById(movieBox.id);
        const title = movieBox.title.toLowerCase();

        if (title.includes(searchTerm)) {
          cardElement.style.display = 'block'; // 맞는 경우 보이게 함 근데 이렇게 하면 flex가 풀리네,,
        } else {
          cardElement.style.display = 'none'; // 아닌 경우 숨김
        }
      });
    });

  } catch (error) {
    console.error("loadingMovieData 함수 고장남", error); //확인용
  }
};

movieDataSet();


    // 101번째 줄 forEach문의 
    
    // movieBoxes.forEach((movieBox) => {
    //   const movieContainer = document.getElementById('movieContainer');
    //   movieContainer.innerHTML += movieBox.createCard(); 

    // **innerHTML공부 : 기존의 innerHTML += 같은 경우 요소가 변경하며 추가하는 방식이고 insertAdjacentHTML 메서드 같은 경우는
    // insertAdjacentHTML(위치, text(여기서는 함수 movieBox.createCard를 실행하는 것으로 실행했습니다.)) 와 같이 선언되어 
    // beforeend : 즉 요소 바로 안에서 마지막 children에 위치했습니다. movieContainer는 영화 카드슬롯 전체를 의미하며
    // 그 마지막 카드 바로 뒤에 html을 추가'만' 하는 것으로 코드를 변경한 셈이 되는 것입니다.
    // 만약 innerHTML을 그대로 사용한다면, 새로운 movieBox.createCard이 실행 될 때, 이벤트 리스너가 제거되고 
    // 추가된 맨 마지막 movieBox.createCard의 클릭 이벤트만 활성화 될 것입니다. (실제로 그랬습니다.)
