import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styled from 'styled-components';
import Joi from 'joi';
import {
  IonAlert,
  IonText,
  IonRow,
  IonCol,
  IonButton,
  IonSpinner,
  IonInput
} from '@ionic/react';
import { parseAPIError } from '@shared/error-parser';
import { FetchError } from '@features/fetch/fetch-types';
import { usePostLoginAccessToken } from '@features/auth/hooks';
import { saveZapierMerchant } from '@features/merchant/merchant-resolver';

type FormValues = {
  firstName: 'string';
  lastName: 'string';
  email: 'string';
  phone: 'string';
};

const Container = styled.div`
  width: var(--default-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 50px;

  @media screen and (max-width: 375px) {
    width: 100%;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

const StyledButton = styled(IonButton)`
  margin: 2em auto;

  ::part(native) {
    border-radius: 10px;
    background: var(--primary-color);
    text-transform: none;
  }
`;

const Heading = styled.div`
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  text-align: center;
  letter-spacing: 0.5px;
  margin-bottom: 30px;
`;

const LoginPage: React.FC = () => {
  const [loginError, setLoginError] = useState('');

  const { mutateAsync: doLogin, isPending: isLoading } = usePostLoginAccessToken();

  const schema = Joi.object({
    email: Joi.string().required()
  });

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors }
  } = useForm<FormValues>({
    resolver: joiResolver(schema)
  });

  const logInHandler = async (data: { email: string }) => {
    const payload = { email: data.email };

    try {
      await doLogin(payload);
      const zapierUrl = `${process.env.VITE_ZAPIER_UPDATE_LOGIN_HOOK_URL}`;

      await saveZapierMerchant(payload, zapierUrl);
    } catch (error: any) {
      setLoginError(parseAPIError(error.message, error?.status));
    }
  };

  return (
    <Container>
      <Heading>Welcome back!</Heading>

      <StyledForm onSubmit={handleSubmit(logInHandler)}>
        <Controller
          render={({ field: { onChange } }) => (
            <IonInput
              type="text"
              placeholder="Email (Required)"
              class="sign-up-default-input"

            />
          )}
          control={control}
          name="email"
          rules={{ required: true }}
        />
        <IonText color="danger">
          {formErrors.email && formErrors.email.message}
        </IonText>

        <IonRow>
          <IonCol>
            <StyledButton type="submit" expand="block" disabled={isLoading}>
              {isLoading && (
                <IonSpinner title="button-spinner" name="crescent" />
              )}
              Log in
            </StyledButton>
          </IonCol>
        </IonRow>
      </StyledForm>

      <IonAlert
        isOpen={Boolean(loginError)}
        header="Error logging in"
        message={loginError}
        buttons={['OK']}
        onDidDismiss={() => setLoginError('')}
      />
    </Container>
  );
};

export default LoginPage;
