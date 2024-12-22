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
    id: "6",
    x: 20,
    y: 62,
    title: "Branded Guiter",
    url: "#",
    type: "circle",
  },
  {
    id: "1",
    x: 27,
    y: 42,
    title: "Branded Pillow",
    url: "#",
    type: "circle",
  },
  {
    id: "2",
    x: 44,
    y: 63,
    title: "MacBook",
    url: "#",
    type: "circle",
  },
  {
    id: "3",
    x: 53,
    y: 25,
    title: "Bag Collection",
    url: "#",
    type: "arrow",
  },
  {
    id: "4",
    x: 72,
    y: 45,
    title: "Chair",
    url: "#",
    type: "circle",
  },
  {
    id: "5",
    x: 85,
    y: 75,
    title: "Drums Set",
    url: "#",
    type: "object",
  },
  {
    id: "7",
    x: 85,
    y: 25,
    title: "Monitor",
    url: "#",
    type: "object",
  },
  {
    id: "8",
    x: 95,
    y: 5,
    title: "Sony Bravia TV",
    url: "#",
    type: "object",
  },
];
