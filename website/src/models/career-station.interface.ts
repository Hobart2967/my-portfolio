export interface CareerStation {
  companyName: string;
  job: string;

  start: {
    month: number;
    year: number;
  };

  end: {
    month: number;
    year: number;
  }
}