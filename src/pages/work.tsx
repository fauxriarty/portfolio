import React from 'react';
import './work.scss';

const experiences = [
  { 
    id: 1, 
    title: 'Vellore Institute of Technology, Vellore', 
    description: `Bachelor of Technology in Computer Science with a spl. in data science.
    (Expected grad: May 2026)\n\ncGPA: 9.03/10`
  },
  { 
    id: 2, 
    title: 'Google Developer Student Clubs vit- Marketing Lead', 
    description: `• Led the Content and Digital Marketing team, nearly doubling social media followers and exponentially increasing engagement.
    \n\n• Secured sponsorships and managed logistics and finances for multiple hackathons with 1000+ registrations.`
  },
  { 
    id: 3, 
    title: 'Full Stack Developer Intern - Drishtee Foundation', 
    description: `• Built a web application connecting people with resources and skills to those in need, supporting the 'Swavalamban' initiative through centralized Happiness Cafés.
    \n\n• Developed the backend using Node.js, Express, Prisma ORM, and PostgreSQL, creating API endpoints for CRUD operations.
    \n\n•Integrated Gemini API for personalized recommendations based on user skills and resources.`
  },
  { 
    id: 4, 
    title: 'Android Developer - Chamberly AB', 
    description: `• Developed the Android version of Chamberly (originally on iOS) using Kotlin and Android Studio.
    \n\n• Contributed to both backend and frontend development, optimizing Cloud Firestore queries for better performance.
    \n\n• Implemented push notifications using the FCM API.`
  }
];

export const Work = () => {
  return (
    <div className='work-container'>
      {experiences.map(exp => (
        <div key={exp.id} className='work-card'>
          <h2>{exp.title}</h2>
          <p>{exp.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Work;
