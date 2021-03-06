/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import mq from './responsive';
import palette from './palette';

const TextareaWrapper = styled.textarea`
  ${({ theme }) => mq({
    border: [`1px solid ${theme.reviewColor[2]}`, `2px solid ${theme.reviewColor[2]}`],
  })};

  font-family: 'Nanum Gothic', sans-serif;
  font-size: .9rem;
  background: ${({ theme }) => theme.baseTone};
  color: ${({ theme }) => theme.reviewColor[1]};
  resize: none;
  outline: none;
  line-height: 17px;
  display: block;
  margin-bottom: 0.7rem;
  padding: 6px;
  border-radius: 3px;
  transition-property: all;
  transition-delay: initial;
  transition-duration: 0.15s;
  transition-timing-function: ease-in-out;

  &:focus {
    ${({ error }) => !error && css`
      ${mq({ border: [`1px solid ${palette.teal[5]}`, `2px solid ${palette.teal[5]}`] })};
    `};
  }

  ${({ error }) => error && css`
    @keyframes shake {
        0% { left: -5px; }
        100% { right: -5px; }
    };
    ${mq({ border: [`1px solid ${palette.warn[1]}`, `2px solid ${palette.warn[1]}`] })};

    position: relative;
    animation: shake .1s linear;
    animation-iteration-count: 3;
    
    &::placeholder {
      color: ${palette.warn[1]};
    }
  `};
`;

const Textarea = React.forwardRef((props, ref) => (
  <TextareaWrapper {...props} ref={ref} />
));

export default Textarea;
