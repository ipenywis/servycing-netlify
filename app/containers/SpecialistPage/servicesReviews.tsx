import { HorizontalWrapper } from "components/horizontalWrapper";
import { MinimalSpinner } from "components/loadingSpinner/minimal";
import { Marginer } from "components/marginer";
import { RatingStars } from "components/ratingStarts";
import { ReviewCard } from "components/reviewCard";
import { BlackText } from "components/text";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import reviewService from "services/reviewService";
import styled from "styles/styled-components";
import { ILoadRangeOptions } from "types/pagination";
import { IServiceReview } from "types/serviceReview";
import { setServicesReviews } from "./actionts";
import { makeSelectServicesReviews, makeSelectSpecialist } from "./selectors";
import { DEFAULT_REVIEWS_LOAD_RANGE } from "./constants";
import { Button } from "components/button";
import { ButtonTheme } from "components/button/themes";

interface IServicesReviews {}

const ServicesReviewsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReviewsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const actionDispatch = (dispatch: Dispatch) => ({
  setServicesReviews: (reviews: IServiceReview[]) =>
    dispatch(setServicesReviews(reviews)),
});

const stateSelector = createSelector(
  makeSelectServicesReviews,
  makeSelectSpecialist,
  (reviews, specialist) => ({
    reviews,
    specialist,
  })
);

export function ServicesReviews(props: IServicesReviews) {
  const { reviews, specialist } = useSelector(stateSelector);
  const { setServicesReviews } = actionDispatch(useDispatch());
  const [isLoading, setLoading] = useState(false);
  const [loadRange, setLoadRange] = useState<ILoadRangeOptions>(
    DEFAULT_REVIEWS_LOAD_RANGE
  );
  const [reviewsCount, setReviewsCount] = useState<number>(0);

  const isEmptyReviews = !reviews || (reviews && reviews.length === 0);

  if (!specialist) return null;

  const fetchReviews = async (loadedByRange = false) => {
    setLoading(true);
    const reviewsWithCount = await reviewService
      .getSpecialistServicesReviews(specialist.id, loadRange)
      .catch((err) => {
        console.log("Err: ", err);
      });

    if (reviewsWithCount && !loadedByRange) {
      setServicesReviews(reviewsWithCount.servicesReviews);
      setReviewsCount(reviewsWithCount.count);
    } else if (reviewsWithCount && loadedByRange) {
      setServicesReviews([...reviews, ...reviewsWithCount.servicesReviews]);
      setReviewsCount(reviewsWithCount.count);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    fetchReviews(true);
  }, [loadRange]);

  const loadMore = () => {
    setLoadRange({
      start: (loadRange.start || 0) + loadRange.range,
      range: loadRange.range,
    });
  };

  return (
    <ServicesReviewsContainer>
      <BlackText size={24} marginBottom={14} black>
        Services Reviews
      </BlackText>
      {!isLoading && (
        <HorizontalWrapper centerVertically>
          {reviews.length > 1 && (
            <BlackText size={20} bold>
              {reviews.length} Reviews
            </BlackText>
          )}
          {reviews.length === 1 && (
            <BlackText size={20} bold>
              1 review
            </BlackText>
          )}
          {isEmptyReviews && (
            <BlackText size={20} bold>
              Now Reviews Yet!
            </BlackText>
          )}
          <Marginer direction="horizontal" margin={10} />
          <RatingStars
            rating={specialist.rating}
            showAllStars
            showRatingNumber
            size={17}
          />
        </HorizontalWrapper>
      )}
      <Marginer direction="vertical" margin={12} />
      <InnerContainer>
        {isLoading && (
          <HorizontalWrapper centered>
            {<MinimalSpinner size="md" />}
          </HorizontalWrapper>
        )}
        <ReviewsContainer>
          {!isEmptyReviews &&
            !isLoading &&
            reviews.map((review, idx) => <ReviewCard key={idx} {...review} />)}
        </ReviewsContainer>
      </InnerContainer>
      {reviewsCount !== reviews.length && (
        <Button
          text="Load More"
          buttonTheme={ButtonTheme.FULL_MINIMAL_BLUE}
          onClick={loadMore}
        />
      )}
    </ServicesReviewsContainer>
  );
}
