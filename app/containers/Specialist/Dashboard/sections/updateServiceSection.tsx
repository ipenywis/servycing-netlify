import { Card } from "components/card";
import { Combobox } from "components/combobox";
import { Form } from "components/form";
import { FormGroup } from "components/formGroup";
import { Input } from "components/input";
import { InputTheme } from "components/input/themes";
import { Marginer } from "components/marginer";
import { FORMS } from "finalForm/constants";
import FinalFormSpy from "finalForm/finalFormSpy";
import React, { useEffect, useState } from "react";
import {
  INewOfferedServiceDTO,
  IOfferedService,
  IUpdateOfferedServiceDTO,
  OFFERED_SERVICE_TYPE,
} from "types/offeredService";
import { SectionContainer } from "../common";
import * as yup from "yup";
import { validateForm } from "utils/validation";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { Button } from "components/button";
import { ButtonTheme } from "components/button/themes";

import { TimeRangePicker } from "components/timeRangePicker";
import { setField } from "finalForm/mutators";
import { FormRenderProps } from "react-final-form";
import { FormApi, FORM_ERROR } from "final-form";
import { ImageUploader } from "components/imageUploader";
import styled from "styles/styled-components";
import { HorizontalWrapper } from "components/horizontalWrapper";
import offeredServicesService from "services/offeredServicesService";
import { Dispatch } from "redux";
import { setActiveTab, setOfferedServices } from "../actions";
import { DASHBOARD_SECTION_TAB } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import imageService from "services/imageService";
import { ErrorText } from "components/text";
import { createSelector } from "reselect";
import {
  makeSelectOfferedServices,
  makeSelectToUpdateOfferedService,
} from "../selectors";

interface IUpdateServiceSectionProps {}

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
  title: yup.string().required(),
  description: yup.string().required().max(700).min(150),
  rate: yup
    .number()
    .required("Please choose your service hourly rate")
    .max(2000, "Rate must be less than $2000")
    .min(5, "Rate must be at least $5"),
  preferredHours: yup
    .string()
    .required("Please specify your preferred working hours"),
  type: yup.string().required(),
});

const stateSelector = createSelector(
  makeSelectOfferedServices,
  makeSelectToUpdateOfferedService,
  (offeredServices, toUpdateOfferedService) => ({
    offeredServices,
    toUpdateOfferedService,
  })
);

const actionDispatch = (dispatch: Dispatch) => ({
  setActiveTab: (tab: DASHBOARD_SECTION_TAB) => dispatch(setActiveTab(tab)),
  setOfferedServices: (services: IOfferedService[]) =>
    dispatch(setOfferedServices(services)),
});

export function UpdateServiceSection(props: IUpdateServiceSectionProps) {
  const { setActiveTab, setOfferedServices } = actionDispatch(useDispatch());
  const { offeredServices, toUpdateOfferedService } = useSelector(
    stateSelector
  );

  const [timeRange, setTimeRange] = useState<string[]>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

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

  const onSubmit = async (values) => {
    //Upload thumbnail
    let thumbnailUrl: string | void = undefined;
    if (thumbnailFile) {
      thumbnailUrl = await imageService
        .uploadImage(thumbnailFile)
        .catch((err) => {
          console.log("Image upload Error: ", err);
        });

      if (!thumbnailUrl)
        return { [FORM_ERROR]: "Service Thumbnail is invalid!" };
    }

    const updatedServiceData: IUpdateOfferedServiceDTO = {
      ...values,
      rate: parseInt(values.rate),
      thumbnailUrl,
    };

    const newOfferedService = await offeredServicesService
      .updateOfferedService(updatedServiceData)
      .catch((err) => {
        console.log("Err: ", err);
      });

    if (newOfferedService) {
      setOfferedServices([...offeredServices, newOfferedService]);
      setActiveTab(DASHBOARD_SECTION_TAB.OFFERED_SERVICES);
    }

    return undefined;
  };

  useEffect(() => {
    if (toUpdateOfferedService) {
      //Parse preffered hours time
      const hoursArray = toUpdateOfferedService.preferredHours.split("to");
      const startTime = hoursArray[0].trim();
      const endTime = hoursArray[1].trim();
      setTimeRange([startTime, endTime]);
    }
  }, [toUpdateOfferedService]);

  return (
    <SectionContainer alignCenter>
      <Card title="Update Service" titleSize={19}>
        <InnerCardContainer>
          <Marginer direction="vertical" margin="1em" />
          <Form
            onSubmit={onSubmit}
            mutators={{ setField }}
            validate={(values) => validateForm(validationSchema, values)}
            initialValues={toUpdateOfferedService || {}}
          >
            {({
              form,
              values,
              submitError,
              hasSubmitErrors,
              submitting,
              pristine,
            }: FormRenderProps) => (
              <InnerFromContainer>
                <FinalFormSpy form={FORMS.SPECIALIST_ADD_NEW_SERVICE_FORM} />
                {hasSubmitErrors && <ErrorText>{submitError}</ErrorText>}
                <FormGroup>
                  <ImageUploader
                    name="thumbnail"
                    src={thumbnailFile || toUpdateOfferedService?.thumbnailUrl}
                    placeholder="Service Thumbnail"
                    onSelect={setThumbnailFile}
                  />
                </FormGroup>
                <FormGroup label="Title">
                  <Input
                    name="title"
                    placeholder="Service Title"
                    inputTheme={InputTheme.MINIMAL_BORDER_DARK}
                  />
                </FormGroup>
                <FormGroup label="Description">
                  <Input
                    name="description"
                    placeholder="Service Description"
                    inputTheme={InputTheme.MINIMAL_BORDER_DARK}
                    maxHeight={"11em"}
                    useAsTextarea
                  />
                </FormGroup>
                <FormGroup label="Type">
                  <Input name="type" hidden />
                  <Combobox
                    width="100%"
                    placeholder="Select Service Type"
                    items={Object.values(OFFERED_SERVICE_TYPE)}
                    onChange={(type) => setServiceType(type, form)}
                  />
                  <Marginer direction="vertical" margin="17px" />
                </FormGroup>
                <FormGroup label="Hourly Rate">
                  <Input
                    name="rate"
                    placeholder="Service desired hourly rate"
                    useAsNumeric={true}
                    inputTheme={InputTheme.MINIMAL_BORDER_DARK}
                    icon={faDollarSign}
                    iconSize="15px"
                  />
                </FormGroup>
                <FormGroup label="Preferred Working Hours">
                  <Input name="preferredHours" hidden />
                  <TimeRangePicker
                    format="h:m a"
                    rangeDivider="To"
                    value={timeRange}
                    onChange={(range) => updateTimeRange(range, form)}
                  />
                </FormGroup>
                <Marginer direction="vertical" margin="1.5em" />
                <HorizontalWrapper centered>
                  <Button
                    text="Update"
                    type="submit"
                    buttonTheme={ButtonTheme.PRIMARY_PRIMARY}
                    isLoading={submitting}
                    disabled={pristine}
                  />
                </HorizontalWrapper>
              </InnerFromContainer>
            )}
          </Form>
        </InnerCardContainer>
      </Card>
    </SectionContainer>
  );
}
