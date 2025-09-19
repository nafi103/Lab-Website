import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="page-content">
      <div className="about-hero">
        <div className="hero-content">
          <h1>About Our Research Lab</h1>
          <p className="hero-subtitle">Advancing Scientific Discovery Through Innovation and Collaboration</p>
        </div>
        <div className="hero-image">
          <img src="/lab-image.png" alt="Our Research Laboratory" className="lab-image" />
        </div>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our research laboratory is dedicated to pushing the boundaries of scientific knowledge through 
            cutting-edge research, innovative methodologies, and collaborative partnerships. We strive to 
            address real-world challenges while fostering the next generation of scientific leaders.
          </p>
          <p>
            We believe in the power of interdisciplinary research to solve complex problems and create 
            meaningful impact in our communities and beyond.
          </p>
        </div>

        <div className="about-section">
          <h2>Research Areas</h2>
          <div className="research-areas">
            <div className="research-item">
              <h3>Computational Biology</h3>
              <p>Leveraging computational methods to understand biological systems and processes.</p>
            </div>
            <div className="research-item">
              <h3>Data Science & Machine Learning</h3>
              <p>Developing advanced algorithms and models for complex data analysis and prediction.</p>
            </div>
            <div className="research-item">
              <h3>Biomedical Engineering</h3>
              <p>Creating innovative solutions at the intersection of engineering and medicine.</p>
            </div>
            <div className="research-item">
              <h3>Systems Biology</h3>
              <p>Understanding biological systems through integrative approaches and modeling.</p>
            </div>
            <div className="research-item">
              <h3>Quantum Computing</h3>
              <p>Exploring quantum algorithms and their applications in scientific computing and optimization.</p>
            </div>
            <div className="research-item">   
              <h3>Synthetic Biology</h3>
              <p>Engineering biological systems to design and construct new biological parts and devices.</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Lab Facilities</h2>
          <p>
            Our state-of-the-art laboratory facilities are equipped with modern instrumentation and 
            computational resources to support a wide range of research activities. We maintain 
            high-performance computing clusters, advanced microscopy equipment, and specialized 
            software tools for data analysis and modeling.
          </p>
          <p>
            The lab provides a collaborative environment where researchers from different disciplines 
            can work together on innovative projects. Our open-space design encourages interaction 
            and knowledge sharing among team members.
          </p>
        </div>

        <div className="about-section">
          <h2>Collaborations & Partnerships</h2>
          <p>
            We actively collaborate with leading research institutions, industry partners, and 
            international organizations to expand the scope and impact of our research. These 
            partnerships enable us to tackle complex challenges that require diverse expertise 
            and resources.
          </p>
          <p>
            Our collaborative network includes universities, research centers, biotechnology companies, 
            and government agencies, creating opportunities for knowledge exchange and technology transfer.
          </p>
        </div>

        <div className="contact-section">
          <h2>Contact Information</h2>
          <div className="contact-grid">
            <div className="contact-item">
              <h3>Lab Address</h3>
              <p>Research Building, Room 301<br />
                 University Campus<br />
                 City, State 12345</p>
            </div>
            <div className="contact-item">
              <h3>General Inquiries</h3>
              <p>Email: lab@university.edu<br />
                 Phone: (555) 123-4567</p>
            </div>
            <div className="contact-item">
              <h3>Research Collaborations</h3>
              <p>For partnership opportunities and<br />
                 collaborative research projects</p>
            </div>
            <div className="contact-item">
              <h3>Student Opportunities</h3>
              <p>Information about internships,<br />
                 graduate positions, and<br />
                 research opportunities</p>
            </div>
            <div className="contact-item">
              <h3>Media & Press</h3>
              <p>Email: press@university.edu<br />
                 Phone: (555) 123-4568<br />
                 For media inquiries and interviews</p>
            </div>
            <div className="contact-item">
              <h3>Technology Transfer</h3>
              <p>Email: tech-transfer@university.edu<br />
                 Phone: (555) 123-4569<br />
                 For licensing and commercialization</p>
            </div>
          </div>
          <p className="contact-note">
            We welcome researchers, students, and professionals to join our academic community 
            and contribute to advancing scientific knowledge through innovative research.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
