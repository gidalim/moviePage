// 파이어 베이스를 통해 호스팅을 진행했습니다
// https://mymovie-9fbbd.firebaseapp.com/

import { config } from "./apikey.js";
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
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: AccessToken
  }
};

// 영화정보
const loadingMovieData = async () => {
  try {
    const response = await fetch("https://api.themoviedb.org/3/movie/top_rated", options);
    // console.log(response);
    const dataLoading = await response.json();
    const movieResult = dataLoading.results;
    // console.log(movieResult); //fetch 전송 확인용

    return movieResult;
  } catch (err) {
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
  createCard() {
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
}

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
      const movieContainer = document.getElementById("movieContainer");
      const cardHtml = movieBox.createCard();
      movieContainer.insertAdjacentHTML("beforeend", cardHtml);
      // console.log(movieBox); //박스 잘 만들어 지는지 확인용
      const cardElement = document.getElementById(movieBox.id);
      // console.log(cardElement); //클릭이벤트 확인용입니다.

      cardElement.addEventListener("click", (event) => {
        const clickedCard = event.target.closest(".postbox");
        if (clickedCard) {
          console.log(`클릭 이벤트가 작동중인지 확인중입니다. ID : ${movieBox.id}`);
          alert(`카드의 ID는 ${movieBox.id}입니다!`);
        }
      });
    });

    //검색창구현
    const searchMovie = document.getElementById("searchMovie");
    const searchBtn = document.getElementById("searchBtn");

    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const searchTerm = searchMovie.value.toLowerCase();
      //일괄 소문자로 변경합니다
      movieBoxes.forEach((movieBox) => {
        const cardElement = document.getElementById(movieBox.id);
        const title = movieBox.title.toLowerCase();

        if (title.includes(searchTerm)) {
          // 공백을 true로 반환해서 이거 말고 다른것도 써볼만함.
          cardElement.style.display = "block"; // 맞는 경우 보이게 함
        } else {
          cardElement.style.display = "none"; // 아닌 경우 숨김
        }
      });
    });
  } catch (error) {
    console.error("loadingMovieData 함수 고장남", error); //확인용
  }
};

movieDataSet();
