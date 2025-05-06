import React from 'react';
import * as S from './components/styled';
import { SUBJECTS } from './types';

export default function Curriculum() {
    return (
        <S.Container>
            <S.CurriculumBox>
                <S.Title>이수체계도 확인하기</S.Title>
                <S.ChartContainer>
                    <S.ChartImage src="/curriculumchart.png" alt="이수체계도 차트" />
                    {SUBJECTS.map((subject) => (
                        <S.SubjectHighlight key={subject.id} x={subject.position.x} y={subject.position.y} />
                    ))}
                </S.ChartContainer>
            </S.CurriculumBox>
        </S.Container>
    );
}
