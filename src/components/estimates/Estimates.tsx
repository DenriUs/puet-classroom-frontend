import { Select, Table } from 'antd';

import { getUserFullName } from '../../common/helpers';
import { SagaAction } from '../../common/types';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import { courseGradeBookColumns } from './constant';

import './Estimates.scss';

const Estimates = () => {
  const { take } = useAppSelector((state) => state.paginatedDataReducer);
  const { course, courseParticipants, courseGradeBook } = useAppSelector(
    (state) => state.coursesReducer,
  );

  const dispatch = useAppDispatch();

  const handleCourseStudentSubmit = (id: string) => {
    dispatch({
      type: SagaAction.COURSES_GRADE_BOOK_GET_FOR_TEACHER,
      payload: { courseId: course?.id, participantId: id },
    });
  };

  return (
    <div className='estimates'>
      <div className='estimates__title'>Журнал оцінок</div>
      <div className='estimates__table-container'>
        <div className='estimates__form'>
          <label>Виберіть студента</label>
          <Select
            className='estimates__select'
            showSearch
            placeholder='Введіть призвіще та імя студента'
            size='large'
            optionFilterProp='children'
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={(courseParticipants || []).map((participant) => ({
              value: participant.id,
              label: getUserFullName(participant.user),
            }))}
            onChange={(value) => {
              handleCourseStudentSubmit(value);
            }}
            onDropdownVisibleChange={() => {
              dispatch({ type: SagaAction.COURSES_PARTICIPANTS_GET, payload: course?.id });
            }}
          />
        </div>
        <div className='estimates__table'>
          <Table
            pagination={{ defaultPageSize: take }}
            columns={courseGradeBookColumns}
            dataSource={courseGradeBook}
          />
        </div>
      </div>
    </div>
  );
};

export default Estimates;
