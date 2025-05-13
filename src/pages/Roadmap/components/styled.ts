import styled from 'styled-components';

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

export const SemesterCard = styled.div`
    width: 212px;
    height: 250px;
    background-color: rgba(24, 24, 34, 1);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
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
    min-height: 0;
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

export const AddButtonContainer = styled.div`
    width: 212px;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const AddButton = styled.button`
    width: clamp(80px, 8vw, 99.48px);
    height: clamp(80px, 8vw, 99.48px);
    background-color: rgba(24, 24, 34, 1);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;

    &::before,
    &::after {
        content: '';
        position: absolute;
        background-color: rgba(108, 108, 114, 1);
        border-radius: 2px;
    }

    &::before {
        width: clamp(25px, 3vw, 39.67px);
        height: 2px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    &::after {
        width: 2px;
        height: clamp(25px, 3vw, 39.67px);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    &:hover {
        background-color: rgba(34, 34, 44, 1);
        transform: scale(1.05);

        &::before,
        &::after {
            background-color: rgba(128, 128, 134, 1);
        }
    }
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
`;

export const ModalMessage = styled.p`
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 20px;
    line-height: 1.21;
    margin: 0;
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
