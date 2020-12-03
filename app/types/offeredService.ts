export enum OFFERED_SERVICE_TYPE {
  ALL = "All",
  CAR_REPAIR = "Car repair",
  CAR_PENTRY = "Car pentry",
  LANDSCAPING = "Landscaping",
  CLEANING = "Cleaning",
  DEMOLITION = "Demolition",
  HOME_IMPROVEMENT = "Home improvement",
  MOVING = "Moving",
  OTHERS = "Others",
}

export enum OFFERED_SERVICE_RATING_FILTER {
  ALL = "All",
  one = "1",
  two = "2",
  three = "3",
  four = "4",
  five = "5",
}

export interface IOfferedServiceHourlyRateFilter {
  [key: string]: {
    label: string;
    min: number;
    max?: number;
  };
}

export const OFFERED_SERVICE_HOURLY_RATE_FILTER: IOfferedServiceHourlyRateFilter = {
  lessThan20: {
    label: "less than $20",
    min: 1,
    max: 20,
  },
  between20And50: {
    label: "From $20 to $50",
    min: 20,
    max: 50,
  },
  between50And80: {
    label: "From $50 to $80",
    min: 50,
    max: 80,
  },
  between80And100: {
    label: "From $80 to $100",
    min: 80,
    max: 100,
  },
  moreThan100: {
    label: "More than $100",
    min: 100,
  },
};

export interface IOfferedService {
  id?: string;
  title: string;
  description: string;
  type: OFFERED_SERVICE_TYPE;
  rate: number;
  preferredHours: string;
  specialist: any;
  reviews: any[];
}

export interface IServicesFilter {
  type?: OFFERED_SERVICE_TYPE;
  rating?: number;
  minPrice?: number;
  maxPrice?: number;
}
