export type Fields = {
  name: string;
  email: string;
  message: string;
};
export type Errors = Record<keyof Fields | "generalError", string | null>;

export type ActionData =
  | { status: "success" }
  | { status: "error"; errors: Errors };
