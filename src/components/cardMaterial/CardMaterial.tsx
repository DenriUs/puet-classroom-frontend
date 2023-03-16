import { useAppSelector } from '../../hooks/reduxhooks';
import { Empty } from 'antd';

import DocumentView from '../documentView/DocumentView';
import AssignmentInfo from '../assignmentInfo/AssignmentInfo';

import './CardMaterial.scss';

const CardMaterial = () => {
  const { courseActivity } = useAppSelector((state) => state.coursesReducer);

  return (
    <>
      {!courseActivity ? (
        <Empty description={<span className='empty-title'>Виберіть матеріал</span>} />
      ) : (
        <div className='card-material'>
          <div className='card-material__container'>
            <div className='card-material__title-container'>
              <p className='card-material__title-lecture'>{courseActivity?.title}</p>
            </div>
            <DocumentView fileSrc={courseActivity.file.src} />
            {courseActivity.type == 'LECTURE' && <AssignmentInfo />}
          </div>
        </div>
      )}
    </>
  );
};

export default CardMaterial;
