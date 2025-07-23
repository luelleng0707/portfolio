// Complete Interactive Timeline with Improved Widget System
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
  
  const years = ['2019', '2020', '2021', '2022', '2023', '2024', '2025'];
  
  container.innerHTML = `
    <!-- Logo Bubbles Background -->
    <div id="logo-bubbles" class="logo-bubbles-container"></div>
    
    <!-- Navigation Timeline (Right side) -->
    <div class="timeline-nav">
      <div class="nav-track">
        <div class="nav-progress-bar" id="progress-bar"></div>
      </div>
      <div class="nav-dots">
        ${years.map((year, index) => `
          <div class="nav-dot" data-year="${year}" data-index="${index}">
            <div class="dot-ring">
              ${year.slice(-2)}
            </div>
            <span class="year-label">${year}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Main Timeline Sections -->
    <div class="sections-container" id="sections-container">
      ${years.map((year, index) => renderYearSection(year, index)).join('')}
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

      .logo-bubble:hover {
        opacity: 1;
        transform: scale(1.2);
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
        height: 20rem;
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
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        border: 3px solid #9ca3af;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        font-weight: bold;
        color: #4b5563;
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
        left: 2.8rem;
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

      /* === YEAR SECTIONS === */
      .sections-container {
        height: 100vh;
        overflow-y: auto;
        scroll-snap-type: y mandatory;
        scroll-behavior: smooth;
      }

      .year-section {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        scroll-snap-align: start;
        overflow: hidden;
      }

      .year-circle {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 200px;
        height: 200px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
        font-weight: bold;
        color: white;
        z-index: 10;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        animation: floatYear 6s ease-in-out infinite;
      }

      /* === FLOATING WIDGETS === */
      .widgets-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        padding: 2rem;
        align-content: start;
        overflow: hidden;
      }

      .floating-widget {
        position: relative;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(15px);
        border-radius: 20px;
        padding: 1.5rem;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.3);
        pointer-events: auto;
        cursor: grab;
        user-select: none;
        z-index: 20;
        opacity: 0;
        transform: translateY(50px) scale(0.9);
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
        min-height: 120px;
        max-height: 400px;
      }

      .floating-widget.animate-in {
        opacity: 1;
        transform: translateY(0) scale(1);
      }

      .floating-widget:hover:not(.dragging) {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
      }

      .floating-widget.dragging {
        cursor: grabbing;
        transform: scale(1.05);
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        position: fixed;
      }

      .floating-widget.collapsed {
        min-height: auto;
        height: 80px;
        max-height: 80px;
      }

      .floating-widget.collapsed .widget-content {
        display: none;
      }

      .widget-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
        cursor: pointer;
      }

      .floating-widget.collapsed .widget-header {
        margin-bottom: 0;
      }

      .widget-title {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin: 0;
        color: #1f2937;
        font-size: 1.1rem;
        font-weight: 600;
      }

      .widget-icon {
        font-size: 1.8rem;
      }

      .collapse-btn {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.1);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        font-size: 1rem;
        color: #6b7280;
        font-weight: bold;
      }

      .collapse-btn:hover {
        background: rgba(0, 0, 0, 0.2);
        transform: scale(1.1);
      }

      .drag-handle {
        position: absolute;
        top: 0.75rem;
        right: 3rem;
        width: 20px;
        height: 20px;
        opacity: 0.3;
        cursor: grab;
        transition: opacity 0.3s ease;
        background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"/></svg>') no-repeat center;
        background-size: contain;
      }

      .floating-widget:hover .drag-handle {
        opacity: 0.7;
      }

      .drag-handle:hover {
        opacity: 1 !important;
      }

      .widget-content {
        overflow-y: auto;
        max-height: 280px;
      }

      /* === SKILL BUBBLES === */
      .skill-bubbles {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        justify-content: flex-start;
        margin: 1rem 0;
      }

      .skill-bubble {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.4rem 0.8rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
        opacity: 0;
        transform: translateY(15px) scale(0.9);
      }

      .skill-bubble.new-skill {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        border: 2px solid #10b981;
        animation: skillPopIn 0.6s ease-out forwards;
      }

      .skill-bubble.existing-skill {
        background: rgba(255, 255, 255, 0.8);
        color: #6b7280;
        border: 2px solid #e5e7eb;
        animation: skillFadeIn 0.6s ease-out forwards;
      }

      .skill-bubble:hover {
        transform: translateY(-2px) scale(1.05);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
      }

      .skill-bubble.new-skill:hover {
        box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
      }

      /* === ARTICLE PREVIEWS === */
      .article-preview {
        margin: 1rem 0;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
      }

      .article-preview:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
      }

      .article-iframe {
        width: 100%;
        height: 180px;
        border: none;
        pointer-events: none;
        transition: transform 0.3s ease;
      }

      .article-preview:hover .article-iframe {
        transform: scale(1.02);
      }

      .article-header {
        padding: 1rem;
        background: white;
        border-top: 1px solid #e5e7eb;
      }

      .article-title {
        margin: 0 0 0.5rem 0;
        font-size: 0.95rem;
        font-weight: 600;
        color: #1f2937;
        line-height: 1.4;
      }

      /* === LINKS === */
      .demo-link, .github-link {
        display: inline-block;
        padding: 0.5rem 1rem;
        border-radius: 25px;
        text-decoration: none;
        font-weight: 500;
        font-size: 0.85rem;
        transition: all 0.3s ease;
        margin: 0.25rem 0.5rem 0.25rem 0;
      }

      .demo-link {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

      .github-link {
        background: linear-gradient(135deg, #24292e 0%, #586069 100%);
        color: white;
      }

      .demo-link:hover, .github-link:hover {
        transform: scale(1.05);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }

      /* === ANIMATIONS === */
      @keyframes floatYear {
        0%, 100% { transform: translate(-50%, -50%) rotateY(0deg) scale(1); }
        25% { transform: translate(-50%, -50%) rotateY(5deg) scale(1.02); }
        50% { transform: translate(-50%, -50%) rotateY(0deg) scale(1.05); }
        75% { transform: translate(-50%, -50%) rotateY(-5deg) scale(1.02); }
      }

      @keyframes skillPopIn {
        0% {
          opacity: 0;
          transform: translateY(20px) scale(0.8);
        }
        60% {
          transform: translateY(-3px) scale(1.05);
        }
        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes skillFadeIn {
        0% {
          opacity: 0;
          transform: translateY(15px) scale(0.9);
        }
        100% {
          opacity: 0.7;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      /* === RESPONSIVE === */
      @media (max-width: 1024px) {
        .widgets-container {
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          padding: 1.5rem;
        }
      }

      @media (max-width: 768px) {
        .timeline-nav {
          right: 1rem;
          transform: translateY(-50%) scale(0.9);
        }
        
        .year-label {
          display: none;
        }
        
        .year-circle {
          width: 150px;
          height: 150px;
          font-size: 2.5rem;
        }
        
        .widgets-container {
          grid-template-columns: 1fr;
          gap: 1rem;
          padding: 1rem;
        }
        
        .floating-widget {
          padding: 1rem;
          font-size: 0.9rem;
        }

        .logo-bubble {
          width: 40px;
          height: 40px;
        }
      }

      @media (max-width: 480px) {
        .year-circle {
          width: 120px;
          height: 120px;
          font-size: 2rem;
        }
        
        .floating-widget {
          padding: 0.8rem;
          font-size: 0.8rem;
        }

        .logo-bubble {
          width: 35px;
          height: 35px;
        }
      }
    </style>
  `;

  // Initialize all components
  setTimeout(() => {
    console.log('Initializing complete timeline...');
    initScrollNavigation(container);
    initWidgetAnimations(container);
    initDragAndDrop(container);
    initLogoBubbles(container);
    initWidgetCollapse(container);
  }, 100);
  
  return container;
}

// Simple Perlin Noise for organic movement
const noise = {
  noise2D: function(x, y) {
    return Math.sin(x * 12.9898 + y * 78.233) * 43758.5453123 % 1;
  }
};

// Logo Bubbles System with Skill-based Logos
class LogoBubbles {
  constructor(container) {
    this.container = container.querySelector('#logo-bubbles');
    this.bubbles = [];
    
    // Enhanced skill-based logos mapping
    this.skillLogos = {
      'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      'SQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      'R': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg',
      'jQuery': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg',
      'Bootstrap': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
      'Excel': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzIxNzM0NiIgZD0iTTIgM3YxOGgyMFYzSDJ6bTEwIDEwaDhWOWgtOHY0em0wIDRoOHYtNGgtOHY0em0tMi00aDJWOWgtMnY0em0wIDRoMnYtNEg4djR6bTAtOGgyVjVIOHY0em0yIDBoOFY1SDEwdjR6Ii8+PC9zdmc+',
      'Stata': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzAwN0FDQyIgZD0iTTEyIDJjNS41MiAwIDEwIDQuNDggMTAgMTBzLTQuNDggMTAtMTAgMTAtMTAtNC40OC0xMC0xMCIvPjwvc3ZnPg==',
      'AI/ML': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI0ZGNkYwMCIgZD0iTTEyIDJjNS41MiAwIDEwIDQuNDggMTAgMTBzLTQuNDggMTAtMTAgMTAtMTAtNC40OC0xMC0xMCIvPjwvc3ZnPg==',
      'Data Science': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzRGNDZFNSIgZD0iTTEyIDJjNS41MiAwIDEwIDQuNDggMTAgMTBzLTQuNDggMTAtMTAgMTAtMTAtNC40OC0xMC0xMCIvPjwvc3ZnPg==',
      'Data Analytics': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzEwQjk4MSIgZD0iTTEyIDJjNS41MiAwIDEwIDQuNDggMTAgMTBzLTQuNDggMTAtMTAgMTAtMTAtNC40OC0xMC0xMCIvPjwvc3ZnPg=='
    };
    
    this.createBubbles();
    this.animate();
  }
  
  createBubbles() {
    const allSkills = Object.keys(this.skillLogos);
    
    for (let i = 0; i < 15; i++) {
      const skill = allSkills[Math.floor(Math.random() * allSkills.length)];
      const bubble = new LogoBubble({
        x: Math.random() * (window.innerWidth + 200),
        y: Math.random() * window.innerHeight,
        scale: 0.8 + Math.random() * 0.4,
        logo: this.skillLogos[skill],
        skill: skill,
        container: this.container
      });
      
      this.bubbles.push(bubble);
    }
  }
  
  animate() {
    this.bubbles.forEach(bubble => bubble.update());
    requestAnimationFrame(this.animate.bind(this));
  }
}

class LogoBubble {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.scale = options.scale;
    this.logo = options.logo;
    this.skill = options.skill;
    this.container = options.container;
    this.speed = 0.3 + Math.random() * 0.4;
    this.noiseX = Math.random() * 1000;
    this.noiseY = Math.random() * 1000;
    
    this.createElement();
  }
  
  createElement() {
    this.element = document.createElement('div');
    this.element.className = 'logo-bubble';
    this.element.style.backgroundImage = `url(${this.logo})`;
    this.element.title = this.skill; // Tooltip
    this.container.appendChild(this.element);
  }
  
  update() {
    this.noiseX += 0.008;
    this.noiseY += 0.008;
    
    const noiseValueX = noise.noise2D(this.noiseX, 0) * 4;
    const noiseValueY = noise.noise2D(this.noiseY, 0) * 4;
    
    this.x -= this.speed;
    
    if (this.x < -120) {
      this.x = window.innerWidth + 100;
      this.y = Math.random() * window.innerHeight;
    }
    
    const finalX = this.x + noiseValueX;
    const finalY = this.y + noiseValueY;
    
    this.element.style.transform = `translate(${finalX}px, ${finalY}px) scale(${this.scale})`;
  }
}

// Render Year Section with Grid Layout
function renderYearSection(year, index) {
  const data = getTimelineData()[year];
  if (!data) return '';
  
  return `
    <section class="year-section" data-year="${year}" data-index="${index}" 
             style="background: ${data.background}; background-size: 400% 400%; animation: gradientShift 15s ease infinite;">
      <div class="year-circle" style="background: ${data.color};">
        ${year}
      </div>
      <div class="widgets-container">
        ${renderWidgets(data, year, index)}
      </div>
    </section>
  `;
}

// Render Widgets with Consistent Structure
function renderWidgets(data, year, index) {
  const widgets = [];
  const allYears = ['2019', '2020', '2021', '2022', '2023', '2024', '2025'];
  const timelineData = getTimelineData();
  
  // Skills widget (same structure as other widgets)
  widgets.push(`
    <div class="floating-widget" data-delay="0">
      <div class="widget-header" onclick="toggleWidget(this.parentElement)">
        <h4 class="widget-title">
          <span class="widget-icon">🎯</span>
          Skills Acquired
        </h4>
        <button class="collapse-btn">−</button>
      </div>
      <div class="widget-content">
        <p style="color: #6b7280; margin: 0 0 1rem 0; font-size: 0.9rem; line-height: 1.5;">
          ${data.skills && data.skills.length > 0 ? 
            `New skills learned in ${year}: ${data.skills.join(', ')}` : 
            'Continued developing existing skills'
          }
        </p>
        ${renderSkillBubbles(data, year, allYears, timelineData)}
      </div>
      <div class="drag-handle"></div>
    </div>
  `);
  
  // Achievement widgets
  data.achievements.forEach((achievement, i) => {
    widgets.push(`
      <div class="floating-widget" data-delay="${(i + 1) * 300}">
        <div class="widget-header" onclick="toggleWidget(this.parentElement)">
          <h4 class="widget-title">
            <span class="widget-icon">${achievement.icon}</span>
            ${achievement.title}
          </h4>
          <button class="collapse-btn">−</button>
        </div>
        <div class="widget-content">
          <p style="color: #6b7280; margin: 0 0 1rem 0; font-size: 0.9rem; line-height: 1.5;">${achievement.description}</p>
          
          ${achievement.isArticle ? `
            <div class="article-preview">
              <iframe src="${achievement.link}" class="article-iframe" loading="lazy"></iframe>
              <div class="article-header">
                <h5 class="article-title">${achievement.headline}</h5>
                <a href="${achievement.link}" target="_blank" class="demo-link">Read Full Article →</a>
              </div>
            </div>
          ` : ''}
          
          ${achievement.demoLink ? `<a href="${achievement.demoLink}" target="_blank" class="demo-link">Live Demo →</a>` : ''}
          ${achievement.githubLink ? `<a href="${achievement.githubLink}" target="_blank" class="github-link">View Code →</a>` : ''}
        </div>
        <div class="drag-handle"></div>
      </div>
    `);
  });
  
  return widgets.join('');
}

// Widget Collapse Functionality
function initWidgetCollapse(container) {
  window.toggleWidget = function(widget) {
    const isCollapsed = widget.classList.contains('collapsed');
    const collapseBtn = widget.querySelector('.collapse-btn');
    
    if (isCollapsed) {
      widget.classList.remove('collapsed');
      collapseBtn.textContent = '−';
    } else {
      widget.classList.add('collapsed');
      collapseBtn.textContent = '+';
    }
  };
}

// Enhanced Drag and Drop
function initDragAndDrop(container) {
  let dragState = {
    isDragging: false,
    currentWidget: null,
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0
  };
  
  container.querySelectorAll('.floating-widget').forEach(widget => {
    const dragHandle = widget.querySelector('.drag-handle') || widget;
    
    dragHandle.addEventListener('mousedown', startDrag);
    dragHandle.addEventListener('touchstart', startDrag, { passive: false });
  });
  
  function startDrag(e) {
    if (e.target.closest('.demo-link, .github-link, a, .collapse-btn, .widget-header')) return;
    
    e.preventDefault();
    const widget = e.currentTarget.closest('.floating-widget');
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    
    dragState = {
      isDragging: true,
      currentWidget: widget,
      startX: clientX,
      startY: clientY,
      initialX: widget.offsetLeft,
      initialY: widget.offsetTop
    };
    
    widget.classList.add('dragging');
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('touchend', stopDrag);
  }
  
  function drag(e) {
    if (!dragState.isDragging) return;
    
    e.preventDefault();
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - dragState.startX;
    const deltaY = clientY - dragState.startY;
    
    const newX = Math.max(0, Math.min(window.innerWidth - 300, dragState.initialX + deltaX));
    const newY = Math.max(0, Math.min(window.innerHeight - 200, dragState.initialY + deltaY));
    
    dragState.currentWidget.style.left = `${newX}px`;
    dragState.currentWidget.style.top = `${newY}px`;
    dragState.currentWidget.style.position = 'fixed';
  }
  
  function stopDrag() {
    if (!dragState.isDragging) return;
    
    dragState.currentWidget.classList.remove('dragging');
    dragState.isDragging = false;
    
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('touchend', stopDrag);
  }
}

// Timeline Data (keep the same as before)
function getTimelineData() {
  return {
    '2019': {
      title: 'Academic Beginnings & First Hackathon Victory',
      description: 'Started university journey and won first coding competition',
      skills: ['HTML', 'CSS', 'JavaScript'],
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      achievements: [
        {
          title: 'University Journey Begins',
          description: 'Started BSc in Public Finance at National Economics University, Vietnam',
          icon: '🎓'
        },
        {
          title: 'Coding Foundations',
          description: 'Learned HTML, CSS, JavaScript basics through FUnix online courses',
          icon: '💻'
        },
        {
          title: 'FPT Edu Hackathon 2019 - 3rd Prize',
          description: '3rd Prize - designed and 3D-printed a pen shell with team',
          icon: '🏆',
          link: 'https://vnexpress.net/hoc-sinh-thpt-gianh-giai-fpt-edu-hackathon-2019-4042313.html',
          isArticle: true,
          headline: 'High School Students Win FPT Edu Hackathon 2019'
        }
      ]
    },
    '2020': {
      title: 'Professional Experience & Entrepreneurship',
      description: 'First internship and co-founded successful startup project',
      skills: ['jQuery', 'Bootstrap', 'Project Management'],
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      achievements: [
        {
          title: 'First Internship',
          description: 'JS Intern at VietIS Corp (Hanoi) - practiced front-end implementation with jQuery and Bootstrap',
          icon: '💼'
        },
        {
          title: 'The 80% Project Co-founder',
          description: 'Led logistics, grew Facebook reach by 600% in 4 months, managed team recruitment and development planning',
          icon: '🚀'
        }
      ]
    },
    '2021': {
      title: 'University Admission & Community Leadership',
      description: 'Admitted to top business school and continued hackathon success',
      skills: ['Leadership', 'Community Management'],
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      achievements: [
        {
          title: 'University Admission',
          description: 'Admitted to National Economics University (top 1 business school in Vietnam)',
          icon: '🌐'
        },
        {
          title: 'FPT Edu Hackathon 2021 - 3rd Prize',
          description: '3rd Prize in FPT Edu Hackathon 2021',
          icon: '🏆',
          link: 'https://funix.edu.vn/tin-tuc-funix/nhung-khoanh-khac-tinh-ban-kho-quen-tai-chung-ket-fpt-edu-hackathon-cua-sinh-vien-funix/',
          isArticle: true,
          headline: 'Unforgettable Moments at FPT Edu Hackathon Finals'
        },
        {
          title: 'Community Leadership',
          description: 'Coordinator at Developh Vietnam, assisting with community tech initiatives',
          icon: '👥'
        }
      ]
    },
    '2022': {
      title: 'Research & Technical Skills Development',
      description: 'Research assistant role and major project development',
      skills: ['SQL', 'R', 'Stata', 'Data Analytics', 'Excel'],
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      achievements: [
        {
          title: 'Research Assistant',
          description: 'Science for Economics at NEU - data cleaning, translation, research papers. Learned Stata, R, and data analytics',
          icon: '📊'
        },
        {
          title: 'UnCity Project',
          description: 'A responsive real estate platform showcasing property listings with modern UI/UX design and interactive features for Japanese company screening',
          icon: '🏙️',
          demoLink: 'https://luelleng0707.github.io/UnCity/',
          githubLink: 'https://github.com/luelleng0707/UnCity'
        },
        {
          title: 'Technical Certifications',
          description: 'SQL for Data Science (Coursera, DataCamp), MS Excel, PowerPoint, Word certifications',
          icon: '📜'
        }
      ]
    },
    '2023': {
      title: 'Hackathon Champion & Advanced Certifications',
      description: 'Won major ChatGPT hackathon and earned advanced certifications',
      skills: ['ChatGPT API', 'AI Integration', 'Financial Analysis'],
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      achievements: [
        {
          title: 'FUNIX ChatGPT Hackathon Champion',
          description: 'Led design, finance research & dev teams for FinChat - AI-powered budgeting and investment advice chatbot',
          icon: '🏆'
        },
        {
          title: 'HackerRank Certifications',
          description: 'Earned HackerRank SQL Basic & Intermediate certificates',
          icon: '💯'
        }
      ]
    },
    '2024': {
      title: 'International Education & Creative Projects',
      description: 'NYU Shanghai student with grade A creative project',
      skills: ['Python', 'Data Science', 'React Concepts', 'UI/UX Design'],
      color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      achievements: [
        {
          title: 'NYU Shanghai',
          description: 'Got into NYU Shanghai and started learning Data Science',
          icon: '🌐'
        },
        {
          title: 'Love-Death Project - Grade A',
          description: 'An interactive web experience exploring the evolution of love through different time periods, featuring responsive design and immersive storytelling',
          icon: '💝',
          demoLink: 'https://luelleng0707.github.io/love-death/',
          githubLink: 'https://github.com/luelleng0707/love-death'
        },
        {
          title: 'Consulting Interest Group Ambassador',
          description: 'Organized events, conducted market research, prepared resources to guide students exploring consulting',
          icon: '💼'
        }
      ]
    },
    '2025': {
      title: 'Career Transition & AI Innovation',
      description: 'Transitioning to front-end development with AI projects',
      skills: ['React', 'Node.js', 'AI/ML', 'Full-Stack Development'],
      color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      achievements: [
        {
          title: 'Career Focus',
          description: 'Actively applying for front-end developer roles, bringing HTML/CSS/JavaScript, design sense, and analytical mindset',
          icon: '✨'
        },
        {
          title: 'Continuous Learning',
          description: 'Simultaneously deepening skills in finance and data science for future goals',
          icon: '📚'
        },
        {
          title: 'AI Study Assistant',
          description: 'An intelligent study companion that helps students organize their learning, track progress, and get personalized recommendations using modern web technologies and AI integration',
          icon: '🤖',
          demoLink: 'https://luelleng0707.github.io/AI-study-assistant/',
          githubLink: 'https://github.com/luelleng0707/AI-study-assistant'
        }
      ]
    }
  };
}

// Render Skill Bubbles
function renderSkillBubbles(yearData, currentYear, allYears, timelineData) {
  const currentIndex = allYears.indexOf(currentYear);
  const allSkills = [];
  
  for (let i = 0; i <= currentIndex; i++) {
    const year = allYears[i];
    if (timelineData[year] && timelineData[year].skills) {
      allSkills.push(...timelineData[year].skills);
    }
  }
  
  const uniqueSkills = [...new Set(allSkills)];
  
  const skillIcons = {
    'HTML': '🏗️', 'CSS': '🎨', 'JavaScript': '⚡', 'jQuery': '💫', 'Bootstrap': '📱',
    'Project Management': '📋', 'Leadership': '👑', 'Community Management': '🤝',
    'SQL': '🗃️', 'R': '📊', 'Stata': '📈', 'Data Analytics': '🔍', 'Excel': '📄',
    'ChatGPT API': '🤖', 'AI Integration': '🧠', 'Financial Analysis': '💰',
    'Python': '🐍', 'Data Science': '🔬', 'React Concepts': '⚛️', 'UI/UX Design': '✨',
    'React': '⚛️', 'Node.js': '🟢', 'AI/ML': '🤖', 'Full-Stack Development': '💻'
  };
  
  return `
    <div class="skill-bubbles">
      ${uniqueSkills.map((skill, index) => {
        const isNewSkill = yearData.skills && yearData.skills.includes(skill);
        const icon = skillIcons[skill] || '💡';
        return `
          <div class="skill-bubble ${isNewSkill ? 'new-skill' : 'existing-skill'}" 
               style="animation-delay: ${index * 0.1}s;">
            <span>${icon}</span>
            <span>${skill}</span>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// Initialize functions
function initScrollNavigation(container) {
  const progressBar = container.querySelector('#progress-bar');
  const sections = container.querySelectorAll('.year-section');
  const navDots = container.querySelectorAll('.nav-dot');
  const scrollContainer = container.querySelector('#sections-container');
  
  function updateProgress() {
    const scrollTop = scrollContainer.scrollTop;
    const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    
    progressBar.style.height = `${Math.min(progress, 100)}%`;
    
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const containerRect = scrollContainer.getBoundingClientRect();
      
      if (rect.top <= containerRect.height / 2 && rect.bottom >= containerRect.height / 2) {
        navDots.forEach(dot => dot.classList.remove('active'));
        navDots[index].classList.add('active');
      }
    });
  }
  
  scrollContainer.addEventListener('scroll', updateProgress);
  
  navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      const targetSection = sections[index];
      scrollContainer.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
      });
    });
  });
  
  updateProgress();
}

function initWidgetAnimations(container) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const widgets = entry.target.querySelectorAll('.floating-widget');
        widgets.forEach((widget, index) => {
          setTimeout(() => {
            widget.classList.add('animate-in');
          }, index * 200);
        });
      }
    });
  }, { threshold: 0.5 });
  
  container.querySelectorAll('.year-section').forEach(section => {
    observer.observe(section);
  });
}

function initLogoBubbles(container) {
  new LogoBubbles(container);
}

// Global export
window.ScrollTimeline = ScrollTimeline;
console.log('Enhanced Timeline System with Consistent Widget Structure loaded');