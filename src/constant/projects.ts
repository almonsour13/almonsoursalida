export const projects = [
    {
        title: "FaceMark",
        description:
            "Developed a full-featured, web-based attendance system powered by facial recognition and detection technology. Built using Next.js for the frontend and Node.js for backend services, with PostgreSQL and Prisma ORM handling secure and efficient data management. Integrated Face-API.js for accurate face detection and recognition. Utilized Zustand for lightweight state management and TanStack Query for optimized API data fetching. Key features include real-time attendance tracking, automated face enrollment, attendance logs, and an analytics dashboard—streamlining attendance workflows for educational institutions and organizations.",
        tech: [
            "Next.js",
            "Node.js",
            "PostgreSQL",
            "Prisma",
            "Face-API.js",
            "Zustand",
            "TanStack Query",
        ],
        images: [
            "/image/project/facemark/facemark-1.png",
            "/image/project/facemark/facemark-2.png",
            "/image/project/facemark/facemark-3.png",
            "/image/project/facemark/facemark-4.png",
            "/image/project/facemark/facemark-5.png",
        ],
        github: "",
        live: "https://face-mark-delta.vercel.app/",
        isFeatured: true,
    },

    {
        title: "MangoLens",
        description:
            "Built a progressive web application (PWA) that enables real-time mango leaf disease detection offline by implementing a single-label, multi-class classification model using MobileVNet2 and TensorFlow.js. Leveraged React, Next.js, and Legend State for dynamic front-end rendering, while Supabase and PostgreSQL powered cloud-based user data management. The app supports offline capabilities and installability through Serwist-PWA integration, allowing seamless field use by farmers and agricultural technicians in remote areas without internet access.",
        tech: [
            "React",
            "Next.js",
            "Node.js",
            "PostgreSQL",
            "Supabase",
            "Python",
            "Tensorflowjs",
            "Legend State",
            "Shadcn",
            "Serwist-pwa",
        ],
        images: [
            "/image/project/mango-lens/mango-lens-1.png",
            "/image/project/mango-lens/mango-lens-2.png",
            "/image/project/mango-lens/mango-lens-3.png",
            "/image/project/mango-lens/mango-lens-4.png",
            "/image/project/mango-lens/mango-lens-5.png",
            "/image/project/mango-lens/mango-lens-6.png",
            "/image/project/mango-lens/mango-lens-7.png",
        ],
        github: "https://github.com/almonsour13/mango-lens.git",
        live: "https://mango-lens.vercel.app/",
        isFeatured: true,
    },
    {
        title: "Testora",
        description:
            "A modern, lightweight API testing tool built entirely in the browser. Testora supports all HTTP methods (GET, POST, PUT, PATCH, DELETE, and more), tracks your request history locally, and displays formatted JSON responses with headers, status codes, and timing. Since everything is stored in localStorage, there's no need for an account or server – it's private, fast, and designed for developers, QA engineers, and product teams alike.",
        tech: ["JavaScript", "Next.js", "React", "LocalStorage"],
        images: [
            "/image/project/testora/testora-1.png",
            "/image/project/testora/testora-2.png",
            // Add actual screenshot URLs when you have them
        ],
        github: "https://github.com/almonsour13/Testora.git", // If there’s a public repo
        live: "https://testora-two.vercel.app",
        isFeatured: false,
    },{
        title: "FLUX",
        description:
            "FLUX is a modern, creative digital agency website designed to showcase services, projects, and brand identity with a polished, high-performance frontend. Built using Vue 3, Vite, Tailwind CSS, and Shadcn-Vue, it features reusable UI components, smooth animations powered by Motion.vue, and a fully responsive layout. FLUX highlights your team's capabilities with elegant sections such as hero banners, service showcases, featured projects, testimonials, and dynamic dark mode support. Designed for speed, aesthetics, and scalability.",
        tech: [
            "Vue 3",
            "Vite",
            "Tailwind CSS",
            "Shadcn-Vue",
            "Motion.vue",
            "Lucide-Vue",
        ],
        images: [
            "/image/project/flux/flux-1.png",
        ],
        github: "https://github.com/almonsour13/flux.git",
        live: "https://flux-beta-three.vercel.app/",
        isFeatured: false,
    },

    {
        title: "DOPI",
        description:
            "Developed and deployed the official website for Davao Oriental Polytechnic Institute to enhance its digital presence and streamline access to academic resources. Used WordPress for content management and MySQL for dynamic data handling. The site includes features such as announcements, course information, faculty directories, and admission guidelines. This project aimed to modernize the school’s communication system and increase accessibility for stakeholders.",
        tech: ["Wordpress", "MySQL"],
        images: ["/image/project/dopi/dopi-1.png"],
        github: "",
        live: "https://www.davaoorientalpolytechnicinstitute.com/",
        isFeatured: false,
    },

    {
        title: "Water Billing System",
        description:
            "Engineered a desktop-based water billing system using JavaFX and MySQL to digitize and automate the billing operations for local water districts. The system allows staff to manage customer records, compute bills based on meter readings, generate receipts, and track payments. Designed with an intuitive GUI and secure database integration, it reduces manual workload and billing errors. This system is particularly effective for small to medium-scale utilities transitioning from paper-based systems to digital solutions.",
        tech: ["Java", "Javafx", "MySQL"],
        images: ["/image/project/wbs/wbs-1.png"],
        github: "https://github.com/almonsour13/water_billing_system_final.git",
        live: "",
        isFeatured: true,
    },
];
