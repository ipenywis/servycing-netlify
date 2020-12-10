import React, { useMemo } from "react";
import styled, { theme } from "styles/styled-components";
import ImageLoader from "react-imageloader";

//Only for testing purposes
import GardenImg from "images/services thumbnails/garden.jpg";
import { BlackText, GreyText, MutedText, SuccessText } from "components/text";
import { HorizontalWrapper } from "components/horizontalWrapper";
import { Avatar } from "components/avatar";
import { RatingStars } from "components/ratingStarts";
import { IOfferedService } from "types/offeredService";
import { Link } from "components/link";
import {
  prepareRouteWithParams,
  prepareRouteWithParamsWithSlug,
} from "utils/route";
import ROUTES from "containers/ROUTES";

interface IServiceCardProps extends IOfferedService {}

const CardContainer = styled.div`
  width: 300px;
  min-height: 250px;
  background-color: ${theme.default.componentBackground};
  border-radius: 3px;
  box-shadow: 0 0px 1px 1px rgba(0, 0, 0, 0.17);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 0.5em;
  margin-bottom: 1.3em;
`;

const TopContainer = styled.div`
  width: 100%;
`;

const ServiceThumbnail = styled.div`
  width: 100%;
  height: 11em;

  img {
    width: 100%;
    height: 100%;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 15px 14px;
`;

const BottomContainer = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  padding: 0 10px;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${theme.default.lightGreyText};
`;

export function ServiceCard(props: IServiceCardProps) {
  const { id, title, specialist, rate, rating, thumbnailUrl } = props;

  //TODO: Make service page use service title slug
  const servicePage = useMemo(
    () => prepareRouteWithParams(ROUTES.servicePage, id),
    [id]
  );

  const specialistPage = useMemo(
    () =>
      prepareRouteWithParamsWithSlug(
        ROUTES.specialistPage,
        specialist.fullName
      ),
    [specialist.fullName]
  );

  return (
    <CardContainer>
      <TopContainer>
        <Link to={servicePage}>
          <ServiceThumbnail data-testid="image-container">
            <ImageLoader src={thumbnailUrl} />
          </ServiceThumbnail>
        </Link>
      </TopContainer>
      <ContentContainer>
        <Link to={servicePage}>
          <BlackText size={17} bold marginBottom={10}>
            {title}
          </BlackText>
        </Link>
        <HorizontalWrapper centerVertically>
          <Link to={specialistPage}>
            <Avatar name={specialist.fullName} size={29} />
          </Link>
          <Link to={specialistPage}>
            <BlackText size={12} marginLeft={5} verticalCenter>
              {specialist.fullName}
            </BlackText>
          </Link>
        </HorizontalWrapper>
      </ContentContainer>
      <BottomContainer>
        <RatingStars rating={rating} showRatingNumber showAllStars={false} />
        <HorizontalWrapper>
          <MutedText size={12} verticalCenter marginRight={4} marginBottom={2}>
            STARTING AT
          </MutedText>
          <SuccessText size={15} bold>
            ${rate}
          </SuccessText>
          <MutedText size={11} verticalCenter>
            /hr
          </MutedText>
        </HorizontalWrapper>
      </BottomContainer>
    </CardContainer>
  );
}
