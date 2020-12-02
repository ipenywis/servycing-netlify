import React, { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import styled, { theme } from 'styles/styled-components';
import ImageLoader from 'react-imageloader';
import { fileToBase64 } from 'utils/file';
import { Button } from 'components/button';
import { ButtonTheme } from 'components/button/themes';
import { getCroppedImg } from 'utils/image';
import { HorizontalWrapper } from 'components/horizontalWrapper';
import Cropper from 'react-easy-crop';
import { Point } from 'react-easy-crop/types';
import { Slider } from 'components/slider';
import { Popup } from 'components/popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { blobToFile } from 'utils/file';

export interface IPictureCropUploaderProps {
  placeholder?: string;
  aspectRatio?: number;
  src?: string;
  /**Default: 150 */
  size?: number;

  onChange?: (imageFile: File) => void;
}

const PictureCropContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SelectImageButton = styled.div`
  display: flex;
  opacity: 0;
  width: 70%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 5px 10px;
  color: ${theme.default.secondaryText};
  font-size: 12px;
  font-weight: 500;
  border-radius: 3px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 1px 1px ${theme.default.mutedText};
  cursor: pointer;
  transition: all 140ms ease-in-out;

  &:hover {
    background-color: ${theme.default.secondaryText};
    color: ${theme.default.primaryText};
  }
`;

const SelectImageIcon = styled.div`
  font-size: 18px;
  color: #fff;
  transition: all 100ms ease-in-out;
  opacity: 0;
  position: absolute;
  //transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.49019607843137253);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    transition: all 150ms ease-in-out;
    cursor: pointer;
  }

  svg:hover {
    color: ${theme.default.mutedText};
  }
`;

const PictureContainer = styled.div<any>`
  display: flex;
  width: ${({ cropping, size }) => !cropping && `${size}px`};
  height: ${({ cropping, size }) => !cropping && `${size}px`};
  max-width: 500px;
  max-height: 500px;
  border-radius: ${({ cropping }) => !cropping && '50%'};
  border: 1px solid ${theme.default.mutedText};
  margin-bottom: 1.2em;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${SelectImageButton} {
      opacity: 1;
    }
    ${SelectImageIcon} {
      opacity: 1;
    }
  }
`;

const CroppingContainer = styled.div`
  background: #333;
  position: relative;
  width: 400px;
  height: 400px;

  img {
    width: 100%;
    height: auto;
  }
`;

const StyledReactCrop = styled(ReactCrop)`
  min-width: 100% !important;
  min-height: 100% !important;

  div:first-child {
    width: 100%;
    height: 100%;
  }

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

const FileInput = styled.input`
  display: none;
`;

const CropPopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ControlsContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
  margin-bottom: 1.5em;
`;

function PictureCropUploader(props: IPictureCropUploaderProps) {
  const { placeholder, aspectRatio, src, size, onChange } = props;

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [cropedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [cropping, setCropping] = useState(false);
  const [zoom, setZoom] = useState<number>(1);
  const [imageData, setImageData] = useState<
    string | ArrayBuffer | Blob | null
  >(null);
  const [originalFilename, setOriginalFilename] = useState<string>('picture');
  const [previousImageData, setPreviousImageData] = useState<
    string | ArrayBuffer | Blob | null
  >(null);
  const [applying, setApplying] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const loadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget?.files ? e.currentTarget.files[0] : null;
    if (file) {
      setOriginalFilename(file.name);
      const base64Img = await fileToBase64(file);
      setImageData(base64Img);
      setCropping(true);
    }
  };

  const onSelectClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onApplyCroppingClick = async () => {
    if (imageData) {
      setApplying(true);
      const croppedImgBlob = await getCroppedImg(imageData, cropedAreaPixels);
      setCropping(false);
      if (croppedImgBlob) {
        const file = blobToFile(croppedImgBlob, originalFilename);
        const img = await fileToBase64(file);
        setPreviousImageData(img);
        setImageData(img);
        if (onChange) onChange(file);
      }
      setApplying(false);
    }
  };

  const onCancelClick = () => {
    setCropping(false);
    setImageData(previousImageData);
  };

  return (
    <PictureCropContainer>
      <PictureContainer cropping={cropping} size={size}>
        <Popup isOpen={cropping} onClose={onCancelClick}>
          <CropPopupContainer>
            <CroppingContainer>
              <Cropper
                image={imageData as any}
                crop={crop}
                aspect={aspectRatio}
                zoom={zoom}
                zoomWithScroll
                onCropChange={crop => setCrop(crop)}
                onCropComplete={(crop, pixels) => setCroppedAreaPixels(pixels)}
                onZoomChange={zoom => setZoom(zoom)}
              />
            </CroppingContainer>
            <ControlsContainer>
              <Slider
                width="100%"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={value => setZoom(value)}
              />
            </ControlsContainer>
            <HorizontalWrapper>
              <Button
                buttonTheme={ButtonTheme.FULL_MINIMAL_BLACK}
                text="Apply"
                onClick={onApplyCroppingClick}
                isLoading={applying}
              />
            </HorizontalWrapper>
          </CropPopupContainer>
        </Popup>
        {(src || imageData) && !cropping && (
          <ImageLoader src={(imageData as any) || src}>
            Error Loading Image!
          </ImageLoader>
        )}
        {!imageData && !src && (
          <NoImagePlaceholder>
            {placeholder || 'Upload Picture'}
          </NoImagePlaceholder>
        )}
        {!cropping && (
          <SelectImageIcon>
            <FontAwesomeIcon icon={faCamera} onClick={onSelectClick} />
          </SelectImageIcon>
        )}
      </PictureContainer>
      <FileInput type="file" ref={fileInputRef} onChange={loadImage} />
    </PictureCropContainer>
  );
}

PictureCropUploader.defaultProps = {
  aspectRatio: 1,
  size: 150,
};

export { PictureCropUploader };
