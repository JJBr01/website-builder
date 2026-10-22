export const projectStartingPrice = 15000;
export const projectPriceSignal = `Projects typically start at $${projectStartingPrice / 1000}k.`;

export const inquiryReplyWorkingDays = 2;
export const typicalProjectMonths = { minimum: 1, maximum: 3 };

export const inquirySteps = [
  { number: '01', title: 'Inquiry', text: "Tell us what you're building. You'll hear back within two working days." },
  { number: '02', title: 'Scoping call', text: 'A direct conversation about goals, scope, budget and timeline, then a clear proposal.' },
  { number: '03', title: 'Design & build', text: 'Designed and developed by the same person, with regular check-ins through launch and handover.' },
];

export const projectFaqs = [
  { question: 'How long does a website take?', answer: 'Most projects take one to three months, depending on scope. Faster timelines are possible for smaller sites.' },
  { question: 'What does a project cost?', answer: `${projectPriceSignal} After a scoping call you get a fixed proposal based on what you actually need.` },
  { question: 'Who will I be working with?', answer: 'Justin James, who designs and builds every site. No account managers or handoffs.' },
  { question: 'How many revisions are included?', answer: 'Each project includes structured review rounds at the design and build stages, agreed up front in the proposal.' },
  { question: 'What do you need from me?', answer: 'Your goals, any existing brand assets and content, and timely feedback at each review stage.' },
  { question: 'Do I own the website?', answer: 'Yes. Your code, content and accounts are yours at launch, with no lock-in.' },
];

export const projectFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: projectFaqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
};