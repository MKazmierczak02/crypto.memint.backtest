import React from "react";
import { useNavigate } from "react-router-dom";

const StrategyRow = ({ strategy }) => {
  const navigate = useNavigate();

  function handleRedirect(strategy) {
    navigate(`/strategies/${strategy.id}`);
  }

  return (
    <tr onClick={() => handleRedirect(strategy)} style={{ cursor: "pointer" }}>
      <td>{strategy.id}</td>
      <td>{strategy.name}</td>
      <td>{strategy.description}</td>
      <td>{new Date(strategy.created_at).toLocaleDateString()}</td>
      <td>99%</td>
    </tr>
  );
};

export default StrategyRow;
