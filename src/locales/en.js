export default {
  nav: {
    about: 'About',
    skills: 'Skills',
    experience: 'Experience',
    projects: 'Projects',
    partners: 'Collaborators',
    contact: 'Contact',
    downloadCV: 'Download CV',
    blog: 'Blog',
  },

  blog: {
    title: 'Blog',
    subtitle: 'Articles & experience feedback',
    allArticles: 'View all articles',
    readMore: 'Read article →',
    backToBlog: 'All articles',
    backToPortfolio: 'Back to portfolio',
    minRead: 'min read',
    publishedOn: 'Published on',
  },

  hero: {
    role: 'Full Stack .NET Analyst Developer',
    years: '8 years of experience',
    tagline: 'Designing, developing and delivering robust software solutions — from architecture to deployment.',
    contactBtn: 'Contact me',
    projectsBtn: 'View my work',
    available: 'Open to new opportunities',
  },

  about: {
    title: 'About',
    subtitle: 'Engineer passionate about code and business impact',
    p1: 'With 8 years of experience as a .NET analyst developer, I have worked on high-stakes projects across various sectors: healthcare, finance, real estate and public services.',
    p2: 'I am recognized for my analytical skills, adaptability and commitment to teamwork. I focus on delivering maintainable, well-tested and documented solutions.',
    p3: 'Graduated as an engineer from ESIEE Paris, I have worked in France and Canada, and continue to invest in personal projects to broaden my skill set.',
  },

  skills: {
    title: 'Skills',
    subtitle: 'Technical expertise built over 8 years of professional missions',
    categories: [
      { name: 'Languages', items: ['C#', 'TypeScript', 'JavaScript', 'T-SQL', 'Groovy'] },
      { name: 'Frameworks', items: ['.NET Core', '.NET Standard', 'Angular 2+', 'Vue 3', 'ASP.NET MVC'] },
      { name: 'Databases', items: ['SQL Server', 'MySQL', 'PostgreSQL', 'Azure SQL'] },
      { name: 'Cloud & DevOps', items: ['Azure', 'Docker', 'GitHub Actions', 'Azure DevOps', 'Jenkins', 'GitLab CI'] },
      { name: 'Tools', items: ['Git', 'Jira', 'Confluence', 'Control-M', 'xUnit', 'Jest'] },
      { name: 'Methodologies', items: ['Agile Scrum', 'Kanban', 'TDD', 'BDD / Cucumber'] },
    ],
  },

  experience: {
    title: 'Experience',
    subtitle: 'A rich career with varied, high-impact missions',
    items: [
      {
        period: 'July 2025 – Present',
        role: 'Analyst Programmer',
        company: 'Eastelson / Euro-information',
        location: 'Strasbourg, France',
        description: 'Email management project for customer advisors.',
        bullets: [
          'Successful cloud migration of a technical support application',
          'Development of a developer support assistance application',
          'Redesign of wmail eden app — devbooster framework v3 → v4',
        ],
        tech: ['.NET', 'GitLab', 'Jenkins'],
      },
      {
        period: 'Sept 2024 – June 2025',
        role: 'Application Delivery Manager',
        company: 'Desjardins',
        location: 'Montréal, Canada',
        description: 'Migration of application components to secure servers.',
        bullets: [
          'Successful migration: Windows 2012 / SQL 2012 to new infrastructure',
          'Coordination of deliverables and supervision of development resources',
          'Elaboration and presentation of the deployment strategy to stakeholders',
          'Knowledge transfer to support teams',
        ],
        tech: ['.NET Core', 'xUnit', 'Control-M', 'Jira', 'Azure DevOps'],
      },
      {
        period: 'Apr 2023 – Sept 2024',
        role: 'FullStack Analyst Programmer',
        company: 'INSPQ',
        location: 'Montréal, Canada',
        description: 'Quebec Breast Cancer Screening Program (PQDCS).',
        bullets: [
          'Development and maintenance of the PQDCS screening application',
          'Significant reduction of technical debt',
          'Unit and functional testing with TDD / Gherkin Cucumber',
          'Regular multi-environment releases',
        ],
        tech: ['.NET Core', 'xUnit', 'Gherkin', 'Entity Framework', 'Telerik', 'Jira'],
      },
      {
        period: 'Apr 2021 – Mar 2023',
        role: 'FullStack Analyst Programmer',
        company: 'Finelog-Biseum',
        location: 'Issy-les-Moulineaux, France',
        description: 'Clients: ALTAREA (real estate) and MOBILE INDOOR (mobile device fleet management).',
        bullets: [
          'Redesign of Sage (ERP) and BoFC flows for ALTAREA',
          'Front/back development with Azure Functions consumption',
          'Azure Web App deployment, Jest unit tests',
          'Technical specs and software architecture for MOBILE INDOOR',
        ],
        tech: ['.NET Core', 'Angular', 'TypeScript', 'Azure', 'Power Apps'],
      },
      {
        period: 'Sept 2017 – Apr 2021',
        role: 'FullStack Analyst Programmer',
        company: 'Aixial',
        location: 'Sèvres, France',
        description: 'Clinical trials software for Sanofi, Pfizer and L\'Oréal.',
        bullets: [
          'Development and maintenance of pharmaceutical industry software',
          'Writing functional specifications and test scenarios',
          'Bug fixing and user acceptance testing',
          'Technical documentation and continuous improvement',
        ],
        tech: ['C#', 'ASP.NET Webform', 'jQuery', 'SQL Server'],
      },
    ],
  },

  projects: {
    title: 'Projects',
    subtitle: 'Representative professional and personal projects',
    items: [
      {
        name: 'Tucura',
        tagline: 'Guardianship & Curatorship Management App',
        description: 'Complete platform for guardians and curators: protected persons management, CERFA-compliant accounting, PDF annual report generation, bank accounts, financial charts. Hosted in Switzerland.',
        tech: ['Vue 3', 'Django', 'PostgreSQL', 'Docker', 'Tailwind CSS', 'Chart.js'],
        color: 'sky',
        icon: 'fa-shield-halved',
        status: 'Production',
        github: '',
        demo: '',
      },
      {
        name: 'Mission Orders Management',
        tagline: 'Application for municipal drivers',
        description: 'Mission order management application for municipal drivers: scheduling, intervention tracking, reporting.',
        tech: ['C#', '.NET', 'SQL Server'],
        color: 'emerald',
        icon: 'fa-car',
        status: 'Personal',
        github: '',
        demo: '',
      },
    ],
  },

  partners: {
    title: 'Collaborators',
    subtitle: 'Partners with whom I co-build solutions',
    items: [
      {
        name: 'ED Factory',
        description: 'Digital studio specialized in custom web solutions. Collaboration on multiple development and design projects.',
        url: 'https://ed-factory.com/',
        icon: 'fa-rocket',
      },
    ],
  },

  education: {
    title: 'Education',
    items: [
      { year: '2017', degree: 'Specialization in Computer Analyst', school: 'EQL', location: 'Montrouge, France' },
      { year: '2015', degree: 'General Engineering Degree', school: 'ESIEE Paris', location: 'Paris, France' },
    ],
  },

  contact: {
    title: 'Contact',
    subtitle: 'Available for freelance missions or full-time positions in France and internationally',
    phone: '+33 6 43 96 99 86',
    email: 'tchangarodrigue@yahoo.fr',
    location: 'Strasbourg, France',
    downloadTitle: 'Download my CV',
    githubLabel: 'GitHub Profile',
    linkedinLabel: 'LinkedIn Profile',
    formTitle: 'Send a message',
    formName: 'Your name',
    formEmail: 'Your email',
    formMessage: 'Your message',
    formSubmit: 'Send',
    formSending: 'Sending…',
    formSuccess: 'Message sent! I\'ll get back to you shortly.',
    formError: 'An error occurred. Please try again.',
  },
}
