import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: calc(100vh - 5.5vh - 2rem);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 5.5vh;
    margin-left: 2rem;
    box-sizing: border-box;
    overflow: hidden;
`;

export const CurriculumBox = styled.div`
    width: 94%;
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
