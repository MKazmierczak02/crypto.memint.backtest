import React from 'react';
import NavigationBar from "./Navbar";
import HelloPage from "./HomePage/HelloPage";
import Howitworks from "./HomePage/Howitworks";
import Footer from "./Footer";

const Home = () => {
  return (
      <div>
        <header>
          <NavigationBar/>
        </header>
        <main className={"d-flex flex-column"}>
          <div className="flex-grow-1">
            <HelloPage/>
            <Howitworks/>
          </div>
        </main>
        <footer>
          <Footer/>
        </footer>
      </div>
  );
};

export default Home;
