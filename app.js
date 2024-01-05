import { config } from './apikey.js';
// console.log(config); //apikey체크용
const AccessToken = config.accessToken;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: AccessToken
  }
};

class MovieBox { //생성자함수
  constructor(movieId, image, title, overView, value, date) {
    this.movieId = movieId;
    this.image = image;
    this.title = title;
    this.overView = overView;
    this.value = value;
    this.date = date;
  }

  creatCard() { //id가 점진적으로 늘어날 때 구분이 가능하게끔 기능을 넣어줄 것
    return `
    <div class="postbox" id="${this.movieId}"> 
      <div class="card">
        <img src="${this.image}"class="movieImage" alt="...">
        <div class="postBody">
          <h5 class="movieName">${this.title}</h5>
          <p class="movieContents" >${this.overView}</p>
          <p class="movieValues">${this.value}</p>
        </div>
      <p class="releaseDate">${this.date}</p>
      <div>
    </div>`;
  }
}



// 영화정보
const loadingMovieData = async () => {
  try {
    const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1')
    const dataLoading = await response.json();
    const movieResult = dataLoading.results;
    console.log(movieResult);

    return movieResult;
  }
  catch (err) {
    console.error(err);
    throw err;
  }

};
const movieDataSet = async () => {
  try {
    const movieData = await loadingMovieData();
    const moviePage1 = movieData.slice(0, 10);
    console.log("fetch에서 async/await를 사용해 불러오는 중", movieData);
    console.log("10개를 잘라내서 추출함", moviePage1);
    console.log("0번째 배열의 4번 키를 확인함", moviePage1[0].key4);
    
    const movieIdArray = moviePage1.map(movieiD => movieiD[4]);
    console.log("4번째 key의 value를 추출중", movieIdArray);
    

    // const extractedValues = moviePage1.map(movie => ({
    //   movieId: movie.results[0].key4, // 제목
    //   overView: movie.results[0].key7, // 요약
    //   image: movie.results[0].key9, // 이미지링크
    //   date: movie.results[0].key10, // 개봉일자
    //   title: movie.results[0].key11, // 제목
    //   value: movie.results[0].key12, // 평점
    // }));

      // console.log('MovieBox 객체 배열', extractedValues);
      

  } catch (error) {
    console.error("loadingMovieData 함수 고장남", error);
  }
};

movieDataSet(); //함수 실행하여 조건확인


//     const moviePage1 = movieData.slice(i, i + 10) //이 부분 let이 아닌 const로 작성해야하는 거 같음.
//     return moviePage1;
//     console.log(moviePage1);// 0번부터 9번까지만 사용 할 것이므로 확인해야함

      // result
      // let storage = [];


      // fetch에서 데이터를 받아와야함 -> 
      // let 아이디:row['movieId'],
      // let 이미지 - fetch의 이미지 주소와 링크
      // let 제목: row['title'],
      // let 요약: row['overView'],
      // let 평점: row['value'],
      // let 개봉일자: row['date'],


      // movieID: row['movieId'],
      // image: row['movieImage'],
      // title: row['title'],
      // overView: row['overView'],
      // value: row['value'],
      // date: row['date'],

    // let movie_box = new MovieBox(movieId, image, title, content, value, date).creatCard()



//생성자 함수로 10개를 만들어내고 싶다.
//map으로 만들면 될듯.







// //기타정보
// fetch('https://api.themoviedb.org/3/configuration')
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));