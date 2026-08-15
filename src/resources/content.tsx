import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Suphason",
  lastName: "Keawbuadee",
  name: `Suphason Keawbuadee`,
  role: "Roblox Game Dev And Website Builder",
  avatar: "/images/your-new-photo.jpg",
  email: "Xmodnoy12@gmail.com",
  location: "Asia/Bangkok", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["Thailand", "Kanchanaburi"], // optional: Leave the array empty if you don't want to display languages
};

const certificates: any = { // ใช้ any ไว้ก่อนถ้ายังไม่ได้แก้ types
  label: "Certificates",
  path: "/certificates",
  display: true,
  items: [
    {
      title: "Chinese Speech Geade 4-6",
      description: "รางวัลชนะเลิศ การแข่งขันพูดภาษาจีน ป5 โรงเรียนอนุบาลไทรโยค",
      date: "25 December 2023",
      image: "/images/certificates/Card1.png",
    },
    {
      title: "แข่งหุ่นยนต์ Microbit",
      description: "ระดับชั้น ม.1 รางวัลชนะเลิศ โรงเรียน DSKRU",
      date: "13 สิงหาคม 2569",
      image: "/images/certificates/Card10.png",
    },
    {
      title: "อบรมหุ่นยนต์ Microbit",
      description: "ระดับชั้น ม.1 โรงเรียน DSKRU",
      date: "13 สิงหาคม 2569",
      image: "/images/certificates/Card11.png",
    },
    {
      title: "การแข่งขันพูดภาษาจีน ป.6",
      description:
        "รางวัลเหรียญทอง การแข่งขันพูดภาษาจีน ป6 โรงเรียนอนุบาลไทรโยคระดับเครือข่ายท่าเสา-วังกระแจะ",
      date: "18 พฤศจิกายน 2568",
      image: "/images/certificates/Card2.png",
    },
    {
      title: "การแข่งขัน Spelling Bee ป.6",
      description:
        "รางวัลรองชนะเลิศอันดับที่1 การแข่งขัน Spelling Bee ป6 โรงเรียนไทรโยคน้อยวิทยา Open House",
      date: "11 กุมภาพันธ์ 2569",
      image: "/images/certificates/Card3.png",
    },
    {
      title: "โครงการสอบ Top Test Center",
      description: "ระดับชั้น ป.3 ทำคะแนนได้ 104 คะแนน จาก 150 คะแนน เป็น อันดับที่ 180 จาก 268 คน",
      date: "10 มีนาคม 2566",
      image: "/images/certificates/Card4.png",
    },
    {
      title: "กิจกรรม การแข่งขัน Tiktok",
      description: "กิจกรรม การแข่งขัน Tiktok วรรคทองวรรณคดีสุนทรภู่ ยอดไลก์สูงสุด",
      date: "26 มิถุนายน 2567",
      image: "/images/certificates/Card5.png",
    },
    {
      title: "การแข่งขันพูดภาษาจีน ป.4",
      description:
        "รางวัลชนะเลิศ การแข่งขันพูดภาษาจีน ป4 โรงเรียนอนุบาลไทรโยคระดับ เขตพื่นที่การศึกษากาญจนบุรีเขต 3",
      date: "9 ธันวาคม 2566",
      image: "/images/certificates/Card6.png",
    },
    {
      title: "โครงการสอบ Top Test Center",
      description:
        "ระดับชั้น ป.3 ทำคะแนนได้ 305 คะแนน จาก 500 คะแนน เป็น อันดับที่ 68 จาก 91 คน วิชา ภาษาอังกฤษ",
      date: "10 มีนาคม 2566",
      image: "/images/certificates/Card7.png",
    },
    {
      title: "การแข่งขันเปืดพจนานุกรม ป.6",
      description: "ได้เข้ารวมกิจกรรมการแข่งขันเปิดพจนานุกรม ใน วันภาษาไทยแห่งชาติ",
      date: "2 มกราคม 2568",
      image: "/images/certificates/Card8.png",
    },
    {
      title: "โครงการสอบ Top Test Center",
      description:
        "ระดับชั้น ป.3 ทำคะแนนได้ 140 คะแนน จาก 200 คะแนน เป็น อันดับที่ 124 จาก 176 คน วิชา วิทยาศาสตร์",
      date: "10 มีนาคม 2566",
      image: "/images/certificates/Card9.png",
    },
  ],
};

const ai = {
  // Floating assistant shown on every page. Powered by Gemini via /api/chat
  display: true,
  label: "Ask AI",
  placeholder: "Ask about Sin...",
  greeting:
    "Hi! I'm Sin's AI assistant. Ask me about his projects, skills or experience — in Thai or English.",
};

const contact = {
  path: "/contact",
  label: "Contact",
  title: `Contact – ${person.name}`,
  description: `Send a message to ${person.name}`,
  headline: "Get in touch",
  subline: "Send me a message and it lands straight in my Discord. I usually reply within a day.",
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "Discord",
    icon: "discord",
    link: "https://discord.gg/2544",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/sinnakup/",
    essential: false,
  },
  {
    name: "Threads",
    icon: "threads",
    link: "https://www.threads.com/@sinnakup",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Suphason Keawbuadee</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Recent Project</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          YoungLife2544
        </Text>
      </Row>
    ),
    href: "https://www.roblox.com/games/100167613522869/Young-Life-2544",
  },
  subline: (
    <>
    I'm Sin, a Game engineer at <Text as="span" size="xl" weight="strong">YoungLife2544</Text>, I will update my game everyday <br /> I can Code lua, python, html, c++, javascript
</>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Suphason is a Kanchanaburi-based game developer and website builder with a passion for 
        transforming ideas into interactive reality. Currently focusing on Roblox game development 
        and crafting elegant web solutions that bridge the gap between design and technology.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Young Life 2544",
        timeframe: "2025 - Present",
        role: "Founder / Chief Executive Officer",
        achievements: [
          <>
           ดูแลภาพรวมและพัฒนาโปรเจกต์ Young Life 2544 บนแพลตฟอร์ม Roblox โดยเน้นที่การสร้างระบบ Gameplay ที่สนุกและแปลกใหม่
          </>,
          <>
            ออกแบบระบบ UI/UX ภายในเกมให้ใช้งานง่าย และจัดการระบบ Admin Panel เพื่อควบคุมดูแลผู้เล่นในเซิร์ฟเวอร์อย่างมีประสิทธิภาพ
            บริหารจัดการทีมพัฒนา ทั้งในส่วนของ Modelers และ UI Designers เพื่อให้งานออกมาตรงตามเป้าหมายที่วางไว้
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/Screenshot 2026-04-06 104532.png",
            alt: "Young2544 Project",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "การศึกษา",
    institutions: [
      {
        name: "ระดับอนุบาล",
        description: <>โรงเรียนอนุบาลไทรโยค</>,
      },
      {
        name: "ระดับประถม",
        description: <>โรงเรียนอนุบาลไทรโยค</>,
      },
      {
        name: "ระดับมัธยมศึกษา",
        description: <>โรงเรียนสาธิตมหาวิทยาลัยราชภัฏกาญจนบุรี</>,
      },
    ],
  },
  devices: {
    display: true,
    title: "My Devices",
    items: [
      {
        name: "PC",
        description: <>Intel Core i9 14th Gen | RTX 4070 | 32GB RAM</>,
      },
      {
        name: "Laptop",
        description: <>MacBook Neo (2025) | MacOS</>,
      },
      {
        name: "Phone",
        description: <>iPhone 17 1TB | A19 Pro Bionic iOS 26.4</>,
      },
      {
        name: "Notebook (To test something)",
        description: <>HP Envy | INTEL I7 GEN 11 , Windows 11</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "Programming Languages",
        tags: [
          { name: "HTML5", icon: "html5" },
          { name: "CSS3", icon: "css3" },
          { name: "JavaScript", icon: "javascript" },
          { name: "TypeScript", icon: "typescript" },
          { name: "Python", icon: "python" },
          { name: "C++", icon: "cpp" },
        ],
      },
      {
        title: "Frameworks",
        tags: [
          { name: "Next.js", icon: "nextjs" },
          { name: "Nuxt.js", icon: "nuxtjs" },
          { name: "Vue.js", icon: "vuejs" },
          { name: "React", icon: "react" },
          { name: "Tailwind", icon: "tailwindcss" },
        ],
      },
      {
        title: "Softwares",
        tags: [
          { name: "VS Code", icon: "vscode" },
          { name: "Photoshop", icon: "photoshop" },
          { name: "Premiere Pro", icon: "premiere" },
          { name: "After Effects", icon: "aftereffects" },
        ],
      },
    ],
  },
}; // ปิดตัวแปร about ให้ถูกต้อง (มีอันเดียวพอครับ)

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/z.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/a.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/r.png",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/t.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/j.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/c.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/l.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/x.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery, certificates, contact, ai };
