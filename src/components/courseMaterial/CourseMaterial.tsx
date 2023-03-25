import { useEffect } from 'react';
import { Empty } from 'antd';
import { useParams } from 'react-router';

import { SagaAction } from '../../common/types';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';

import './CourseMaterial.scss';

import Topics from '../topics/Topics';
import Activities from '../activities/Activities';

const CourseMaterial = () => {
  const { courseActivities } = useAppSelector((state) => state.coursesReducer);

  const dispatch = useAppDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: SagaAction.COURSE_GET, payload: id });
    dispatch({ type: SagaAction.COURSES_TOPICS_GET, payload: id });
  }, [dispatch]);

  return (
    <div className='course-material'>
      <div className='course-material__title-container'>
        <span>Матеріали</span>
      </div>
      <Topics />
      <div className='course-material__table_material-container'>
        {!courseActivities ? (
          <div>
            <Empty description={<span className='empty-title'>Виберіть тему !</span>} />
          </div>
        ) : (
          <Activities />
        )}
      </div>
    </div>
  );
};

export default CourseMaterial;
