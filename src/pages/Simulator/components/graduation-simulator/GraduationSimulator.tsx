import React from 'react';
import * as S from '../styled';
import { useNavigate } from 'react-router-dom';
import SimulationFilter from './SimulationFilter';
import SimulationResult from './SimulationResult';
const GraduationSimulator = () => {
  
  const navigate = useNavigate();


  return (
    <S.GraduationSimulatorContainer>
      <SimulationFilter/>
      <SimulationResult/>
    </S.GraduationSimulatorContainer>
  );
};

export default GraduationSimulator;
