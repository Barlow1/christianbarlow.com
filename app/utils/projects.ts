export type Project = {
  name: string;
  url: string;
};

export function getProjects(): Project[] {
  return [
    {
      name: "Random Meal Generator",
      url: "https://randommeal.christianbarlow.com",
    },
    {
      name: "Uzervision (Nexus Creative Marketing)",
      url: "https://uzervision.com",
    },
  ];
}
