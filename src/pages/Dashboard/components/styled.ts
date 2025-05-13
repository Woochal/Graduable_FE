import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* border: 1px solid red; */
`;

export const UpperContainer = styled.div`
    width: 76.875vw;
    height: 25vw;
    justify-content: space-between;
    margin-bottom: 1.875vw;
    /* border: 1px solid red; */
`;

export const CourseHistoryContainer = styled.div`
    width: 76.875vw;
    height: 28.125vw;
    flex-direction: column;
    align-items: center;
    background-color: ${(props) => props.theme.color.bgCard};
    border-radius: 1.172vw;
    padding: 0 1.875vw 1.875vw 1.875vw;
    /* border: 1px solid red; */
`;

export const CourseHistoryTop = styled.div`
    width: 100%;
    height: 5.625vw;
    justify-content: space-between;
    align-items: center;
    /* border: 1px solid red; */
`;

export const CourseHistoryTopTitle = styled.div`
    width: 12.109vw;
    height: 100%;
    align-items: center;
    font-size: ${(props) => props.theme.typography.title.fontSize};
    font-weight: ${(props) => props.theme.typography.title.fontWeight};
    /* border: 1px solid red; */
`;

export const CourseHistoryTopButton = styled.div`
    /* width: 5.703vw; */
    height: 3.125vw;
    align-items: center;
    font-size: ${(props) => props.theme.typography.subTitle.fontSize};
    font-weight: ${(props) => props.theme.typography.subTitle.fontWeight};
    color: ${(props) => props.theme.color.textSub};
    border-radius: 0.586vw;
    padding: 0 1vw;
    /* border: 1px solid red; */
    &:hover {
        background-color: ${(props) => props.theme.color.bgDefault};
        cursor: pointer;
    }
`;

export const CourseHistoryContent = styled.div`
    width: 100%;
    flex-grow: 1;
    gap: 0.938vw;
    /* border: 1px solid red; */
`;

export const CategoryHistoryContainer = styled.div`
    /* flex: 1; */
    width: 8.32vw;
    height: 20.625vw;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1.172vw;
    background-color: ${(props) => props.theme.color.bgDefault};
    /* border: 1px solid red; */
`;

export const CategoryTop = styled.div<{ isFinished: boolean }>`
    width: 100%;
    height: 4.375vw;
    justify-content: center;
    align-items: center;
    color: ${(props) => (props.isFinished ? props.theme.color.primary : props.theme.color.highlightGray)};
    font-size: ${(props) => props.theme.typography.subTitle.fontSize};
    font-weight: ${(props) => props.theme.typography.subTitle.fontWeight};
    /* border: 1px solid red; */
`;

export const CreditBar = styled.div`
    width: 100%;
    height: 13.125vw;
    /* flex-grow: 1; */
    justify-content: center;
    align-items: center;
    /* border: 1px solid red; */
`;

export const CategoryBottom = styled.div<{ isFinished: boolean }>`
    width: 100%;
    height: 3.125vw;
    justify-content: center;
    align-items: center;
    color: ${(props) => (props.isFinished ? props.theme.color.primary : props.theme.color.highlightGray)};
    font-size: ${(props) => props.theme.typography.subTitle.fontSize};
    font-weight: ${(props) => props.theme.typography.subTitle.fontWeight};
    /* border: 1px solid red; */
`;

export const CreditBarContainer = styled.div`
    width: 2.188vw;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.color.textSub};
    border-radius: 0.391vw;
    overflow: hidden;
    /* border: 1px solid red; */
`;

export const RoadmapContainer = styled.div`
    width: 37.5vw;
    height: 25vw;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    background-color: ${(props) => props.theme.color.bgCard};
    border-radius: 1.172vw;
    padding: 0 1.875vw 1.875vw 1.875vw;
    /* border: 1px solid red; */
`;

export const RemainingCreditContainer = styled.div`
    width: 37.5vw;
    height: 25vw;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.color.bgCard};
    border-radius: 1.172vw;
    padding: 0 1.875vw 1.875vw 1.875vw;
`;

export const RemainingCreditContent = styled(CourseHistoryContent)`
    gap: 0;
`;

export const RemainingCreditContentLeft = styled.div`
    width: 40%;
    height: 100%;
    flex-direction: column;
    /* justify-content: center; */
    /* align-items: center; */
    /* border: 1px solid red; */
`;

export const RemainingCreditContentRight = styled.div`
    width: 60%;
    height: 100%;
    justify-content: end;
    /* align-items: center; */
    padding-right: 1.25vw;
    position: relative;
    /* border: 1px solid blue; */
`;

export const RemainingCreditText = styled.div`
    width: 11.719vw;
    height: 3.438vw;
    font-size: ${(props) => props.theme.typography.header.fontSize};
    font-weight: ${(props) => props.theme.typography.header.fontWeight};
    color: ${(props) => props.theme.color.primary};
    margin: 3.125vw 0 0.938vw 1.563vw;
    /* border: 1px solid red; */
`;

export const RemainingCreditDetail = styled.div`
    width: 11.719vw;
    height: 3.906vw;
    font-size: ${(props) => props.theme.typography.subTitle.fontSize};
    font-weight: ${(props) => props.theme.typography.subTitle.fontWeight};
    color: ${(props) => props.theme.color.textSub};
    text-align: start;
    line-height: 1.953vw;
    margin-left: 1.563vw;
`;

export const CreditDonutContainer = styled.div`
    width: 15.625vw;
    height: 15.625vw;
    position: absolute;
    top: -0.938vw;
    justify-content: center;
    /* border: 1px solid red; */
`;

export const CreditDonut = styled.div`
    width: 15.625vw;
    height: 15.625vw;
    position: absolute;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.color.textSub};
    background-color: #2b2b37;
    border-radius: 50%;
    transform: scaleX(-1);
    /* border: 1px solid red; */
`;

export const CreditDonutText = styled.div`
    width: 12.5vw;
    height: 12.5vw;
    top: calc((15.625vw - 12.5vw) / 2);
    position: absolute;
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

// export const CreditDonut = styled.div`
//   width: 15.625vw;
//   height: 15.625vw;
//   position: absolute;
//   justify-content: center;
//   align-items: center;
//   border-radius: 50%;
//   transform: scaleX(-1);
//   z-index: 1;
//   /* border: 1px solid red; */
// `;

// export const CreditDonutText = styled.div`
//   width: 14.063vw;
//   height: 14.063vw;
//   top: calc((15.625vw - 14.063vw) / 2);
//   position: absolute;
//   justify-content: center;
//   align-items: center;
//   font-size: ${props => props.theme.typography.header.fontSize};
//   font-weight: ${props => props.theme.typography.header.fontWeight};
//   color: ${props => props.theme.color.textPrimary};
//   background-color: ${props => props.theme.color.bgDefault};
//   border-radius: 50%;
//   /* border: 1px solid red; */
// `;

export const RoadmapContent = styled(CourseHistoryContent)`
    width: 100%;
    flex-grow: 1;
    gap: 0;
    flex-direction: column;
    align-items: center;
    /* border: 1px solid red; */
`;

export const RoadmapCourse = styled.div`
    width: 33.75vw;
    height: 14.063vw;
    justify-content: space-between;
    background-color: ${(props) => props.theme.color.bgDefault};
    border-radius: 1.172vw;
    padding: 0.938vw;
    /* border: 1px solid red; */
`;

export const RoadmapMajor = styled.div`
    width: 15.469vw;
    height: 100%;
    flex-direction: column;
    overflow-y: scroll;
    gap: 0.313vw;

    &::-webkit-scrollbar {
        display: none;
    }
    /* border: 1px solid red; */
`;

export const RoadmapLiberal = styled.div`
    width: 15.469vw;
    height: 100%;
    flex-direction: column;
    overflow-y: scroll;
    gap: 0.313vw;
    /* border: 1px solid red; */
`;

export const Course = styled.div`
    width: 100%;
    height: 2.813vw;
    min-height: 2.813vw;
    align-items: center;
    background-color: ${(props) => props.theme.color.bgCard};
    border-radius: 0.781vw;
    /* border: 1px solid red; */
`;

export const CourseType = styled.div`
    width: 2.188vw;
    height: 100%;
    justify-content: center;
    align-items: center;
    /* border: 1px solid red; */
`;

export const CourseTypeSign = styled.div<{ major: boolean }>`
    width: 0.938vw;
    height: 0.938vw;
    border-radius: 50%;
    background-color: ${(props) =>
        props.major ? props.theme.color.highlightOrange : props.theme.color.highlightPurple};
`;

export const CourseTitle = styled.div`
    width: 11.719vw;
    height: 0.938vw;
    font-size: ${(props) => props.theme.typography.caption.fontSize};
    font-weight: ${(props) => props.theme.typography.contentBold.fontWeight};
    color: ${(props) => props.theme.color.highlightGray};
`;

export const CourseInformation = styled.div`
    width: 31.875vw;
    height: 0.938vw;
    justify-content: space-between;
    margin-top: 0.625vw;
    /* border: 1px solid red; */
`;

export const CourseTypeInformation = styled.div`
    width: 6.406vw;
    height: 100%;
    justify-content: space-between;
    font-size: ${(props) => props.theme.typography.caption.fontSize};
    font-weight: ${(props) => props.theme.typography.contentBold.fontWeight};
    color: ${(props) => props.theme.color.textSub};
    /* border: 1px solid red; */
`;

export const CourseTypeMajor = styled.div`
    width: 2.813vw;
    height: 100%;
    align-items: center;
    gap: 0.313vw;
    /* border: 1px solid red; */
`;

export const CourseTypeLiberal = styled.div`
    width: 2.813vw;
    height: 100%;
    align-items: center;
    gap: 0.313vw;
    /* border: 1px solid red; */
`;

export const CourseCreditInformation = styled.div`
    width: 3.125vw;
    height: 100%;
    justify-content: end;
    font-size: ${(props) => props.theme.typography.caption.fontSize};
    font-weight: ${(props) => props.theme.typography.contentBold.fontWeight};
    color: ${(props) => props.theme.color.textSub};
`;

export const RoadmapSemester = styled.div`
    width: 100%;
    height: 1.875vw;
    justify-content: center;
    align-items: center;
    font-size: ${(props) => props.theme.typography.subTitle.fontSize};
    font-weight: ${(props) => props.theme.typography.subTitle.fontWeight};
    /* border: 1px solid red; */
`;
