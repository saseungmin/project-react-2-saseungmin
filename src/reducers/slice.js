import { createSlice } from '@reduxjs/toolkit';

import produce from 'immer';

import {
  getStudyGroup,
  getStudyGroups,
  postStudyGroup,
} from '../services/api';

const writeInitialState = {
  title: '',
  contents: '',
  moderatorId: '',
  applyEndDate: '',
  participants: [],
  personnel: 0,
  tags: [],
};

const authInitialState = {
  register: {
    userEmail: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    userEmail: '',
    password: '',
  },
};

const { actions, reducer } = createSlice({
  name: 'application',
  initialState: {
    groups: [],
    group: null,
    groupId: null,
    writeField: writeInitialState,
    register: authInitialState.register,
    login: authInitialState.login,
  },

  reducers: {
    setStudyGroups(state, { payload: { groups, tag } }) {
      return {
        ...state,
        groups: tag ? groups.reduce((studies, group) => {
          if (group.tags.includes(tag)) {
            return [...studies, group];
          }

          return studies;
        }, []) : groups,
      };
    },

    setStudyGroup(state, { payload: group }) {
      return {
        ...state,
        group,
      };
    },

    changeWriteField(state, { payload: { name, value } }) {
      const { writeField } = state;

      return {
        ...state,
        writeField: {
          ...writeField,
          [name]: value,
        },
      };
    },

    clearWriteFields(state) {
      return {
        ...state,
        writeField: {
          ...writeInitialState,
        },
      };
    },

    successWrite(state, { payload: groupId }) {
      return {
        ...state,
        groupId,
      };
    },

    changeAuthField(state, { payload: { form, name, value } }) {
      return produce(state, (draft) => {
        draft[form][name] = value;
      });
    },
  },
});

export const {
  setStudyGroups,
  setStudyGroup,
  changeWriteField,
  clearWriteFields,
  successWrite,
  changeAuthField,
} = actions;

export const loadStudyGroups = (tag) => async (dispatch) => {
  const groups = await getStudyGroups();

  dispatch(setStudyGroups({ groups, tag }));
};

export const loadStudyGroup = (id) => async (dispatch) => {
  dispatch(setStudyGroup(null));

  const group = await getStudyGroup(id);

  dispatch(setStudyGroup(group));
};

export const writeStudyGroup = () => async (dispatch, getState) => {
  const { writeField } = getState();

  // NOTE: 현재 로그인 기능이 없는 관계로 임의로 작성자(moderatorId)와 참여자 목록(participants)에 넣어줌
  const groupId = await postStudyGroup({
    ...writeField,
    moderatorId: 'user1',
    participants: [...writeField.participants, 'user1'],
  });

  dispatch(successWrite(groupId));
  dispatch(clearWriteFields());
};

export default reducer;
