import { BrandLogo } from "components/brandLogo";
import { Button } from "components/button";
import { ButtonTheme } from "components/button/themes";
import { Card } from "components/card";
import { Form } from "components/form";
import { FormGroup } from "components/formGroup";
import { HorizontalWrapper } from "components/horizontalWrapper";
import { Input } from "components/input";
import { InputTheme } from "components/input/themes";
import { Link } from "components/link";
import { BlackText, ErrorText, GreyText, MutedText } from "components/text";
import { VerticalWrapper } from "components/verticalWrapper";
import { specialistAuthenticated } from "containers/Authentication/actions";
import ROUTES from "containers/ROUTES";
import { FormApi } from "final-form";
import { FORMS } from "finalForm/constants";
import FinalFormSpy from "finalForm/finalFormSpy";
import React, { useState } from "react";
import { FormRenderProps } from "react-final-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import specialistService from "services/specialistService";
import styled, { theme } from "styles/styled-components";
import { ILoginSpecialistDTO } from "types/specialist";
import { validateForm } from "utils/validation";
import { object, string } from "yup";

import messages from "./messages";

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
  email: string()
    .email(messages.enterValidEmail)
    .trim()
    .required(messages.emailOrUsernameRequired),
  password: string().trim().required(messages.passwordRequired),
});

const ActionsDispatcher = (dispatch: Dispatch) => ({
  specialistAuthenticated: (token: string) =>
    dispatch(specialistAuthenticated(token)),
});

export function LoginBox(props: ILoginBoxProps) {
  const [error, setError] = useState<string | null>(null);

  const history = useHistory();

  const { specialistAuthenticated } = ActionsDispatcher(useDispatch());

  const onSubmit = async (values: any, form: FormApi<any>): Promise<any> => {
    setError(null);

    const data: ILoginSpecialistDTO = {
      email: values.email,
      password: values.password,
    };
    const specialist = await specialistService.login(data).catch((err) => {
      setError(err.message);
    });

    if (specialist) {
      specialistAuthenticated(specialist.access_token as string);
      history.push(ROUTES.discoverPage);
    }
  };

  return (
    <LoginCard centerTitle>
      <VerticalWrapper centerHorizontally>
        <BrandLogo logoOnly logoSize={70} />
        <BlackText size={20} bold marginTop={14}>
          Specialist Login
        </BlackText>
      </VerticalWrapper>
      <FormWrapper>
        <Form
          onSubmit={onSubmit}
          validate={(values) => validateForm(validationSchema, values)}
          validateOnBlur={false}
        >
          {({
            submitting,
            dirtySinceLastSubmit,
            hasSubmitErrors,
          }: FormRenderProps) => (
            <FormContainer>
              <DetailsContainer>
                {error && <SubmitError>{error}</SubmitError>}
              </DetailsContainer>
              <FinalFormSpy form={FORMS.LOGIN_FORM} />
              <FormGroup label="Email">
                <Input
                  name="email"
                  inputTheme={InputTheme.MINIMAL_BORDER_DARK}
                  placeholder="Your Email"
                  clearPlaceholderOnFocus
                />
              </FormGroup>
              <FormGroup label="Password">
                <Input
                  name="password"
                  inputTheme={InputTheme.MINIMAL_BORDER_DARK}
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
          <LinkText to={ROUTES.specialistRegisterPage}>Signup</LinkText>
        </InfoContainer>
        <InfoContainer>
          <InfoText>Forgot your password?</InfoText>
          <LinkText to="#">Recovert it</LinkText>
        </InfoContainer>
      </FooterContainer>
    </LoginCard>
  );
}
