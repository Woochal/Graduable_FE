import React from 'react';
import * as S from './components/styled';

export default function Curriculum() {
    return (
        <S.Container>
            <S.CurriculumBox>
                <S.Title>이수체계도 확인하기</S.Title>
                <S.ChartImage src="/curriculumchart.png" alt="이수체계도 차트" />
            </S.CurriculumBox>
        </S.Container>
    );
}
