export const navLinkData = [
  { id: 1, title: "Acasă", href: "/", protected: false },
  { id: 2, title: "Profilul meu", href: "/my-profile", protected: true },
  { id: 3, title: "Dashboard", href: "/dashboard", protected: true },
  {
    id: 4,
    title: "Cereri",
    href: "/requests",
    protected: true,
    role: "TEACHER",
  },
  {
    id: 5,
    title: "Echipa ta",
    href: "/team",
    protected: true,
    role: "TEACHER",
  },
  // {
  //   id: 6,
  //   title: "Mentorul tău",
  //   href: "/mentors",
  //   protected: true,
  //   role: "TEACHER",
  // },
];
