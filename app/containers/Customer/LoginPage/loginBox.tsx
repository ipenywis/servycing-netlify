import React, { useState } from "react";
import styled, { theme } from "styles/styled-components";
import { MutedText, GreyText, ErrorText, BlackText } from "components/text";
import { Button } from "components/button";
import { Link } from "components/link";
import { Form } from "components/form";
import { FormRenderProps } from "react-final-form";
import { FormGroup } from "components/formGroup";
import { Input } from "components/input";
import { InputTheme } from "components/input/themes";
import { ButtonTheme } from "components/button/themes";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { HorizontalWrapper } from "components/horizontalWrapper";
import { FORMS } from "finalForm/constants";
import FinalFormSpy from "finalForm/finalFormSpy";
import { object, string } from "yup";
import { setIn, FormApi } from "final-form";
import messages from "./messages";
import studentService from "services/studentService";
import { IStudentRegisterDTO, IStudentLoginDTO } from "types/student";
import { useHistory } from "react-router-dom";
import ROUTES from "containers/ROUTES";
import { Card } from "components/card";
import { prepareRouteWithParams } from "utils/route";
import { Dispatch } from "redux";
import { customerAuthenticated } from "containers/Authentication/actions";
import { useDispatch } from "react-redux";
import { validateForm } from "utils/validation";
import { VerticalWrapper } from "components/verticalWrapper";
import { ILoginSpecialistDTO } from "types/specialist";
import { BrandLogo } from "components/brandLogo";
import specialistService from "services/specialistService";
import customerService from "services/customerService";
import { ILoginCustomerDTO } from "types/customer";

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
  customerAuthenticated: (token: string) =>
    dispatch(customerAuthenticated(token)),
});

export function LoginBox(props: ILoginBoxProps) {
  const [error, setError] = useState<string | null>(null);

  const history = useHistory();

  const { customerAuthenticated } = ActionsDispatcher(useDispatch());

  const onSubmit = async (values: any, form: FormApi<any>): Promise<any> => {
    setError(null);

    const data: ILoginCustomerDTO = {
      email: values.email,
      password: values.password,
    };
    const customer = await customerService.login(data).catch((err) => {
      setError(err.message);
    });

    if (customer) {
      customerAuthenticated(customer.access_token as string);
      history.push(ROUTES.discoverPage);
    }
  };

  return (
    <LoginCard centerTitle>
      <VerticalWrapper centerHorizontally>
        <BrandLogo logoOnly logoSize={70} />
        <BlackText size={20} bold marginTop={14}>
          Login
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
          <LinkText to={ROUTES.customerSignupPage}>Signup</LinkText>
        </InfoContainer>
        <InfoContainer>
          <InfoText>Forgot your password?</InfoText>
          <LinkText to="#">Recovert it</LinkText>
        </InfoContainer>
      </FooterContainer>
    </LoginCard>
  );
}
