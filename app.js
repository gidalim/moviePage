
const AccessToken = config.accessToken;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: AccessToken
  }
};

class MovieBox { //생성자함수
  constructor(image, title, content, value, date) {
    this.image = image;
    this.title = title;
    this.content = content;
    this.value = value;
    this.date = date;
  }

  creatCard() { //id가 점진적으로 늘어날 때 구분이 가능하게끔 기능을 넣어줄 것
    return `
    <div class="postbox" id="post"> 
      <div class="card">
        <img src="${image}"class="movieImage" alt="...">
        <div class="postBody">
          <h5 class="movieName">${title}</h5>
          <p class="movieContents" >${content}</p>
          <p class="movieValues">${value}</p>
        </div>
      <p class="openDate">${date}</p>
      <div>
    </div>`;
  }
}
console.log();

// 영화정보
fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1')
  .then(response => response.json())
  // .then(response => console.log(response))
  .then(data => {

    let storage = [];


    // fetch에서 데이터를 받아와야함 -> 
    //let 이미지 - fetch의 이미지 주소와 링크
    // let 제목: row['postingName'],
    // let 요약: row['contentsName'],
    // let 평점: row['valuesName'],
    // let 개봉일자: row['releaseDate'],



    // image: row['movieImage'],
    // title: row['postingName'],
    // content: row['contentsName'],
    // value: row['valuesName'],
    // date: row['releaseDate'],


  });
let movie_box = new MovieBox(image, title, content, value, date).creatCard()


  //생성자 함수로 10개를 만들어내고 싶다.
  //map으로 만들면 될듯.


  .catch(err => console.error(err));





// //기타정보
// fetch('https://api.themoviedb.org/3/configuration')
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));