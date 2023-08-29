export type Project = {
  name: string;
  url?: string;
  repo?: string;
  description?: string;
  libraries?: string[];
};

export function getProjects(): Project[] {
  return [
    {
      name: "Hoots Mentorship",
      description: "Long term software engineering mentorship platform",
      libraries: ["React", "nodeJS", "remix", "tailwindcss", "MongoDB"],
      url: "https://inhoots.com",
      repo: "https://github.com/Barlow1/Hoots",
    },    {
      name: "Resume Tailor",
      description: "Easily tailor or generate the perfect resume & cover letter",
      libraries: ["React", "nodeJS", "remix", "tailwindcss", "SQLite", "Fly", "Playwright"],
      url: "https://resumetailor.ai",
      repo: "https://github.com/Barlow1/resume-tailor",
    },
    {
      name: "Ping Pong Tracker",
      description: "Making workplaces more fun!",
      libraries: ["React", "nodeJS", "remix", "tailwindcss"],
      url: "https://pongtracker.christianbarlow.com",
      repo: "https://github.com/Barlow1/PongTracker",
    },
    {
      name: "3D Model House Configurator",
      description: "Building cutting edge housing how you want it.",
      libraries: ["React", "nodeJS", "react-three-fiber", "3D Models"],
      url: "https://build.christianbarlow.com",
      repo: "https://github.com/Barlow1/build-concept",
    },
    {
      name: "Random Meal Generator",
      description: "Don't know what to cook dinner? We got you.",
      libraries: ["React", "nodeJS"],
      url: "https://randommeal.christianbarlow.com",
      repo: "https://github.com/Barlow1/RandomMealGenerator",
    },
    {
      name: "Uzervision (Nexus Creative Marketing)",
      description: "We build websites your users will enjoy.",
      libraries: ["HTML", "CSS", "Javascript"],
      url: "https://uzervision.com",
    },
    {
      name: "Pulsar Classifier",
      description: "Is it a star or a pulsar?",
      libraries: ["Python", "Tensorflow"],
      repo: "https://github.com/Barlow1/Pulsar-Classifier",
    },
    {
      name: "ClassScheduler",
      description:
        "Genetic algorithm for creating somewhat optimal class schedules",
      libraries: ["Python"],
      repo: "https://github.com/Barlow1/ClassScheduler",
    },
  ];
}
