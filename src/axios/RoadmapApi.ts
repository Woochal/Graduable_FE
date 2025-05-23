import { axiosDefault, handleError } from './DefaultApi.js';
import { CourseDataAllType } from '../types/simulator/simulator.js';

export const deleteSemesterRoadmapAPI = async (googleId: string, semester: number) => {
    try {
        console.log('Making delete request to:', `/road-map/${googleId}?semester=${semester}`);
        const response = await axiosDefault.delete(`/road-map/${googleId}?semester=${semester}`);
        console.log('Delete API response:', response);
        return response.data;
    } catch (error) {
        console.error('Delete API error:', error);
        throw error; // 에러를 상위로 전파하여 컴포넌트에서 처리할 수 있도록 함
    }
};
