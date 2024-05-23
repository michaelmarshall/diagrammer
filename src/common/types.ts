export class Word {
  value: string;

  constructor(value: string) {
    this.value = value;
  }
}

export class Compound {
  firstWord: Word;
  conjunction?: Word | null = null;
  secondWord: Word;

  constructor(
    firstWord: Word,
    conjunction: Word | null = null,
    secondWord: Word
  ) {
    this.firstWord = firstWord;
    this.conjunction = conjunction;
    this.secondWord = secondWord;
  }
}

export class Phrase {
  head: Word | Compound;
  optionalModifiers?: (Word | Compound)[] | undefined;

  constructor(
    head: Word | Compound,
    optionalModifiers: (Word | Compound)[] | undefined = undefined
  ) {
    this.head = head;
    this.optionalModifiers = optionalModifiers;
  }
}

export class ComplexPhrase extends Phrase {
  requiredModifiers: (Word | Compound)[];

  constructor(
    head: Word,
    requiredModifiers: (Word | Compound)[],
    optionalModifiers?: (Word | Compound)[] | undefined
  ) {
    super(head, optionalModifiers);
    this.requiredModifiers = requiredModifiers;
  }
}

export class Sentence {
  items: (Phrase | ComplexPhrase)[];

  constructor(items: (Phrase | ComplexPhrase)[]) {
    this.items = items;
  }
}
