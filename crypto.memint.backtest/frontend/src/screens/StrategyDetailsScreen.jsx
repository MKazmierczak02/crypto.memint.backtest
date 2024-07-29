import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const StrategyDetailsScreen = () => {
  const { id } = useParams();
  useEffect(() => {
    console.log(id);
  });
  return (
    <div className={"min-vh-100 align-items-center align-content-center"}>
      details {id}
    </div>
  );
};

export default StrategyDetailsScreen;
