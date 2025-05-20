import {axiosDefault, handleError} from './DefaultApi.js'
import { CourseDataAllType } from '../types/simulator/simulator.js';

export const deleteSemesterRoadmapAPI = async (googleId: string, semester: string) => {
    try {
        const response = await axiosDefault.delete(`/api/roadmap/${googleId}/${semester}`);
        return response.data;
    } catch (error) {
        return handleError(error, "학기 로드맵 삭제에 실패했습니다.");
    }
};