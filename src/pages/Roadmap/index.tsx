import { useState } from 'react';
import {
    Container,
    Header,
    Title,
    Legend,
    LegendItem,
    LegendBox,
    LegendText,
    EditButton,
    ContentBox,
    SemesterGrid,
    SemesterCard,
    CourseList,
    CourseItem,
    CourseTypeIndicator,
    CourseName,
    TotalCredits,
    SemesterTitle,
    AddButton,
    AddButtonContainer,
    DeleteButton,
    ModalOverlay,
    ModalContent,
    ModalTitle,
    ModalMessage,
    ModalButtons,
    ModalButton,
} from './components/styled';
import type { Semester } from '../../types/roadmap';
import { semesterData } from '../../types/roadmap';

const Roadmap = () => {
    const [semesters, setSemesters] = useState<Semester[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [semesterToDelete, setSemesterToDelete] = useState<Semester | null>(null);

    const handleAddSemester = () => {
        if (semesters.length < semesterData.length) {
            setSemesters((prev) => [...prev, semesterData[semesters.length]]);
        }
    };

    const handleDeleteClick = (semester: Semester) => {
        setSemesterToDelete(semester);
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (semesterToDelete) {
            setSemesters((prev) => prev.filter((s) => s.id !== semesterToDelete.id));
            setDeleteModalOpen(false);
            setSemesterToDelete(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteModalOpen(false);
        setSemesterToDelete(null);
    };

    const totalGridCells = Math.max(8, semesters.length + 1);

    return (
        <Container>
            <Header>
                <Title>학기별 로드맵</Title>
                <Legend>
                    <LegendItem>
                        <LegendBox color="rgba(224, 206, 167, 1)" />
                        <LegendText>전공</LegendText>
                    </LegendItem>
                    <LegendItem>
                        <LegendBox color="rgba(167, 180, 224, 1)" />
                        <LegendText>교양</LegendText>
                    </LegendItem>
                </Legend>
                <EditButton onClick={() => setIsEditMode(!isEditMode)}>{isEditMode ? '완료' : '수정하기'}</EditButton>
            </Header>
            <ContentBox>
                <SemesterGrid>
                    {Array(totalGridCells)
                        .fill(null)
                        .map((_, index) => {
                            const semester = semesters[index];
                            if (!semester) {
                                return index === semesters.length ? (
                                    <AddButtonContainer key="add-button-container">
                                        <AddButton onClick={handleAddSemester} />
                                    </AddButtonContainer>
                                ) : (
                                    <div key={`empty-${semesters.length}-${index}`} />
                                );
                            }
                            return (
                                <div
                                    key={semester.id}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        position: 'relative',
                                    }}
                                >
                                    {isEditMode && <DeleteButton onClick={() => handleDeleteClick(semester)} />}
                                    <SemesterCard>
                                        <CourseList>
                                            {semester.courses.map((course) => (
                                                <CourseItem key={`${semester.id}-${course.name}`} type={course.type}>
                                                    <CourseTypeIndicator type={course.type} />
                                                    <CourseName>
                                                        [{course.credits}] {course.name}
                                                    </CourseName>
                                                </CourseItem>
                                            ))}
                                        </CourseList>
                                        <TotalCredits>
                                            총 {semester.courses.reduce((sum, course) => sum + course.credits, 0)}학점
                                        </TotalCredits>
                                    </SemesterCard>
                                    <SemesterTitle>{semester.title}</SemesterTitle>
                                </div>
                            );
                        })}
                </SemesterGrid>
            </ContentBox>
            {deleteModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalTitle>로드맵 삭제하기</ModalTitle>
                        <ModalMessage>{semesterToDelete?.title} 로드맵을 삭제하시겠습니까?</ModalMessage>
                        <ModalButtons>
                            <ModalButton variant="cancel" onClick={handleDeleteCancel}>
                                취소하기
                            </ModalButton>
                            <ModalButton variant="delete" onClick={handleDeleteConfirm}>
                                삭제하기
                            </ModalButton>
                        </ModalButtons>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};

export default Roadmap;
