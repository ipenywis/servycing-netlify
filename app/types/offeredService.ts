import { ISpecialist } from "./specialist";

export enum OFFERED_SERVICE_TYPE {
  CAR_REPAIR = "Car repair",
  CAR_PENTRY = "Car pentry",
  LANDSCAPING = "Landscaping",
  CLEANING = "Cleaning",
  DEMOLITION = "Demolition",
  HOME_IMPROVEMENT = "Home improvement",
  MOVING = "Moving",
  OTHERS = "Others",
}

export enum OFFERED_SERVICE_TYPE_FILTER {
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
  all: {
    label: "All",
    min: 1,
    max: 1000,
  },
  lessThan20: {
    label: "less than $20",
    min: 1,
    max: 20,
  },
  between20And50: {
    label: "from $20 to $50",
    min: 20,
    max: 50,
  },
  between50And80: {
    label: "from $50 to $80",
    min: 50,
    max: 80,
  },
  between80And100: {
    label: "from $80 to $100",
    min: 80,
    max: 100,
  },
  between100To500: {
    label: "from $100 to $500",
    min: 100,
    max: 500,
  },
  moreThan500: {
    label: "more than $500",
    min: 500,
    max: 1000,
  },
};

export interface IOfferedService {
  id?: string;
  title: string;
  description: string;
  type: OFFERED_SERVICE_TYPE;
  rate: number;
  preferredHours: string;
  specialist: ISpecialist;
  reviews: any[];
}

export interface INewOfferedServiceDTO {
  title: string;
  description: string;
  type: OFFERED_SERVICE_TYPE;
  rate: number;
  preferredHours: string;
  thumbnailUrl: string;
}

export interface IOfferedServicesWithCount {
  count: number;
  offeredServices: IOfferedService[];
}

export interface IServicesFilter {
  type?: string;
  rating?: number;
  minPrice?: number;
  maxPrice?: number;
}
