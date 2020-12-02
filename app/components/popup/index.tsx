import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import styled, { theme } from 'styles/styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { BlackText } from 'components/text';

export interface IPopupProps {
  title?: string;
  trigger?: React.ReactChild;
  /**Controlled state only */
  renderInPortal?: boolean;
  /**Controlled state only */
  isOpen?: boolean;
  minWidth?: string;
  minHeight?: string;
  className?: string;

  children: any | any[];

  onClose?: () => void;
}

const PopupBacklayer = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(59, 59, 59, 0.27058823529411763);
  z-index: 99;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContainer = styled.div<any>`
  min-width: ${({ minWidth }) => minWidth || '7em'};
  min-height: ${({ minHeight }) => minHeight || '5em'};
  max-height: 85%;
  display: flex;
  flex-direction: column;
  background-color: ${theme.default.componentBackground};
  border-radius: 4px;
  padding: 12px 2em;
  position: relative;
`;

const CloseIcon = styled.div`
  font-size: 13px;
  position: absolute;
  top: 2px;
  right: 6px;
  color: ${theme.default.mutedText};
  transition: color 150ms ease-in-out;
  cursor: pointer;

  &:hover {
    color: ${theme.default.secondaryText};
  }
`;

const Title = styled(BlackText)`
  font-size: 17px;
  font-weight: 500;
  padding-bottom: 5px;
  border-bottom: 2px solid ${theme.default.lightGreyText};
  margin-bottom: 1em;
`;

export function Popup(props: IPopupProps) {
  const { title, trigger, renderInPortal, onClose, isOpen, className } = props;

  const [isPopupOpen, setIsOpen] = useState(false);

  const onTriggerClick = () => {
    setIsOpen(true);
  };

  const onPopupClose = () => {
    onClose && onClose();
    setIsOpen(false);
  };

  const popupContent = (
    <>
      {!renderInPortal &&
        React.isValidElement(trigger) &&
        React.cloneElement(trigger, { onClick: onTriggerClick })}
      {(isOpen || isPopupOpen) && (
        <PopupBacklayer>
          <PopupContainer
            className={className}
            minWidth={props.minWidth}
            minHeight={props.minHeight}
          >
            {title && <Title>{title}</Title>}
            <CloseIcon onClick={onPopupClose}>
              <FontAwesomeIcon icon={faTimes} />
            </CloseIcon>
            {props.children}
          </PopupContainer>
        </PopupBacklayer>
      )}
    </>
  );

  if (renderInPortal)
    return ReactDOM.createPortal(
      popupContent,
      document.getElementById('portal-popup') as Element,
    );
  else return popupContent;
}
