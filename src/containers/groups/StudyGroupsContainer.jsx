import React, { useEffect, useState } from 'react';

import { useInterval } from 'react-use';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useMediaQuery } from 'react-responsive';

import qs from 'qs';

import _ from 'lodash';

import { getAuth, getGroup } from '../../util/utils';

import { loadStudyGroups } from '../../reducers/groupSlice';

import StudyGroups from '../../components/main/StudyGroups';
import ResponsiveGroupsContentLoader from '../../components/loader/ResponsiveGroupsContentLoader';

const StudyGroupsContainer = () => {
  const { search } = useLocation();
  const [realTime, setRealTime] = useState(Date.now());
  const [tagState, setTagState] = useState(null);

  const dispatch = useDispatch();

  const groups = useSelector(getGroup('groups'));
  const user = useSelector(getAuth('user'));

  useInterval(() => setRealTime(Date.now()), 1000);

  useEffect(() => {
    const { tag } = qs.parse(search, {
      ignoreQueryPrefix: true,
    });

    setTagState(tag);
    dispatch(loadStudyGroups(tag));
  }, [dispatch, search]);

  const isDesktop = useMediaQuery({
    minWidth: 1051,
  });

  const isTablet = useMediaQuery({
    minWidth: 650, maxWidth: 1050,
  });

  const isMobile = useMediaQuery({
    maxWidth: 450,
  });

  if (!tagState && _.isEmpty(groups)) {
    return (
      <ResponsiveGroupsContentLoader
        isDesktop={isDesktop}
        isTablet={isTablet}
        isMobile={isMobile}
      />
    );
  }

  return (
    <StudyGroups
      user={user}
      groups={groups}
      realTime={realTime}
    />
  );
};

export default React.memo(StudyGroupsContainer);
