import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.875vw;
  /* border: 1px solid red; */
`;

// AddSemester


export const AddSemesterContainer = styled.div`
  width: 76.875vw;
  /* height: 29.688vw; */
  height: 24.219vw;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  /* border: 1px solid red; */
`;

export const AddSemesterContent = styled.div`
  width: 100%;
  height: 23.438vw;
  background-color: ${(props) => props.theme.color.bgCard};
  overflow: hidden;
  border-radius: 1.172vw;
  /* border: 1px solid red; */
`;

export const AddSemesterContentLeft = styled.div`
  width: 33.75vw;
  height: 100%;
  flex-direction: column;
  gap: 1.25vw;
  padding: 1.875vw 1.25vw;
  /* border: 1px solid red; */
`;

export const AddSemesterContentRight = styled.div`
  width: 43.125vw;
  height: 100%;
  padding: 1.875vw;
  /* border: 1px solid red; */
`;

// SemesterFilter

export const SemesterFilterContainer = styled.div`
  width: 100%;
  height: 4.688vw;
  /* height: 52px; */
  /* border: 1px solid blue; */
`;

export const SemesterFilterYear = styled.div`
  width: 10.938vw;
  height: 100%;
  margin-right: 0.469vw;
  /* border: 1px solid red; */
`;

export const SemesterFilterYearText = styled.div`
  width: 3.125vw;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.typography.subtitleb.fontSize};
  font-weight: ${(props) => props.theme.typography.subtitleb.fontWeight};
  /* border: 1px solid red; */
`;

export const SemesterFilterSemester = styled.div`
  width: 15.625vw;
  height: 100%;
  margin-right: 0.469vw;
  /* border: 1px solid red; */
`;

export const SemesterFilterSemesterSelect = styled.div`
  width: 12.5vw;
  height: 100%;
  justify-content: space-between;
  /* border: 1px solid red; */
`;

export const SemesterFilterSemesterOption = styled.div<{isSelected: boolean}>`
  width: 5.625vw;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.typography.subtitleb.fontSize};
  font-weight: ${(props) => props.theme.typography.subtitleb.fontWeight};
  background-color: ${(props) => props.isSelected ? props.theme.color.primary : props.theme.color.bgCard};
  border-radius: 0.781vw;
  cursor: pointer;
  /* border: 1px solid red; */
`;


export const SemesterFilterSemesterText = styled.div`
  width: 3.125vw;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.typography.subtitleb.fontSize};
  font-weight: ${(props) => props.theme.typography.subtitleb.fontWeight};
  /* border: 1px solid red; */
`;

export const SemesterFilterInfo = styled.div`
  /* width: 100px; */
  flex: 1;
  height: 100%;
  /* justify-content: center; */
  align-items: center;
  font-size: ${(props) => props.theme.typography.subtitleb.fontSize};
  font-weight: ${(props) => props.theme.typography.subtitleb.fontWeight};
  color: ${(props) => props.theme.color.primary};
  /* border: 1px solid red; */
`;






// CourseSearch

export const CourseSearchContainer = styled.div`
  width: 100%;
  height: 4.688vw;
  background-color: ${(props) => props.theme.color.bgDefault};
  border-radius: 0.781vw;
  overflow: hidden;
  /* border: 1px solid blue; */
`;

export const CourseSearchInput = styled.input`
  /* width: 100%; */
  flex: 1;
  height: 100%;
  background-color: ${(props) => props.theme.color.bgDefault};
  border-radius: 0.781vw;
  padding: 1.25vw;
  font-size: ${(props) => props.theme.typography.title.fontSize};
  font-weight: ${(props) => props.theme.typography.title.fontWeight};
  color: ${(props) => props.theme.color.textSub};
  border: 1px solid  ${(props) => props.theme.color.bgDefault};

  &:focus {
    outline: none;
  }
`;

export const CourseSearchIcon = styled.div`
  width: 4.375vw;
  height: 100%;
  justify-content: center;
  align-items: center;
  /* border: 1px solid  red; */
`;

// CourseList

export const CourseListContainer = styled.div`
  width: 100%;
  flex: 1;
  flex-direction: column;
  overflow-y: scroll;
  gap: 1.25vw;
  border-radius: 1.172vw;
  /* border: 1px solid blue; */
`;

export const CourseItem = styled.div`
  width: 100%;
  min-height: 100%;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.bgDefault};
  border-radius: 1.172vw;
  /* border: 1px solid red; */
`;

export const CourseItemMajor = styled.div`
  width: 3.75vw;
  height: 100%;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
`;

export const CourseItemTop = styled.div`
  width: 100%;
  height: 5vw;
  /* border: 1px solid red; */
`;

export const CourseTypeSign = styled.div<{ major: boolean }>`
    width: 1.25vw;
    height: 1.25vw;
    border-radius: 50%;
    background-color: ${(props) =>
        props.major ? props.theme.color.highlightOrange : props.theme.color.highlightPurple};
`;

export const CourseItemName = styled.div`
  flex: 1;
  height: 100%;
  align-items: center;
  font-size: ${(props) => props.theme.typography.title.fontSize};
  font-weight: ${(props) => props.theme.typography.title.fontWeight};
  color: ${(props) => props.theme.color.textPrimary};
  padding-top: 0.156vw;
  /* border: 1px solid red; */
`;


export const CourseItemAddButtonDiv = styled.div`
  width: 8.125vw;
  height: 100%;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
`;

export const CourseItemAddButton = styled.div`
  width: 5.625vw;
  height: 2.5vw;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.bgCard};
  border-radius: 0.391vw;
  cursor: pointer;
`;

export const CourseItemBottom = styled.div`
  width: 100%;
  flex: 1;
  flex-direction: column;
  padding: 0 1.875vw;
  /* border: 1px solid red; */
`;

export const CourseItemBottomRow = styled.div`
  width: 100%;
  height: 2.344vw;
  gap: 2.5vw;
  /* border: 1px solid red; */
`;

export const CourseItemRoom = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  /* border: 1px solid red; */
`;

export const CourseItemProfessor = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  /* border: 1px solid red; */
`;

export const CourseItemCredit = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  /* border: 1px solid red; */
`;

export const CourseItemGradeType = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  /* border: 1px solid red; */
`;

export const CourseItemEnglish = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  /* border: 1px solid red; */
`;






export const EmptyCourseList = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
`;

// SelectedCourseList

export const SelectedCourseListContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.25vw;
  border-radius: 1.172vw;
  background-color: ${props=> props.theme.color.bgDefault};
  /* border: 1px solid blue; */
`;

export const SelectedCourseList = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  /* border: 1px solid blue; */
`;

export const SelectedCourseListGrid = styled.div`
  width: 100%;
  height: 14.063vw;
  /* height: 100%; */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 0.938vw;
  row-gap: 0.313vw;
  align-content: start;
  overflow-y: scroll;
  /* border: 1px solid red; */
`;


export const SelectedCourseItem = styled.div`
  width: 100%;
  height: 2.5vw;
  padding: 0 0.625vw;
  background-color: ${props=> props.theme.color.bgCard};
  border-radius: 0.391vw;
  /* border: 1px solid red; */
`;

export const SelectedCourseMajor = styled.div`
  width: 1.875vw;
  height: 100%;
  align-items: center;
  /* border: 1px solid red; */
`;

export const SelectedCourseItemCredit = styled.div`
  width: 1.406vw;
  height: 100%;
  align-items: center;
  font-size: ${(props) => props.theme.typography.caption.fontSize};
  font-weight: ${(props) => props.theme.typography.title.fontWeight};
  color: ${(props) => props.theme.color.textPrimary};
  /* border: 1px solid red; */
`;

export const SelectedCourseItemName = styled.div`
  flex: 1;
  height: 100%;
  align-items: center;
  font-size: ${(props) => props.theme.typography.caption.fontSize};
  font-weight: ${(props) => props.theme.typography.title.fontWeight};
  color: ${(props) => props.theme.color.textPrimary};
  /* border: 1px solid red; */
`;

export const SelectedCourseItemDeletedDiv = styled.div`
  width: 1.563vw;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 0 0.313vw;
  /* border: 1px solid red; */
`;


export const SelectedCourseItemDeletedButton = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  /* border: 1px solid blue; */
`;

export const SelectedCourseItemDeletedButtonImg = styled.img`
  width: 0.938vw;
  height: 0.938vw;
`;

export const SelectedCourseListSaveButtonDiv = styled.div`
  width: 100%;
  height: 2.5vw;
  justify-content: end;
  align-items: center;
  /* border: 1px solid red; */
`;

export const SelectedCourseListSaveButton = styled.div`
  width: 6.25vw;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.primary};
  color: black;
  font-size: ${(props) => props.theme.typography.subtitleb.fontSize};
  font-weight: ${(props) => props.theme.typography.subtitleb.fontWeight};
  border-radius: 0.391vw;
  cursor: pointer;
`;

export const SelectedCourseListEmpty = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.typography.subtitleb.fontSize};
  font-weight: ${(props) => props.theme.typography.subtitleb.fontWeight};
  color: ${(props) => props.theme.color.textSub};
  /* border: 1px solid red; */
`;





// GraduationSimulator

export const GraduationSimulatorContainer = styled.div`
  width: 76.875vw;
  height: 29.688vw;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.color.bgCard};
  padding: 1.875vw;
  gap: 0.938vw;
  border-radius: 1.172vw;
  /* border: 1px solid red; */
`;

// SimulationFilter

export const SimulationFilterContainer = styled.div`
  width: 100%;
  min-height: 5.313vw;
  flex-direction: column;
  justify-content: space-between;
  /* border: 1px solid blue; */
`;

export const SimulationFilterTitle = styled.div`
  width: 100%;
  height: 1.875vw;
  font-size: ${(props) => props.theme.typography.title.fontSize};
  font-weight: ${(props) => props.theme.typography.title.fontWeight};
  /* border: 1px solid red; */
`;

export const SimulationFilterContent = styled.div`
  width: 100%;
  height: 1.875vw;
  justify-content: space-between;
  /* border: 1px solid red; */
`;

export const SimulationFilterContentTitle = styled.div`
  width: 24.375vw;
  height: 100%;
  /* justify-content: center; */
  align-items: center;
  font-size: ${(props) => props.theme.typography.subtitleb.fontSize};
  font-weight: ${(props) => props.theme.typography.subtitleb.fontWeight};
`;
export const SimulationFilterRoadmapList = styled.div`
  /* width: 100%; */
  flex: 1;
  height: 100%;
  overflow-x: auto;
  gap: 0.469vw;
  position: relative;
  /* border: 1px solid red; */
  
  /* WebKit 스크롤바 오버레이 방식 적용 */
  &::-webkit-scrollbar {
    display: none;
  }

  /* &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    display: none;
  } */
`;

export const SimulationFilterRoadmapItem = styled.div<{isSelected: boolean}>`
  min-width: 5.313vw;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.isSelected ? props.theme.color.primary : props.theme.color.textPrimary};
  font-size: ${(props) => props.theme.typography.caption.fontSize};
  font-weight: ${(props) => props.theme.typography.subtitleb.fontWeight};
  border-radius: 0.391vw;
  border: ${(props) => props.isSelected ? `1px solid ${props.theme.color.primary}` : `1px solid ${props.theme.color.textSub}`};
  cursor: pointer;
`;

// SimulationResult

export const SimulationResultContainer = styled.div`
  width: 100%;
  flex: 1;
  justify-content: space-between;
  /* border: 1px solid blue; */
`;

export const SimulationResultDonutDiv = styled.div`
  width: 16.563vw;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  /* border: 1px solid red; */
`;

export const DonutInfoDiv = styled.div`
  width: 100%;
  height: 1.875vw;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.typography.subtitleb.fontSize};
  font-weight: ${(props) => props.theme.typography.subtitleb.fontWeight};
  color: ${(props) => props.theme.color.textPrimary};
  /* border: 1px solid red; */
`;

export const DonutInfoSpan = styled.span`
  font-size: ${(props) => props.theme.typography.subtitleb.fontSize};
  font-weight: ${(props) => props.theme.typography.subtitleb.fontWeight};
  color: ${(props) => props.theme.color.textSub};
`;

export const SimulationResultCreditBarDiv = styled.div`
  width: 56.563vw;
  height: 100%;
  /* border: 1px solid red; */
`;

export const CourseHistoryContainer = styled.div`
    width: 56.563vw;
    height: 100%;
    flex-direction: column;
    align-items: center;
    background-color: ${(props) => props.theme.color.bgCard};
    border-radius: 1.172vw;
    /* padding: 0 1.875vw 1.875vw 1.875vw; */
    /* border: 1px solid red; */
`;

export const CourseHistoryContent = styled.div`
    width: 100%;
    height: 100%;
    justify-content: end;
    gap: 0.625vw;
    /* border: 1px solid red; */
`;

export const CreditBarContainer = styled.div`
    width: 1.563vw;
    height: 11.563vw;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.color.textSub};
    border-radius: 0.391vw;
    overflow: hidden;
    /* border: 1px solid red; */
`;


export const CreditDonutContainer = styled.div`
    width: 100%;
    height: 17.188vw;
    position: relative;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.color.bgDefault};
    border-radius: 15px;
    /* border: 1px solid red; */
`;

export const CreditDonut = styled.div`
    width: 14.063vw;
    height: 14.063vw;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.color.textSub};
    background-color: #2b2b37;
    border-radius: 50%;
    transform: scaleX(-1);
    /* border: 1px solid red; */
`;

export const CreditDonutText = styled.div`
    width: 10.938vw;
    height: 10.938vw;
    position: absolute;
    top: calc((17.188vw - 10.938vw) / 2);
    justify-content: center;
    align-items: center;
    font-size: ${(props) => props.theme.typography.header.fontSize};
    font-weight: ${(props) => props.theme.typography.header.fontWeight};
    color: ${(props) => props.theme.color.textPrimary};
    background-color: ${(props) => props.theme.color.bgDefault};
    border-radius: 50%;
    z-index: 1;
    /* border: 1px solid red; */
`;



export const CategoryHistoryContainer = styled.div`
    /* flex: 1; */
    width: 6.406vw;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    /* border: 1px solid red; */
`;

export const CategoryTop = styled.div<{ isFinished: boolean }>`
    width: 100%;
    height: 17.188vw;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${(props) => (props.isFinished ? props.theme.color.primary : props.theme.color.highlightGray)};
    font-size: ${(props) => props.theme.typography.subTitle.fontSize};
    font-weight: ${(props) => props.theme.typography.subTitle.fontWeight};
    background-color: ${(props) => props.theme.color.bgDefault};
    border-radius: 1.172vw;
    /* border: 1px solid red; */
`;

export const CategoryTopText = styled.div<{ isFinished: boolean }>`
    width: 100%;
    height: 4.375vw;
    justify-content: center;
    align-items: center;
    /* border: 1px solid red; */
`;

export const CreditBar = styled.div<{ isFinished: boolean }>`
    width: 100%;
    height: 13.125vw;
    /* flex-grow: 1; */
    justify-content: center;
    align-items: center;
    /* border: 1px solid red; */
`;

export const CategoryBottom = styled.div<{ isFinished: boolean }>`
    width: 100%;
    height: 1.875vw;
    justify-content: center;
    align-items: center;
    color: ${(props) => (props.isFinished ? props.theme.color.primary : props.theme.color.textSub)};
    font-size: ${(props) => props.theme.typography.subtitleb.fontSize};
    font-weight: ${(props) => props.theme.typography.subtitleb.fontWeight};
    /* border: 1px solid red; */
`;
