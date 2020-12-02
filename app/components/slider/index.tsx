import React, { useEffect, useRef } from 'react';
import styled, { theme } from 'styles/styled-components';

export interface ISliderProps {
  width?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;

  onChange?: (value: number) => void;
}

const SliderWrapper = styled.input.attrs({ type: 'range' })<any>`
  appearance: none;
  width: ${({ width }) => width || '100%'};
  height: 5px;
  background: rgb(218, 218, 218);
  outline: none;
  opacity: 1;
  transition: opacity, background 0.2s;
  border-radius: 4px;
  outline: none;
  background: linear-gradient(
    to right,
    #3498ff 0%,
    #3498ff 0%,
    rgb(218, 218, 218) 0%,
    rgb(218, 218, 218) 100%
  );

  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    background: #fff;
    border: 2px solid #3498ff;
    border-radius: 50%;
    transition: all 200ms ease-in-out;
  }

  &::-moz-range-thumb {
    appearance: none;
    width: 13px;
    height: 13px;
    background: #fff;
    border: 2px solid #3498ff;
    border-radius: 50%;
    transition: all 200ms ease-in-out;
  }
`;

export function Slider(props: ISliderProps) {
  const { width, min, max, step, defaultValue, value, onChange } = props;
  const sliderRef = useRef<HTMLInputElement>(null);

  const changeSliderProgress = () => {
    const input = sliderRef.current;
    if (input) {
      const maxValue = max || 100;
      const value =
        (100 / (maxValue - 1)) * parseFloat(input.value) - 100 / (maxValue - 1);
      const background =
        `linear-gradient(to right, #3498ff 0%, #3498ff ` +
        value +
        '%, rgb(218, 218, 218) ' +
        value +
        '%, rgb(218, 218, 218) 100%)';
      input.style.background = background;
    }
  };

  useEffect(() => {
    const input = sliderRef.current;
    if (input) {
      input.oninput = changeSliderProgress;
    }
  }, []);

  useEffect(() => {
    changeSliderProgress();
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      const value = parseFloat(e.currentTarget.value);
      onChange(value);
    }
  };

  return (
    <SliderWrapper
      ref={sliderRef}
      width={width}
      step={step}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      onChange={handleChange}
    />
  );
}
