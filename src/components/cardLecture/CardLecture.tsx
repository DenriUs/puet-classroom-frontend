import './CardLecture.scss';
import { FilePdfOutlined } from '@ant-design/icons';

interface Props {}

const CardLecture = (props: Props) => (
  <div className='box'>
    <div className='box-card'>
      <div className='box-card__title-lecture'>Тема 1. Базові поняття інформаційних мереж</div>
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

export default CardLecture;
