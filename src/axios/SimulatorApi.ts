import {axiosDefault, handleError} from './DefaultApi.js'
import { CourseDataAllType } from '../types/simulator/simulator';
export const getFilteredSimulationResultAPI = async (uid: string, semesterList: number[]) => {
    console.log(uid, semesterList);
    try {
        const response = await axiosDefault.post('/api/simulator/graduateSimulation', {
            googleId: uid,
            semesterList: semesterList,
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        return handleError(error, "졸업 시뮬레이션 결과를 받아오는데 실패했습니다.");
    }
};

export const getSearchCourseAPI = async (text: string) => {
    try {
        const response = await axiosDefault.get('/api/simulator/search?name=' + text);
        return response.data;
    } catch (error) {
        return handleError(error, "과목 검색에 실패했습니다.");
    }
};

export const saveSemesterRoadmapAPI = async (googleId: string, semester: number, courseIdList: number[]) => {
    console.log(googleId, semester, courseIdList);
    try {
        const response = await axiosDefault.post('/api/simulator/saveToRoadmap', {
            googleId: googleId,
            semester: semester,
            courseIdList: courseIdList,
        });
        return response.data;
    } catch (error) {
        return handleError(error, "학기 로드맵 저장에 실패했습니다.");
    }
};