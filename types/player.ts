    export type Player = {
  id: number;
  name: string;
  score: number;
  profiles?: {
    leetcode?: string;
    github?: string;
    hackerrank?: string;
  };
};