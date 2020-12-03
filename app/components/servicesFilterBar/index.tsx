import { Combobox } from "components/combobox";
import { Select } from "evergreen-ui";
import React, { useMemo, useState } from "react";
import styled from "styles/styled-components";
import {
  OFFERED_SERVICE_HOURLY_RATE_FILTER,
  OFFERED_SERVICE_TYPE,
  OFFERED_SERVICE_RATING_FILTER,
  IServicesFilter,
} from "types/offeredService";

import { Range, createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import { BlackText, GreyText } from "components/text";

const RangeWithTooltip = createSliderWithTooltip(Range);

interface IServicesFilterBarProps {
  onChange: (filters: IServicesFilter) => void;
}

const BarContainer = styled.div`
  width: 100%;
  height: 57px;
  display: flex;
  align-items: center;
`;

const FilterWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;

  &:not(:last-of-type) {
    margin-right: 12px;
  }
`;

const SliderWrapper = styled.div`
  width: 8em;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 8px;
`;

export function ServicesFilterBar(props: IServicesFilterBarProps) {
  const { onChange } = props;

  const offeredServiceTypesKeys = useMemo(() => {
    return Object.keys(OFFERED_SERVICE_TYPE);
  }, []);

  const [serviceType, setServiceType] = useState<string>(
    offeredServiceTypesKeys[0]
  );
  const [serviceRating, setServiceRating] = useState<
    OFFERED_SERVICE_RATING_FILTER
  >(OFFERED_SERVICE_RATING_FILTER.ALL);

  const [servicePrice, setServicePrice] = useState<{
    min: number;
    max: number;
  }>({ min: 1, max: 100 });

  const hanldeChange = (type, rating, price) => {
    if (type) setServiceType(type);
    if (rating) setServiceRating(rating);
    if (price) setServicePrice(price);

    onChange({
      type: type || serviceType,
      rating: rating || serviceRating,
      minPrice: price ? price.min : servicePrice.min,
      maxPrice: price ? price.max : servicePrice.max,
    });
  };

  return (
    <BarContainer>
      <FilterWrapper>
        <GreyText size={13}>Filter by Type</GreyText>
        <Combobox
          width="11em"
          items={offeredServiceTypesKeys}
          itemToString={(itemKey) =>
            itemKey ? OFFERED_SERVICE_TYPE[itemKey] : ""
          }
          placeholder="Filter by Type"
          openOnFocus
          selectedItem={serviceType}
          onChange={(type) => hanldeChange(type, null, null)}
        />
      </FilterWrapper>
      <FilterWrapper>
        <GreyText size={13}>Filter by Rating</GreyText>
        <Combobox
          width="11em"
          items={Object.values(OFFERED_SERVICE_RATING_FILTER)}
          placeholder="Filter by Rating"
          selectedItem={serviceRating}
          onChange={(rating) => hanldeChange(null, rating, null)}
        />
      </FilterWrapper>
      {/* <Combobox
        width="11em"
        items={Object.values(OFFERED_SERVICE_HOURLY_RATE_FILTER)}
        itemToString={(item) => (item ? item.label : "")}
        placeholder="Filter by Hourly Rate"
      /> */}
      <SliderWrapper>
        <GreyText size={13}>Filter by Price</GreyText>
        <RangeWithTooltip
          defaultValue={[servicePrice.min, servicePrice.max]}
          min={1}
          max={100}
          allowCross={false}
          onChange={(value) =>
            hanldeChange(null, null, { min: value[0], max: value[1] })
          }
          handleStyle={[
            {
              width: "11px",
              height: "11px",
              marginTop: "-4px",
            },
          ]}
        />
      </SliderWrapper>
    </BarContainer>
  );
}
