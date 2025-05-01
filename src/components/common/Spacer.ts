import styled from 'styled-components';

function getHeight({ axis, size }: { axis: string, size: number }): number {
  return axis === 'horizontal' ? 1 : size;
}

function getWidth({ axis, size }: { axis: string, size: number }): number {
  return axis === 'vertical' ? 1 : size;
}

const Spacer = styled.span<{ axis: string, size: number }>`
  display: block;
  width: ${({ axis, size }) => getWidth({ axis, size })}px;
  min-width: ${({ axis, size }) => getWidth({ axis, size })}px;
  height: ${({ axis, size }) => getHeight({ axis, size })}px;
  min-height: ${({ axis, size }) => getHeight({ axis, size })}px;
`;

export default Spacer;