
import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "AI StudyStation",
  version: packageJson.version,
  copyright: `© ${currentYear}, Department of Computer Science, University of Gujrat.`,
  meta: {
    title: "AI StudyStation – Intelligent Note Generation & Automated Printing System",
    description: `
      AI StudyStation is a modern AI-powered platform developed by BSCS students of the Department of Computer Science,
      University of Gujrat. It intelligently generates, organizes, and automates the printing of academic notes using
      OCR and Large Language Models (LLMs). The system enables students to digitize handwritten notes, create summaries,
      and securely print materials using a token-based workflow — bridging the gap between digital learning and physical access.
      
      Developed by: 
      Ali Hassan (22021519-076), Meera Shahzadi (22021519-060), Rimsha Naeem (22021519-066)
      Supervised by: Dr. Naveed Anwar Butt
    `,
  },
  organization: {
    department: "Department of Computer Science",
    faculty: "Faculty of Computing & Information Technology",
    university: "University of Gujrat",
    supervisor: "Dr. Naveed Anwar Butt",
    contactEmail: "naveed@uog.edu.pk",
  },
};

