import { getDaysInSystem } from '../../common/helpers';
import { useAppSelector } from '../../hooks/reduxhooks';

import clock from '../../global/images/icons/clock.svg';
import finish from '../../global/images/icons/finish.svg';
import study from '../../global/images/icons/study.svg';
import AppLoader from '../AppLoader';

import './CardStatistics.scss';

const CardStatistics = () => {
  const { user } = useAppSelector((state) => state.authReducer);
  const { courses } = useAppSelector((state) => state.coursesReducer);

  if (!user) return <AppLoader />;

  return (
    <div className='statistics'>
      <div className='statistics-containers'>
        <div className='statistics-containers__container'>
          <div className='title-container'>
            <img className='title-icon' src={clock} alt='icon' />
            <span className='title-text'>Днів в системі</span>
          </div>
          <span className='number'>{getDaysInSystem(user.createdAt)}</span>
        </div>
        <div className='statistics-containers__container'>
          <div className='title-container'>
            <img className='title-icon' src={study} alt='icon' />
            <span className='title-text'>Всього курсів</span>
          </div>
          <span className='number'>{courses?.length}</span>
        </div>
        <div className='statistics-containers__container'>
          <div className='title-container'>
            <img className='title-icon' src={finish} alt='icon' />
            <span className='title-text'>Завершених курсів</span>
          </div>
          <span className='number'>30</span>
        </div>
        <div className='statistics-containers__container'>
          <div className='title-container'>
            <img className='title-icon' src={finish} alt='icon' />
            <span className='title-text'>Зданих практичних</span>
          </div>
          <span className='number'>50</span>
        </div>
      </div>
    </div>
  );
};
export default CardStatistics;
