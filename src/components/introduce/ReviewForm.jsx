import React from 'react';

import styled from '@emotion/styled';

import StarRatings from 'react-star-ratings';

import { useMediaQuery } from 'react-responsive';

import mq from '../../styles/responsive';

import Button from '../../styles/Button';
import Textarea from '../../styles/Textarea';

const StudyReviewFormWrapper = styled.div`
  ${mq({
    margin: ['1rem 0 2rem 0', '2rem 0 3rem 0'],
    padding: ['20px', '20px'],
  })};

  background-color: ${({ theme }) => theme.reviewColor[0]};
  display: flex;
  flex-direction: column;
  padding: 20px 20px 20px 20px;
  border: 1px solid ${({ theme }) => theme.borderTone[3]};
  border-radius: 5px;
`;

const StudyReviewFormHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 0 0.5rem 0;


  h2 {
  ${mq({
    fontSize: ['1.1rem', '1.3rem', '1.5rem'],
  })};
    margin: 0 0 0.3rem 0;
  }
`;

const StudyReviewFormBody = styled.div`
  ${mq({
    flexDirection: ['column', 'column', 'row'],
  })};

  display: flex;
  justify-content: center;
`;

const StudyReviewFormButton = styled(Button)`
  ${mq({
    margin: [0, 0, '0 0 0.8rem 0.5rem'],
  })};
`;

const ReviewForm = ({
  hasPermission, fields, onChange, onSubmit, error,
}) => {
  const { rating, content } = fields;

  const isMobileScreen = useMediaQuery({ query: '(max-width: 450px)' });

  const handleChangeRating = (newRating, name) => onChange({
    name,
    value: newRating,
  });

  const handleChangeReview = (event) => {
    const { name, value } = event.target;

    onChange({ name, value });
  };

  if (!hasPermission) {
    return null;
  }

  return (
    <StudyReviewFormWrapper>
      <StudyReviewFormHeader>
        <h2>스터디 후기를 작성해주세요!</h2>
        <StarRatings
          rating={rating}
          starRatedColor="#ffc816"
          numberOfStars={5}
          starDimension={isMobileScreen ? '30px' : '40px'}
          starSpacing="0"
          starHoverColor="#ffc816"
          changeRating={handleChangeRating}
          name="rating"
        />
      </StudyReviewFormHeader>
      <StudyReviewFormBody>
        <Textarea
          rows="3"
          cols="100"
          name="content"
          error={error}
          value={content}
          placeholder="후기를 입력해주세요!"
          onChange={handleChangeReview}
        />
        <StudyReviewFormButton
          success
          onClick={onSubmit}
        >
          후기 등록하기
        </StudyReviewFormButton>
      </StudyReviewFormBody>
    </StudyReviewFormWrapper>
  );
};

export default ReviewForm;
