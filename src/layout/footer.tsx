import { GraphicLink } from "../components/atoms";
import React from "react";

export const Footer = () => {
  return (
    <footer>
      <ul>
        <li>
          <GraphicLink
            src="/github.svg"
            url="https://www.github.com/{yourUsername}"
            alt="github"
          />
        </li>
      </ul>
    </footer>
  );
};