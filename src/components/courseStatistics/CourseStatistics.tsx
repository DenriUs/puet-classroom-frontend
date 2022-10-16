import { FileDoneOutlined, CalculatorOutlined, ReconciliationOutlined } from '@ant-design/icons';

import './CourseStatistics.scss';

interface Props {}

const CourseStatistics = (props: Props) => (
  <div className='course-statistics'>
    <div className='statistics-containers'>
      <div className='statistics-containers__container'>
        <div className='value-container'>
          <FileDoneOutlined className='value-icon' />
          <span className='value-text'>3</span>
        </div>
        <span className='title'>завершено курсів</span>
      </div>
      <div className='statistics-containers__container'>
        <div className='value-container'>
          <ReconciliationOutlined className='value-icon' />
          <span className='value-text'>6</span>
        </div>
        <span className='title'>пройдено тестів</span>
      </div>
      <div className='statistics-containers__container'>
        <div className='value-container'>
          <CalculatorOutlined className='value-icon' />
          <span className='value-text'>54%</span>
        </div>
        <span className='title'>успішно виконаних завдань</span>
      </div>
    </div>
  </div>
);

export default CourseStatistics;
