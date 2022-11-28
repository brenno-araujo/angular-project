import { Author } from "./Author";

export interface PeriodicElement {
  id: number;
  author_id: number;
  title: string;
  author: { name: string } | Author;
  barcode: string;
  authors?: Author[];
}
