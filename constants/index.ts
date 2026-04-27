export const subjects = [
  "maths",
  "language",
  "science",
  "history",
  "coding",
  "economics",
];

export const subjectsColors = {
  science: "#E5D0FF",
  maths: "#FFDA6E",
  language: "#BDE7FF",
  coding: "#FFC8E4",
  history: "#FFECC8",
  economics: "#C8FFDF",
};

export const voices = {
  male: { casual: "2BJW5coyhAzSr8STdHbE", formal: "c6SfcYrb2t09NHXiT80T" },
  female: { casual: "ZIlrSGI4jZqobxRKprJz", formal: "sarah" },
};

export const recentSessions = [
  {
    id: "1",
    subject: "science",
    name: "Neura the Brainy Explorer",
    topic: "Neural Network of the Brain",
    duration: 45,
    color: "#E5D0FF",
  },
  {
    id: "2",
    subject: "maths",
    name: "Countsy the Number Wizard",
    topic: "Derivatives & Integrals",
    duration: 30,
    color: "#FFDA6E",
  },
  {
    id: "3",
    subject: "language",
    name: "Verba the Vocabulary Builder",
    topic: "English Literature",
    duration: 30,
    color: "#BDE7FF",
  },
  {
    id: "4",
    subject: "coding",
    name: "Codey the Logic Hacker",
    topic: "Intro to If-Else Statements",
    duration: 45,
    color: "#FFC8E4",
  },
  {
    id: "5",
    subject: "history",
    name: "Memo, the Memory Keeper",
    topic: "World Wars: Causes & Consequences",
    duration: 15,
    color: "#FFECC8",
  },
  {
    id: "6",
    subject: "economics",
    name: "The Market Maestro",
    topic: "The Basics of Supply & Demand",
    duration: 10,
    color: "#C8FFDF",
  },
];

type GuestCompanionTemplate = CreateCompanion & {
  templateId: string;
};

export const guestCompanionTemplates: GuestCompanionTemplate[] = [
  {
    templateId: "science-neural-network",
    name: "Neura the Brainy Explorer",
    subject: "science",
    topic: "Neural Network of the Brain",
    duration: 45,
    voice: "female",
    style: "casual",
  },
  {
    templateId: "maths-derivatives-integrals",
    name: "Countsy the Number Wizard",
    subject: "maths",
    topic: "Derivatives & Integrals",
    duration: 30,
    voice: "male",
    style: "formal",
  },
  {
    templateId: "language-english-literature",
    name: "Verba the Vocabulary Builder",
    subject: "language",
    topic: "English Literature",
    duration: 30,
    voice: "female",
    style: "formal",
  },
  {
    templateId: "coding-if-else",
    name: "Codey the Logic Hacker",
    subject: "coding",
    topic: "Intro to If-Else Statements",
    duration: 45,
    voice: "male",
    style: "casual",
  },
  {
    templateId: "history-world-wars",
    name: "Memo, the Memory Keeper",
    subject: "history",
    topic: "World Wars: Causes & Consequences",
    duration: 15,
    voice: "female",
    style: "formal",
  },
  {
    templateId: "economics-supply-demand",
    name: "The Market Maestro",
    subject: "economics",
    topic: "The Basics of Supply & Demand",
    duration: 10,
    voice: "male",
    style: "formal",
  },
];

export const defaultCompanions = guestCompanionTemplates.map(
  ({ templateId, ...template }) => ({
    id: templateId,
    ...template,
  })
);

export const getGuestCompanionTemplate = (templateId: string) =>
  guestCompanionTemplates.find((template) => template.templateId === templateId);
