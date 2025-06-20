import React, { useState, useEffect } from 'react';
import { Code, User, BookOpen, Mail, Github, Linkedin, ExternalLink, Calendar, MessageCircle, Car, GraduationCap, Award, Instagram } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using EmailJS to send emails
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_portfolio', // You'll need to set this up
          template_id: 'template_contact', // You'll need to set this up
          user_id: 'your_emailjs_user_id', // You'll need to set this up
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_email: 'sahusitun92@gmail.com'
          }
        })
      });

      if (response.ok) {
        setSubmitMessage('Message sent successfully! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      // Fallback to mailto if EmailJS fails
      const subject = encodeURIComponent('Portfolio Contact');
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:sahusitun92@gmail.com?subject=${subject}&body=${body}`;
      setSubmitMessage('Opening your email client...');
    }

    setIsSubmitting(false);
    setTimeout(() => setSubmitMessage(''), 5000);
  };

  const projects = [
    {
      id: 1,
      title: "UberClone - Ride Sharing App",
      description: "Full-stack ride-sharing application with real-time location tracking,and driver-rider matching system.",
      tech: ["React", "Node.js", "MongoDB", "Socket.io", "MapBox", "Razorpay"],
      image: "🚗",
      github: "#",
      live: "#",
      features: ["Real-time GPS tracking", "Driver rating system", "Trip history"]
    },
    {
      id: 2,
      title: "ChatApp - Real-time Messaging",
      description: "Modern chat application with group messaging, file sharing, emoji support, and real-time notifications.",
      tech: ["React", "Node.js", "Socket.io", "MongoDB", "Cloudinary", "JWT"],
      image: "💬",
      github: "#",
      live: "#",
      features: ["Real-time messaging", "Online status"]
    },
    {
      id: 3,
      title: "MediCare - Appointment Booking",
      description: "Healthcare appointment booking system with doctor profiles, slot management, and patient records.",
      tech: ["JavaScript", "PHP", "MySql", "HTML", "CSS"],
      image: "🏥",
      github: "#",
      live: "#",
      features: ["Slot booking", "Email notifications"]
    }
  ];

  const skills = [
    { name: "MongoDB", level: 90, color: "#47A248" },
    { name: "Express.js", level: 85, color: "#000000" },
    { name: "React.js", level: 92, color: "#61DAFB" },
    { name: "Node.js", level: 88, color: "#339933" },
    { name: "JavaScript", level: 90, color: "#F7DF1E" },
    { name: "Socket.io", level: 80, color: "#010101" },
    { name: "MySQL", level: 70, color: "#4479A1" }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable MERN Applications",
      excerpt: "Learn best practices for architecting MERN stack applications that can handle thousands of users.",
      date: "June 15, 2025",
      readTime: "8 min read",
      category: "Development"
    },
    {
      id: 2,
      title: "Real-time Features with Socket.io",
      excerpt: "Complete guide to implementing real-time features in your web applications using Socket.io.",
      date: "June 10, 2025",
      readTime: "12 min read",
      category: "Tutorial"
    },
    {
      id: 3,
      title: "MongoDB Performance Optimization",
      excerpt: "Tips and techniques to optimize MongoDB queries and improve database performance.",
      date: "June 5, 2025",
      readTime: "10 min read",
      category: "Database"
    }
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'education', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-500   to-slate-600">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/20 backdrop-blur-md z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-white font-bold text-xl">Situn Sahu</div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {['Home', 'About', 'Projects', 'Skills', 'Education', 'Blog', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === item.toLowerCase()
                      ? 'bg-white/20 text-white'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white p-2"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Home', 'About', 'Projects', 'Skills', 'Education', 'Blog', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-md w-full text-left"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-4 bg-black/80 relative"
      >
        <div className="absolute inset-0  via-black/70 to-black/90 backdrop-blur-md"></div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto p-6 rounded-xl bg-white/5 backdrop-blur-lg shadow-2xl border border-white/10">
          <div className="mb-8">
            <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
              <img
                src="/Myphoto.jpg"
                alt="Situn Sahu"
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
              Situn Sahu
            </h1>

            <h2 className="text-2xl md:text-3xl mb-6 text-gray-300">
              MERN Stack Developer
            </h2>

            <p className="text-xl mb-8 text-gray-400 max-w-2xl mx-auto">
              Passionate full-stack developer specializing in MongoDB, Express.js, React, and Node.js.
              Creating scalable web applications with modern technologies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-semibold hover:bg-white/20 transition-all transform hover:scale-105"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 border border-white/20 rounded-full text-white font-semibold hover:bg-white/10 transition-all transform hover:scale-105"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* About Section */}
      <section id="about" className="py-24 px-4 bg-black/80 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black/90 backdrop-blur-md -z-10"></div>

        <div className="max-w-6xl mx-auto text-white relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Text Section */}
            <div className="text-gray-300 space-y-6 text-lg leading-relaxed">
              <p>
                I'm a passionate MERN stack developer with a strong foundation in modern web technologies.
                I love creating efficient, scalable, and user-friendly applications that solve real-world problems.
              </p>
              <p>
                My journey in web development started during my BCA studies, where I discovered my passion
                for building interactive web applications. Since then, I've been constantly learning and
                implementing new technologies to stay at the forefront of web development.
              </p>
              <p>
                I believe in writing clean, maintainable code and following best practices. My goal is to
                create applications that not only function well but also provide an exceptional user experience.
              </p>
            </div>

            {/* Right Quick Facts Panel */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-semibold text-white mb-6">Quick Facts</h3>
              <div className="space-y-5 text-gray-300">
                <div className="flex items-center gap-3">
                  <User className="text-blue-400" size={22} />
                  <span>Full-Stack Developer</span>
                </div>
                <div className="flex items-center gap-3">
                  <Code className="text-purple-400" size={22} />
                  <span>MERN Stack Specialist</span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="text-green-400" size={22} />
                  <span>Continuous Learner</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="text-yellow-400" size={22} />
                  <span>Fresher</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 bg-black/80 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90 backdrop-blur-md -z-10"></div>

        <div className="max-w-6xl mx-auto text-white relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white/5 border border-white/10 rounded-2xl shadow-xl backdrop-blur-lg overflow-hidden transition-all transform hover:scale-105 hover:border-white/20"
              >
                <div className="p-6 space-y-4">
                  <div className="text-5xl mb-2 text-center text-blue-300">{project.image}</div>

                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <p className="text-sm text-gray-300">{project.description}</p>

                  {/* Features */}
                  <div>
                    <h4 className="text-white font-medium mb-1 text-sm">Key Features:</h4>
                    <ul className="text-sm text-gray-300 space-y-1 pl-2">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white/10 text-white text-xs rounded-full border border-white/10 hover:bg-white/20 transition"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Skills Section */}
      <section id="skills" className="py-24 px-4 bg-black/80 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90 backdrop-blur-md -z-10"></div>

        <div className="max-w-6xl mx-auto text-white relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            Technical Skills
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl transition-all hover:shadow-2xl hover:border-white/20"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-medium text-white">{skill.name}</span>
                  <span className="text-sm text-gray-400">{skill.level}%</span>
                </div>

                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-3 rounded-full transition-all duration-1000 ease-in-out"
                    style={{
                      width: `${skill.level}%`,
                      backgroundColor: skill.color,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Education Section */}
      <section id="education" className="py-24 px-4 bg-black/80 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90 backdrop-blur-md -z-10"></div>

        <div className="max-w-6xl mx-auto text-white relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            Education
          </h2>

          <div className="max-w-3xl mx-auto space-y-8">
            {/* BCA */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl transition-all hover:border-white/20 hover:shadow-2xl">
              <div className="flex items-start gap-5">
                <GraduationCap className="text-blue-400" size={32} />
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-1">
                    Bachelor of Computer Applications (BCA)
                  </h3>
                  <p className="text-gray-300 mb-1">University/College Name</p>
                  <p className="text-sm text-gray-400 mb-3">2021 - 2024</p>
                  <div className="inline-block bg-green-500/20 text-green-300 text-sm px-3 py-1 rounded-full">
                    Graduated with Distinction
                  </div>
                </div>
              </div>
            </div>

            {/* 12th */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl transition-all hover:border-white/20 hover:shadow-2xl">
              <div className="flex items-start gap-5">
                <BookOpen className="text-purple-400" size={32} />
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-1">
                    Higher Secondary Education (12th)
                  </h3>
                  <p className="text-gray-300 mb-1">School Name</p>
                  <p className="text-sm text-gray-400 mb-3">2019 - 2021</p>
                  <div className="inline-block bg-blue-500/20 text-blue-300 text-sm px-3 py-1 rounded-full">
                    Score: 61%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Blog Section */}
      <section id="blog" className="py-24 px-4 bg-black/80 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90 backdrop-blur-md -z-10"></div>

        <div className="max-w-6xl mx-auto text-white relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            Latest Blog Posts
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden transition-all hover:border-white/20 hover:shadow-2xl hover:scale-[1.02]"
              >
                <div className="p-6 space-y-4">
                  {/* Category & Time */}
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full font-medium">
                      {post.category}
                    </span>
                    <span className="text-gray-400">{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white hover:text-blue-400 transition-colors cursor-pointer">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-300 text-sm leading-relaxed">{post.excerpt}</p>

                  {/* Footer Row */}
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <span className="text-sm text-gray-400">{post.date}</span>
                    <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition">
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 bg-black/80 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90 backdrop-blur-md -z-10"></div>

        <div className="max-w-4xl mx-auto text-white relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            Get In Touch
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Side */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
              </p>

              <div className="space-y-5 text-sm">
                <div className="flex items-center gap-4">
                  <Mail className="text-blue-400" size={22} />
                  <a href="mailto:sahusitun92@gmail.com" className="text-gray-300 hover:text-white transition">
                    sahusitun92@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Github className="text-gray-400" size={22} />
                  <a href="https://github.com/sahusitun92" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
                    github.com/sahusitun92
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Linkedin className="text-blue-400" size={22} />
                  <a href="https://www.linkedin.com/in/situn-sahu-894b64282/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Instagram className="text-pink-400" size={22} />
                  <a href="https://www.instagram.com/sahusitun37/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
                    @sahusitun37
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side Form */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
              {submitMessage && (
                <div
                  className={`mb-4 p-3 rounded-lg text-center font-medium ${submitMessage.includes('successfully')
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}
                >
                  {submitMessage}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Message</label>
                  <textarea
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Your message..."
                    required
                  ></textarea>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Situn Sahu. Built with React and lots of ☕
          </p>
        </div>
        <div className="mt-4 flex justify-center gap-4">
          <a href="https://github.com/sahusitun92" target="_blank" rel="noopener noreferrer">
            <Github className="text-gray-400 hover:text-white transition" size={20} />
          </a>
          <a href="https://linkedin.com/in/situn-sahu-894b64282/" target="_blank" rel="noopener noreferrer">
            <Linkedin className="text-blue-400 hover:text-white transition" size={20} />
          </a>
        </div>

      </footer>
    </div>
  );
};

export default Portfolio;