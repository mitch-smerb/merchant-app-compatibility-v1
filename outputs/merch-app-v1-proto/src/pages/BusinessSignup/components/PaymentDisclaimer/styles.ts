import styled from 'styled-components';
import { colors } from '@pages/BusinessSignup/styles';

export const DisclaimerText = styled.p`
  font-family: 'Open Sans';
  font-size: 10px;
  color: ${colors.neutral[35]};
`;

export const DisclaimerLink = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer'
})`
  color: var(--color-plink);
`;
