import React from 'react';
import { Container, HandbookBox, Title, Button, PDFContainer } from './components/styled';

const CourseHandbook = () => {
    return (
        <Container>
            <HandbookBox>
                <Title>현 학기 (25-1) 수강편람 확인하기</Title>
                <PDFContainer>
                    <embed
                        src="https://port-0-graduable2-maf90lxef3d859f7.sel4.cloudtype.app/view-pdf"
                        type="application/pdf"
                        width="100%"
                        height="100%"
                    />
                </PDFContainer>
            </HandbookBox>
            <Button>← 이전 학기</Button>
        </Container>
    );
};

export default CourseHandbook;
