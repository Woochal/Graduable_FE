import React from 'react';
import { Container, HandbookBox, Title, PDFContainer } from './components/styled';
import courseHandbookPng from '/coursehandbook.png?url';

const CourseHandbook = () => {
    return (
        <Container>
            <HandbookBox>
                <Title>현 학기 (25-1) 수강편람 확인하기</Title>
                <PDFContainer>
                    <img
                        src={courseHandbookPng}
                        alt="수강편람"
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxWidth: '100%',
                            display: 'block',
                        }}
                    />
                </PDFContainer>
            </HandbookBox>
        </Container>
    );
};

export default CourseHandbook;
