import styled from 'styled-components';

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

export const ChartImage = styled.img`
    width: min(65vw, 907.81px);
    height: min(45vh, 612.21px);
    border-radius: 0.875rem;
    transform: scale(1.04, 1.07);
    transform-origin: center;
    margin: 0 auto;
    flex: 1;
    object-fit: contain;
`;
