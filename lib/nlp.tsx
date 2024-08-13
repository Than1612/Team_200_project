import nlp from 'compromise';

export const extractSituation = (userInput: string): string => {
  const doc = nlp(userInput);
  // Extract the situation using NLP processing
  const situation = doc.match('#Noun').out('text'); // Simplified example
  return situation;
};
