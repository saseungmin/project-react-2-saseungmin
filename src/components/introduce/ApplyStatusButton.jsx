import React from 'react';

import ApproveStatus from '../../styles/ApproveStatus';

import StyledApplyStatusButton from '../../styles/StyledApplyStatusButton';

const checkConfirm = (confirm) => confirm === true;

const ApplyStatusButton = ({
  timeStatus, onApply, userStatus, onCancel,
}) => {
  if (!timeStatus && !userStatus) {
    return (
      <StyledApplyStatusButton
        type="button"
        className="apply"
        onClick={onApply}
      >
        신청하기
      </StyledApplyStatusButton>
    );
  }

  if (!timeStatus && !checkConfirm(userStatus.confirm)) {
    return (
      <>
        <ApproveStatus>
          승인 대기중..
        </ApproveStatus>
        <StyledApplyStatusButton
          type="button"
          className="apply-cancel"
          onClick={onCancel}
        >
          신청 취소
        </StyledApplyStatusButton>
      </>
    );
  }

  if (!timeStatus && checkConfirm(userStatus.confirm)) {
    return (
      <>
        <ApproveStatus>
          승인 완료!
        </ApproveStatus>
        <StyledApplyStatusButton
          type="button"
          className="apply-cancel"
          onClick={onCancel}
        >
          신청 취소
        </StyledApplyStatusButton>
      </>
    );
  }

  if (timeStatus && checkConfirm(userStatus.confirm)) {
    return (
      <StyledApplyStatusButton
        type="button"
        className="apply-complete"
      >
        신청 완료
      </StyledApplyStatusButton>
    );
  }

  return (
    <StyledApplyStatusButton
      type="button"
      className="deadline"
    >
      모집 마감
    </StyledApplyStatusButton>
  );
};

export default React.memo(ApplyStatusButton);
