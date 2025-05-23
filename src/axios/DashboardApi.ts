import {axiosDefault, handleError} from './DefaultApi.js'

export const getCurrentSemesterRoadmapAPI = async (uid: string) => {
    console.log(uid);

    try {
        const response = await axiosDefault.get(`/road-map/now/${uid}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return handleError(error, "현재 학기 로드맵을 받아오는데 실패했습니다.");
    }
};

export const getAllSemesterRoadmapAPI = async (uid: string) => {
    console.log(uid);
    try {
        const response = await axiosDefault.get(`/road-map/${uid}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return handleError(error, "모든 학기 로드맵을 받아오는데 실패했습니다.");
    }
};


// 이거 graduateSimulation 용 api 사용하면 될 듯
export const getGraduationStatusAPI = async (uid: string, userSemester: number) => {

    try {
        const response = await axiosDefault.get('/api/graduationStatus', {
            params: {
                uid: uid,
            }
        });
        // console.log(response.data);
        return response.data;
    } catch (error) {
        return handleError(error, "졸업 상태를 받아오는데 실패했습니다.");
    }
};