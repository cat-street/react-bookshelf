export interface Book {
  [key: string]: string | number,
  id: string,
  title: string,
  author: string,
  cover: string,
  description: string,
  year: string,
  rating: number,
  votes: number,
  ownerId: string,
}
