import React from 'react';
import './work.scss';

const experiences = [
  { 
    id: 1, 
    title: 'Vellore Institute of Technology, Vellore', 
    description: `Bachelor of Technology in Computer Science with a spl. in data science.
(Expected grad: May 2026)

CGPA: 9.03/10`
  },
  { 
    id: 2,
    title: 'Software Development Intern - Kotak Cherry',
    description: `• Authored and maintained test scripts for the Kotak Cherry investment app using Sinon and Mocha libraries in JavaScript, ensuring module reliability and correctness.

• Managed test pipelines and artefacts on Azure DevOps, improving end-to-end coverage visibility and stability.`
  },
  { 
    id: 3, 
    title: 'Full Stack Developer Intern - Drishtee Foundation', 
    description: `• Built a web application connecting people with resources and skills to those in need, supporting the 'Swavalamban' initiative through centralized Happiness Cafés.

• Developed the backend using Node.js, Express, Prisma ORM, and PostgreSQL, creating API endpoints for CRUD operations.

• Integrated Gemini API for personalized recommendations based on user skills and resources.`
  },
  { 
    id: 4, 
    title: 'Google Developer Student Clubs VIT - Marketing Lead', 
    description: `• Led the Content and Digital Marketing team, nearly doubling social media followers and exponentially increasing engagement.

• Secured sponsorships and managed logistics and finances for multiple hackathons with 1000+ registrations.

• Published multiple technical blog posts on Medium, translating complex topics (like big data, deepfakes) into easily digestible narratives.`
  },
  { 
    id: 5, 
    title: 'Android Developer - Chamberly AB', 
    description: `• Developed the Android version of Chamberly (originally on iOS) using Kotlin and Android Studio.

• Contributed to both backend and frontend development, optimizing Cloud Firestore queries for better performance.

• Implemented push notifications using the FCM API.`
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
