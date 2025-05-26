import React from 'react';
import * as S from './components/styled';
import curriculumChart from '../../assets/curriculumchart.png';

export default function Curriculum() {
    return (
        <S.Container>
            <S.CurriculumBox>
                <S.Title>이수체계도 확인하기</S.Title>
                <S.ChartContainer>
                    <S.ChartImage src={curriculumChart} alt="이수체계도 차트" />
                </S.ChartContainer>
            </S.CurriculumBox>
        </S.Container>
    );
}
