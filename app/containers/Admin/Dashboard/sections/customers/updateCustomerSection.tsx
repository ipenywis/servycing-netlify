import { Button } from "components/button";
import { ButtonTheme } from "components/button/themes";
import { Card } from "components/card";
import { Form } from "components/form";
import { FormGroup } from "components/formGroup";
import { HorizontalWrapper } from "components/horizontalWrapper";
import { Input } from "components/input";
import { InputTheme } from "components/input/themes";
import { ErrorText } from "components/text";
import { FormApi } from "final-form";
import { FORMS } from "finalForm/constants";
import FinalFormSpy from "finalForm/finalFormSpy";
import React, { useState } from "react";
import { FormRenderProps } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import customerService from "services/customerService";
import styled from "styles/styled-components";
import { IUpdateCustomerDTO } from "types/customer";
import { FULLNAME_REGEX, PASSWORD_REGEX } from "utils/regex";
import { validateForm } from "utils/validation";
import * as yup from "yup";

import { setActiveTab } from "../../actions";
import { SectionContainer } from "../../common";
import { DASHBOARD_SECTION_TAB } from "../../constants";
import { makeSelectToUpdateCustomer } from "../../selectors";

interface IUpdateCustomerSectionProps {}

const InnerFromContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InnerCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 40em;
`;

const validationSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .matches(FULLNAME_REGEX, "Please enter full name of specialist")
    .required("Specialist full name is required"),
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address")
    .required(),
  password: yup
    .string()
    .trim()
    .matches(PASSWORD_REGEX, "Please enter a strong password"),
});

const DetailsContainer = styled.div`
  width: 100%;
  height: 10px;
  display: flex;
  font-size: 14px;
  margin-bottom: 20px;
`;

const stateSelector = createSelector(
  makeSelectToUpdateCustomer,
  (toUpdateCustomer) => ({
    toUpdateCustomer,
  })
);

const actionDispatch = (dispatch: Dispatch) => ({
  setActiveTab: (tab: DASHBOARD_SECTION_TAB) => dispatch(setActiveTab(tab)),
});

export function UpdateCustomerSection(props: IUpdateCustomerSectionProps) {
  const { toUpdateCustomer } = useSelector(stateSelector);
  const { setActiveTab } = actionDispatch(useDispatch());
  const [error, setError] = useState<string | null>(null);

  if (!toUpdateCustomer) {
    setActiveTab(DASHBOARD_SECTION_TAB.CUSTOMERS);
    return null;
  }

  const onSubmit = async (values: any, form: FormApi<any>): Promise<any> => {
    setError(null);

    const dirtyFields = form.getState().dirtyFields;

    const updatedData: IUpdateCustomerDTO | any = {
      id: toUpdateCustomer.id,
    };
    for (const fieldName of Object.keys(dirtyFields)) {
      if (dirtyFields[fieldName]) updatedData[fieldName] = values[fieldName];
    }

    const customer = await customerService.update(updatedData).catch((err) => {
      setError(err.message);
    });

    if (customer) setActiveTab(DASHBOARD_SECTION_TAB.CUSTOMERS);
  };

  return (
    <SectionContainer alignCenter>
      <Card title="Update Customer" titleSize={19} centerTitle>
        <InnerCardContainer>
          <Form
            onSubmit={onSubmit}
            validate={(values) => validateForm(validationSchema, values)}
            validateOnBlur={false}
            initialValues={toUpdateCustomer}
          >
            {({
              submitting,
              dirtySinceLastSubmit,
              hasSubmitErrors,
            }: FormRenderProps) => (
              <>
                <DetailsContainer>
                  {error && <ErrorText size={15}>{error}</ErrorText>}
                </DetailsContainer>
                <FinalFormSpy form={FORMS.ADMIN_ADD_NEW_SPECIALIST_FORM} />
                <FormGroup label="Full Name">
                  <Input
                    name="fullName"
                    inputTheme={InputTheme.MINIMAL_BORDER_DARK}
                    placeholder="Your Name"
                    clearPlaceholderOnFocus
                  />
                </FormGroup>
                <FormGroup label="Email">
                  <Input
                    name="email"
                    inputTheme={InputTheme.MINIMAL_BORDER_DARK}
                    placeholder="example@mail.com"
                    clearPlaceholderOnFocus
                    type="email"
                  />
                </FormGroup>
                <FormGroup label="New Password">
                  <Input
                    name="password"
                    inputTheme={InputTheme.MINIMAL_BORDER_DARK}
                    placeholder="Strong Password"
                    clearPlaceholderOnFocus
                    type="password"
                  />
                </FormGroup>
                <HorizontalWrapper centered>
                  <Button
                    text="Update"
                    buttonTheme={ButtonTheme.PRIMARY_SOLID}
                    size={14}
                    type="submit"
                    isLoading={submitting}
                    disabled={hasSubmitErrors && !dirtySinceLastSubmit}
                  />
                </HorizontalWrapper>
              </>
            )}
          </Form>
        </InnerCardContainer>
      </Card>
    </SectionContainer>
  );
}
