import { atom } from "recoil";
interface User {
  id: string;
  name: string;
  email: string;
  uuid: string;
}

interface Password {
  id: number;
  title: string;
  content: string;
  file?: string;
  createdAt: Date;
  sharedAt?: Date;
}
export const userAtom = atom<User | null>({
  key: "userAtom",
  default: null,
});
export const authenticated = atom<boolean>({
  key: "authenticated",
  default: false,
});
  export const passwordsAtom = atom<Password[] | null>({
    key: "passwordsAtom",
    default: [],
  });
