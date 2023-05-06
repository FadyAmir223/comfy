export {};

declare global {
  namespace Express {
    interface Request {
      user: any;
      session: any;
      logout(callback?: (err: Error) => void): void;
    }
  }
}
