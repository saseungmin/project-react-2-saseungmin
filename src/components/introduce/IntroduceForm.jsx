import React from 'react';

import Moment from 'react-moment';

import facepaint from 'facepaint';
import styled from '@emotion/styled';

import { authorizedUsersNumber, changeDateToTime } from '../../util/utils';

import Tags from '../common/Tags';
import palette from '../../styles/palette';
import DateTimeChange from '../common/DateTimeChange';
import IntroduceActionButtons from './IntroduceActionButtons';

const mq = facepaint([
  '@media(min-width: 1024px)',
  '@media(min-width: 1150px)',
]);

const IntroduceReferenceWrapper = styled.div`

  ${mq({
    fontSize: ['2vw', '0.9rem', '1.1rem'],
  })};

  display: flex;
  justify-content: space-evenly;
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: ${palette.gray[1]};
  align-items: center;
  
  label {
    font-weight: bold;
    line-height: 3rem;
    margin-right: .7rem;
  }
`;

const ModeratorWrapper = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  color: ${palette.gray[6]};

  span {
    margin-right: 1rem;
  }

  time {
    font-size: 1rem;
    font-weight: normal;
    color: ${palette.gray[6]};
  }
`;

const IntroduceReference = styled.div`
${mq({
    paddingRight: ['4vw', '30px', '50px'],
  })};

  border-right: 0.1rem solid ${palette.gray[3]};
`;

const IntroduceContentTitle = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0;
  margin-top: 1rem;
  padding: 7px 2rem 7px 2rem;
  border-bottom: 2px solid ${palette.violet[3]};
  width: 17%;
`;

const IntroduceContent = styled.div`
  position: relative;
  margin-top: 2rem;
  border: 0.0625rem solid ${palette.gray[3]};
  border-radius: 0.75rem;
  padding: 1.5rem;
`;

const IntroduceFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IntroduceForm = ({
  user, group, realTime, onRemove, onEdit,
}) => {
  const {
    contents, tags, moderatorId, personnel, participants, applyEndDate, createDate, id,
  } = group;

  const applyEndTime = changeDateToTime(applyEndDate);
  const isCheckOwnGroupPost = (user && user) === moderatorId;

  return (
    <>
      <ModeratorWrapper>
        <span>
          {`🙋‍♂️ ${moderatorId}`}
        </span>
        <Moment interval={0} format="YYYY년 MM월 DD일">{changeDateToTime(createDate)}</Moment>
      </ModeratorWrapper>
      <IntroduceReferenceWrapper>
        <IntroduceReference>
          <label htmlFor="application-status">신청 현황 :</label>
          <span id="application-status">
            {`${authorizedUsersNumber(participants)} / ${personnel}`}
          </span>
        </IntroduceReference>
        <IntroduceReference>
          <label htmlFor="apply-end">모집 마감 일자 :</label>
          <Moment interval={0} format="YYYY년 MM월 DD일 HH:mm">{applyEndTime}</Moment>
        </IntroduceReference>
        <DateTimeChange
          group={group}
          time={realTime}
          page="introduce"
        />
      </IntroduceReferenceWrapper>
      <IntroduceContentTitle>
        소개
      </IntroduceContentTitle>
      <IntroduceContent dangerouslySetInnerHTML={{ __html: contents }} />
      <IntroduceFooter>
        <Tags tags={tags} />
        {isCheckOwnGroupPost && (
          <IntroduceActionButtons
            onEdit={onEdit}
            onRemove={() => onRemove(id)}
          />
        )}
      </IntroduceFooter>
    </>
  );
};

export default React.memo(IntroduceForm);
