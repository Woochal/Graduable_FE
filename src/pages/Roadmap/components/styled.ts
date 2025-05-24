import styled, { css } from 'styled-components';

export const Container = styled.div`
    width: min(calc(100% - 2rem), 984.49px);
    height: calc(100vh);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 2rem;
    padding-top: 5.5vh;
    box-sizing: border-box;
    overflow: hidden;
`;

export const Header = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    gap: 1.6875rem;
`;

export const Title = styled.h1`
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: clamp(1.25rem, 1.5vw, 1.5rem);
    line-height: 1.21;
    margin: 0;
`;

export const Legend = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const LegendItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const LegendBox = styled.div<{ color: string }>`
    width: 14px;
    height: 14px;
    background-color: ${(props) => props.color};
    border-radius: 50%;
`;

export const LegendText = styled.span`
    color: rgba(108, 108, 114, 1);
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 0.6875rem;
    line-height: 1.21;
`;

export const EditButton = styled.button`
    background-color: rgba(34, 34, 46, 1);
    border: none;
    color: rgba(217, 217, 217, 1);
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 0.9375rem;
    line-height: 1.38;
    cursor: pointer;
    padding: 0.5rem 1rem;
    transition: all 0.2s ease;
    margin-left: auto;
    min-width: 86.21px;
    height: 43.25px;
    border-radius: 0.4375rem;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        color: #ffffff;
        background-color: rgba(44, 44, 56, 1);
    }
`;

export const ContentBox = styled.div`
    width: 100%;
    height: 85%;
    background-color: rgba(34, 34, 46, 1);
    border-radius: 0.9375rem;
    padding: 0.75rem;
    box-sizing: border-box;
    overflow: hidden;
`;

export const SemesterGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 212px);
    grid-auto-rows: 250px;
    column-gap: 1rem;
    row-gap: 3rem;
    width: 100%;
    min-height: calc(250px * 2 + 3rem);
    padding: 0.25rem;
    padding-top: 1rem;
    justify-content: center;
    align-content: start;
    overflow-y: auto;
    height: 100%;
    box-sizing: border-box;
`;

export const SemesterCardOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 212px;
    height: 289.1px;
    background-color: rgba(0, 0, 0, 0);
    pointer-events: none;
    z-index: 1;
`;

export const SemesterCard = styled.div<{ isSelected: boolean; isEditMode: boolean }>`
    width: 212px;
    height: 250px;
    background-color: rgba(24, 24, 34, 1);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    border: 1px solid ${(props) => (props.isSelected ? 'rgba(167, 224, 217, 1)' : 'none')};
    min-height: 250px;
    transition: border-color 0.2s ease-in-out;
    position: relative;

    ${({ isEditMode }) =>
        isEditMode &&
        css`
            &:hover {
                cursor: pointer;
                border: 1px solid rgba(167, 224, 217, 1);
            }
        `}
`;

export const CourseList = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    box-sizing: border-box;
    min-height: 180px;
    margin-bottom: 0.5rem;
`;

export const CourseItem = styled.div<{ type: '전공' | '교양' }>`
    width: 100%;
    height: 32px;
    min-height: 32px;
    background-color: rgba(34, 34, 46, 1);
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    gap: 0.5rem;
    box-sizing: border-box;
    flex-shrink: 0;
`;

export const CourseTypeIndicator = styled.div<{ type: '전공' | '교양' }>`
    width: 14px;
    height: 14px;
    background-color: ${(props) => (props.type === '전공' ? 'rgba(224, 206, 167, 1)' : 'rgba(167, 180, 224, 1)')};
    border-radius: 50%;
    flex-shrink: 0;
`;

export const CourseName = styled.span`
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 11px;
    line-height: 13.31px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    text-align: left;
`;

export const TotalCredits = styled.div`
    color: rgba(108, 108, 114, 1);
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 11px;
    line-height: 13.31px;
    padding: 0 1rem 0.75rem;
    text-align: right;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
`;

export const SemesterTitle = styled.h2`
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 15px;
    line-height: 1.38;
    text-align: center;
    margin: 1rem 0 0;
    width: 120px;
    white-space: nowrap;
`;

export const DeleteButton = styled.button`
    position: absolute;
    top: -10px;
    right: -10px;
    width: 20px;
    height: 20px;
    background-color: rgba(34, 34, 46, 1);
    border: 1.5px solid rgba(108, 108, 114, 1);
    border-radius: 50%;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    &::before,
    &::after {
        content: '';
        position: absolute;
        width: 10px;
        height: 1.5px;
        background-color: rgba(108, 108, 114, 1);
        border-radius: 2px;
    }

    &::before {
        transform: rotate(45deg);
    }

    &::after {
        transform: rotate(-45deg);
    }

    &:hover {
        background-color: rgba(44, 44, 56, 1);
        border-color: rgba(128, 128, 134, 1);

        &::before,
        &::after {
            background-color: rgba(128, 128, 134, 1);
        }
    }
`;

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    width: 460.8px;
    height: 302.25px;
    background-color: rgba(34, 34, 46, 1);
    border-radius: 24px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const ModalTitle = styled.h2`
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 36px;
    line-height: 1.21;
    margin: 0;
    text-align: left;
`;

export const ModalMessage = styled.p`
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 20px;
    line-height: 1.21;
    margin: 0;
    text-align: left;
`;

export const ModalButtons = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: auto;
    justify-content: flex-end;
`;

export const ModalButton = styled.button<{ variant: 'cancel' | 'delete' }>`
    width: 97.09px;
    height: 43.25px;
    background-color: ${(props) => (props.variant === 'delete' ? 'rgba(167, 224, 217, 1)' : 'rgba(108, 108, 114, 1)')};
    color: ${(props) => (props.variant === 'delete' ? '#000000' : '#ffffff')};
    border: none;
    border-radius: 7px;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        opacity: 0.9;
    }
`;

export const SearchContainer = styled.div`
    width: min(526.3px, 90vw);
    height: clamp(40px, 8vh, 56.26px);
    background-color: rgba(24, 24, 34, 1);
    border-radius: 11px;
    margin-top: clamp(20px, 4vh, 37.27px);
    display: flex;
    align-items: center;
    padding: 0 15px;
`;

export const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    color: rgba(217, 217, 217, 1);
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: clamp(13px, 2vw, 15px);
    line-height: 1.38;
    outline: none;

    &::placeholder {
        color: rgba(108, 108, 114, 1);
    }
`;

export const TagContainer = styled.div`
    display: flex;
    gap: clamp(0.5rem, 2vw, 1rem);
    margin-top: clamp(10px, 2vh, 15.76px);
`;

export const Tag = styled.div`
    padding: clamp(6px, 1.5vh, 8px) clamp(10px, 2vw, 15px);
    background-color: rgba(34, 34, 46, 1);
    border: 1px solid rgba(108, 108, 114, 1);
    border-radius: 5px;
    color: rgba(217, 217, 217, 1);
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: clamp(10px, 1.5vw, 11px);
    cursor: pointer;
    white-space: nowrap;

    &:hover {
        border-color: rgba(128, 128, 134, 1);
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    gap: clamp(0.5rem, 2vw, 1rem);
    margin-top: auto;
    justify-content: flex-end;
    padding: clamp(10px, 2vh, 20px) 0;
`;

export const CancelButton = styled.button`
    color: rgba(108, 108, 114, 1);
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: clamp(13px, 2vw, 15px);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    white-space: nowrap;
`;

export const SaveButton = styled.button`
    width: clamp(80px, 15vw, 97.05px);
    height: clamp(35px, 6vh, 43.25px);
    background-color: rgba(167, 224, 217, 1);
    border: none;
    border-radius: 7px;
    color: #000000;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: clamp(13px, 2vw, 15px);
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
        opacity: 0.9;
    }
`;

export const ModalSemesterTitle = styled.h2`
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: clamp(24px, 4vw, 36px);
    line-height: 1.21;
    margin: 0;
    margin-top: clamp(20px, 4vh, 32.27px);
    white-space: nowrap;
`;

// Add Course Modal Styles
export const AddCourseModalOverlay = styled(ModalOverlay)`
    background-color: rgba(0, 0, 0, 0.5);
`;

export const AddCourseModalContent = styled.div`
    background: rgba(34, 34, 46, 1);
    padding: 2rem;
    border-radius: 24px;
    width: min(602.66px, 90vw);
    height: min(601.87px, 80vh);
    position: relative;
    display: flex;
    flex-direction: column;
    gap: clamp(1rem, 2vh, 1.5rem);
`;

export const AddCourseModalSemesterTitle = styled.h2`
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: clamp(24px, 4vw, 36px);
    line-height: clamp(29.05px, 4.8vw, 44px);
    margin: 0;
    width: min(263px, 90%);
    height: clamp(29.05px, 4.8vw, 44px);
`;

export const AddCourseModalTitle = styled.h2`
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: clamp(16px, 2.5vw, 20px);
    line-height: clamp(19.36px, 2.9vw, 24.2px);
    margin: 0;
    width: min(296px, 90%);
    height: clamp(19.36px, 2.9vw, 24.2px);
`;

export const AddCourseSearchContainer = styled.div`
    width: 100%;
    height: clamp(40px, 8vh, 56.26px);
    background-color: rgba(24, 24, 34, 1);
    border-radius: 11px;
    display: flex;
    align-items: center;
    padding: 0 15px;
`;

export const AddCourseSearchInput = styled.input`
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    color: rgba(217, 217, 217, 1);
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: clamp(13px, 2vw, 15px);
    line-height: 1.38;
    outline: none;

    &::placeholder {
        color: rgba(108, 108, 114, 1);
    }
`;

export const AddCourseTagContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    gap: 0.5rem;
    width: 100%;
    padding-bottom: 0.5rem;
    align-content: flex-start;
`;

export const AddCourseTag = styled.div`
    padding: 8px 15px;
    background-color: rgba(34, 34, 46, 1);
    border: 1px solid rgba(108, 108, 114, 1);
    border-radius: 5px;
    color: rgba(217, 217, 217, 1);
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 11px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;

    > * {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &:hover {
        border-color: rgba(128, 128, 134, 1);
    }
`;

export const TagCourseTypeDot = styled.div<{ type: '전공' | '교양' }>`
    width: 14px;
    height: 14px;
    background-color: ${(props) => (props.type === '전공' ? 'rgba(224, 206, 167, 1)' : 'rgba(167, 180, 224, 1)')};
    border-radius: 50%;
    flex-shrink: 0;
`;

export const TagCourseName = styled.span`
    color: rgba(217, 217, 217, 1);
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 11px;
    line-height: 13.31px;
    white-space: nowrap;
`;

export const RemoveTagButton = styled.button`
    background: none;
    border: none;
    color: rgba(108, 108, 114, 1);
    cursor: pointer;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding: 0;

    &:hover {
        color: rgba(128, 128, 134, 1);
    }
`;

export const EmptyResultWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const MagnifierCircle = styled.div`
    width: 58.66px;
    height: 58.66px;
    background-color: rgba(34, 34, 46, 1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const AddCourseList = styled.div`
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 1rem 0;
`;

export const AddCourseButtonContainer = styled.div`
    display: flex;
    gap: clamp(0.5rem, 2vw, 1rem);
    justify-content: flex-end;
    margin-top: auto;
`;

export const AddCourseCancelButton = styled.button`
    color: rgba(108, 108, 114, 1);
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: clamp(13px, 2vw, 15px);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    white-space: nowrap;
`;

export const AddCourseSaveButton = styled.button`
    width: clamp(80px, 15vw, 97.05px);
    height: clamp(35px, 6vh, 43.25px);
    background-color: rgba(167, 224, 217, 1);
    border: none;
    border-radius: 7px;
    color: #000000;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: clamp(13px, 2vw, 15px);
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
        opacity: 0.9;
    }
`;

export const SearchResultContainer = styled.div`
    width: 100%;
    height: 147.72px;
    background-color: rgba(24, 24, 34, 1);
    border-radius: 16px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 4px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(34, 34, 46, 1);
        border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(108, 108, 114, 1);
        border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: rgba(128, 128, 134, 1);
    }
`;

export const SearchResultItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0;
    position: relative;
    width: 100%;
    height: 30px;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: rgba(45, 45, 50, 1);
    }
`;

export const CourseTypeDot = styled.div<{ type: '전공' | '교양' }>`
    width: 14.75px;
    height: 13.16px;
    background-color: ${(props) => (props.type === '전공' ? 'rgba(224, 206, 167, 1)' : 'rgba(167, 180, 224, 1)')};
    border-radius: 50%;
    flex-shrink: 0;
`;

export const CourseInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
    min-width: 0;
`;

export const CourseSection = styled.span`
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 11px;
    line-height: 13.31px;
    white-space: nowrap;
    flex-shrink: 0;
`;

export const AddCourseButton = styled.button`
    width: 48.48px;
    height: 23.15px;
    background-color: rgba(34, 34, 46, 1);
    border: none;
    border-radius: 4px;
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 11px;
    line-height: 13.31px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding: 0;

    &:hover {
        background-color: rgba(44, 44, 56, 1);
    }
`;

export const SelectedCourseTag = styled.div`
    display: inline-flex;
    align-items: center;
    height: 35.67px;
    background-color: rgba(34, 34, 46, 1);
    border: 1px solid rgba(108, 108, 114, 1);
    border-radius: 5px;
    padding: 0 0.5rem;
    gap: 0.5rem;
    white-space: nowrap;
    width: fit-content;
    flex: 0 0 auto;
`;