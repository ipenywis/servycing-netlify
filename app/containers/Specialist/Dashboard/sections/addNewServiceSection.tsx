import { Card } from "components/card";
import { Combobox } from "components/combobox";
import { Form } from "components/form";
import { FormGroup } from "components/formGroup";
import { Input } from "components/input";
import { InputTheme } from "components/input/themes";
import { Marginer } from "components/marginer";
import { FORMS } from "finalForm/constants";
import FinalFormSpy from "finalForm/finalFormSpy";
import React, { useState } from "react";
import { OFFERED_SERVICE_TYPE } from "types/offeredService";
import { SectionContainer } from "../common";
import * as yup from "yup";
import { validateForm } from "utils/validation";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { Button } from "components/button";
import { ButtonTheme } from "components/button/themes";

import { TimeRangePicker } from "components/timeRangePicker";
import { setField } from "finalForm/mutators";
import { FormRenderProps } from "react-final-form";
import { FormApi } from "final-form";

interface IAddNewServiceSectionProps {}

const validationSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required().max(700).min(150),
  hourlyRate: yup
    .number()
    .required("Please choose your service hourly rate")
    .max(2000, "Rate must be less than $2000")
    .min(5, "Rate must be at least $5"),
  preferredHours: yup
    .string()
    .required("Please specify your preferred working hours"),
  type: yup.string().required(),
});

export function AddNewServiceSection(props: IAddNewServiceSectionProps) {
  const [timeRange, setTimeRange] = useState<string[]>([]);

  const updateTimeRange = (range, form: FormApi<any>) => {
    if (!range) return;
    if (!range[0]) {
      const newRange = [timeRange[0], range[1]];
      setTimeRange(newRange);
      form.mutators.setField(
        "preferredHours",
        `${newRange[0]} to ${newRange[1]}`
      );
    }
    if (!range[1]) {
      const newRange = [range[0], timeRange[1]];
      setTimeRange(newRange);
      form.mutators.setField(
        "preferredHours",
        `${newRange[0]} to ${newRange[1]}`
      );
    }
  };

  const setServiceType = (type: string, form: FormApi<any>) => {
    const offeredServiceType = Object.keys(OFFERED_SERVICE_TYPE).find(
      (key) => OFFERED_SERVICE_TYPE[key] === type
    );
    form.mutators.setField("type", offeredServiceType);
  };

  return (
    <SectionContainer>
      <Card title="Add New Service" titleSize={19}>
        <Marginer direction="vertical" margin="1em" />
        <Form
          onSubmit={() => {}}
          mutators={{ setField }}
          validate={(values) => validateForm(validationSchema, values)}
        >
          {({ form }: FormRenderProps) => (
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
                <Input name="type" hidden />
                <Combobox
                  placeholder="Select Service Type"
                  items={Object.values(OFFERED_SERVICE_TYPE)}
                  onChange={(type) => setServiceType(type, form)}
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
                <Input name="preferredHours" hidden />
                <TimeRangePicker
                  format="h:m a"
                  rangeDivider="To"
                  required={true}
                  onChange={(range) => updateTimeRange(range, form)}
                />
              </FormGroup>
              <Marginer direction="vertical" margin="1.5em" />
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
