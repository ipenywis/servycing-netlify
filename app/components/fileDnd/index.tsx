import React, { useState } from 'react';
import { FileDrop } from 'react-file-drop';
import styled, { theme, css } from 'styles/styled-components';

export interface IFileDndProps {
  helperMessage?: string;

  onDrop?: (files: File[], event?: React.DragEvent) => void;
  onDragOver?: (event?: React.DragEvent) => void;
  onDragLeave?: (event?: React.DragEvent) => void;
}

const StyledFileDrop = styled(FileDrop as any)`
  top: 0;
  left: 0;
  position: absolute;
  opacity: 0;
  transition: all 250ms ease-in-out;
  color: ${theme.default.greyText};

  ${({ dragOverTarget }) =>
    dragOverTarget &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      width: 100%;
      height: 100%;
      border: 2px dashed ${theme.default.greyText};
      z-index: 2;
      opacity: 1;
    `};
`;

export function FileDnd(props: IFileDndProps) {
  const { helperMessage, onDragLeave, onDragOver, onDrop } = props;
  const [dragOverTarget, setDragOverTraget] = useState(false);

  return (
    <StyledFileDrop
      dragOverTarget={dragOverTarget}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onFrameDragEnter={event => {
        setDragOverTraget(true);
      }}
      onFrameDragLeave={event => {
        setDragOverTraget(false);
      }}
      onFrameDrop={event => {
        setDragOverTraget(false);
      }}
    >
      {helperMessage || 'Drop Your Files here...'}
    </StyledFileDrop>
  );
}
