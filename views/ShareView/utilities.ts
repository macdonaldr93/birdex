export enum Swap {
  Quote,
  Entry,
  Definition,
}

export interface CreateShareText {
  definitions?: {
    [type: string]: string[];
  } | null;
  quote: string;
  phonetic?: string;
  word: string;
  swap: Swap;
  entry?: any;
  authors: string[];
  title: string;
  pageNumber?: string;
}

export function createShareText({
  word,
  phonetic,
  quote,
  swap,
  entry,
  definitions,
  authors,
  title,
  pageNumber,
}: CreateShareText): string {
  switch (swap) {
    case Swap.Quote: {
      return createQuote({ word, quote, phonetic, authors, title, pageNumber });
    }

    case Swap.Entry: {
      return createEntry({ word, phonetic, entry });
    }

    case Swap.Definition: {
      return createDefinitions({ word, phonetic, definitions });
    }

    default: {
      return `✨ ${word} ${phonetic} ✨

https://wordful.app/`;
    }
  }
}

function createQuote({
  word,
  phonetic,
  quote,
  authors,
  title,
  pageNumber,
}: {
  word: string;
  phonetic?: string;
  quote: string;
  authors: string[];
  title: string;
  pageNumber?: string;
}) {
  return `✨ ${word} ${phonetic} ✨

${quote}

- ${authors.join(', ')} | ${title}${pageNumber ? `, p.${pageNumber}` : ''}

https://wordful.app/`;
}

function createEntry({
  word,
  phonetic,
  entry,
}: {
  word: string;
  phonetic?: string;
  entry?: string;
}) {
  return `✨ ${word} ${phonetic} ✨

${entry}

https://wordful.app/`;
}

function createDefinitions({
  word,
  phonetic,
  definitions,
}: {
  word: string;
  phonetic?: string;
  definitions?: {
    [type: string]: string[];
  } | null;
}) {
  if (!definitions) {
    return `✨ ${word} ${phonetic} ✨`;
  }

  const types = Object.keys(definitions);

  const definitionsString = types
    .map(
      type => `${type}
${createMeaning(definitions[type])}
`,
    )
    .join('\n');

  return `✨ ${word} ${phonetic} ✨

${definitionsString}
https://wordful.app/`;
}

function createMeaning(meanings: string[]) {
  return meanings
    .map((meaning, index) => `${index + 1}. ${meaning}`)
    .join('\n');
}
