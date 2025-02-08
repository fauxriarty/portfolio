import React from 'react';
import Image from "next/image";
import "./index.scss";

export const Home = () => {
  return (
    <section className="home">
        
      
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
        <div className='content'>
        <h1>hey. it's aditya.</h1>
        <p className='desc'>
        I like fixing things—whether it’s code, workflows, or broken strategies. 
        From building apps to scaling engagement, I focus on what actually works, cutting through inefficiencies
        and making things run smoother. If it’s complex, messy, and worth solving, I’m interested.
        </p>
      </div>
    </section>
  );
};

export default Home;