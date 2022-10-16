import './CardStatistics.scss';
import clock from '../../global/images/icons/clock.svg';
import finish from '../../global/images/icons/finish.svg';
import study from '../../global/images/icons/study.svg';

interface Props {}

const CardStatistics = (props: Props) => (
  <div className='statistics'>
    <div className='statistics-containers'>
      <div className='statistics-containers__container'>
        <div className='title-container'>
          <img className='title-icon' src={clock} alt='icon' />
          <span className='title-text'>Днів на сайті</span>
        </div>
        <span className='number'>400</span>
      </div>
      <div className='statistics-containers__container'>
        <div className='title-container'>
          <img className='title-icon' src={study} alt='icon' />
          <span className='title-text'>Всього курсів</span>
        </div>
        <span className='number'>67</span>
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

export default CardStatistics;
