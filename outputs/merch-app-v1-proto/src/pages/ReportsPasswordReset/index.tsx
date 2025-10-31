import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { IonAlert, IonSpinner } from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import { FetchError } from '@features/fetch/fetch-types';
import { useResetPassword } from '@/features/reports-auth/hooks';
import {
  StyledPage,
  FormContainer,
  PlinkLogo,
  StyledButton,
  StyledForm,
  PageTitle,
  PageDescription,
  ResponseErrorMessage
} from './styles';
import FormInput from '@pages/ReportsLogin/FormInput';

const schema = Joi.object({
  password: Joi.string()
    .required()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .messages({
      '*': 'Minimum 8 characters: 1 capital, 1 lowercase, 1 number'
    }),
  passwordConfirmation: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .messages({
      '*': 'The passwords do not match'
    })
});

type FormValues = {
  password: string;
  passwordConfirmation: string;
};

const ReportsPasswordReset: React.FC = () => {
  const history = useHistory();
  const params = useParams<{ token: string }>();

  const { mutateAsync: resetPassword, isPending: isLoading } = useResetPassword();

  const { control, handleSubmit, formState } = useForm<FormValues>({
    resolver: joiResolver(schema)
  });

  const [unexpectedError, setUnexpectedError] = useState(false);
  const [providedDataError, setProvidedDataError] = useState('');

  const handler: SubmitHandler<FormValues> = async (payload) => {
    setProvidedDataError('');

    const res = await resetPassword({
      payload: { password: payload.password },
      headers: { Authorization: params.token }
    });

    if (!(res && (res as FetchError).errorCode)) {
      history.push({
        pathname: '/reports/success',
        state: {
          title: 'Your Password has been Reset'
        }
      });
    } else if (res.statusCode === 403) {
      setProvidedDataError(
        'Your link expired. Please return home and try again.'
      );
    } else {
      setUnexpectedError(true);
    }
  };

  return (
    <StyledPage>
      <FormContainer>
        <PlinkLogo />
        <PageTitle>Create a New Password</PageTitle>
        <PageDescription>
          Please enter a new password that you would like to use.
        </PageDescription>
        <StyledForm onSubmit={handleSubmit(handler)}>
          <Controller
            render={({ field: { onChange }, fieldState: { error } }) => (
              <FormInput
                label="Enter New Password"
                type="password"
                placeholder="Enter your new password"
                onIonInput={onChange}
                error={error?.message}
              />
            )}
            control={control}
            name="password"
            rules={{ required: true }}
          />
          <Controller
            render={({ field: { onChange }, fieldState: { error } }) => (
              <FormInput
                label="Confirm New Password"
                type="password"
                placeholder="Enter your new password again"
                onIonInput={onChange}
                error={error?.message}
              />
            )}
            control={control}
            name="passwordConfirmation"
            rules={{ required: true }}
          />

          {providedDataError.length > 0 && (
            <ResponseErrorMessage
              hasInputErrorAbove={'passwordConfirmation' in formState.errors}
            >
              {providedDataError}
            </ResponseErrorMessage>
          )}

          <StyledButton
            type="submit"
            expand="block"
            disabled={isLoading}
            hasErrors={
              'password' in formState.errors ||
              'passwordConfirmation' in formState.errors ||
              providedDataError.length > 0
            }
          >
            {isLoading && <IonSpinner title="button-spinner" name="crescent" />}
            Submit Password
          </StyledButton>
        </StyledForm>
      </FormContainer>

      <IonAlert
        isOpen={unexpectedError}
        header="Error"
        message="There was an error processing your request. Please try again later."
        buttons={['OK']}
        onDidDismiss={() => setUnexpectedError(false)}
      />
    </StyledPage>
  );
};

export default ReportsPasswordReset;
