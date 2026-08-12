import {
    Code,
    MonitorSmartphone,
    PanelsTopLeft,
    PenTool,
    Server,
    Smartphone,
    Workflow,
} from "lucide-react";

export const services = [
    {
        title: "Frontend Development",
        description:
            "Building responsive and accessible user interfaces using modern frameworks like React, Next.js, Vue.js, and Tailwind CSS.",
        icon: MonitorSmartphone,
        features: [
            "React / Next.js",
            "Vue.js",
            "Tailwind CSS",
            "Responsive Design",
            "Accessibility",
        ],
        visible: true,
    },
    {
        title: "Backend Development",
        description:
            "Designing robust APIs and server-side applications using Node.js, Express, and relational databases like MySQL or PostgreSQL.",
        icon: Server,
        features: ["Node.js", "Express", "MySQL", "PostgreSQL"],
        visible: false,
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
        visible: true,
    },
    {
        title: "Mobile App Development",
        description:
            "Creating cross-platform mobile applications using React Native and Flutter.",
        icon: Smartphone,
        features: [
            "React Native / Flutter",
            "Cross-Platform Deployment",
            "App Store Publishing",
            "Offline Support",
        ],
        visible: true,
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
        visible: true,
    },
    {
        title: "CMS Development",
        description:
            "Building and customizing content management systems that make it easy to manage, publish, and maintain website content.",
        icon: PanelsTopLeft,
        features: [
            "WordPress",
            "Headless CMS",
            "Custom Themes",
            "Custom Plugins",
            "Content Management",
        ],
        visible: true,
    },
    {
        title: "Automation",
        description:
            "Automating repetitive workflows and connecting services to improve efficiency, reduce manual work, and streamline business processes.",
        icon: Workflow,
        features: [
            "Workflow Automation",
            "API Integrations",
            "Webhooks",
            "Data Synchronization",
            "Scheduled Tasks",
        ],
        visible: true,
    },
];
