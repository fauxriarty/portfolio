import Link from "next/link";
import React from "react";

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">About</Link>
        </li>
        <li>
          <Link href="/projects">Projects</Link>
        </li>
        <li>
          <Link href="/resume">Resume</Link>
        </li>
      </ul>
    </nav>
  );
};
