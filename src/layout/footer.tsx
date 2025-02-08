import { GraphicLink } from "../components/atoms";
import { useRouter } from 'next/router';
import React from "react";

export const Footer = () => {
  const router = useRouter();
  
  // hide footer on projects and wall pages
  if (router.pathname === '/projects' || router.pathname === '/wall'|| router.pathname === '/work') {
    return null;
  }

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
            src="/medium.svg"
            url="https://medium.com/@illum1nadi"
            alt="Medium"
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