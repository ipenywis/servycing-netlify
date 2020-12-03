import { Combobox } from "components/combobox";
import { Select } from "evergreen-ui";
import React, { useMemo, useState } from "react";
import styled from "styles/styled-components";
import {
  OFFERED_SERVICE_HOURLY_RATE_FILTER,
  OFFERED_SERVICE_TYPE,
  OFFERED_SERVICE_RATING_FILTER,
  IServicesFilter,
  IOfferedServiceHourlyRateFilter,
} from "types/offeredService";

import { BlackText, GreyText } from "components/text";

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

  &:not(:last-of-type) {
    margin-right: 12px;
  }
`;

const SliderWrapper = styled.div`
  width: 6em;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

  const [servicePrice, setServicePrice] = useState<
    IOfferedServiceHourlyRateFilter
  >(OFFERED_SERVICE_HOURLY_RATE_FILTER["all"] as any);

  const handleChange = (type, rating, price) => {
    if (type) setServiceType(type);
    if (rating) setServiceRating(rating);
    if (price) setServicePrice(price);

    const newType = type || serviceType;
    const newRating = rating || serviceRating;

    onChange({
      type: newType === offeredServiceTypesKeys[0] ? undefined : newType,
      rating:
        newRating === OFFERED_SERVICE_RATING_FILTER.ALL
          ? undefined
          : parseInt(newRating),
      minPrice: price ? price.min : servicePrice.min,
      maxPrice: price ? price.max : servicePrice.max,
    });
  };

  return (
    <BarContainer>
      <FilterWrapper>
        <GreyText size={13} marginBottom={5}>
          Type
        </GreyText>
        <Combobox
          width="11em"
          items={offeredServiceTypesKeys}
          itemToString={(itemKey) =>
            itemKey ? OFFERED_SERVICE_TYPE[itemKey] : ""
          }
          placeholder="Filter by Type"
          openOnFocus
          selectedItem={serviceType}
          onChange={(type) => handleChange(type, null, null)}
        />
      </FilterWrapper>
      <FilterWrapper>
        <GreyText size={13} marginBottom={5}>
          Rating
        </GreyText>
        <Combobox
          width="11em"
          items={Object.values(OFFERED_SERVICE_RATING_FILTER)}
          placeholder="Filter by Rating"
          selectedItem={serviceRating}
          onChange={(rating) => handleChange(null, rating, null)}
        />
      </FilterWrapper>
      <FilterWrapper>
        <GreyText size={13} marginBottom={5}>
          Price
        </GreyText>
        <Combobox
          width="11em"
          items={Object.values(OFFERED_SERVICE_HOURLY_RATE_FILTER)}
          itemToString={(item) => (item ? item.label : "")}
          placeholder="Filter by Hourly Rate"
          selectedItem={servicePrice}
          onChange={(price) => handleChange(null, null, price)}
        />
      </FilterWrapper>
      {/* <FilterWrapper>
        <GreyText size={13} marginBottom={12}>
          Filter by Price
        </GreyText>
        <SliderWrapper>
          <RangeWithTooltip
            defaultValue={[servicePrice.min, servicePrice.max]}
            min={1}
            max={1000}
            allowCross={false}
            step={10}
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
      </FilterWrapper> */}
    </BarContainer>
  );
}
