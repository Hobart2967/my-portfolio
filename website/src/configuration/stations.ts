import { CareerStation } from '../models/career-station.interface';

export const stations: CareerStation[] = [{
  companyName: 'EA Games/Bright Future GmbH',
  job: 'Trainee Developer/Quality Assurance',
  atPath: 14.5 / 100,
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