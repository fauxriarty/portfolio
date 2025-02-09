import React from 'react';
import './projects.scss';

const projects = [
  { 
    id: 1, 
    name: 'SUZI: observers of change', 
    description: `Developed an app to log and create actionable data on needy children and poor sanitation, helping NGOs and government bodies identify and address community needs. Built the backend with Golang for API development and user authentication, and integrated heatmap functionality in Android using Kotlin and Google Maps.`,
    githubUrl: 'https://github.com/suzisuzisuzi'
  },
  { 
    id: 2, 
    name: 'Chamberly: venting made easy', 
    description: `Developed an Android version of the Chamberly App, which connects people seeking mental health support. Contributed to both backend and frontend using Kotlin and XML, optimized Cloud Firestore queries, and implemented notifications with FCM API.`,
    githubUrl: 'https://github.com/fauxriarty/Chamberly'
  },
  { 
    id: 3, 
    name: 'CapAble: job search made inclusive', 
    description: `developed an application to help specially-abled individuals find jobs, scraped off of multiple sources. Utilized Firebase for real-time data and user authentication, and developed a custom search functionality with dynamic filtering, all in kotlin.`,
    githubUrl: 'https://github.com/fauxriarty/Capable'
  },
];

export const Projects = () => {
  const handleCardClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className='projects-container'>
      {projects.map(project => (
        <div 
          key={project.id} 
          className='project-card' 
          onClick={() => handleCardClick(project.githubUrl)}
        >
          <h2>{project.name}</h2>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Projects;
