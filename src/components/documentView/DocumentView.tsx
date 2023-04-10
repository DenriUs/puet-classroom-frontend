import { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.vite';
import { Button } from 'antd';
import {
  LeftOutlined,
  RightOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  DownloadOutlined,
} from '@ant-design/icons';

import AppLoader from '../AppLoader';

import './DocumentView.scss';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

interface Props {
  fileSrc: string | undefined;
}

const DocumentView = (props: Props) => {
  const { fileSrc } = props;

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scalePage, setScalePage] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    setPageNumber(1);
    setScalePage(1);
  }, [fileSrc]);

  const goToPrevPage = () => setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () => setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

  const decrease = () => setScalePage(scalePage <= 1 ? 1 : scalePage - 0.2);

  const increase = () => setScalePage(scalePage >= 1.4 ? 1.4 : scalePage + 0.2);

  return (
    <div className='document-view'>
      <div className='document-view__icon-container'>
        <ZoomInOutlined className='document-view__icon' onClick={increase} />
        <ZoomOutOutlined className='document-view__icon' onClick={decrease} />
        <a className='document-view__icon' href={fileSrc} target='_blank'>
          <DownloadOutlined />
        </a>
      </div>
      <div className='document-view__file-container'>
        <div className='document-view__file-border'>
          <Document
            noData={AppLoader}
            file={fileSrc}
            loading={AppLoader}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} scale={scalePage} />
          </Document>
          <div className='document-view__file-buttons-conatiner'>
            <Button
              className='document-view__button-navigate'
              icon={<LeftOutlined />}
              onClick={goToPrevPage}
            ></Button>
            <span className='document-view__page-info'>
              {pageNumber} / {numPages}
            </span>
            <Button
              className='document-view__button-navigate'
              icon={<RightOutlined />}
              onClick={goToNextPage}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentView;
