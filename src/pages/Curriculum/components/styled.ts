import styled, { keyframes } from 'styled-components';

const glowAnimation = keyframes`
    0% {
        box-shadow: 
            0 0 5px rgba(74, 144, 226, 0.7),
            0 0 10px rgba(74, 144, 226, 0.7),
            0 0 15px rgba(74, 144, 226, 0.7),
            inset 0 0 5px rgba(74, 144, 226, 0.7);
        opacity: 0.8;
    }
    50% {
        box-shadow: 
            0 0 10px rgba(74, 144, 226, 0.4),
            0 0 20px rgba(74, 144, 226, 0.4),
            0 0 30px rgba(74, 144, 226, 0.4),
            inset 0 0 10px rgba(74, 144, 226, 0.4);
        opacity: 0.5;
    }
    100% {
        box-shadow: 
            0 0 5px rgba(74, 144, 226, 0.7),
            0 0 10px rgba(74, 144, 226, 0.7),
            0 0 15px rgba(74, 144, 226, 0.7),
            inset 0 0 5px rgba(74, 144, 226, 0.7);
        opacity: 0.8;
    }
`;

export const Container = styled.div`
    width: min(calc(100% - 14rem), 984.49px);
    height: calc(100vh - 5.5vh - 2rem);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 14rem;
    padding-top: 5.5vh;
    box-sizing: border-box;
    overflow: hidden;
`;

export const CurriculumBox = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(34, 34, 46, 1);
    border-radius: 0.9375rem;
    display: flex;
    flex-direction: column;
    padding: 1.3rem 1.375rem;
`;

export const Title = styled.h1`
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 1.5rem;
    text-align: left;
    width: 100%;
    margin-bottom: 1.57rem;
`;

export const ChartContainer = styled.div`
    position: relative;
    width: min(65vw, 907.81px);
    height: min(45vh, 612.21px);
    margin: 0 auto;
    flex: 1;
`;

export const ChartImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 0.875rem;
    transform: scale(1.04, 1.07);
    transform-origin: center;
    object-fit: contain;
`;

export const SubjectHighlight = styled.div<{ x: number; y: number }>`
    position: absolute;
    left: ${(props) => props.x}px;
    top: ${(props) => props.y}px;
    width: 60px;
    height: 40px;
    pointer-events: none;
    z-index: 2;
    background: rgba(74, 144, 226, 0.05);
    border-radius: 12px;
    animation: ${glowAnimation} 2s infinite;
    transform: translate(-50%, -50%);
    backdrop-filter: blur(1px);
`;
