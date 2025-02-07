import React from "react";
import Image from "next/image";

// this component is used to render SVG icons with external links for the footer.

export const GraphicLink = (props) => {
  return (
    <a href={props.url} target="_blank" rel="noreferrer">
      <Image src={props.src} height={40} width={40} alt={props.alt} />
    </a>
  );
};