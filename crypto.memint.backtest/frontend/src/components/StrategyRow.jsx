import React from "react";
import { useNavigate } from "react-router-dom";
import {TableRow, TableCell, IconButton, Tooltip} from "@mui/material";
import {useDispatch} from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

const StrategyRow = ({ strategy, onDelete }) => {
  const navigate = useNavigate();
  const handleRedirect = (strategy) => {
    navigate(`/strategies/${strategy.id}`);
  };


  return (
    <TableRow
      hover
      onClick={() => handleRedirect(strategy)}
      sx={{ cursor: "pointer" }}
    >
      <TableCell>{strategy.id}</TableCell>
      <TableCell>{strategy.name}</TableCell>
      <TableCell>{strategy.description}</TableCell>
      <TableCell>
        {new Date(strategy.created_at).toLocaleDateString()}
      </TableCell>
      <TableCell>
        <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(strategy.id)

              }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
      </TableCell>

    </TableRow>
  );
};

export default StrategyRow;
