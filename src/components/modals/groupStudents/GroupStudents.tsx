import { useEffect } from 'react';
import { Modal, Table, Select } from 'antd';

import { groupParticipantsColumns } from './constant';
import AppLoader from '../../AppLoader';
import { SagaAction, filterOption, filterSort, getUserFullName } from '../../../common';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxhooks';

import './GroupStudent.scss';

interface IProps {
  onStart: boolean;
  handleClose: () => void;
}

const GroupStudentsModal = (props: IProps) => {
  const { onStart, handleClose } = props;
  const { take } = useAppSelector((state) => state.paginatedDataReducer);
  const { group, groupParticipants } = useAppSelector((state) => state.groupsReducer);
  const { students } = useAppSelector((state) => state.studentsReducer);

  const dispatch = useAppDispatch();

  const handleGroupStudentSubmit = (id: string) => {
    dispatch({
      type: SagaAction.GROUPS_PARTICIPANTS_CREATE,
      payload: { group: group?.id, id },
    });
  };

  const handleGroupStudentDelete = (id: string) => {
    dispatch({ type: SagaAction.GROUPS_PARTICIPANTS_DELETE, payload: id });
  };

  useEffect(() => {
    if (group) {
      dispatch({ type: SagaAction.GROUPS_PARTICIPANTS_GET, payload: group?.id });
    }
  }, [group, dispatch]);

  const groupParticipantsData = groupParticipants?.map(({ id, user }) => ({
    key: id,
    name: getUserFullName(user),
    ...user,
    deleteStudents: () => handleGroupStudentDelete(id),
  }));

  return (
    <Modal centered open={onStart} onCancel={handleClose} footer={null} width={1000}>
      <div className='group-students'>
        <div className='group-students__title'>Студенти</div>
        <div className='group-students__table-container'>
          {groupParticipants ? (
            <>
              <div className='group-students__form'>
                <label>Додати студента</label>
                <Select
                  className='grade-students-select'
                  showSearch
                  placeholder='Введіть призвіще та імя студента'
                  size='large'
                  optionFilterProp='children'
                  filterOption={(input, option) => filterOption(input, option)}
                  filterSort={(optionA, optionB) => filterSort(optionA, optionB)}
                  options={(students || []).map((student) => ({
                    value: student.id,
                    label: getUserFullName(student),
                  }))}
                  onChange={(value) => {
                    handleGroupStudentSubmit(value);
                  }}
                  onDropdownVisibleChange={() => {
                    dispatch({ type: SagaAction.STUDENTS_GET });
                  }}
                />
              </div>
              <div className='group-students__table'>
                <Table
                  pagination={{ defaultPageSize: take }}
                  columns={groupParticipantsColumns}
                  dataSource={groupParticipantsData}
                />
              </div>
            </>
          ) : (
            <AppLoader />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default GroupStudentsModal;
