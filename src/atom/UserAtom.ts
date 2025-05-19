import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'


const { persistAtom } = recoilPersist()

export const userDataRecoil = atom({
    key: "userDataRecoil",
    default: {
        userName: "박주영",
        userNickname: "Woochal",
        userSemester: 12,
        googleId: "testBySwagger",
        email: "private.com",
        yearOfSemester: 2024,
        semesterInYear: 2
    },
    effects_UNSTABLE: [persistAtom],
  });

export const isLoggedInRecoil = atom({
    key: "isLoggedInRecoil",
    default: true,
    effects_UNSTABLE: [persistAtom],
});