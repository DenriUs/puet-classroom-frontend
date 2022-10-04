import profileIcon from '../../../public/profileIcon.png';
import './Course.scss';

interface Props {}

const Course = (props: Props) => {
  return (
    <div className="box">
      <p className="box__title">Мої курси</p>
      <div className="containers-course">
        <div className="containers-course__container">
          <span className="title">Хімія</span>
          <div className="image">
            <img src={profileIcon} alt="icon" />
          </div>
          <div className="decription">
            <span className="decription__teacher">Викладач:</span>
            <span className="decription__name">Олена Бабіч</span>
          </div>
        </div>
        <div className="containers-course__container">
          <span className="title">Хімія</span>
          <div className="image">
            <img src={profileIcon} alt="icon" />
          </div>
          <div className="decription">
            <span className="decription__teacher">Викладач:</span>
            <span className="decription__name">Олена Бабіч</span>
          </div>
        </div>
        <div className="containers-course__container">
          <span className="title">Хімія</span>
          <div className="image">
            <img src={profileIcon} alt="icon" />
          </div>
          <div className="decription">
            <span className="decription__teacher">Викладач:</span>
            <span className="decription__name">Олена Бабіч</span>
          </div>
        </div>
        <div className="containers-course__container">
          <span className="title">Хімія</span>
          <div className="image">
            <img src={profileIcon} alt="icon" />
          </div>
          <div className="decription">
            <span className="decription__teacher">Викладач:</span>
            <span className="decription__name">Олена Бабіч</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
