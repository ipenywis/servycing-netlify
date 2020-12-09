import { Footer } from "components/footer";
import { HorizontalWrapper } from "components/horizontalWrapper";
import { MinimalSpinner } from "components/loadingSpinner/minimal";
import { Marginer } from "components/marginer";
import { Navbar } from "components/navbar";
import { InnerPageContainer, PageContainer } from "components/pageContainer";
import { screenSizes } from "components/responsive";
import { DarkText, ErrorText } from "components/text";
import NotFound from "containers/NotFoundPage";
import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader/root";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Dispatch } from "redux";
import { useInjectReducer } from "redux-injectors";
import specialistService from "services/specialistService";
import styled from "styles/styled-components";
import { ISpecialist } from "types/specialist";
import { slugToTitle } from "utils/route";
import { setSpecialist } from "./actionts";
import { FinishedServices } from "./finishedServices";
import SpecialistPageReducer, { REDUCER_KEY } from "./reducer";
import { SpecialistInfo } from "./specialistInfo";

interface ISpecialistPageProps {}

const SpecialistPageContainer = styled.div`
  max-width: ${screenSizes.laptop}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1.5em;
`;

const actionDispatch = (dispatch: Dispatch) => ({
  setSpecialist: (specialist: ISpecialist) =>
    dispatch(setSpecialist(specialist)),
});

function SpecialistPage(props: ISpecialistPageProps) {
  useInjectReducer({ key: REDUCER_KEY, reducer: SpecialistPageReducer });

  const [error, setError] = useState<string | null>("");
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { setSpecialist } = actionDispatch(useDispatch());

  const { fullName } = useParams<{ fullName: string }>();

  const fetchSpecialistInfo = async (name: string) => {
    setLoading(true);
    const specialist = await specialistService
      .getSpecialistByName(name)
      .catch((err) => {
        setError(err ? err.message : "Unexpected Error occured!");
      });

    if (specialist) setSpecialist(specialist);
    else setNotFound(true);

    setLoading(false);
  };

  useEffect(() => {
    if (fullName) {
      const unslugifiedName = slugToTitle(fullName);
      fetchSpecialistInfo(unslugifiedName);
    }
  }, [fullName]);

  if (notFound) return <NotFound />;

  return (
    <PageContainer>
      <Navbar />
      <InnerPageContainer>
        {!error && isLoading && (
          <HorizontalWrapper centered>
            <MinimalSpinner size="lg" />
          </HorizontalWrapper>
        )}
        {error && (
          <ErrorText size={14} horizontalCenter>
            {error}
          </ErrorText>
        )}
        {!error && !isLoading && (
          <SpecialistPageContainer>
            <DarkText size={28} black>
              Servycing Specialist
            </DarkText>
            <Marginer direction="vertical" margin="2em" />
            <SpecialistInfo />
            <Marginer direction="vertical" margin="2em" />
            <FinishedServices />
          </SpecialistPageContainer>
        )}
      </InnerPageContainer>
      <Footer />
    </PageContainer>
  );
}

export default hot(SpecialistPage);
