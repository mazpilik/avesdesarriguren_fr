export type NewsDataT = {
  title: string;
  subtitle: string;
  body: string;
  lang: string;
}
export type NewsToSave = {
  userId: number;
  newsData: NewsDataT[];
}
export type NewsToUpdate = {
  userId: number;
  newsData: NewsDataT[];
  img: string;
}
export type NewsState = {
  newsId?: number;
  step: number;
  userId: number;
  newsData: NewsDataT[];
}
export type NewsUpdateImageT = {
  img: string;
  checked: boolean;
}
export type NewsUpdateState = {
  newsId: number;
  userId: number;
  newsData: NewsDataT[];
  img: NewsUpdateImageT;
}
