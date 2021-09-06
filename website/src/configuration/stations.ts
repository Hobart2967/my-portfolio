import { CareerStation } from '../models/career-station.interface';

export const stations: CareerStation[] = [{
  companyName: 'EA Games/Bright Future GmbH',
  job: 'Trainee Developer/Quality Assurance',
  atPath: 14.5 / 100,
  description: 'During my time in school we were advised to do a training on a specific profession we prefer to learn in the future. My deepest desire was to become a professional game developer. Due to the possibilities and connections I had during the year 2006, I was given the chance to do a training inside the offices of a development studio of EA Games. Bright Future was the company developing the `Fußball Manager` title of each year.\n\nWhile pro-actively extending my trainee-period of two weeks to four in total, I got to know certain tasks of software development in general, but also insights into how computer games are created. This was including the regular testing, preparing press media, developing the game itself and seeing how graphical elements evolve.',
  start: {
    month: 6,
    year: 2006,
  },
  end: {
    month: 6,
    year: 2006
  }
}, {
  companyName: 'Mauser Group',
  job: 'Trainee IT-Administrator',
  description: 'During my time in school we were advised to do a second training on a profession we prefer to learn in the future. I decided to join the Mauser Group IT department.\n\nHere, I learned how software development could be useful when planning resources, adjusting infrastructures and many more. In addition, I was experiencing how colleagues problems are solved and what a fire-protection in a server rack looks like.\n\nFurthermore, I learned alot of things about what different roles there are in such a department and why they are important.',
  atPath: 19 / 100,
  start: {
    month: 9,
    year: 2007,
  },
  end: {
    month: 10,
    year: 2007
  }
}, {
  companyName: 'Grey Computer Cologne',
  atPath: 24 / 100,
  job: 'PC Manufacturing',
  description: 'In my private spare time after school, I was working on my PC very often. Exchanging parts, upgrading the system and modifying it was much fun to me. To also earn some money and increasing my pocket money while still going to school, I applied to Grey Computer Cologne.\n\nThis company was one of the biggest computer stores close to my living town. It also had a manufacturing garage attached, where they still needed some help. This is where I came into play: I was working there, building PCs of different configurations. Water Coolings, super silent office PCs or extreme gaming machines - These are all builds that I have worked on there.',
  start: {
    month: 1,
    year: 2010,
  },
  end: {
    month: 6,
    year: 2011
  }
}, {
  companyName: 'Serviceware SE',
  job: 'Apprenticeship: Computer Science Expert',
  description: 'After finishing my graduation at a german Gymnasium, I applied for studying in an integrated degree program. That means, I was doing the studies and my apprenticeship at the same time. This is why it is also called `Dual Degree` (literally translated) in German.\n\nI joined the Serviceware SE, formerly called `PMCS.helpLine Software Group` in the location in Hürth.\n\nStarting off from the quality assurance department, I got tought how testing works from A-Z. Because of a missing automation in reportings, the QA team was also responsible for the daily reports of bugs and fixes - There I had my first projects creating an automation for it. \n\nAfter that, I was planning my first IT-System for Software-Development: It was a test lab, a multi-server environment connected to Microsoft Test Manager.\n\n Then I switched over to the development department: Here I developed on applications like Rich-Clients, WebApps, and Server-Side environments. Since it was company relying on Microsoft products, we 90% used C# as Coding language.',
  atPath: 35.3 / 100,
  start: {
    month: 7,
    year: 2011,
  },
  end: {
    month: 1,
    year: 2014
  }
}, {
  companyName: 'Serviceware SE',
  job: 'Work Student: Software Engineer',
  atPath: 49 / 100,
  start: {
    month: 2,
    year: 2011,
  },
  end: {
    month: 9,
    year: 2014
  }
}, {
  companyName: 'EUFH Bruehl',
  job: 'Bachelor Degree: Business Information Systems',
  atPath: 57 / 100,
  school: true,
  start: {
    month: 10,
    year: 2011,
  },
  end: {
    month: 9,
    year: 2014
  }
}, {
  companyName: 'Serviceware SE',
  job: 'Full-Stack Software Engineer',
  atPath: 65.3 / 100,
  start: {
    month: 10,
    year: 2014,
  },
  end: {
    month: 1,
    year: 2018
  }
}, {
  companyName: 'Trusted Shops GmbH',
  job: 'Senior Full-Stack Software Engineer',
  atPath: 73.5 / 100,
  start: {
    month: 2,
    year: 2018,
  },
  end: {
    month: new Date(Date.now()).getMonth(),
    year: new Date(Date.now()).getFullYear()
  }
}];