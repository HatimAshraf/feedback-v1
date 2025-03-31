
import { PollQuestion } from "../types/poll";

export const sampleQuestions: PollQuestion[] = [
  {
    id: "q1",
    statement: "Human computation systems involve humans performing tasks that are difficult for computers.",
    option1: "True - Humans complete tasks computers struggle with",
    option2: "False - Human computation is solely about humans using computers",
    correctOption: 1,
    explanation: "Human computation harnesses human intelligence for tasks that are difficult for computers to perform accurately, such as image recognition in ambiguous cases or understanding contextual nuances."
  },
  {
    id: "q2",
    statement: "Crowdsourcing and human computation are essentially the same concept.",
    option1: "True - They are interchangeable terms",
    option2: "False - They have distinct meanings despite overlap",
    correctOption: 2,
    explanation: "While related, crowdsourcing refers broadly to outsourcing tasks to a crowd, while human computation specifically focuses on humans performing computational processes within a larger system."
  },
  {
    id: "q3",
    statement: "The quality of data in human computation primarily depends on the number of participants.",
    option1: "True - More participants always means better data",
    option2: "False - Quality depends on multiple factors beyond just quantity",
    correctOption: 2,
    explanation: "Data quality in human computation depends on participant expertise, task design, incentive structures, and validation mechanisms, not just the number of participants."
  },
  {
    id: "q4",
    statement: "Ethical considerations in human computation include fair compensation and transparency.",
    option1: "True - Ethics encompasses compensation, transparency and more",
    option2: "False - Ethics is primarily about data security",
    correctOption: 1,
    explanation: "Ethical considerations in human computation include fair compensation, transparency about task purpose, informed consent, data privacy, and mitigating potential exploitation."
  },
  {
    id: "q5",
    statement: "The cognitive load of participants should be maximized to get the most value from human computation.",
    option1: "True - Higher cognitive load means more valuable input",
    option2: "False - Appropriate cognitive load is key for quality results",
    correctOption: 2,
    explanation: "Excessive cognitive load can lead to fatigue, errors, and poor quality responses. Well-designed human computation systems balance cognitive demands with human capabilities."
  }
];
