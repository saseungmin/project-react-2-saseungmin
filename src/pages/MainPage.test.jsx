import '../util/__mocks__/matchMedia';

import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import STUDY_GROUPS from '../../fixtures/study-groups';

import MainPage from './MainPage';
import MockTheme from '../components/common/test/MockTheme';

describe('MainPage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      groupReducer: {
        groups: STUDY_GROUPS,
      },
      authReducer: {
        user: given.user,
      },
      commonReducer: {
        theme: false,
      },
    }));
  });

  const renderMainPage = () => render((
    <MockTheme>
      <MemoryRouter initialEntries={['/?tag=JavaScript']}>
        <MainPage />
      </MemoryRouter>
    </MockTheme>
  ));

  describe('renders Main Page text contents', () => {
    it('renders theme toggle button', () => {
      const { getByTestId } = renderMainPage();

      expect(getByTestId('theme-toggle')).not.toBeNull();
    });

    it('renders Main Page Title', () => {
      const { container } = renderMainPage();

      expect(container).toHaveTextContent('스터디를 직접 개설하거나 참여해보세요!');
    });

    it('renders Main Page study group tags', () => {
      const { container } = renderMainPage();

      STUDY_GROUPS.forEach(({ tags }) => {
        tags.forEach((tag) => {
          expect(container).toHaveTextContent(tag);
        });
      });
    });

    context('without user', () => {
      given('user', () => (null));
      it("doesn't renders Main Page Link text", () => {
        const { container } = renderMainPage();

        expect(container).not.toHaveTextContent('스터디 개설하기');
      });
    });

    context('with user', () => {
      given('user', () => ('user'));
      it('renders Main Page Link text', () => {
        const { container } = renderMainPage();

        expect(container).toHaveTextContent('스터디 개설하기');
      });
    });
  });

  it('calls dispatch with loadStudyGroups action', () => {
    const { container } = renderMainPage();

    expect(dispatch).toBeCalled();

    expect(container).toHaveTextContent('스터디를 소개합니다.1');
    expect(container).toHaveTextContent('스터디를 소개합니다.2');
  });
});
