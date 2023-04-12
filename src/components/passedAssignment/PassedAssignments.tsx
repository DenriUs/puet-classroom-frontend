import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { FileDoneOutlined, AuditOutlined } from '@ant-design/icons';

import './PassedAssignments.scss';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import { passedAssignmentColumns } from './constant';
import { SagaAction } from '../../common/types';
import AssignmentModal from '../modals/assignment/Assignment';
import { getVerifiedWorks } from '../../common/helpers';

const PassedAssignments = () => {
  const { take } = useAppSelector((state) => state.paginatedDataReducer);
  const { courseActivity, coursePassedAssignments } = useAppSelector(
    (state) => state.coursesReducer,
  );
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useAppDispatch();

  const onRowSelect = (id: string | undefined) => {
    dispatch({ type: SagaAction.COURSES_PASSED_ASSIGNMENT_GET, payload: id });
    handleShow();
  };

  useEffect(() => {
    dispatch({ type: SagaAction.COURSES_PASSED_ASSIGNMENTS_GET, payload: courseActivity?.id });
  }, [dispatch, courseActivity]);

  return (
    <div className='passed-assignment__container'>
      <div className='passed-assignment__info-container'>
        <div className='passed-assignment__title-container'>
          <FileDoneOutlined className='title-status__icon' />
          <p className='title-status__count'>Кількість зданих робіт:</p>
          <p className='title-status__count'>{coursePassedAssignments?.length}</p>
        </div>
        <div className='passed-assignment__title-container'>
          <AuditOutlined className='title-status__icon' />
          <p className='title-status__count'>Кількість перевірених робіт:</p>
          <p className='title-status__count'>{getVerifiedWorks(coursePassedAssignments)}</p>
        </div>
      </div>
      <div className='passed-assignment__table-container'>
        <Table
          pagination={{ defaultPageSize: take }}
          columns={passedAssignmentColumns}
          dataSource={coursePassedAssignments}
          onRow={(record) => ({
            onClick: () => {
              onRowSelect(record.id);
            },
          })}
        />
        <AssignmentModal onStart={show} handleClose={handleClose} />
      </div>
    </div>
  );
};

export default PassedAssignments;
