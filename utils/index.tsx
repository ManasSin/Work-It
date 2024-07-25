import { Calendar, CalendarDays, Grid2X2, Inbox } from "lucide-react";

export const primaryNavItems = [
  {
    id: "primary",
    name: "Inbox",
    link: "/loggedin",
    icon: <Inbox className="h-4 w-4" />,
  },
  {
    name: "Today",
    link: "/loggedin/today",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    name: "Upcoming",
    link: "/loggedin/upcoming",
    icon: <CalendarDays className="h-4 w-4" />,
  },
  // {
  //   name: "Filters & Labels",
  //   link: "/loggedin/filter-label",
  //   icon: <Grid2X2 className="h-4 w-4" />,
  // },
];

export const GET_STARTED_PROJECT_ID = "k170zswmtt47tfphb23127xfvh6x047p";

export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "Contact", link: "#contact" },
];
