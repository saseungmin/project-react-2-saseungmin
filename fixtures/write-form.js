import { tomorrow, toStringEndDateFormat } from '../src/util/utils';

const writeForm = {
  title: '스터디를 소개합니다.1',
  contents: '<p> 우리는 이것저것 합니다.1 </p>',
  moderatorId: 'user1',
  applyEndDate: toStringEndDateFormat(tomorrow),
  participants: [],
  personnel: '1',
  tags: [
    'JavaScript',
    'Algorithm',
  ],
};

export default writeForm;
