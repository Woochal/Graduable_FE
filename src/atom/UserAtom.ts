import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'


const { persistAtom } = recoilPersist()

export const userDataRecoil = atom({
    key: "userDataRecoil",
    default: {
        userName: "",
        userNickname: "",
        userSemester: 0,
        googleId: "",
        email: "",
        yearOfSemester: 0,
        semesterInYear: 0
    },
    effects_UNSTABLE: [persistAtom],
  });

export const isLoggedInRecoil = atom({
    key: "isLoggedInRecoil",
    default: true,
    effects_UNSTABLE: [persistAtom],
});