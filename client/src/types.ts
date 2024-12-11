export type Resp<T> = {
  error: true;
  message: string;
} | {
  error: false;
  data: T;
}

export type Promise_Resp<T> = Promise<Resp<T>>

export interface Resp_Videos {
  collection: string;
  videos: Resp_Video[]
}

export interface Resp_Video {
  id: string;
  player_url: string;
  title: string;
}
