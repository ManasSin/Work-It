import { Calendar, CalendarDays, Grid2X2, Inbox } from "lucide-react";

export const primaeryNavItems = [
  {
    name: "Inbox",
    link: "/loggedIn/inbox",
    icon: <Inbox className="h-4 w-4" />,
  },
  {
    name: "Calender",
    link: "/loggedIn/calender",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    name: "Upcoming",
    link: "/loggedIn/upcoming",
    icon: <CalendarDays className="h-4 w-4" />,
  },
  {
    name: "Filters & Labels",
    link: "/loggedIn/filter-label",
    icon: <Grid2X2 className="h-4 w-4" />,
  },
];
