import React from 'react';

import { render } from '@testing-library/react';

import { Context as ResponsiveContext } from 'react-responsive';

import { MemoryRouter } from 'react-router-dom';

import STUDY_GROUPS from '../../../fixtures/study-groups';

import StudyGroups from './StudyGroups';
import MockTheme from '../common/test/MockTheme';

describe('StudyGroups', () => {
  const handleThemeChange = jest.fn();

  const renderStudyGroups = ({ groups, width = 700, user = 'test' }) => render((
    <MockTheme>
      <ResponsiveContext.Provider value={{ width }}>
        <MemoryRouter>
          <StudyGroups
            user={user}
            theme={false}
            groups={groups}
            onChangeTheme={handleThemeChange}
          />
        </MemoryRouter>
      </ResponsiveContext.Provider>
    </MockTheme>
  ));

  context('When desktop screen', () => {
    it('renders "스터디 개설하기" button', () => {
      const { container } = renderStudyGroups({ groups: STUDY_GROUPS });

      expect(container).toHaveTextContent('스터디 개설하기');
    });

    it('renders study group list text contents', () => {
      const { container } = renderStudyGroups({ groups: STUDY_GROUPS });

      STUDY_GROUPS.forEach(({ moderatorId, title, personnel }) => {
        expect(container).toHaveTextContent(title);
        expect(container).toHaveTextContent(personnel);
        expect(container).toHaveTextContent(moderatorId);
      });
    });
  });

  context('When mobile screen', () => {
    it('renders "+" button', () => {
      const { getByTestId, container } = renderStudyGroups({ groups: STUDY_GROUPS, width: 400 });

      expect(container.innerHTML).toContain('<a');
      expect(getByTestId('plus-icon')).not.toBeNull();
    });
  });
});
