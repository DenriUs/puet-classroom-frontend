import { Empty } from 'antd';

import { useAppSelector } from '../../hooks/reduxhooks';
import DocumentView from '../documentView/DocumentView';
import AssignmentInfo from '../assignmentInfo/AssignmentInfo';
import PassedAssignments from '../passedAssignment/PassedAssignments';
import { UserRoleEnum } from '../../common/types';

import './CardMaterial.scss';

const CardMaterial = () => {
  const { courseActivity } = useAppSelector((state) => state.coursesReducer);
  const { user } = useAppSelector((state) => state.authReducer);

  const renderAssignment = () => {
    if (courseActivity?.type === 'ASSIGNMENT' && user?.role === UserRoleEnum.STUDENT) {
      return (
        <>
          <DocumentView fileSrc={courseActivity.file.src} /> <AssignmentInfo />
        </>
      );
    }
    if (courseActivity?.type === 'ASSIGNMENT' && user?.role === UserRoleEnum.TEACHER) {
      return <PassedAssignments />;
    }
  };

  return (
    <div>
      {!courseActivity ? (
        <Empty description={<span className='empty-title'>Виберіть матеріал</span>} />
      ) : (
        <div className='card-material'>
          <div className='card-material__container'>
            <div className='card-material__title-container'>
              <p className='card-material__title-lecture'>{courseActivity?.title}</p>
            </div>
            {courseActivity.type === 'LECTURE' && (
              <DocumentView fileSrc={courseActivity.file.src} />
            )}
            {renderAssignment()}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardMaterial;
