// components/InitialSetup/GraduationInfo.tsx
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import spinner from "../../../assets/spinner.png";
import check from "../../../assets/check.png";
const Container = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  width: 57.7703vw;
  height: 52.5211vw;
  padding: 3rem 2rem;
  background: ${(props) => props.theme.color.bgCard};
`;

const Title = styled.div`
  color: #fff;
  font-size:${(props) => props.theme.typography.header.fontSize};
  font-weight: ${(props) => props.theme.typography.header.fontWeight};
  margin-left: 2rem;
`;

const Subtitle = styled.div`
   color: ${(props) => props.theme.color.highlightGray};
    font-size: ${(props) => props.theme.typography.title.fontSize};
    font-weight: ${(props) => props.theme.typography.contentRegular.fontWeight};
    margin-left: 2rem;
`;

const StepContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const StepItem = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
`;

const StepCOntent = styled.div`
    display: flex;
`;

const StepNumber = styled.div`
  color: #fff;
  font-size: 1.2rem;
  font-weight: 600;
`;

const StepTitle = styled.div`
    margin-left: 0.5rem;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 400;
`;

const StepDescription = styled.p`
  color: ${(props) => props.theme.color.highlightGray};
  margin-left: 2.5rem;
  font-size: ${(props) => props.theme.typography.subtitleb.fontSize};
  font-weight: ${(props) => props.theme.typography.subtitleb.fontWeight};
`;
const StepDescription1 = styled.p`
  color: ${(props) => props.theme.color.highlightOrange};
  margin-left: 0.4rem;
  font-size: ${(props) => props.theme.typography.subtitleb.fontSize};
  font-weight: ${(props) => props.theme.typography.subtitleb.fontWeight};
`;
const ActionButtons = styled.div`
  color: #888;
background:${(props) => props.theme.color.bgDefault};
padding: 0.5rem 1rem;
border-radius: 8px;
  display: flex;
  gap: 1rem;
  margin-left: 2.5rem;
  margin-top: 0.5rem;
`;

const StepButton = styled.button`
  padding: 0.6rem 1.5rem;
  background-color: #2B2C38;
  color: #fff;
  border: 1px solid #3A3B47;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #3A3B47;
    border-color: #4A4B57;
  }
`;

const TextAreaWrapper = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  background-color: #1C1D27;
  color: #fff;
  border:none;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
    
  &:focus {
    outline: none;
    border:none;
  } 
  &::placeholder {
    color: #666;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
    margin-left: 27vw;
  justify-content: center;
`;

const Button = styled.button<{ $primary?: boolean; $disabled?: boolean }>`
  padding: 0.75rem 2.5rem;
  background-color: ${(props) => {
		if (props.$disabled) return "#3A3B47";
		return props.$primary ? "#9BDAC9" : "#3A3B47";
	}};
  color: ${(props) => {
		if (props.$disabled) return "#666";
		return props.$primary ? "#000" : "#fff";
	}};
  margin-left: 12.5vw;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  opacity: ${(props) => (props.$disabled ? 0.6 : 1)};
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    opacity: 0.9;
  }
`;

// 로딩 오버레이 스타일
const LoadingOverlay = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  visibility: ${(props) => (props.$visible ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  border-radius: 15px;
`;

// 스피너 애니메이션
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  animation: ${spin} 2s linear infinite;
  margin-bottom: 2rem;
`;

const LoadingText = styled.div`
  color: #fff;
  font-size: ${(props) => props.theme.typography.header.fontSize};
  font-weight: ${(props) => props.theme.typography.header.fontWeight};
  text-align: center;
`;

const LoadingSubText = styled.div`
  color: #fff;
  font-size: ${(props) => props.theme.typography.header.fontSize};
  font-weight: ${(props) => props.theme.typography.header.fontWeight};
  text-align: center;
`;

// 성공 상태 스타일
const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CheckIcon = styled.img`
  width: 160px;
  height: 160px;

`;

const SuccessText = styled.div`
width: 100%;
  color: #fff;
  margin-top: 1rem;
  font-size: ${(props) => props.theme.typography.header.fontSize};
  font-weight: ${(props) => props.theme.typography.header.fontWeight};
  text-align: center;
`;

interface GraduationInfoProps {
	onComplete: (text?: string) => void;
	onSkip?: () => Promise<void>;
}

export default function GraduationInfo({
	onComplete,
	onSkip,
}: GraduationInfoProps) {
	const [graduationText, setGraduationText] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async () => {
		if (!graduationText.trim()) {
			alert("졸업심사 결과를 붙여넣기 해주세요.");
			return;
		}

		setLoading(true);

		// 실제 API 호출을 시뮬레이션하기 위한 지연
		await new Promise((resolve) => setTimeout(resolve, 2000));

		// 성공 상태 표시
		setLoading(false);
		setSuccess(true);

		// 잠시 성공 메시지를 보여준 후 완료 처리
		setTimeout(() => {
			onComplete?.(graduationText);
		}, 1500);
	};

	const handleSkip = () => {
		onSkip?.();
	};

	return (
		<>
			<Container>
				<Box>
					<Title>회원님의 졸업 심사 결과를 알려주세요.</Title>
					<Subtitle>
						졸업 심사 결과를 알려주시면, 알려주신 정보를 바탕으로 맞춤 세팅
						해드릴게요.
					</Subtitle>

					<StepContainer>
						<StepItem>
							<StepCOntent>
								<StepNumber>1.</StepNumber>
								<StepTitle>
									히즈넷에 로그인 한 뒤, '내 졸업 심사 정보로 이동하기'를
									클릭해주세요.
								</StepTitle>
							</StepCOntent>
							<ActionButtons>
								학사정보 → 졸업 → 졸업심사결과조회 → 졸업심사결과보기
							</ActionButtons>
						</StepItem>

						<StepItem>
							<StepCOntent>
								<StepNumber>2.</StepNumber>
								<StepTitle>
									해당 페이지에서 전체 선택 후 복사를 해주세요.
								</StepTitle>
							</StepCOntent>
							<StepDescription>
								좌우 메뉴, 불필요한 것 같은 정보들이 포함되어도 괜찮아요. 전체
								선택 후 복사해주세요.
							</StepDescription>
							<div style={{ display: "flex", flexDirection: "row" }}>
								<StepDescription>
									Graduable이 필요한 정보만 불러올게요!
								</StepDescription>
								<StepDescription1>
									(일부 정보가 누락될 수 있으니, 꼭 확인해주세요 !)
								</StepDescription1>
							</div>
						</StepItem>

						<StepItem>
							<StepCOntent>
								<StepNumber>3.</StepNumber>
								<StepTitle>아래 칸에 그대로 불여넣기 해주세요.</StepTitle>
							</StepCOntent>
							<TextAreaWrapper>
								<TextArea
									placeholder="히즈넷에서 복사한 졸업심사 결과를 여기에 붙여넣기 해주세요."
									value={graduationText}
									onChange={(e) => setGraduationText(e.target.value)}
								/>
							</TextAreaWrapper>

							<ButtonContainer>
								{/* <Button onClick={handleSkip}>건너뛰기</Button> */}
								<Button
									$primary
									$disabled={!graduationText.trim() || loading}
									onClick={handleSubmit}
									disabled={!graduationText.trim() || loading}
								>
									정보 불러오기
								</Button>
							</ButtonContainer>
						</StepItem>
					</StepContainer>
				</Box>
			</Container>
			{/* 로딩 오버레이 */}
			<LoadingOverlay $visible={loading}>
				<Spinner src={spinner} />
				<LoadingText>필요한 정보를 불러오고 있어요.</LoadingText>
				<LoadingSubText>조금만 기다려주세요!</LoadingSubText>
			</LoadingOverlay>

			{/* 성공 오버레이 */}
			<LoadingOverlay $visible={success}>
				<SuccessContainer>
					<CheckIcon src={check} />
					<SuccessText>정보를 모두 불러왔어요!</SuccessText>
				</SuccessContainer>
			</LoadingOverlay>
		</>
	);
}
