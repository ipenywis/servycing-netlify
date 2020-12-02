import React, { useState } from 'react';
import styled, { theme } from 'styles/styled-components';
import { DarkText, MutedText, GreyText, ErrorText } from 'components/text';
import { Button } from 'components/button';
import { Link } from 'components/link';
import { Form } from 'components/form';
import { FormRenderProps } from 'react-final-form';
import { FormGroup } from 'components/formGroup';
import { Input } from 'components/input';
import { InputTheme } from 'components/input/themes';
import { ButtonTheme } from 'components/button/themes';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { HorizontalWrapper } from 'components/horizontalWrapper';
import { FORMS } from 'finalForm/constants';
import FinalFormSpy from 'finalForm/finalFormSpy';
import { object, string } from 'yup';
import {
  STUDENT_USERNAME_REGX,
  FULLNAME_REGEX,
  PASSWORD_REGEX,
} from 'utils/regex';
import { setIn, FormApi } from 'final-form';
import messages from './messages';
import studentService from 'services/studentService';
import { IStudentRegisterDTO } from 'types/student';
import { useHistory } from 'react-router-dom';
import ROUTES from 'containers/ROUTES';
import { Card } from 'components/card';
import { prepareRouteWithParams } from 'utils/route';
import { validateForm } from 'utils/validation';

export interface ISignupBoxProps {}

const SignupBoxCard = styled(Card)`
  width: 26em;
  min-height: 45em;
  align-items: center;
  padding-top: 1.2em;
  margin-bottom: 1in;
`;

const FormWrapper = styled.div`
  width: 100%;
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
`;

const SubmitButton = styled(Button)`
  margin-top: 1em;
  padding-right: 1em;
  padding-left: 1em;
`;

const FooterContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-end;
  margin-top: 2em;
`;

const InfoContainer = styled(HorizontalWrapper)`
  :not(:last-of-type) {
    margin-bottom: 3px;
  }
`;

const InfoText = styled(GreyText)`
  font-weight: 400;
  font-size: 13px;
  margin-right: 5px;
`;

const LinkText = styled(Link)`
  font-size: 13px;
  color: ${theme.default.shinyBlue};
`;

const GithubButton = styled(Button)`
  width: 100%;
  margin-bottom: 1.5em;
  margin-top: 1.5em;
`;

const DetailsContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 14px;
`;

const SubmitError = styled(ErrorText)`
  font-size: 14px;
  font-weight: 500;
`;

const OrSeperator = styled(MutedText)`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 17px;
`;

const validationSchema = object({
  fullName: string()
    .trim()
    .matches(FULLNAME_REGEX, messages.invalidName)
    .required(messages.nameRequired),
  username: string()
    .trim()
    .matches(STUDENT_USERNAME_REGX, messages.invalidUsername)
    .required(messages.usernameRequired),
  email: string()
    .trim()
    .email(messages.invalidEmail)
    .required(messages.emailRequired),
  password: string()
    .trim()
    .matches(PASSWORD_REGEX, messages.invalidPassword)
    .required(messages.passwordRequired),
});

export function SignupBox(props: ISignupBoxProps) {
  const [error, setError] = useState<string | null>(null);

  const history = useHistory();

  const onSubmit = async (values: any, form: FormApi<any>): Promise<any> => {
    setError(null);

    const data: IStudentRegisterDTO = {
      fullName: values.fullName,
      username: values.username,
      email: values.email,
      password: values.password,
    };
    const student = await studentService.register(data).catch(err => {
      setError(err.message);
    });

    if (student)
      history.push(
        prepareRouteWithParams(ROUTES.verifyStudentEmailPage, student.id),
      );
  };

  return (
    <SignupBoxCard title="Signup" centerTitle>
      <GithubButton
        buttonTheme={ButtonTheme.BLACK}
        text="Signup with Github"
        icon={faGithub}
        iconSize="lg"
        iconPosition="left"
      />
      <FormWrapper>
        <Form
          onSubmit={onSubmit}
          validate={values => validateForm(validationSchema, values)}
          validateOnBlur={false}
        >
          {({
            submitting,
            dirtySinceLastSubmit,
            hasSubmitErrors,
          }: FormRenderProps) => (
            <FormContainer>
              <DetailsContainer>
                {!error && <OrSeperator bold>OR</OrSeperator>}
                {error && <SubmitError>{error}</SubmitError>}
              </DetailsContainer>
              <FinalFormSpy form={FORMS.SIGNUP_FORM} />
              <FormGroup label="FULL NAME">
                <Input
                  name="fullName"
                  inputTheme={InputTheme.INLINE_MINIMAL}
                  placeholder="Your Name"
                  clearPlaceholderOnFocus
                />
              </FormGroup>
              <FormGroup label="USERNAME">
                <Input
                  name="username"
                  inputTheme={InputTheme.INLINE_MINIMAL}
                  placeholder="Your Username"
                  clearPlaceholderOnFocus
                />
              </FormGroup>
              <FormGroup label="EMAIL">
                <Input
                  name="email"
                  inputTheme={InputTheme.INLINE_MINIMAL}
                  placeholder="example@mail.com"
                  clearPlaceholderOnFocus
                  type="email"
                />
              </FormGroup>
              <FormGroup label="PASSWORD">
                <Input
                  name="password"
                  inputTheme={InputTheme.INLINE_MINIMAL}
                  placeholder="Strong Password"
                  clearPlaceholderOnFocus
                  type="password"
                />
              </FormGroup>
              <BottomContainer>
                <SubmitButton
                  text="Signup"
                  buttonTheme={ButtonTheme.PRIMARY_SOLID}
                  size={14}
                  type="submit"
                  isLoading={submitting}
                  disabled={hasSubmitErrors && !dirtySinceLastSubmit}
                />
              </BottomContainer>
            </FormContainer>
          )}
        </Form>
      </FormWrapper>
      <FooterContainer>
        <InfoContainer>
          <InfoText>Already have an account?</InfoText>
          <LinkText to={ROUTES.loginPage}>Login</LinkText>
        </InfoContainer>
        <InfoContainer>
          <InfoText>Forgot your password?</InfoText>
          <LinkText to="#">Recovert it</LinkText>
        </InfoContainer>
      </FooterContainer>
    </SignupBoxCard>
  );
}
