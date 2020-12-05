import { Card } from "components/card";
import { Combobox } from "components/combobox";
import { Form } from "components/form";
import { FormGroup } from "components/formGroup";
import { Input } from "components/input";
import { InputTheme } from "components/input/themes";
import { Marginer } from "components/marginer";
import { FORMS } from "finalForm/constants";
import FinalFormSpy from "finalForm/finalFormSpy";
import React from "react";
import { OFFERED_SERVICE_TYPE } from "types/offeredService";
import { SectionContainer } from "../common";
import * as yup from "yup";
import { validateForm } from "utils/validation";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { Button } from "components/button";
import { ButtonTheme } from "components/button/themes";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";

interface IAddNewServiceSectionProps {}

const validationSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required().max(700).min(150),
  hourlyRate: yup
    .number()
    .required("Please choose your service hourly rate")
    .max(2000, "Rate must be less than $2000")
    .min(5, "Rate must be at least $5"),
});

export function AddNewServiceSection(props: IAddNewServiceSectionProps) {
  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  return (
    <SectionContainer>
      <Card title="Add New Service" titleSize={19}>
        <Marginer direction="vertical" margin="1em" />
        <Form
          onSubmit={() => {}}
          validate={(values) => validateForm(validationSchema, values)}
        >
          {() => (
            <>
              <FinalFormSpy form={FORMS.SPECIALIST_ADD_NEW_SERVICE_FORM} />
              <FormGroup label="Title">
                <Input
                  name="title"
                  placeholder="Service Title"
                  inputTheme={InputTheme.MINIMAL_BORDER_DARK}
                  width="40%"
                />
              </FormGroup>
              <FormGroup label="Description">
                <Input
                  name="description"
                  placeholder="Service Description"
                  inputTheme={InputTheme.MINIMAL_BORDER_DARK}
                  width="63%"
                  maxHeight={"11em"}
                  useAsTextarea
                />
              </FormGroup>
              <FormGroup label="Type">
                <Combobox
                  placeholder="Select Service Type"
                  items={Object.values(OFFERED_SERVICE_TYPE)}
                />
                <Marginer direction="vertical" margin="17px" />
              </FormGroup>
              <FormGroup label="Hourly Rate">
                <Input
                  name="hourlyRate"
                  placeholder="Service desired hourly rate"
                  useAsNumeric={true}
                  inputTheme={InputTheme.MINIMAL_BORDER_DARK}
                  width="40%"
                  icon={faDollarSign}
                  iconSize="15px"
                />
              </FormGroup>
              <FormGroup label="Preferred Working Hours">
                <DateRangePicker
                  ranges={[selectionRange]}
                  showMonthAndYearPickers={false}
                  onChange={(ranges) =>
                    console.log("Selection: ", selectionRange)
                  }
                />
              </FormGroup>
              <Button
                text="Offer Service"
                buttonTheme={ButtonTheme.PRIMARY_PRIMARY}
              />
            </>
          )}
        </Form>
      </Card>
    </SectionContainer>
  );
}
