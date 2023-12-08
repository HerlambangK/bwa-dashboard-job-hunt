import { AiOutlineHome, AiOutlineLogout } from "react-icons/ai";

import { EnumValues } from "zod";
export type optionType = {
  id: string;
  label: string;
};

export const JOBTYPES: EnumValues = [
  "Full Time",
  "Part Time",
  "Remote",
  "Internship",
];

export const JOB_LISTING_COLUMS: string[] = [
  "Roles",
  "Status",
  "Date Posted",
  "Due Date",
  "Job Type",
  "Applicants",
  "Needs",
];

export const MENU_DASHBOARD = [
  {
    menu_name: "Home",
    link: "/",
    icon: AiOutlineHome,
  },
  // {
  //   menu_name: "Messages",
  //   link: "/messages",
  //   icon: `<AiOutlineHome className="mr-2 text-lg" />`,
  // },
  // {
  //   menu_name: "Company Profile",
  //   link: "/company",
  //   icon: `<AiOutlineHome className="mr-2 text-lg" />`,
  // },
  // {
  //   menu_name: "All Applicants",
  //   link: "/company",
  //   icon: `<AiOutlineHome className="mr-2 text-lg" />`,
  // },
  // {
  //   menu_name: "Job Listings",
  //   link: "/job-listing",
  //   icon: `<AiOutlineHome className="mr-2 text-lg" />`,
  // },
  // {
  //   menu_name: "My Schadule",
  //   link: "/my-schadule",
  //   icon: `<AiOutlineHome className="mr-2 text-lg" />`,
  // },
];

export const JOB_APPLICANTS_COLUMS: string[] = ["Name"];

export const JOB_APPLICANTS_DATA = [
  {
    name: "Rizki",
    appliedDate: "12 Agust 2023",
  },
];

export const JOB_LISTING_DATA = [
  {
    roles: "Sofware Engineer",
    status: "Open",
    datePosted: "12 Agust 2023",
    dueDate: "12 Sept 2023",
    jobType: "Full Time",
    applicants: 2,
    needs: 10,
  },
];

export const LOCATION_OPTIONS: optionType[] = [
  {
    id: "Indonesia",
    label: "Indonesia",
  },

  {
    id: "Malaysia",
    label: "Malaysia",
  },
  {
    id: "Singapore",
    label: "Singapore",
  },
  {
    id: "Thailand",
    label: "Thailand",
  },
];

export const EMPLOYEE_OPTIONS: optionType[] = [
  {
    id: "1 - 50",
    label: "1 - 50",
  },
  {
    id: "51 - 150",
    label: "51 - 150",
  },
  {
    id: "151 - 250",
    label: "151 - 250",
  },
  {
    id: "251 - 500",
    label: "251 - 500",
  },
  {
    id: "501 - 1000",
    label: "501 - 1000",
  },
  {
    id: "1000 - above",
    label: "1000 - above",
  },
];
