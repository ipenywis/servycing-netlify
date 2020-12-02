import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faShareSquare } from '@fortawesome/free-regular-svg-icons';
import {
  faClipboard,
  faCopy,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GreyText } from 'components/text';
import React, { useEffect, useState } from 'react';
import styled, { theme } from 'styles/styled-components';
import { useClickOutside } from 'react-click-outside-hook';
import { SLEAR_TWITTER_HANDLE, TWITTER_SHARE_INTENT } from './socialIntents';
import copy from 'copy-to-clipboard';

export interface IShareProps {
  shareTitle: string;
}

const ShareContainer = styled.div`
  display: flex;
  position: relative;
`;

const ShareIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: ${theme.default.greyText};
  cursor: pointer;
  transition: all 110ms ease-in-out;
  user-select: none;

  &:hover {
    &,
    div {
      filter: contrast(0.2);
    }
  }
`;

const SocialShareMenu = styled.div`
  display: flex;
  position: absolute;
  background-color: ${theme.default.componentBackground};
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 1px 1px rgba(15, 15, 15, 0.2);
  left: 0;
  bottom: 22px;
  padding: 0 5px;
`;

const SocialShare = styled.div<any>`
  border-radius: 100%;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  padding: 4px;
  margin: 0 3px;
  font-size: 16px;
  color: ${({ color }) => color};

  &:hover {
    filter: contrast(0.8);
  }
`;

const CopiedText = styled(GreyText)`
  white-space: nowrap;
  font-size: 11px;
`;

export function Share(props: IShareProps) {
  const { shareTitle } = props;

  const [isOpen, setOpen] = useState(false);
  const [linkCopied, setCopied] = useState(false);

  const [ref, handleClickedOutside] = useClickOutside();
  useEffect(() => {
    //Close container when click outside
    if (isOpen && handleClickedOutside) setOpen(false);
  }, [handleClickedOutside]);

  const currentUrl = location.href;

  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  const shareOnTwitter = () => {
    window.open(
      `${TWITTER_SHARE_INTENT}?text=${shareTitle}&url=${currentUrl}&via=${SLEAR_TWITTER_HANDLE}`,
      'blank',
    );
  };

  const copyLink = () => {
    copy(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <ShareContainer ref={ref}>
      <ShareIcon onClick={toggleMenu}>
        <FontAwesomeIcon icon={faShare} />
        <GreyText size={13} marginLeft={4}>
          Share
        </GreyText>
      </ShareIcon>
      {isOpen && (
        <SocialShareMenu>
          {/* <SocialShare color="#3b5999">
            <FontAwesomeIcon icon={faFacebook} />
          </SocialShare> */}
          <SocialShare color="#55acee" onClick={shareOnTwitter}>
            <FontAwesomeIcon icon={faTwitter} />
          </SocialShare>
          {!linkCopied && (
            <SocialShare color={theme.default.greyText} onClick={copyLink}>
              <FontAwesomeIcon icon={faCopy} />
            </SocialShare>
          )}
          {linkCopied && (
            <CopiedText verticalCenter bold>
              Copied
            </CopiedText>
          )}
        </SocialShareMenu>
      )}
    </ShareContainer>
  );
}
