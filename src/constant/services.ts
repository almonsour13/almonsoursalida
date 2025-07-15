import { Code, MonitorSmartphone, Server, PenTool } from "lucide-react";

export const services = [
    {
        title: "Frontend Development",
        description:
            "Building responsive and accessible user interfaces using modern frameworks like React, Next.js, and Tailwind CSS.",
        icon: MonitorSmartphone,
        features: [
            "React/Next.js",
            "Tailwind CSS",
            "Responsive Design",
            "Accessibility",
        ],
    },
    {
        title: "Backend Development",
        description:
            "Designing robust APIs and server-side applications using Node.js, Express, and relational databases like MySQL or PostgreSQL.",
        icon: Server,
        features: ["Node.js", "Express", "MySQL", "PostgreSQL"],
    },
    {
        title: "Full Stack Integration",
        description:
            "Integrating frontend and backend systems for seamless and scalable web applications.",
        icon: Code,
        features: [
            "API Integration",
            "Database Design",
            "Authentication",
            "Deployment",
        ],
    },
    {
        title: "UI/UX Design",
        description:
            "Designing intuitive interfaces and user experiences with a focus on usability, accessibility, and consistency.",
        icon: PenTool,
        features: [
            "User Research",
            "Prototyping",
            "Design Systems",
            "Usability Testing",
        ],
    },
];