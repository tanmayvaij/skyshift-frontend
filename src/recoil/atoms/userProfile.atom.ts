import { atom, useRecoilState } from "recoil";

const userProfileAtom = atom({
  key: "userProfileAtom",
  default: {
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    joinedOn: ""
  },
});

export const useUserProfileAtom = () => useRecoilState(userProfileAtom);
