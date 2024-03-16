type Data = {
  levelData: {
    id: string;
    name: string;
    imageSrc: string;
    cutSrc: string;
    author: string;
    year: string;
  };
  words: {
    audioExample: string;
    textExample: string;
    textExampleTranslate: string;
    id: number;
    word: string;
    wordTranslate: string;
  }[];
}[];

export default class GetData {
  private data;

  private level;

  constructor(data: Data, level: number) {
    this.data = data;
    this.level = this.data[level];
  }

  getData() {
    return this.data;
  }

  getLevel() {
    return this.level;
  }

  getLevelData() {
    return this.getLevel().levelData;
  }

  getLevelId() {
    return this.getLevelData().id;
  }

  getName() {
    return this.getLevelData().name;
  }

  getImgSrc() {
    return this.getLevelData().imageSrc;
  }

  getCutSrc() {
    return this.getLevelData().cutSrc;
  }

  getAuthor() {
    return this.getLevelData().author;
  }

  getYear() {
    return this.getLevelData().year;
  }

  getWords(num: number) {
    return this.getLevel().words[num];
  }

  getAudioExample(num: number) {
    return this.getWords(num).audioExample;
  }

  getTextExample(num: number) {
    return this.getWords(num).textExample;
  }

  getTextExampleTranslate(num: number) {
    return this.getWords(num).textExampleTranslate;
  }

  getWordId(num: number) {
    return this.getWords(num).id;
  }

  getWord(num: number) {
    return this.getWords(num).word;
  }

  getWordTranslate(num: number) {
    return this.getWords(num).wordTranslate;
  }

  getRandomizedTextExample(num: number) {
    const words = this.getTextExample(num).split(' ');
    const result: string[] = [];
    while (words.length > 0) {
      const index = Math.floor(Math.random() * words.length);
      result.push(words[index]);
      words.splice(index, 1);
    }
    return result;
  }
}
