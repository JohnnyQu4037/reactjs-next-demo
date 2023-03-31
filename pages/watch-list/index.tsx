import { useState, useEffect } from "react";
import useWindowSize from "@/utils/window-size";

const WatchList = () => {
  const size = useWindowSize();
  return (
    <div>
      {size.width}px / {size.height}px
    </div>
  );
};

export default WatchList;
