export class Note {
  deckName: string;
  modelName: string;
  front: string;
  back: string;
  tags: string[];
  constructor(
    deckName: string,
    modelName: string,
    front: string,
    back: string,
    tags: string[]
  ) {
    this.deckName = deckName;
    this.modelName = modelName;
    this.front = front;
    this.back = back;
    this.tags = tags;
  }
}
