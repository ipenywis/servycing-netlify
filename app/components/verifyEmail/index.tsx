import React, { useState } from 'react';
import { Card } from 'components/card';
import styled from 'styles/styled-components';
import ImageLoader from 'react-imageloader';

import EmailImg from 'images/email-receipt.png';
import {
  BlackText,
  GreyText,
  MutedText,
  SuccessText,
  WarningText,
  ErrorText,
} from 'components/text';
import { Marginer } from 'components/marginer';
import { Button } from 'components/button';
import { ButtonTheme } from 'components/button/themes';
import { EMAIL_RESEND_TIMEOUT } from './constants';
import { useSearchQuery } from 'components/withSearchQuery';

export interface IVerifyEmailProps {}

const VerifyEmailCard = styled(Card)`
  width: 20em;
  min-height: 19em;
  align-items: center;
`;

const EmailIcon = styled(ImageLoader)`
  width: 5em;
  height: 5em;

  margin-top: 1em;
  margin-bottom: 10px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export function VerifyEmail(props: IVerifyEmailProps) {
  const [numSentEmails, setNumSent] = useState(0);
  const [isDisabled, setDisabled] = useState(false);

  const searchParams = useSearchQuery();

  const increaseNumEmails = () => {
    setNumSent(numSentEmails + 1);
  };

  const triggerEmailDisableTimeout = () => {
    setDisabled(true);
    setTimeout(() => setDisabled(false), EMAIL_RESEND_TIMEOUT);
  };

  const sendEmail = () => {
    triggerEmailDisableTimeout();
    increaseNumEmails();
  };

  return (
    <VerifyEmailCard titleSize={21}>
      <EmailIcon src={EmailImg}>Error!</EmailIcon>
      <BlackText size={18}>Verify Your Account</BlackText>
      <Marginer margin={5} direction="vertical" />
      <GreyText size="13px" horizontalCenter>
        Please checkout your email inbox, we've sent you a confirmation Email!
      </GreyText>
      <Marginer margin="2em" direction="vertical" />
      {numSentEmails > 0 && numSentEmails <= 5 && (
        <SuccessText size={14} bold>
          {numSentEmails > 1
            ? `${numSentEmails} Confirmation Emails have been sent`
            : 'Confirmation Email has been sent'}
        </SuccessText>
      )}
      {numSentEmails > 5 && (
        <ErrorText size={13} horizontalCenter>
          Something went wrong, please check your email or try later!
        </ErrorText>
      )}
      <Marginer margin="1em" direction="vertical" />
      <Button
        text="Resend Email"
        buttonTheme={ButtonTheme.PRIMARY_SOLID}
        size={13}
        disabled={isDisabled || numSentEmails > 5}
        onClick={sendEmail}
      />
      <Marginer margin={16} direction="vertical" />
      <MutedText size="11px">
        Click the link on the email to verify your account
      </MutedText>
    </VerifyEmailCard>
  );
}
