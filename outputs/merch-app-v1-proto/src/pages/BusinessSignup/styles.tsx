import styled from 'styled-components';
import { IonButton, IonContent, IonInput, IonPage } from '@ionic/react';
import logo from '@assets/images/plink-logo-dark-mode.svg';

export const colors = {
  primary: {
    30: '#354FBE'
  },
  secondary: {
    25: '#3590F2',
    30: '#419BF9'
  },
  neutral: {
    35: '#616B89',
    40: '#626C88',
    70: '#BDBDBD',
    80: '#DDE4EA',
    85: '#E6EBEF',
    90: '#F0F4F9',
    100: '#fff'
  },
  helpers: {
    success: {
      20: '#018B6B',
      50: '#38CCC0'
    },
    error: {
      40: '#ff0000',
      50: '#ff6478',
      90: '#fff6f6'
    }
  }
};

export const StyledPage = styled(IonPage)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.neutral[100]};
`;

export const StyledContent = styled(IonContent)`
  --overflow: hidden;
  width: 755px;
  max-height: 90vh;
  border-radius: 16px;
  background: ${colors.neutral[100]};
  box-shadow: 0px 22px 54px rgba(97, 107, 137, 0.16);
  margin: auto 0;

  ::part(scroll) {
    display: flex;
    flex-direction: column;
  }

  @media only screen and (max-width: 755px) {
    width: 100vw;
    max-height: 100vh;
  }
`;

const CompanyLogo = styled.img<{ isUpgradePage?: boolean }>`
  width: 15%;
  height: auto;
  margin: ${({ isUpgradePage }) =>
    isUpgradePage ? '40px 0 10px 0' : '40px 0'};

  @media only screen and (max-width: 755px) {
    width: 15%;
    margin: 10px 0;
  }
`;

export const HeaderContainer = styled.div`
  background-color: ${colors.primary[30]};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const UpgradeThumbnail = styled.span`
  background-color: ${colors.neutral[90]};
  margin-bottom: 40px;
  padding: 5px 10px;
  border-radius: 15px;

  color: ${colors.primary[30]};
  font-size: 14px;
  font-family: 'Montserrat Bold';
`;

interface HeaderProps {
  // eslint-disable-next-line
  isUpgradePage?: boolean;
}

export const Header = ({ isUpgradePage }: HeaderProps) => {
  return (
    <HeaderContainer>
      <CompanyLogo src={logo} alt="Plink Logo" isUpgradePage={isUpgradePage} />
      {isUpgradePage && <UpgradeThumbnail>Account Upgrade</UpgradeThumbnail>}
    </HeaderContainer>
  );
};

export const ErrorMessageContainer = ({
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="bg-danger-bg rounded-b-lg border-1 border-danger-plink" {...rest}>
    {children}
  </div>
)

export const ErrorMessage = ({
  children,
  ...rest
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className="font-open text-[14px] sm:text-2 text-danger-plink text-center py-2 px-6" {...rest}>
    {children}
  </p>
)

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 60px;
  padding-top: 30px;

  overflow: auto;
  overflow-x: hidden;

  @media only screen and (max-width: 755px) {
    padding: 30px;
    padding-top: 15px;
    max-height: 95vh;
  }
`;

export const FormSectionTitle = styled.p`
  color: ${colors.neutral[35]};
  font-size: 20px;
  font-family: 'Montserrat Bold';
`;

interface StyledInputProps {
  error?: boolean;
}

export const StyledInput = styled(IonInput) <StyledInputProps>`
  border: 0;
  border-bottom: 1px solid ${colors.neutral[80]};
  border-radius: 0;

  padding-left: 0;

  font-family: 'Open Sans';
  font-size: 16px;
  padding-inline-start: 0;

  background: ${colors.neutral[100]};
  margin-bottom: 15px;
  --padding-start: 0px;

  color: ${({ error }) =>
    error ? colors.helpers.error[40] : colors.neutral[35]};

  ::placeholder {
    font-size: 16px;
    font-family: 'Open Sans';

    --placeholder-color: ${({ error }) =>
    error ? colors.helpers.error[40] : colors.neutral[35]};
  }
`;

export const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  :not(:last-child) {
    margin-bottom: 25px;
  }

  @media only screen and (max-width: 755px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const OrderItemLabel = styled.p`
  color: ${colors.neutral[40]};
  font-size: 18px;
  font-family: 'Montserrat Bold';
  margin: 0;

  @media only screen and (max-width: 755px) {
    margin-bottom: 3px;
  }
`;

export const OrderItemValue = styled.p`
  color: ${colors.neutral[40]};
  font-size: 20px;
  font-family: 'Open Sans SemiBold';
  margin: 0;
`;

export const OrderItemSuccessValue = styled(OrderItemValue)`
  color: ${colors.helpers.success[20]};
`;

export const YourPriceContainer = styled.div`
  margin: 25px -35px 30px;
  padding: 20px 35px;
  background-color: ${colors.neutral[90]};

  @media only screen and (max-width: 755px) {
    margin: 25px -30px 30px;
    padding: 30px;
  }
`;

export const StyledButton = styled(IonButton)`
  margin: 50px auto 30px;
  width: 50%;
  --padding-top: 25px;
  --padding-bottom: 25px;

  font-family: 'Montserrat Medium';
  font-size: 20px;
  text-transform: capitalize;
`;

interface ButtonSubmitProps {
  disabled: boolean;
  title?: string;
}

export const ButtonSubmit = ({ disabled, title = 'Submit' }: ButtonSubmitProps) => (
  <button
    disabled={disabled}
    className="!font-mont-medium text-[20px] bg-plink hover:bg-plink-hover duration-200 ease-in-out text-white-plink w-[50%] !rounded-full !py-[15px]"
    type="submit"
  >
    {title}
  </button>
)

export const DynamicRow = styled.div`
  display: flex;

  & > :not(:last-child) {
    margin-right: 20px;
  }

  @media only screen and (max-width: 755px) {
    flex-direction: column;

    & > :not(:last-child) {
      margin-right: 0px;
    }
  }
`;

export const Row = styled.div`
  display: flex;

  & > :not(:last-child) {
    margin-right: 20px;
  }

  @media only screen and (max-width: 755px) {
    & > :not(:last-child) {
      margin-right: 10px;
    }
  }
`;
