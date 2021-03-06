import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { Context as ResponsiveContext } from 'react-responsive';

import { fireEvent, render } from '@testing-library/react';

import STUDY_GROUP from '../../../fixtures/study-group';

import IntroduceForm from './IntroduceForm';
import MockTheme from '../common/test/MockTheme';

describe('IntroduceForm', () => {
  const handleRemove = jest.fn();

  const renderIntroduceForm = ({
    group, time, user = 'user2', width = 830,
  }) => render((
    <MockTheme>
      <ResponsiveContext.Provider value={{ width }}>
        <MemoryRouter>
          <IntroduceForm
            user={user}
            group={group}
            realTime={time}
            onRemove={handleRemove}
          />
        </MemoryRouter>
      </ResponsiveContext.Provider>
    </MockTheme>
  ));

  context('When the screen view is greater than 820px', () => {
    it('renders createDate text', () => {
      const { container } = renderIntroduceForm({ group: STUDY_GROUP });

      expect(container).toHaveTextContent('2020년 12월 06일');
      expect(container).toHaveTextContent('1 / 2');
      expect(container).toHaveTextContent(/하루 후 모집 마감/i);
    });

    it('renders links of tags', () => {
      const { container } = renderIntroduceForm({ group: STUDY_GROUP });

      expect(container.innerHTML).toContain('<a ');
    });

    context('with moderator', () => {
      it('renders delete button and revise button', () => {
        const { container } = renderIntroduceForm({ group: STUDY_GROUP });

        expect(container).toHaveTextContent('수정');
        expect(container).toHaveTextContent('삭제');
      });

      it('click to delete button call event', () => {
        const { getByText } = renderIntroduceForm({ group: STUDY_GROUP });

        fireEvent.click(getByText('삭제'));

        fireEvent.click(getByText('확인'));

        expect(handleRemove).toBeCalled();
      });
    });

    context('without moderator', () => {
      it("doesn't renders delete button and revise button", () => {
        const { container } = renderIntroduceForm({ group: STUDY_GROUP, user: 'user' });

        expect(container).not.toHaveTextContent('수정');
        expect(container).not.toHaveTextContent('삭제');
      });
    });
  });

  context('When the screen view is less than 820px', () => {
    it("Doesn't renders moment times", () => {
      const { container } = renderIntroduceForm({ group: STUDY_GROUP, width: 600 });

      expect(container).not.toHaveTextContent(/하루 후 모집 마감/i);
    });
  });
});
