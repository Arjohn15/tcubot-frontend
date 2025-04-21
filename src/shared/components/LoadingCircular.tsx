import { CircularProgress } from "@mui/material";
import { FC } from "react";

const CircularLoading: FC = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div>
        <CircularProgress color="primary" size="3.5rem" />
      </div>
    </div>
  );
};

export default CircularLoading;
