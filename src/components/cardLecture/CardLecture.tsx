import { useAppSelector } from '../../hooks/reduxhooks';
import { Empty } from 'antd';

import './CardLecture.scss';

const CardLecture = () => {
  const { courseActivity } = useAppSelector((state) => state.coursesReducer);

  return (
    <>
      {!courseActivity ? (
        <Empty description={<span className='empty-title'>Виберіть матеріал</span>} />
      ) : (
        <div className='card-material'>
          <div className='card-material__container'>
            <div className='card-material__title-container'>
              <div className='card-material__title-lecture'>{courseActivity?.title}</div>
            </div>
            <div className='card-material__file-container'></div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardLecture;
