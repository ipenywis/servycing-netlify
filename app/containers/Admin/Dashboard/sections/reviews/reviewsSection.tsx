import { HorizontalWrapper } from "components/horizontalWrapper";
import { MinimalSpinner } from "components/loadingSpinner/minimal";
import { Marginer } from "components/marginer";
import { Pane } from "components/pane";
import { BlackText, MutedText, WarningText } from "components/text";
import {
  IconButton,
  Menu,
  Popover,
  Position,
  Spinner,
  Table,
} from "evergreen-ui";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import reviewService from "services/reviewService";
import { closePopupByClickOutside } from "types/common";
import { ILoadRangeOptions } from "types/pagination";
import { IServiceReview } from "types/serviceReview";

import { setActiveTab, setReviews, setToUpdateReview } from "../../actions";
import { SectionContainer } from "../../common";
import {
  DASHBOARD_SECTION_TAB,
  DEFAULT_OFFERED_SERVICES_LOAD_RANGE,
} from "../../constants";
import { makeSelectReviews, makeSelectToUpdateReview } from "../../selectors";

interface IReviewsSectionProps {}

const stateSelector = createSelector(
  makeSelectReviews,
  makeSelectToUpdateReview,
  (reviews, toUpdateReview) => ({
    reviews,
    toUpdateReview,
  })
);

const actionDispatch = (dispatch: Dispatch) => ({
  setReviews: (reviews: IServiceReview[]) => dispatch(setReviews(reviews)),
  setToUpdateReview: (review: IServiceReview | null) =>
    dispatch(setToUpdateReview(review)),
  setActiveTab: (tab: DASHBOARD_SECTION_TAB) => dispatch(setActiveTab(tab)),
});

interface IMenuProps {
  review: IServiceReview;
}

function RenderRowMenu(props: IMenuProps) {
  const { review } = props;
  const { reviews } = useSelector(stateSelector);
  const { setActiveTab, setReviews, setToUpdateReview } = actionDispatch(
    useDispatch()
  );
  const [isDeleting, setDeleting] = useState(false);

  const goToUpdateSection = () => {
    setToUpdateReview(review);
    setActiveTab(DASHBOARD_SECTION_TAB.UPDATE_REVIEW);
  };

  const deleteReviewFromState = (id: string) => {
    const updatedReviews = reviews.filter((review) => {
      return review.id !== id;
    });

    setReviews(updatedReviews);
  };

  const deleteReview = async () => {
    setDeleting(true);
    const deleted = await reviewService.delete(review.id).catch((err) => {
      console.log("Error: ", err);
    });

    if (deleted) deleteReviewFromState(review.id);

    closePopupByClickOutside();

    setDeleting(false);
  };

  return (
    <Menu>
      <Menu.Group>
        <Menu.Item onSelect={goToUpdateSection}>Update</Menu.Item>
        <Menu.Divider />
      </Menu.Group>
      <Menu.Group>
        <Menu.Item intent="danger" onSelect={deleteReview}>
          <HorizontalWrapper centerVertically>
            Delete
            <Marginer direction="horizontal" margin="10px" />
            {isDeleting && <Spinner size={14} />}
          </HorizontalWrapper>
        </Menu.Item>
      </Menu.Group>
    </Menu>
  );
}

export function ReviewsSection(props: IReviewsSectionProps) {
  const { reviews } = useSelector(stateSelector);
  const { setReviews, setActiveTab } = actionDispatch(useDispatch());
  const [isLoading, setLoading] = useState(false);
  const [loadRange, setLoadRange] = useState<ILoadRangeOptions | null>(
    DEFAULT_OFFERED_SERVICES_LOAD_RANGE
  );

  const isEmptyReviews = !reviews || (reviews && reviews.length === 0);

  const fetchReviews = async () => {
    setLoading(true);
    const reviews = await reviewService.getAllReviews().catch((err) => {
      console.log("Err: ", err);
    });

    if (reviews) {
      setReviews(reviews);
    }

    setLoading(false);
  };

  const loadMore = () => {
    //Load 20 more
    setLoadRange({
      start: 0,
      range: loadRange
        ? loadRange.range + 20
        : DEFAULT_OFFERED_SERVICES_LOAD_RANGE.range,
    });
  };

  const loadAll = () => {
    //Load All services
    setLoadRange(null);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <SectionContainer>
      <BlackText size={19} bold>
        Services Reviews
      </BlackText>
      <MutedText size={12} marginBottom="1em">
        View and Manage All services reviews.
      </MutedText>
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>Id</Table.TextHeaderCell>
          <Table.TextHeaderCell>Customer</Table.TextHeaderCell>
          <Table.TextHeaderCell flexGrow={2}>Review</Table.TextHeaderCell>
          <Table.TextHeaderCell>Rating</Table.TextHeaderCell>
          <Table.TextHeaderCell>More</Table.TextHeaderCell>
        </Table.Head>
        {(isLoading || isEmptyReviews) && (
          <Pane alignCenter marginTop="5%">
            {isLoading && !isEmptyReviews && <MinimalSpinner />}
            {isEmptyReviews && !isLoading && (
              <WarningText>No services reviews yet!</WarningText>
            )}
          </Pane>
        )}
        <Table.Body>
          {!isLoading &&
            !isEmptyReviews &&
            reviews.map((review, idx) => (
              <Table.Row key={idx}>
                <Table.TextCell>{review.id}</Table.TextCell>
                <Table.TextCell>{review.customer.fullName}</Table.TextCell>
                <Table.TextCell flexGrow={2}>{review.review}</Table.TextCell>
                <Table.TextCell isNumber>{review.rating}</Table.TextCell>
                <Table.Cell>
                  <Popover
                    content={<RenderRowMenu review={review} />}
                    position={Position.BOTTOM_RIGHT}
                  >
                    <IconButton icon="more" appearance="minimal" height={24} />
                  </Popover>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <Marginer direction="vertical" margin="2em" />
      {/* <HorizontalWrapper centered>
        <Button
          text="Load More"
          size={12}
          buttonTheme={ButtonTheme.GREY_SOLID}
          onClick={loadMore}
          disabled={cantLoadMore}
        />
        <Button
          text="Load All"
          size={12}
          buttonTheme={ButtonTheme.GREY_SOLID}
          onClick={loadAll}
          disabled={cantLoadMore}
        />
      </HorizontalWrapper> */}
    </SectionContainer>
  );
}
