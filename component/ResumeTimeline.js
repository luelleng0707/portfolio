// Restructured Resume Timeline with Category-based Layout
function ScrollTimeline() {
  console.log('ScrollTimeline function called');
  
  const container = document.createElement('div');
  container.id = 'timeline-container';
  container.className = 'relative bg-white';
  container.style.cssText = `
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
  `;
  
  const categories = ['About', 'Experience', 'Education', 'Skills', 'Projects', 'Achievements'];
  
  container.innerHTML = `
    <!-- Logo Bubbles Background 
    <div id="logo-bubbles" class="logo-bubbles-container"></div>-->

    <!-- Navigation Timeline (Right side) -->
    <div class="timeline-nav">
      <div class="nav-track">
        <div class="nav-progress-bar" id="progress-bar"></div>
      </div>
      <div class="nav-dots">
        ${categories.map((category, index) => `
          <div class="nav-dot" data-category="${category}" data-index="${index}">
            <div class="dot-ring">
              ${getCategoryIcon(category)}
            </div>
            <span class="year-label">${category}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Main Timeline Sections -->
    <div class="sections-container" id="sections-container">
      ${categories.map((category, index) => renderCategorySection(category, index)).join('')}
    </div>

    <style>
      /* === LOGO BUBBLES === */
      .logo-bubbles-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
      }

      .logo-bubble {
        position: absolute;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-size: 80%;
        background-repeat: no-repeat;
        background-position: center;
        opacity: 0.7;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        background-color: white;
        border: 2px solid rgba(255, 255, 255, 0.8);
      }

      /* === NAVIGATION === */
      .timeline-nav {
        position: fixed;
        right: 2rem;
        top: 50%;
        transform: translateY(-50%);
        z-index: 100;
      }

      .nav-track {
        width: 4px;
        height: 24rem;
        background: #e5e7eb;
        border-radius: 2px;
        position: relative;
      }

      .nav-progress-bar {
        width: 100%;
        height: 0%;
        background: linear-gradient(180deg, #10b981 0%, #059669 100%);
        border-radius: 2px;
        transition: height 0.3s ease;
      }

      .nav-dots {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0.5rem 0;
      }

      .nav-dot {
        cursor: pointer;
        position: relative;
        display: flex;
        align-items: center;
      }

      .dot-ring {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        border: 3px solid #9ca3af;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .nav-dot.active .dot-ring {
        border-color: #10b981;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        transform: scale(1.2);
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
      }

      .year-label {
        position: absolute;
        left: 3.2rem;
        font-size: 0.9rem;
        font-weight: 600;
        color: #374151;
        background: white;
        padding: 0.4rem 0.8rem;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        opacity: 0;
        transform: translateX(-10px);
        transition: all 0.3s ease;
        white-space: nowrap;
      }

      .nav-dot:hover .year-label {
        opacity: 1;
        transform: translateX(0);
      }

      /* === CATEGORY SECTIONS === */
      .sections-container {
        height: 100vh;
        overflow-y: auto;
        scroll-snap-type: y mandatory;
        scroll-behavior: smooth;
      }

      .category-section {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        scroll-snap-align: start;
        overflow: hidden;
        padding: 2rem;
      }

      .category-header {
        text-align: center;
        margin-bottom: 3rem;
        z-index: 10;
        position: relative;
      }

      .category-title {
        font-size: 3.5rem;
        font-weight: bold;
        color: white;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        margin-bottom: 0.5rem;
      }

      .category-subtitle {
        font-size: 1.2rem;
        color: rgba(255, 255, 255, 0.9);
        font-weight: 300;
      }

      /* === CONTENT CARDS === */
      .content-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
        z-index: 20;
        position: relative;
      }

      .content-card {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(15px);
        border-radius: 20px;
        padding: 2rem;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.3);
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0;
        transform: translateY(50px) scale(0.9);
      }

      .content-card.animate-in {
        opacity: 1;
        transform: translateY(0) scale(1);
      }

      .content-card:hover {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
      }

      .card-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }

      .card-icon {
        font-size: 2rem;
      }

      .card-title {
        margin: 0;
        font-size: 1.3rem;
        font-weight: 600;
        color: #1f2937;
      }

      .card-subtitle {
        margin: 0;
        font-size: 1rem;
        color: #6b7280;
        font-weight: 500;
      }

      .card-period {
        margin: 0.5rem 0;
        font-size: 0.9rem;
        color: #10b981;
        font-weight: 600;
      }

      .card-content {
        color: #374151;
        line-height: 1.6;
        margin-bottom: 1rem;
      }

      .card-content ul {
        margin: 0.5rem 0;
        padding-left: 1.5rem;
      }

      .card-content li {
        margin: 0.3rem 0;
      }

      /* === SKILLS GRID === */
      .skills-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
      }

      .skill-category {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 16px;
        padding: 1.5rem;
        backdrop-filter: blur(15px);
        border: 1px solid rgba(255, 255, 255, 0.3);
      }

      .skill-category h4 {
        margin: 0 0 1rem 0;
        color: #1f2937;
        font-size: 1.1rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .skill-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .skill-tag {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 0.4rem 0.8rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
        transition: all 0.3s ease;
      }

      .skill-tag:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
      }

      /* === PROJECT CARDS === */
      .project-card {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 20px;
        overflow: hidden;
        transition: all 0.3s ease;
      }

      .project-image {
        width: 100%;
        height: 200px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
        color: white;
      }

      .project-info {
        padding: 1.5rem;
      }

      .project-title {
        margin: 0 0 0.5rem 0;
        font-size: 1.2rem;
        font-weight: 600;
        color: #1f2937;
      }

      .project-tech {
        margin: 1rem 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.3rem;
      }

      .tech-tag {
        background: #f3f4f6;
        color: #374151;
        padding: 0.2rem 0.6rem;
        border-radius: 12px;
        font-size: 0.7rem;
        font-weight: 500;
      }

      .project-links {
        display: flex;
        gap: 0.5rem;
        margin-top: 1rem;
      }

      .project-link {
        padding: 0.5rem 1rem;
        border-radius: 20px;
        text-decoration: none;
        font-size: 0.8rem;
        font-weight: 500;
        transition: all 0.3s ease;
      }

      .demo-link {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

      .github-link {
        background: linear-gradient(135deg, #24292e 0%, #586069 100%);
        color: white;
      }

      .project-link:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }

      /* === EXPERIENCE SECTION STYLING === */
      .category-section[data-category="Experience"] .card-content p:first-child {
        color: #ec4899; /* Pink color matching the Experience background gradient */
        font-weight: 500;
        background: linear-gradient(135deg, #f093fb 10%, #f5576c 90%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-size: 0.95rem;
        margin-bottom: 1rem;
        padding: 0.5rem 0;
      }

      /* Fallback for browsers that don't support background-clip */
      @supports not (-webkit-background-clip: text) {
        .category-section[data-category="Experience"] .card-content p:first-child {
          color: #ec4899;
          -webkit-text-fill-color: initial;
        }
      }

      /* Mobile responsiveness */
      @media (max-width: 768px) {
        .category-section[data-category="Experience"] .card-content p:first-child {
          font-size: 0.9rem;
        }
      }

      /* === RESPONSIVE === */
      @media (max-width: 768px) {
        .content-container {
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        
        .category-title {
          font-size: 2.5rem;
        }
        
        .timeline-nav {
          right: 1rem;
          transform: translateY(-50%) scale(0.9);
        }
        
        .year-label {
          display: none;
        }
      }
    </style>
  `;

  // Initialize all components
  setTimeout(() => {
    console.log('Initializing category-based timeline...');
    initScrollNavigation(container);
    initCardAnimations(container);
    initLogoBubbles(container);
  }, 100);
  
  return container;
}

// Get category icon
function getCategoryIcon(category) {
  const icons = {
    'About': '👨‍💻',
    'Experience': '💼',
    'Education': '🎓',
    'Skills': '🛠️',
    'Projects': '🚀',
    'Achievements': '🏆'
  };
  return icons[category] || '📄';
}

// Render Category Section
function renderCategorySection(category, index) {
  const data = getCategoryData()[category];
  if (!data) return '';
  
  return `
    <section class="category-section" data-category="${category}" data-index="${index}" 
             style="background: ${data.background}; background-size: 400% 400%; animation: gradientShift 15s ease infinite;">
      <div class="category-header">
        <h2 class="category-title">${category}</h2>
        <p class="category-subtitle">${data.subtitle}</p>
      </div>
      <div class="content-container">
        ${renderCategoryContent(category, data)}
      </div>
    </section>
  `;
}

// Render Category Content
function renderCategoryContent(category, data) {
  switch(category) {
    case 'About':
      return renderAboutContent(data);
    case 'Experience':
      return renderExperienceContent(data);
    case 'Education':
      return renderEducationContent(data);
    case 'Skills':
      return renderSkillsContent(data);
    case 'Projects':
      return renderProjectsContent(data);
    case 'Achievements':
      return renderAchievementsContent(data);
    default:
      return '';
  }
}

// Render About Content
function renderAboutContent(data) {
  return `
    <div class="content-card" data-delay="0">
      <div class="card-header">
        <span class="card-icon">🎯</span>
        <div>
          <h3 class="card-title">Frontend Developer + Finance Background</h3>
        </div>
      </div>
      <div class="card-content">
        <p><strong>🔥 Unique Combo:</strong> Economics student with proven coding skills</p>
        <p><strong>🏆 Track Record:</strong> Hackathon winner since high school, multiple awards</p>
        <p><strong>💼 Ready for:</strong> Frontend development roles with business impact</p>
      </div>
    </div>
    
    <div class="content-card" data-delay="200">
      <div class="card-header">
        <span class="card-icon">🚀</span>
        <div>
          <h3 class="card-title">Key Strengths</h3>
        </div>
      </div>
      <div class="card-content">
        <ul>
          <li><strong>Technical:</strong> HTML/CSS/JS, React, APIs, Responsive Design</li>
          <li><strong>Business:</strong> Finance education, data analysis (R, SQL, STATA)</li>
          <li><strong>Leadership:</strong> Event organizing, public speaking, team coordination</li>
          <li><strong>Languages:</strong> English (IELTS 7.5), Vietnamese (Native)</li>
        </ul>
      </div>
    </div>
  `;
}

// Render Experience Content
function renderExperienceContent(data) {
  return data.items.map((item, index) => `
    <div class="content-card" data-delay="${index * 200}">
      <div class="card-header">
        <span class="card-icon">${item.icon}</span>
        <div>
          <h3 class="card-title">${item.title}</h3>
          <h4 class="card-subtitle">${item.company}</h4>
          <p class="card-period">${item.period}</p>
        </div>
      </div>
      <div class="card-content">
        <p>${item.description}</p>
        ${item.achievements ? `
          <ul>
            ${item.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
          </ul>
        ` : ''}
      </div>
    </div>
  `).join('');
}

// Similar render functions for other categories...
function renderEducationContent(data) {
  return data.items.map((item, index) => `
    <div class="content-card" data-delay="${index * 200}">
      <div class="card-header">
        <span class="card-icon">${item.icon}</span>
        <div>
          <h3 class="card-title">${item.degree}</h3>
          <h4 class="card-subtitle">${item.school}</h4>
          <p class="card-period">${item.period}</p>
        </div>
      </div>
      <div class="card-content">
        <p>${item.description}</p>
        ${item.relevant ? `<p><strong>Relevant Coursework:</strong> ${item.relevant}</p>` : ''}
      </div>
    </div>
  `).join('');
}

function renderSkillsContent(data) {
  return `
    <div class="skills-grid">
      ${Object.entries(data.categories).map(([category, skills]) => `
        <div class="skill-category">
          <h4>${getSkillCategoryIcon(category)} ${category}</h4>
          <div class="skill-tags">
            ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderProjectsContent(data) {
  return data.items.map((project, index) => `
    <div class="content-card project-card" data-delay="${index * 200}">
      <div class="project-image">
        ${project.icon}
      </div>
      <div class="project-info">
        <h3 class="project-title">${project.title}</h3>
        <p class="card-content">${project.description}</p>
        ${project.disclaimer ? `
          <div class="project-disclaimer">
            <p class="disclaimer-text">${project.disclaimer}</p>
          </div>
        ` : ''}
        <div class="project-tech">
          ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <div class="project-links">
          ${project.demo ? `<a href="${project.demo}" target="_blank" class="project-link demo-link">Live Demo</a>` : ''}
          ${project.github ? `<a href="${project.github}" target="_blank" class="project-link github-link">GitHub Repo</a>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

function renderAchievementsContent(data) {
  return data.items.map((item, index) => `
    <div class="content-card" data-delay="${index * 200}">
      <div class="card-header">
        <span class="card-icon">${item.icon}</span>
        <div>
          <h3 class="card-title">${item.title}</h3>
          <p class="card-period">${item.year}</p>
        </div>
      </div>
      <div class="card-content">
        <p>${item.description}</p>
        ${item.link ? `<a href="${item.link}" target="_blank" class="achievement-link">Read More</a>` : ''}
      </div>
    </div>
  `).join('');
}

// Helper function for skill category icons
function getSkillCategoryIcon(category) {
  const icons = {
    'Programming Languages': '💻',
    'Frameworks & Libraries': '⚛️',
    'Tools & Software': '🛠️',
    'Core Competencies': '🎯',
    'Languages': '🌍',
    'Soft Skills': '🤝'
  };
  return icons[category] || '📋';
}

// Category Data with Updated Information
function getCategoryData() {
  return {
    'About': {
      subtitle: 'Frontend Developer | Finance Student | Problem Solver',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    'Experience': {
      subtitle: 'Professional Experience & Leadership Roles',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      items: [
        {
          title: 'Consulting Interest Group Ambassador',
          company: 'NYU Shanghai Center for Career Development',
          period: 'Oct 2024 - Present',
          icon: '🎯',
          description: 'Organized & hosted workshops at career events, honing public speaking & teamwork skills with positive feedback received',
          achievements: [
            'Speaker and Organizer of "Chart Your Path: Illuminating a Career in Consulting" event',
            'Conducted research and compiled resources for effective knowledge sharing and audience engagement',
            'Enhanced public speaking and teamwork skills through workshop facilitation'
          ]
        },
        {
          title: 'Research Assistant',
          company: 'Science For Economics, NEU',
          period: 'Apr 2022 - Oct 2022',
          icon: '📊',
          description: 'Participated in ministerial level economical science research with advanced statistical training',
          achievements: [
            'Participated in ministerial level economical science research projects',
            'Received comprehensive training in Stata, R, and other statistical analysis tools',
            'Contributed to academic research with quantitative analysis and data processing'
          ]
        },
        {
          title: 'Coordinator',
          company: 'Developh Vietnam',
          period: 'Sep 2021 - Feb 2022',
          icon: '🤝',
          description: 'Coordinated community tech initiatives and development programs'
        },
        {
          title: 'JavaScript Intern',
          company: 'VietIS Corporation',
          period: 'Feb 2020 - Apr 2020',
          icon: '💻',
          description: 'Collaborated on building responsive website layouts utilizing HTML/CSS/JS to enhance user experience, employing jQuery for dynamic functionality',
          achievements: [
            'Streamlined design alignment to client specifications resulting in a 20% reduction in design revisions',
            'Garnered positive customer feedback on aesthetic appeal',
            'Enhanced user experience through responsive design implementations'
          ]
        }
      ]
    },
    'Education': {
      subtitle: 'Academic Background & International Experience',
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      items: [
        {
          degree: 'Bachelor of Arts (In Progress)',
          school: 'New York University Shanghai',
          period: 'Expected Jun 2028',
          icon: '🌐',
          description: 'Pursuing globally integrated curriculum with a merit scholarship of 53k$/year access to NYU Stern resources and cross-campus opportunities. Restarted academic journey for international market alignment and post-graduate work eligibility in UK/Japan/Saudi Arabia.',
          relevant: 'Innovation Lab, Expanded Web '        },
        {
          degree: 'Bachelor\'s in Public Finance (On Hold)',
          school: 'National Economics University, Vietnam',
          period: 'Oct 2021 - Present',
          icon: '🎓',
          description: 'Admitted to Vietnam\'s top economics institution. Academic work emphasized public sector finance, policy analysis, and market research with strong quantitative foundation.',
          relevant: 'Public Finance, Economic Analysis, Statistical Methods, Financial Markets, Data Analysis'
        }
      ]
    },
    'Skills': {
      subtitle: 'Technical Skills & Professional Competencies',
      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      categories: {
        'Programming Languages': ['HTML5', 'CSS3', 'JavaScript (Vanilla)', 'SQL', 'R', 'STATA'],
        'Frameworks & Libraries': ['TailwindCSS', 'React (Basic)', 'Next.js (Beginner)', 'jQuery'],
        'Tools & Software': ['Git', 'VS Code', 'Canva', 'Excel', 'SPSS'],
        'Core Competencies': ['Responsive Design', 'UX/UI Principles', 'Web Animation Basics', 'API Integration'],
        'Languages': ['English (IELTS 7.5)', 'Vietnamese (Native)'],
        'Soft Skills': ['Public Speaking', 'Event Organization', 'Research', 'Team Leadership', 'Academic Writing']
      }
    },
    'Projects': {
      subtitle: 'Featured Development Projects & Achievements',
      background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      items: [
        {
          title: 'AI Study Assistant',
          description: 'Utilizing modern web technologies & AI integration to enhance student learning through personalized recommendations & progress tracking. Implemented AI technology to effortlessly produce study materials like flashcards, practice tests, & notes, saving time typically spent on search tasks.',
          disclaimer: '⚠️ DEVELOPMENT STATUS: This project is currently in active development for personal use. Many features are still being refined and improved. The current version serves as a proof-of-concept and learning exercise.',
          icon: '🤖',
          tech: ['HTML5', 'CSS3', 'JavaScript', 'AI Integration', 'Open Router API'],
          demo: 'https://luelleng0707.github.io/AI-study-assistant/',
          github: 'https://github.com/luelleng0707/AI-study-assistant'
        },
        {
          title: 'Love & Death Website',
          description: 'Created a responsive website from scratch showcasing research on the meaning of love across cultures & time, resulting in receiving an A for the class. Engineered the full front-end using HTML, CSS, & JavaScript, embracing free-form design unconstrained by templates.',
          icon: '💝',
          tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Cultural Research'],
          demo: 'https://luelleng0707.github.io/love-death/',
          github: 'https://github.com/luelleng0707/love-death'
        },
        {
          title: 'FinChat - AI Budgeting Assistant',
          description: 'Emerged victorious at the FUNiX ChatGPT Hackathon, clinching a 30 million VND cash prize & securing an additional 15M investment opportunity. Headed the design & front-end build for a budgeting & stock recommendation chatbot, leveraging React to orchestrate stock growth chart visualizations.',
          disclaimer: '⚠️ DEVELOPMENT STATUS: This hackathon-winning project is currently being rebuilt and enhanced for personal financial management. The original competition version demonstrated core concepts, but the current iteration is undergoing significant improvements and feature additions.',
          icon: '💰',
          tech: ['React', 'ChatGPT API', 'Yahoo Finance API', 'Canva', 'Data Visualization'],
          demo: null,
          github: null
        },
        {
          title: 'UnCity Front-End Test',
          description: 'Excelled in a front-end coding test for a Japanese remote company, showcasing proficiency in HTML, CSS, & JavaScript. Developed a landing page based on design mockups; delivered within 5 hours. Executed design to clean, semantic HTML/CSS transformation using SASS.',
          icon: '🏙️',
          tech: ['HTML5', 'CSS3', 'JavaScript', 'SASS', 'Responsive Design'],
          demo: 'https://luelleng0707.github.io/UnCity/',
          github: 'https://github.com/luelleng0707/UnCity'
        }
      ]
    },
    'Achievements': {
      subtitle: 'Awards, Competitions & Recognition',
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      items: [
        {
          title: 'Champion of FUNIX ChatGPT Hackathon',
          year: 'May 2023',
          icon: '🏆',
          description: 'Emerged victorious at the FUNiX ChatGPT Hackathon, clinching a 30 million VND cash prize & securing an additional 15M investment opportunity from a panel judge. Led design, development, and presentation for FinChat - AI-powered budgeting and stock recommendation chatbot.'
        },
        {
          title: '3rd Prize | FPT Edu Hackathon 2021',
          year: 'Apr 2021',
          icon: '🥉',
          description: 'Achieved third place in competitive hackathon focusing on educational technology solutions and innovation.'
        },
        {
          title: '3rd Prize | FPT Edu Hackathon 2019',
          year: 'Jan 2020',
          icon: '🥉',
          description: 'As a high school student, achieved third place in national hackathon competition, demonstrating early technical aptitude and problem-solving skills.',
          link: 'https://vnexpress.net/hoc-sinh-thpt-gianh-giai-fpt-edu-hackathon-2019-4042313.html'
        },
        {
          title: 'HackerRank SQL Certifications',
          year: 'Feb 2023',
          icon: '📜',
          description: 'Earned both SQL (Basic) and SQL (Intermediate) certificates from HackerRank, demonstrating proficiency in database management and query optimization.'
        },
        {
          title: 'IELTS 7.5 Achievement',
          year: 'May 2020',
          icon: '🌍',
          description: 'Achieved IELTS score of 7.5, demonstrating strong English proficiency for international academic and professional environments.'
        }
      ]
    }
  };
}

// Initialize scroll navigation
function initScrollNavigation(container) {
  const sectionsContainer = container.querySelector('#sections-container');
  const navDots = container.querySelectorAll('.nav-dot');
  const progressBar = container.querySelector('#progress-bar');
  
  // Handle scroll events
  sectionsContainer.addEventListener('scroll', (e) => {
    const scrollTop = e.target.scrollTop;
    const scrollHeight = e.target.scrollHeight - e.target.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    
    progressBar.style.height = `${scrollPercent}%`;
    
    // Update active navigation dot
    const sections = container.querySelectorAll('.category-section');
    let activeIndex = 0;
    
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const containerRect = sectionsContainer.getBoundingClientRect();
      
      if (rect.top <= containerRect.top + 100) {
        activeIndex = index;
      }
    });
    
    navDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeIndex);
    });
  });
  
  // Handle navigation dot clicks
  navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      const targetSection = container.querySelector(`[data-index="${index}"]`);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Initialize card animations
function initCardAnimations(container) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, delay);
      }
    });
  }, { threshold: 0.2 });
  
  const cards = container.querySelectorAll('.content-card');
  cards.forEach(card => observer.observe(card));
}

// Initialize logo bubbles background
function initLogoBubbles(container) {
  const bubblesContainer = container.querySelector('#logo-bubbles');
  const logos = [
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg'
  ];
  
  function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'logo-bubble';
    bubble.style.backgroundImage = `url(${logos[Math.floor(Math.random() * logos.length)]})`;
    bubble.style.left = Math.random() * 100 + '%';
    bubble.style.top = Math.random() * 100 + '%';
    bubble.style.animationDuration = (Math.random() * 20 + 10) + 's';
    bubble.style.animationDelay = Math.random() * 5 + 's';
    
    bubblesContainer.appendChild(bubble);
    
    setTimeout(() => {
      if (bubble.parentNode) {
        bubble.parentNode.removeChild(bubble);
      }
    }, 30000);
  }
  
  // Create initial bubbles
  for (let i = 0; i < 8; i++) {
    setTimeout(() => createBubble(), i * 2000);
  }
  
  // Continue creating bubbles
  setInterval(createBubble, 5000);
}

// Add CSS for project disclaimer and achievement links
const additionalStyles = `
  <style>
    /* === PROJECT DISCLAIMER === */
    .project-disclaimer {
      margin: 1rem 0;
      padding: 1rem;
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      border-left: 4px solid #f59e0b;
      border-radius: 8px;
    }

    .disclaimer-text {
      margin: 0;
      font-size: 0.85rem;
      color: #92400e;
      font-weight: 500;
      line-height: 1.4;
    }

    .achievement-link {
      display: inline-block;
      margin-top: 0.5rem;
      padding: 0.3rem 0.8rem;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      text-decoration: none;
      border-radius: 15px;
      font-size: 0.8rem;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .achievement-link:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
    }

    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  </style>
`;

// Make sure to export the function
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ScrollTimeline;
}
