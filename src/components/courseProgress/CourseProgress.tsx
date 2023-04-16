import { Progress } from 'antd';
import { useEffect, useMemo, useState } from 'react';

import { SagaAction } from '../../common/types';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';

const CourseProgress = () => {
  const { course, courseGradeBook } = useAppSelector((state) => state.coursesReducer);

  const [percnet, setPercnet] = useState(0);

  const dispatch = useAppDispatch();

  useMemo(() => {
    const result = courseGradeBook?.reduce((prev, cur) => prev + cur.mark, 0);
    if (result && courseGradeBook) return setPercnet(result / courseGradeBook.length);
  }, [courseGradeBook]);

  useEffect(() => {
    dispatch({
      type: SagaAction.COURSES_GRADE_BOOK_GET_FOR_STUDENT,
      payload: { courseId: course?.id },
    });
  }, [course?.id, dispatch]);

  return (
    <Progress
      type='line'
      strokeColor={course?.color}
      trailColor='rgba(199, 212, 224, 1)'
      percent={percnet}
    />
  );
};

export default CourseProgress;
