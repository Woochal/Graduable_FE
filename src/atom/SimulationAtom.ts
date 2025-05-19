import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'


const { persistAtom } = recoilPersist()

export const selectedSemesterRecoil = atom<number[]>({
    key: "selectedSemesterRecoil",
    default: [],
});