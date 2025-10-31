import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { IonAlert, IonSpinner } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { parseAPIError } from '@shared/error-parser';
import { usePostReportsLogin } from '@features/reports-auth/hooks';
import {
  StyledPage,
  FormContainer,
  NavButton,
  PlinkLogo,
  StyledButton,
  StyledForm,
  ProvidedDataErrorMessage
} from './styles';
import { routes } from '@shared/constants';
import { ReportsLoginRequest } from '@features/reports-auth/reports-auth-types';
import FormInput from './FormInput';

type FormValues = ReportsLoginRequest;

const ReportsLoginPage: React.FC = () => {
  const history = useHistory();

  const { isPending: isLoading, error: doReportsError ,  mutateAsync: doReportsLogin } = usePostReportsLogin();

  const [unexpectedLoginError, setUnexpectedLoginError] = useState('');
  const [providedDataError, setProvidedDataError] = useState('');

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        '*': 'Invalid email'
      }),
    password: Joi.string().required().messages({
      '*': 'Invalid password'
    })
  });

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: joiResolver(schema)
  });

  const logInHandler: SubmitHandler<FormValues> = async (payload) => {
    setProvidedDataError('');

    try {
      await doReportsLogin(payload);
      history.push(routes.reportsHome);
    } catch (error: any) {
      const response = error?.response?.data?.message ?? error.message;
      if (error.status === 400) {
        setProvidedDataError(response);
      } else {
        setUnexpectedLoginError(parseAPIError(response, error.status));
      }
    }
  };

  return (
    <StyledPage>
      <FormContainer>
        <PlinkLogo />
        <StyledForm onSubmit={handleSubmit(logInHandler)}>
          <Controller
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormInput
                type="text"
                label="Email"
                placeholder="Enter your Email address"
                onIonInput={onChange}
                onIonChange={onChange}
                value={value}
                error={error?.message}
              />
            )}
            control={control}
            name="email"
            rules={{ required: true }}
          />
          <Controller
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={value}
                onIonInput={onChange}
                onIonChange={onChange}
                error={error?.message}
              />
            )}
            control={control}
            name="password"
            rules={{ required: true }}
          />

          {providedDataError.length > 0 && (
            <ProvidedDataErrorMessage>
              {providedDataError}
            </ProvidedDataErrorMessage>
          )}

          <StyledButton type="submit" expand="block" disabled={isLoading}>
            {isLoading && <IonSpinner title="button-spinner" name="crescent" />}
            Sign In
          </StyledButton>
        </StyledForm>

        <NavButton
          fill="clear"
          expand="block"
          onClick={() => history.push(routes.reportsRequestPasswordReset)}
        >
          Forgot password?
        </NavButton>
      </FormContainer>

      <IonAlert
        isOpen={Boolean(unexpectedLoginError)}
        header="Error logging in"
        message={unexpectedLoginError}
        buttons={['OK']}
        onDidDismiss={() => setUnexpectedLoginError('')}
      />
    </StyledPage>
  );
};

export default ReportsLoginPage;
