export {};

declare global {
  namespace Express {
    interface Request {
      // user: string;
      session: any;
      logout(callback?: (err: Error) => void): void;
    }
  }
}
