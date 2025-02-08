import React from 'react';
import Image from "next/image";
import "./index.scss";

export const Home = () => {
  return (
    <section className="home">
        
      <div className='content'>
        <h1>Hey. This is Aditya.</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
      </div>
      <div className="image">
          <Image
            src="/avatar/profilepic.jpg" 
            className="circle" 
            alt="A picture of me." 
            loading="eager"
            width={300}        
            height={420}       
            priority
            sizes="(max-width: 480px) 280px,
                   (max-width: 768px) 300px,
                   250px"      
          />
        </div>
    </section>
  );
};

export default Home;