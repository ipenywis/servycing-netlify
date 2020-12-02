import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled, { theme } from 'styles/styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { BlackText } from 'components/text';
import { Button } from 'components/button';
import { ButtonTheme } from 'components/button/themes';

export interface IAlertProps {
  children: any | any[];
  trigger?: React.ReactChild;
  /**Controlled state only */
  renderInPortal?: boolean;
  /**Controlled state only */
  isOpen?: boolean;
  minWidth?: string;
  minHeight?: string;
  title?: string;
  okBtnText?: string;
  cancelBtnText?: string;

  onCancel?: () => void;
  onOk?: (e: React.MouseEvent) => void | Promise<any>;
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

const AlertContainer = styled.div<any>`
  min-width: ${({ minWidth }) => minWidth || '7em'};
  min-height: ${({ minHeight }) => minHeight || '5em'};
  max-height: 85%;
  display: flex;
  flex-direction: column;
  background-color: ${theme.default.componentBackground};
  border-radius: 4px;
  position: relative;
`;

const ContentContainer = styled.div`
  padding: 1em;
  max-width: 20em;
  font-size: 15px;
  font-weight: 400;
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

const TopContainer = styled.div`
  width: 100%;
  border-bottom: 2px solid ${theme.default.lightGreyText};
  padding: 10px;
  padding-bottom: 4px;
  padding-right: 4em;
`;

const Title = styled(BlackText)`
  width: 100%;
  font-size: 17px;
  font-weight: 500;
`;

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 2em;
  justify-content: flex-end;
  padding: 10px;
`;

function Alert(props: IAlertProps) {
  const {
    onCancel,
    onOk,
    trigger,
    renderInPortal,
    isOpen,
    okBtnText,
    cancelBtnText,
    title,
    minWidth,
    minHeight,
  } = props;
  const [isAlertOpen, setIsOpen] = useState(false);

  const onTriggerClick = () => {
    setIsOpen(true);
  };

  const onDisapprove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCancel && onCancel();
    setIsOpen(false);
  };

  const onApprove = (e: React.MouseEvent) => {
    onOk && onOk(e);
    setIsOpen(false);
  };

  const alertContent = (
    <>
      {!renderInPortal &&
        React.isValidElement(trigger) &&
        React.cloneElement(trigger, { onClick: onTriggerClick })}
      {(isOpen || isAlertOpen) && (
        <PopupBacklayer onClick={e => e.stopPropagation()}>
          <AlertContainer minWidth={minWidth} minHeight={minHeight}>
            <CloseIcon onClick={onDisapprove}>
              <FontAwesomeIcon icon={faTimes} />
            </CloseIcon>
            <TopContainer>{title && <Title>{title}</Title>}</TopContainer>
            <ContentContainer>{props.children}</ContentContainer>
            <FooterContainer>
              <Button
                buttonTheme={ButtonTheme.BLACK_SOLID}
                text={cancelBtnText || 'cancel'}
                onClick={onDisapprove}
                size={13}
              />
              <Button
                buttonTheme={ButtonTheme.DANGER_SOLID}
                text={okBtnText || 'ok'}
                onClick={onApprove}
                size={13}
              />
            </FooterContainer>
          </AlertContainer>
        </PopupBacklayer>
      )}
    </>
  );

  if (renderInPortal)
    return ReactDOM.createPortal(
      alertContent,
      document.getElementById('portal-alert') as Element,
    );
  else return alertContent;
}

Alert.defaultProps = {
  renderInPortal: true,
};

export { Alert };
