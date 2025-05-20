import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'


const { persistAtom } = recoilPersist()

export const userDataRecoil = atom({
    key: "userDataRecoil",
    default: {
        userName: "박주영2",
        userNickname: "Woochal2",
        userSemester: 11,
        googleId: "testBySwagger2",
        email: "private.com",
        yearOfSemester: 2025,
        semesterInYear: 1
    },
    effects_UNSTABLE: [persistAtom],
  });

export const isLoggedInRecoil = atom({
    key: "isLoggedInRecoil",
    default: true,
    effects_UNSTABLE: [persistAtom],
});