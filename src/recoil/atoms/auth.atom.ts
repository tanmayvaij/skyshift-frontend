import { atom, useRecoilState } from "recoil";

const authAtom = atom({
  key: "authAtom",
  default: {
    isAuthenticated: false,
    authToken: "",
  },
});

export const useAuthAtom = () => useRecoilState(authAtom);
