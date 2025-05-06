import { Container, HandbookBox, Title, Button, PDFContainer } from './components/styled';

const CourseHandbook: React.FC = () => {
    return (
        <Container>
            <HandbookBox>
                <Title>현 학기 (25-1) 수강편람 확인하기</Title>
                <PDFContainer>
                    <embed
                        src="/coursehandbook.pdf#toolbar=0&navpanes=0"
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
