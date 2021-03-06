import '../util/__mocks__/matchMedia';

import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import IntroducePage from './IntroducePage';
import MockTheme from '../components/common/test/MockTheme';

describe('IntroducePage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((state) => state({
      groupReducer: {
        group: {
          id: 1,
          moderatorId: 'user1',
          title: '스터디를 소개합니다. 1',
          personnel: 7,
          contents: '우리는 이것저것 합니다.1',
          participants: [],
          tags: [
            'JavaScript',
            'React',
            'Algorithm',
          ],
        },
        applyFields: {
          reason: '',
          wantToGet: '',
        },
        studyReviewFields: {
          rating: 3,
          review: '',
        },
      },
      authReducer: {},
      commonReducer: false,
    }));
  });

  context('with params props', () => {
    it('renders title and theme toggle button', () => {
      const params = { id: '1' };

      const { container, getByTestId } = render((
        <MockTheme>
          <MemoryRouter>
            <IntroducePage params={params} />
          </MemoryRouter>
        </MockTheme>
      ));

      expect(dispatch).toBeCalledTimes(1);

      expect(container).toHaveTextContent('스터디를 소개합니다. 1');

      expect(getByTestId('theme-toggle')).not.toBeNull();
    });
  });

  context('without params props', () => {
    it('renders title and theme toggle button', () => {
      const { container, getByTestId } = render((
        <MockTheme>
          <MemoryRouter initialEntries={['/introduce/1']}>
            <IntroducePage />
          </MemoryRouter>
        </MockTheme>
      ));

      expect(dispatch).toBeCalledTimes(1);

      expect(container).toHaveTextContent('스터디를 소개합니다. 1');

      expect(getByTestId('theme-toggle')).not.toBeNull();
    });
  });
});
