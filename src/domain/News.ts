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
