import { GraphicLink } from "../components/atoms";
import React from "react";

export const Footer = () => {
  return (
    <footer>
      <p>my socials:</p>
      <ul>
        <li >
          <GraphicLink
            src="/github.svg"
            url="https://www.github.com/fauxriarty"
            alt="github"
          />
        </li>
        <li>
          <GraphicLink
            src="/linkedin.svg"
            url="https://www.linkedin.com/in/aditya-chheda-652a9818b/"
            alt="LinkedIn"
          />
        </li>
        <li>
          <GraphicLink
            src="/twitter.svg"
            url="https://x.com/illum1nadi"
            alt="Twitter"
          />
        </li>
        <li>
          <GraphicLink
            src="/instagram.svg"
            url="https://www.instagram.com/aditya_chheda"
            alt="Instagram"
          />
        </li>
      </ul>
    </footer>
  );
};