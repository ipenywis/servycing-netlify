import React, { useState } from 'react';
import styled, { theme } from 'styles/styled-components';
import { MutedText, GreyText, ErrorText } from 'components/text';
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
import { setIn, FormApi } from 'final-form';
import messages from './messages';
import studentService from 'services/studentService';
import { IStudentRegisterDTO, IStudentLoginDTO } from 'types/student';
import { useHistory } from 'react-router-dom';
import ROUTES from 'containers/ROUTES';
import { Card } from 'components/card';
import { prepareRouteWithParams } from 'utils/route';
import { Dispatch } from 'redux';
import { studentAuthenticated } from 'containers/Authentication/actions';
import { useDispatch } from 'react-redux';
import { validateForm } from 'utils/validation';

export interface ILoginBoxProps {}

const LoginCard = styled(Card)`
  width: 23em;
  min-height: 24em;
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
  username: string().trim().required(messages.emailOrUsernameRequired),
  password: string().trim().required(messages.passwordRequired),
});

const ActionsDispatcher = (dispatch: Dispatch) => ({
  studentAuthenticated: (token: string) =>
    dispatch(studentAuthenticated(token)),
});

export function LoginBox(props: ILoginBoxProps) {
  const [error, setError] = useState<string | null>(null);

  const history = useHistory();

  const { studentAuthenticated } = ActionsDispatcher(useDispatch());

  const onSubmit = async (values: any, form: FormApi<any>): Promise<any> => {
    setError(null);

    const data: IStudentLoginDTO = {
      username: values.username,
      password: values.password,
    };
    const student = await studentService.login(data).catch(err => {
      setError(err.message);
    });

    if (student) {
      studentAuthenticated(student.access_token as string);
      history.push(ROUTES.browseCoursesPage);
    }
  };

  return (
    <LoginCard title="Login" centerTitle>
      <GithubButton
        buttonTheme={ButtonTheme.BLACK}
        text="Login with Github"
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
              <FinalFormSpy form={FORMS.LOGIN_FORM} />
              <FormGroup label="EMAIL">
                <Input
                  name="username"
                  inputTheme={InputTheme.INLINE_MINIMAL}
                  placeholder="Username or Email"
                  clearPlaceholderOnFocus
                />
              </FormGroup>
              <FormGroup label="PASSWORD">
                <Input
                  name="password"
                  inputTheme={InputTheme.INLINE_MINIMAL}
                  placeholder="Your Password"
                  clearPlaceholderOnFocus
                  type="password"
                />
              </FormGroup>
              <BottomContainer>
                <SubmitButton
                  text="Login"
                  buttonTheme={ButtonTheme.PRIMARY_SOLID}
                  size={14}
                  type="submit"
                  isLoading={submitting}
                />
              </BottomContainer>
            </FormContainer>
          )}
        </Form>
      </FormWrapper>
      <FooterContainer>
        <InfoContainer>
          <InfoText>You don't have an account?</InfoText>
          <LinkText to={ROUTES.signupPage}>Signup</LinkText>
        </InfoContainer>
        <InfoContainer>
          <InfoText>Forgot your password?</InfoText>
          <LinkText to="#">Recovert it</LinkText>
        </InfoContainer>
      </FooterContainer>
    </LoginCard>
  );
}
