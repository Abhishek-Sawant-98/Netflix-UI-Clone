import React from "react";
import "../css/App.css";
import requests from "../utils/requests";
import Row from "./Row";
import Banner from "./Banner";
import Navbar from "./Navbar";

const App = () => {
  return (
    <div className="app">
      {/* Navbar */}
      <Navbar />

      {/* Banner */}
      <Banner />

      {/* Rows */}
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargePoster
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumantaries} />
    </div>
  );
};

export default App;
