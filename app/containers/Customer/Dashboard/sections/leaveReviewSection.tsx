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
import {
  INewOfferedServiceDTO,
  IOfferedService,
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
import { setActiveTab } from "../actions";
import { DASHBOARD_SECTION_TAB } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import imageService from "services/imageService";
import { ErrorText } from "components/text";
import { createSelector } from "reselect";
import { FULLNAME_REGEX, PASSWORD_REGEX } from "utils/regex";
import { IRegisterSpecialistDTO } from "types/specialist";
import specialistService from "services/specialistService";
import { IRegisterCustomerDTO, IUpdateCustomerDTO } from "types/customer";
import customerService from "services/customerService";
import { INewReviewDTO, IUpdateReviewDTO } from "types/serviceReview";
import { RatingStars } from "components/ratingStarts";
import reviewService from "services/reviewService";
import { makeSelectToReviewService } from "../selectors";

interface ILeaveReviewSectionProps {}

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
  review: yup.string().trim().required("Service Review is required!"),
  rating: yup.number().required("Service Rating is required!"),
});

const DetailsContainer = styled.div`
  width: 100%;
  height: 10px;
  display: flex;
  font-size: 14px;
  margin-bottom: 20px;
`;

const stateSelector = createSelector(
  makeSelectToReviewService,
  (toReviewService) => ({
    toReviewService,
  })
);

const actionDispatch = (dispatch: Dispatch) => ({
  setActiveTab: (tab: DASHBOARD_SECTION_TAB) => dispatch(setActiveTab(tab)),
});

export function LeaveReviewSection(props: ILeaveReviewSectionProps) {
  const { toReviewService } = useSelector(stateSelector);
  const { setActiveTab } = actionDispatch(useDispatch());
  const [error, setError] = useState<string | null>(null);

  if (!toReviewService) {
    setActiveTab(DASHBOARD_SECTION_TAB.FINISHED_PROJECTS);
    return null;
  }

  const onSubmit = async (values: any, form: FormApi<any>): Promise<any> => {
    setError(null);

    const newReviewData: INewReviewDTO = {
      finishedServiceId: toReviewService.id,
      review: values.review,
      rating: values.rating,
    };

    const review = await reviewService
      .submitReview(newReviewData)
      .catch((err) => {
        setError(err.message);
      });

    if (review) setActiveTab(DASHBOARD_SECTION_TAB.FINISHED_PROJECTS);
  };

  return (
    <SectionContainer alignCenter>
      <Card title="Leave a Project Review" titleSize={19} centerTitle>
        <InnerCardContainer>
          <Form
            onSubmit={onSubmit}
            validate={(values) => validateForm(validationSchema, values)}
            mutators={{ setField }}
            validateOnBlur={false}
          >
            {({
              form,
              values,
              submitting,
              dirtySinceLastSubmit,
              hasSubmitErrors,
            }: FormRenderProps) => (
              <>
                <DetailsContainer>
                  {error && <ErrorText size={15}>{error}</ErrorText>}
                </DetailsContainer>
                <FinalFormSpy form={FORMS.ADMIN_UPDATE_SERVICE_REVIEW_FORM} />
                <FormGroup label="Rating">
                  <Input
                    name="rating"
                    inputTheme={InputTheme.MINIMAL_BORDER_DARK}
                    placeholder="Service Rating"
                    clearPlaceholderOnFocus
                    useAsNumeric
                    hidden
                  />
                  <RatingStars
                    rating={values.rating}
                    onRateChange={(rating) =>
                      form.mutators.setField("rating", rating)
                    }
                  />
                </FormGroup>
                <FormGroup label="Review">
                  <Input
                    name="review"
                    inputTheme={InputTheme.MINIMAL_BORDER_DARK}
                    placeholder="Service Review"
                    clearPlaceholderOnFocus
                    useAsTextarea
                    maxHeight="15em"
                    limit={1000}
                  />
                </FormGroup>
                <HorizontalWrapper centered>
                  <Button
                    text="Leave a Review"
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
