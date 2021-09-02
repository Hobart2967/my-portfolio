export interface CareerStation {
  companyName: string;
  job: string;
  atPath: number;
  orientation?: string;
  school?: boolean;
  start: {
    month: number;
    year: number;
  };

  end: {
    month: number;
    year: number;
  }
}