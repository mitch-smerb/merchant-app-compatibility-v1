import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { IonAlert, IonSpinner } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { FetchError } from '@features/fetch/fetch-types';
import { usePostResetPasswordEmail } from '@features/reports-auth/hooks';
import {
  StyledPage,
  FormContainer,
  PlinkLogo,
  StyledButton,
  StyledForm,
  PageTitle,
  PageDescription,
  ContactUsLink
} from './styles';
import FormInput from '@pages/ReportsLogin/FormInput';
import { emails } from '@shared/constants';

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      '*': 'Invalid email'
    })
});

type FormValues = {
  email: string;
};

const ReportsRequestPasswordReset: React.FC = () => {
  const history = useHistory();

  const {
    mutateAsync: sendResetPasswordEmail,
    isPending: isLoading,
    error: sendResetPasswordError
  } = usePostResetPasswordEmail();

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: joiResolver(schema)
  });

  const handler: SubmitHandler<FormValues> = async (payload) => {
    const logInRes = await sendResetPasswordEmail(payload);

    if (!(logInRes && (logInRes as FetchError).errorCode)) {
      history.push({
        pathname: '/reports/success',
        state: {
          title: 'Password Reset Email Sent',
          description:
            'Instructions have been sent if there is an account associated with the email you provided.',
          goToSignInText: 'Return to Sign In'
        }
      });
    }
  };

  return (
    <StyledPage>
      <FormContainer>
        <PlinkLogo />
        <PageTitle>Password Reset</PageTitle>
        <PageDescription>
          Enter your email that you last used to sign in. If you don’t remember
          your email, please{' '}
          <ContactUsLink href={`mailto:${emails.contactUs}`}>
            contact us.
          </ContactUsLink>
        </PageDescription>
        <StyledForm onSubmit={handleSubmit(handler)}>
          <Controller
            render={({ field: { onChange }, fieldState: { error } }) => (
              <FormInput
                type="text"
                label="Email"
                placeholder="Enter your Email address"
                onIonInput={onChange}
                error={error?.message}
              />
            )}
            control={control}
            name="email"
            rules={{ required: true }}
          />

          <StyledButton type="submit" expand="block" disabled={isLoading}>
            {isLoading && <IonSpinner title="button-spinner" name="crescent" />}
            Reset Password
          </StyledButton>
        </StyledForm>
      </FormContainer>

      <IonAlert
        isOpen={!!sendResetPasswordError}
        header="Error"
        message="There was an error processing your request. Please try again later."
        buttons={['OK']}
      />
    </StyledPage>
  );
};

export default ReportsRequestPasswordReset;
