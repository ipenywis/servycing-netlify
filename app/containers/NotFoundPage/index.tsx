/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import { Footer } from "components/footer";
import { Navbar } from "components/navbar";
import { InnerPageContainer, PageContainer } from "components/pageContainer";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styles/styled-components";
import ReactImageLoader from "react-imageloader";

import Img from "images/notfound.png";
import { hot } from "react-hot-loader/root";
import { BlackText } from "components/text";

const StyledInnerContainer = styled(InnerPageContainer as any)`
  width: 100%;
  align-items: center;
`;

const NotFoundImageContainer = styled.div`
  width: 44em;
  height: auto;

  img {
    width: 100%;
    height: 100%;
  }
`;

function NotFound() {
  return (
    <PageContainer>
      <Navbar />
      <StyledInnerContainer>
        <NotFoundImageContainer>
          <ReactImageLoader src={Img} />
        </NotFoundImageContainer>
        <BlackText size={29} marginTop="1em" black>
          Ooops! You've reached the edge
        </BlackText>
      </StyledInnerContainer>
      <Footer />
    </PageContainer>
  );
}

export default hot(NotFound);
