import styled from "styled-components";
import { motion } from "framer-motion";

// CourseList.tsx에서 사용
export const Containers = styled.div`
  margin-top: 2.5vw;
  display: flex;
  background-color: ${(props) => props.theme.color.bgCard};
  flex-direction: column;
  height: 25.6992vw;
  width: 76.9133vw;
  border-radius: 15px;
  overflow-y: auto;
  padding: 10px;
`;

export const TableContainer = styled.div`
  width: 100%;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    flex-grow: 1; /* 테이블이 컨테이너를 채우도록 설정 */
    
    th, td {
      text-align: center;
      padding: 14px 6px;
    }
    
    th {
      border-bottom: 1px solid ${(props) => props.theme.color.textSub};
      font-size: ${(props) => props.theme.typography.subtitleb.fontSize};
      font-weight: ${(props) => props.theme.typography.subtitleb.fontWeight};
      border-right: 1px solid ${(props) => props.theme.color.textSub};
    }
    
    td {
      font-size: ${(props) => props.theme.typography.subtitleb.fontSize};
      font-weight: ${(props) => props.theme.typography.subtitleb.fontWeight};
      border-right: 1px solid ${(props) => props.theme.color.textSub};
    }
     
    /* 마지막 열은 오른쪽 테두리 없음 */
    th:last-child, td:last-child {
      border-right: none;
    }
    
    tr:last-child td {
      border-bottom: none;
    }
  }
`;

// CourseSection.tsx에서 사용

export const Container = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SectionGrid = styled.div`
  width: 76.9133vw;
  height: 28.6367vw;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  background-color: ${(props) => props.theme.color.bgCard};
`;
export const Sugangtitle = styled.p`
  width: 12.0914vw;
  height: 1.8750vw;
  color: #FFFFFF;
  font-size: ${(props) => props.theme.typography.title.fontSize};
  font-weight: ${(props) => props.theme.typography.title.fontWeight};
`;
interface SectionBoxProps {
	$isSelected: boolean; // DOM요소 전달 아닌 스타일링에 사용
}

export const SectionAllBox = styled.div`

  width: auto;
  margin-top: 1.25vw;
  margin-left: 1.25vw;
  height: 100%;
  display: flex;
  flex-direction: column;

`;
export const SectionBox = styled.div<SectionBoxProps>`
display: flex;
  flex-direction: column;
  width: 7.9805vw;
  height:18.2172vw;
  
  border-radius: 15px;
  background-color: ${(props) => props.theme.color.bgDefault};
  border: 1px solid ${(props) => (props.$isSelected ? props.theme.color.highlightOrange : "#2d2d31")};
  cursor: pointer;
  transition: all 0.2s ease;
opacity: ${(props) => (props.$isSelected ? 1 : 0.6)}; // 선택되지 않은 항목은 불투명도 낮춤
 

`;

export const SectionName = styled.div<SectionBoxProps>`

font-size: ${(props) => props.theme.typography.subtitleb.fontSize};
  font-weight: ${(props) => props.theme.typography.subtitleb.fontWeight};
  margin-top: 1.5vw;
  color: ${(props) => (props.$isSelected ? props.theme.color.highlightOrange : "#FFFFFF")};
`;

export const SectionInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2vw;
  font-size: ${(props) => props.theme.typography.subtitleb.fontSize};
  font-weight: ${(props) => props.theme.typography.subtitleb.fontWeight};
  text-align: center;
  color: #FFFFFF;

`;

export const ProgressContainer = styled.div`

  width: 2.0141vw;
  height: 11.4859vw;
  background-color: #333;
  border-radius: 6px;
  position: relative;
   margin-top: 1vw;
`;

export const ProgressFill = styled(motion.div)<{
	progress: number;
	progressColor: string;
}>`
 
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-radius: ${(props) => (props.progress >= 100 ? "6px" : "0 0 6px 6px")} ; // 위쪽 모서리만 둥글게
  height: ${(props) => `${props.progress}%`};
  background-color: ${(props) => props.progressColor};
`;
