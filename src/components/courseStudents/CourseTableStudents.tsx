import { DeleteOutlined } from '@ant-design/icons';
import { Modal, Table } from 'antd';
import { useEffect } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { getUserFullName, showSuccessMessage } from '../../common/helpers';
import { SagaAction } from '../../common/types';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';

const { confirm } = Modal;

interface Participant {
  key: string;
}

const CourseTableStudents = () => {
  const { course, courseParticipants } = useAppSelector((state) => state.coursesReducer);

  const courseId = course?.id;

  const dispatch = useAppDispatch();

  const handleCourseStudentDelete = (id: string) => {
    dispatch({ type: SagaAction.COURSES_PARTICIPANTS_DELETE, payload: id });
    showSuccessMessage('Cтудента видалено з курсу!');
  };

  useEffect(() => {
    dispatch({ type: SagaAction.COURSES_PARTICIPANTS_GET, payload: courseId });
  }, [dispatch]);

  const showDeleteConfirm = (id: string) => {
    confirm({
      title: 'Ви дійсно бажаєте видалити студента з курсу ?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Так',
      okType: 'danger',
      cancelText: 'Ні',
      centered: true,
      onOk() {
        handleCourseStudentDelete(id);
      },
    });
  };

  const coursesStudentsColumns = [
    {
      title: 'П.І.Б',
      dataIndex: 'name',
      key: 'name',
      width: '50%',
      render: (name: string) => <span className='course-name'>{name}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '30%',
      render: (email: string) => <span className='course-teacher'>{email}</span>,
    },
    {
      title: 'Дія',
      key: 'delete',
      width: '20%',
      render: (participant: Participant) => (
        <div onClick={() => showDeleteConfirm(participant.key)}>
          <DeleteOutlined className='file-icon' />
        </div>
      ),
    },
  ];

  const tableData = courseParticipants?.map(({ id, user }) => ({
    key: id,
    name: getUserFullName(user),
    email: user.email,
  }));

  return (
    <Table
      pagination={{
        defaultPageSize: 6,
      }}
      columns={coursesStudentsColumns}
      dataSource={tableData}
    />
  );
};

export default CourseTableStudents;
