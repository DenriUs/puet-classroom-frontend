import { Layout, Select, Table } from 'antd';

import { SagaAction } from '../../common/types';
import HeaderPage from '../../components/header/HeaderPage';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import { courseGradeBookColumns } from './constant';

import './GradeBook.scss';

const GradeBook = () => {
  const { take } = useAppSelector((state) => state.paginatedDataReducer);
  const { courses, courseGradeBook } = useAppSelector((state) => state.coursesReducer);

  const dispatch = useAppDispatch();

  const handleCourseSubmit = (id: string) => {
    dispatch({
      type: SagaAction.COURSES_GRADE_BOOK_GET_FOR_STUDENT,
      payload: { courseId: id },
    });
  };

  return (
    <Layout>
      <HeaderPage />
      <div className='grade-page'>
        <div className='grade-page__name-container'>
          <span>Журнал оцінок</span>
        </div>
        <div className='grade-page__table-container'>
          <div className='grade-page__card'>
            <div className='grade-page__select'>
              <Select
                className='estimates__select'
                showSearch
                placeholder='Виберіть курс'
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
                options={(courses || []).map((course) => ({
                  value: course.id,
                  label: course.name,
                }))}
                onChange={(value) => {
                  handleCourseSubmit(value);
                }}
                onDropdownVisibleChange={() => {
                  dispatch({ type: SagaAction.COURSES_GET });
                }}
              />
            </div>
            <div className='grade-page__table'>
              <Table
                pagination={{ defaultPageSize: take }}
                columns={courseGradeBookColumns}
                dataSource={courseGradeBook}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GradeBook;
