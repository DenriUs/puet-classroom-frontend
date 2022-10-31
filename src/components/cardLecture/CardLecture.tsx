import './CardLecture.scss';
import { FilePdfOutlined } from '@ant-design/icons';
import { CourseActivityEntity } from '../../common/types';
import { render } from 'react-dom';

interface Props {
  data: CourseActivityEntity;
}

const CardLecture = (props: Props) => {
  const {
    data: { title },
  } = props;

  return (
    <div className='box'>
      <div className='box-card'>
        <div className='box-card__title-lecture'>{title}</div>
        <div className='box-card__file'>
          <div className='name-file'>Базові поняття інформаційних мереж.pptx</div>
          <div className='icon-file'>
            <FilePdfOutlined />
          </div>
        </div>
        <div className='box-card__file'>
          <div className='name-file'>Базові поняття інформаційних мереж.pptx</div>
          <div className='icon-file'>
            <FilePdfOutlined />
          </div>
        </div>
        <div className='box-card__file'>
          <div className='name-file'>Базові поняття інформаційних мереж.pptx</div>
          <div className='icon-file'>
            <FilePdfOutlined />
          </div>
        </div>
        <div className='box-card__file'>
          <div className='name-file'>Базові поняття інформаційних мереж.pptx</div>
          <div className='icon-file'>
            <FilePdfOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardLecture;
