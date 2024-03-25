import React from "react";
import "./Home.css";
import Navbar from "components/Navbar/Navbar";
import Container from "components/Container/Container";
import ScrollToTopButton from "components/ScrollToTopButton/ScrollToTopButton";
import MainBanner from "components/MainBanner/MainBanner";
import About from "components/About/About";
import Gallery from "components/Gallery/Gallery";
import SubmitForm from "components/SubmitForm/SubmitForm";


const Home = () => {
  return (
    <>
      <Navbar />
      <div className="header">
        <MainBanner />
        {/* <Banner /> */}
      </div>
      <main>
        {/* <Popular />
        <Highlights /> */}
        <Container />
        <SubmitForm/>

        <Gallery/>
        <About/>

        
      </main>
      <ScrollToTopButton />

    </>
  );
};

export default Home;
