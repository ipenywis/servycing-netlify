import React, { useState, useEffect } from 'react';
import styled, { theme, css } from 'styles/styled-components';
import ImageLoader from 'react-imageloader';
import { FilePicker } from 'evergreen-ui';
import { MinimalSpinner } from 'components/loadingSpinner/minimal';
import { HorizontalWrapper } from 'components/horizontalWrapper';
import { fileToBase64 } from 'utils/file';

export interface IIMageUploaderProps {
  name: string;
  src?: string | File | null;
  placeholder?: string;

  onSelect?: (file: File) => void;
}

const ImageUploaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em 0;
`;

const InnerContainer = styled.div`
  max-width: 17.9em;
`;

const ImagePreviewContainer = styled.div<any>`
  width: 17.9em;
  height: 10.9em;
  margin-bottom: 1.2em;
  border: 1px solid ${theme.default.mutedText};
  ${({ rounded }) =>
    rounded &&
    css`
      border-radius: 50%;
    `};

  img {
    width: 100%;
    height: 100%;
  }
`;

const NoImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.default.lightText};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: ${theme.default.greyText};
`;

const IMAGE_FORMATS = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg+xml'];

export function ImageUploader(props: IIMageUploaderProps) {
  const { src, onSelect, name, placeholder } = props;

  const [thumbnailData, setThumbnailData] = useState<
    string | ArrayBuffer | null
  >(null);

  const loadImageData = async () => {
    if (src) {
      if (src instanceof File) {
        const imageData = await fileToBase64(src);
        setThumbnailData(imageData);
      } else setThumbnailData(src);
    }
  };

  useEffect(() => {
    loadImageData();
  }, [src]);

  return (
    <ImageUploaderContainer>
      <InnerContainer>
        <ImagePreviewContainer>
          {!thumbnailData && (
            <NoImagePlaceholder>
              {placeholder || 'Select Course Thumbnail'}
            </NoImagePlaceholder>
          )}
          {thumbnailData && (
            <ImageLoader
              src={thumbnailData as any}
              preloader={() => (
                <HorizontalWrapper centerVertically centered>
                  <MinimalSpinner size="md" />
                </HorizontalWrapper>
              )}
            >
              Error Uploading!
            </ImageLoader>
          )}
        </ImagePreviewContainer>
        <FilePicker
          name={name}
          accept={IMAGE_FORMATS}
          placeholder="Select Image"
          required={true}
          onChange={files =>
            onSelect &&
            onSelect &&
            files &&
            files.length > 0 &&
            onSelect(files[0])
          }
        />
      </InnerContainer>
    </ImageUploaderContainer>
  );
}
