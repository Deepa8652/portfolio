// App.js
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Github, Linkedin, Mail, Code, Monitor, Layers } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

import './App.css';

const App = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Ensure formState has values before submitting
    if (!formState.name || !formState.email || !formState.message) {
      console.error("All fields are required.");
      setIsSubmitting(false);
      return;
    }

    // Create URL-encoded form data
    const formData = new URLSearchParams();
    formData.append('name', formState.name);
    formData.append('email', formState.email);
    formData.append('message', formState.message);

    try {
      const scriptURL = 'https://script.google.com/macros/s/AKfycbxpcMHje1Pshsmg3TMIb41eaDxYlI-cFEOuit8dXvXb4oVIEK-H971K8j5K7NKKVMb4/exec';
      
      // Using no-cors mode means we won't be able to read the response
      // So we need to assume success if no error is thrown
      await fetch(scriptURL, {
        method: 'POST',
        body: formData.toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        mode: 'no-cors'
      });

      // If we get here, we assume success
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  const [darkMode, setDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  // References for scroll sections
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);

  // Projects data
  const projects = [
    {
      id: 1,
      title: "Restaurent Website",
      description: "This is a responsive restaurant website designed for easy online ordering. Built using HTML, CSS, and Bootstrap, the website features a clean and modern layout that works across all devices. Users can browse the menu, view food items with images and prices, and place their orders directly through the site. The design focuses on simplicity and user experience, with a navigation bar, attractive menu sections, and an order form. Bootstrap components like cards, modals, and responsive grids are used to create a smooth and professional look without using JavaScript or backend coding.",


      tags: ["HTML", "CSS", "Bootstrap"],
      image: "/api/placeholder/600/400",
    },
    {
      id: 2,
      title: "Banking Management System",
      description: "This project is a basic Banking Management System developed using Java Swing for the front-end and MySQL for the back-end database. It provides simple banking operations through a graphical user interface (GUI).",
      tags: ["Java", "MYSql"],
      image: "/api/placeholder/600/400",
    },
    {
      id: 3,
      title: "PortFolio",
      description: "A sleek and modern portfolio website built using React to showcase my projects, skills, and experience. Designed with a responsive layout, smooth animations, and an interactive user interface to create a strong first impression. It reflects my passion for clean code, creative design, and full stack development.",
      tags: ["React"],
      image: "/api/placeholder/600/400",
    }
  ];

  // Skills data
  const skills = [
    { name: "JavaScript", level: 60 },
    { name: "React", level: 70 },
    { name: "Node.js", level: 50 },
    { name: "HTML/CSS", level: 95 },
    { name: "C++", level: 40 },
    { name: "MYsql", level: 70 },
    { name: "Java", level: 55 },
    { name: "Python", level: 80 },
  ];

  useEffect(() => {
    // Mock loading state for animation
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Add class to body for dark mode toggle
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';

    // Set up intersection observer for sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all sections
    [homeRef, aboutRef, projectsRef, skillsRef, contactRef].forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      [homeRef, aboutRef, projectsRef, skillsRef, contactRef].forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, [darkMode]);

  // Scroll to section function
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // Loading screen component
  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loader">
          <span>&lt;</span>
          <span>/</span>
          <span>&gt;</span>
        </div>
        <p>Loading awesome portfolio...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">Portfolio</span>
          <span className="logo-bracket">/&gt;</span>
        </div>
        
        <div className="desktop-nav">
          <nav>
            <ul className="nav-links">
              <li className={activeSection === 'home' ? 'active' : ''}>
                <button onClick={() => scrollToSection(homeRef)}>Home</button>
              </li>
              <li className={activeSection === 'about' ? 'active' : ''}>
                <button onClick={() => scrollToSection(aboutRef)}>About</button>
              </li>
              <li className={activeSection === 'projects' ? 'active' : ''}>
                <button onClick={() => scrollToSection(projectsRef)}>Projects</button>
              </li>
              <li className={activeSection === 'skills' ? 'active' : ''}>
                <button onClick={() => scrollToSection(skillsRef)}>Skills</button>
              </li>
              <li className={activeSection === 'contact' ? 'active' : ''}>
                <button onClick={() => scrollToSection(contactRef)}>Contact</button>
              </li>
            </ul>
          </nav>
        </div>
        
        <div className="header-actions">
          <button 
            className="theme-toggle-btn" 
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="mobile-nav"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <nav>
              <ul className="mobile-nav-links">
                <motion.li 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <button onClick={() => scrollToSection(homeRef)}>Home</button>
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <button onClick={() => scrollToSection(aboutRef)}>About</button>
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <button onClick={() => scrollToSection(projectsRef)}>Projects</button>
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <button onClick={() => scrollToSection(skillsRef)}>Skills</button>
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <button onClick={() => scrollToSection(contactRef)}>Contact</button>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        <section id="home" ref={homeRef} className="hero-section">
          <div className="hero-content">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="hero-title"
            >
              <span className="greeting">Hello, I'm</span>
              <span className="name">Deepa Pal</span>
              <span className="title">Full Stack Developer</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="hero-description"
            >
              I build <span className="highlight">modern</span> and <span className="highlight">responsive</span> web applications with a focus on user experience.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="hero-buttons"
            >
              <button className="primary-btn" onClick={() => scrollToSection(projectsRef)}>
                View Projects
              </button>
              <button className="secondary-btn" onClick={() => scrollToSection(contactRef)}>
                Contact Me
              </button>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="hero-image"
          >
            <div className="code-elements">
              <div className="code-element"></div>
              <div className="code-element"></div>
              <div className="code-element"></div>
              <div className="code-circle"></div>
              <div className="code-square"></div>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" ref={aboutRef} className="about-section">
          <h2 className="section-title">About Me</h2>
          
          <div className="about-content">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="about-image"
            >
              <img src="Deepa.jpeg" alt="Developer" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="about-text"
            >
              <h3>Who am I?</h3>
              <p>
              I’m a passionate Full Stack Developer with experience in building dynamic and responsive web applications. I specialize in both front-end and back-end development, working with technologies like HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB. With a strong understanding of databases, server management, and user experience design, I enjoy creating complete solutions that are efficient, scalable, and user-friendly. Always eager to learn new technologies, I love turning ideas into real-world applications that solve problems and deliver value.


              </p>
              
              <p>
                I specialize in JavaScript ecosystems, particularly React for front-end and Node.js for back-end development. I'm also experienced with various databases and enjoy solving complex problems with clean, efficient code.
              </p>
              
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to open source projects, or sharing my knowledge through blog posts and tutorials.
              </p>
              
              <div className="about-stats">
                <div className="stat">
                  <h4>0</h4>
                  <p>Years of Experience</p>
                </div>
                <div className="stat">
                  <h4>3</h4>
                  <p>Projects Completed</p>
                </div>
                {/* <div className="stat">
                  <h4>20+</h4>
                  <p>Happy Clients</p>
                </div> */}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" ref={projectsRef} className="projects-section">
          <h2 className="section-title">My Projects</h2>
          
          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="project-card"
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <button className="project-btn">Live Demo</button>
                    <button className="project-btn">Source Code</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="more-projects">
            <button className="secondary-btn">View All Projects</button>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" ref={skillsRef} className="skills-section">
          <h2 className="section-title">My Skills</h2>
          
          <div className="skills-content">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="skills-text"
            >
              <h3>What I Can Do</h3>
              <p>
                I've worked with a variety of technologies and frameworks in both frontend and backend development. Here are some of my core competencies:
              </p>
              
              <div className="skill-categories">
                <div className="skill-category">
                  <Code size={24} />
                  <h4>Frontend Development</h4>
                  <p>Creating responsive and interactive user interfaces with React,HTML,Next.js and modern CSS frameworks.</p>
                </div>
                
                <div className="skill-category">
                  <Monitor size={24} />
                  <h4>Backend Development</h4>
                  <p>Building robust server-side applications using Node.js, Express,MYSql and various databases.</p>
                </div>
                
                <div className="skill-category">
                  <Layers size={24} />
                  <h4>Full Stack Solutions</h4>
                  <p>Integrating frontend and backend systems with RESTful APIs, GraphQL, and authentication systems.</p>
                </div>
              </div>
            </motion.div>
            
            <div className="skills-bars">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="skill-item"
                >
                  <div className="skill-info">
                    <h4>{skill.name}</h4>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      className="skill-progress"
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={contactRef} className="contact-section">
          <h2 className="section-title">Get In Touch</h2>
          
          <div className="contact-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="contact-info"
            >
              <h3>Let's Work Together</h3>
              <p>
                I'm currently available for freelance work and interesting projects. Feel free to reach out if you have a project that needs coding skills.
              </p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <Mail size={20} />
                  <p>deepapal9321@gmail.com</p>
                </div>
                
                {/* <div className="contact-item">
                  <GitHub size={20} />
                  <p>github.com/alexjohnson</p>
                </div> */}
                
                <div className="contact-item">
                  <Linkedin size={20} />
                  <p>https://www.linkedin.com/in/deepapal/</p>
                </div>
              </div>
              
              <div className="social-links">
                {/* <a href="#" className="social-link">
                  <GitHub size={20} />
                </a> */}
                <a href="https://www.linkedin.com/in/deepapal/" className="social-link">
                  <Linkedin size={20} />
                </a>
                <a href="deepapal9321@gmail.com" className="social-link">
                  <Mail size={20} />
                </a>
              </div>
            </motion.div>
            
            <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="contact-form"
  ref={ref}
>
  {isSubmitted ? (
    <div className="success-message">
      <h4>Thank you for your message!</h4>
      <p>I'll get back to you as soon as possible.</p>
    </div>
  ) : (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          id="name" 
          name="name"
          value={formState.name}
          onChange={handleChange}
          placeholder="Your Name" 
          required 
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="Your Email" 
          required 
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea 
          id="message" 
          name="message"
          value={formState.message}
          onChange={handleChange}
          rows="5" 
          placeholder="Your Message"
          required
        ></textarea>
      </div>
      
      <button 
        type="submit" 
        className="primary-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )}
</motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-bracket">&lt;</span>
            <span className="logo-name">Deepa Pal</span>
            <span className="logo-bracket">/&gt;</span>
          </div>
          
          <p className="footer-text">© 2025 Deepa Pal. All rights reserved.</p>
          
          <div className="footer-social">
            {/* <a href="#" className="social-link">
              <GitHub size={18} />
            </a> */}
            <a href="#" className="social-link">
              <Linkedin size={18} />
            </a>
            <a href="#" className="social-link">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;