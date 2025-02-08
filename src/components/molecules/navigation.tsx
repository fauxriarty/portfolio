import Link from "next/link";
import React from "react";

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">about</Link>
        </li>
        <li>
          <Link href="/projects">projects</Link>
        </li>
        
        <li>
          <Link href="/work">experience</Link>
        </li>
        <li>
          <Link href="/wall">wall</Link>
        </li>
        <li>
          <Link href="/resume">resume</Link>
        </li>
      </ul>
    </nav>
  );
};
