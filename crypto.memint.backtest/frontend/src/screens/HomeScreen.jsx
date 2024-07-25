import React from 'react';
import HelloPage from "../components/HomePage/HelloPage";
import Howitworks from "../components/HomePage/Howitworks";

const HomeScreen = () => {
  return (
        <div className={"d-flex flex-column"}>
          <div className="flex-grow-1">
            <HelloPage/>
            <Howitworks/>
          </div>
        </div>
  );
};

export default HomeScreen;
