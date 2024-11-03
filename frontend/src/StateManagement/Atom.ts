import { atom } from "recoil";
interface User {
  id: string;
  name: string;
  email: string;
}

export const userAtom = atom<User | null>({
  key: "userAtom",
  default: null,
});
export const authenticated = atom<boolean>({
  key: "authenticated",
  default: false,
});
