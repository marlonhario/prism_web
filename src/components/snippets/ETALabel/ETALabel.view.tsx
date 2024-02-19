import React from "react";
import { ETAColors, ETATypes } from "common/types";

const ETALabelView: React.FC<{ name: string }> = ({ name }) => {
  const textColor: ETAColors = `text-${name as ETATypes}`
  return (
    <>
      {name} <strong className={textColor}>ETA</strong>
    </>
  );
};

export default ETALabelView;
