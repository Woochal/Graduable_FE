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
    position: relative;
`;

export const HandbookBox = styled.div`
    width: 100%;
    height: 85%;
    background-color: rgba(34, 34, 46, 1);
    border-radius: 0.9375rem;
    display: flex;
    flex-direction: column;
    padding: 1.3rem 1.375rem;
    position: relative;
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

export const PDFContainer = styled.div`
    width: clamp(300px, 95%, 1000px);
    height: clamp(300px, calc(100% - 1.5rem), 650px);
    margin-top: clamp(0.25rem, 0.5vh, 0.75rem);
    border-radius: clamp(0.75rem, 1.5vw, 0.9375rem);
    overflow: hidden;
    align-self: center;
    display: flex;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

export const Button = styled.button`
    width: clamp(150px, 17vw, 175.4px);
    height: clamp(54px, 6vh, 64px);
    background-color: rgba(34, 34, 46, 1);
    border-radius: 0.9375rem;
    border: none;
    cursor: pointer;
    color: rgba(108, 108, 114, 1);
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: clamp(16px, 1.25rem, 20px);
    line-height: 1.21;
    text-align: center;
    position: absolute;
    left: 0;
    top: calc(85% + 20px);
    transition: all 0.3s ease;

    &:hover {
        background-color: rgba(44, 44, 56, 1);
        color: rgba(128, 128, 134, 1);
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    &:active {
        transform: translateY(1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
`;
