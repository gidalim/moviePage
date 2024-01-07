import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";

import { config } from './apikey.js';
// console.log(config); //apikey체크용
const AccessToken = config.accessToken;







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


    // movieBoxes.forEach((movieBox) => {
    //   const movieContainer = document.getElementById('movieContainer');
    //   movieContainer.innerHTML += movieBox.createCard(); **innerHTML공부
    //   // console.log(movieBox); //박스 잘 만들어 지는지 확인용

    //   const cardElement = document.getElementById(movieBox.id);
    //   console.log(cardElement); //클릭이벤트 확인용입니다.

    //   cardElement.addEventListener('click', (event) => {
    //     const clickedCard = event.target.closest('.postbox');
    //     if (clickedCard) {
    //       console.log(`클릭 이벤트가 작동중인지 확인중입니다. ID : ${movieBox.id}`);
    //       alert(`카드의 ID는 ${movieBox.id}입니다!`);
    //     }
    //   });
    // });

    movieBoxes.forEach((movieBox) => {
      const movieContainer = document.getElementById('movieContainer');
      const cardHtml = movieBox.createCard();

      movieContainer.insertAdjacentHTML('beforeend', cardHtml);

      const cardElement = document.getElementById(movieBox.id);
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


// 1. movieData를 반복문으로 순환하기
// 2. 순환한 결과 아이템각각 으로 class를 인스턴스화 한다.
// 3. createCard의 반환값을 부모태그에 추가해준다. (innerHTML)

// //기타정보
// fetch('https://api.themoviedb.org/3/configuration')
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));