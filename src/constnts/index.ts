interface Hotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  url: string;
  type: "circle" | "arrow" | "object";
}

export const hotspots: Hotspot[] = [
  {
    id: "1",
    x: 25,
    y: 42,
    title: "Studio Access",
    url: "#",
    type: "circle",
  },
  {
    id: "2",
    x: 45,
    y: 65,
    title: "Album Collection",
    url: "#",
    type: "circle",
  },
  {
    id: "3",
    x: 65,
    y: 35,
    title: "Tour Dates",
    url: "#",
    type: "arrow",
  },
  {
    id: "4",
    x: 75,
    y: 55,
    title: "Merchandise",
    url: "#",
    type: "circle",
  },
  {
    id: "5",
    x: 85,
    y: 75,
    title: "Private Lounge",
    url: "#",
    type: "object",
  },
];
