import React from 'react';
import * as S from '../styled';
import { RemainingCreditType } from '../../../../types';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useTheme } from 'styled-components';
import Spacer from '../../../../components/common/Spacer';


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);



const CreditDonut = ( creditData: RemainingCreditType ) => {

  const theme = useTheme();

  const { totalCredit, attendedCredit, leftCreditPercent, attendedCreditPercent } = creditData;


  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    cutout: '80%', 
    maintainAspectRatio: false,
    circumference: 360, 
  };

  const data = {
    labels: ['이수', '미이수'],
    datasets: [
      {
        data: [attendedCredit, totalCredit - attendedCredit],
        backgroundColor: [
          theme.color.primary,
          'rgba(0, 0, 0, 0)', 
        ],
        borderWidth: 0,
      },
    ],
  };
 

  return (
    <S.CreditDonutContainer>
      <S.CreditDonut>
        <Doughnut options={options} data={data} />
      </S.CreditDonut>
      <S.CreditDonutText>
        <Spacer size={10} axis="horizontal" />
        {attendedCreditPercent.toFixed(0)}%
      </S.CreditDonutText>
    </S.CreditDonutContainer>
  );
};

export default CreditDonut;
