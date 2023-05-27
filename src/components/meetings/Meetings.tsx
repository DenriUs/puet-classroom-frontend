import { Button, Select } from 'antd';
import { VideoCameraAddOutlined, PlayCircleOutlined, ApiOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import './Meetings.scss';

import { filterOption, filterSort, randomID } from '../../common/helpers';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import { SagaAction } from '../../common/types';
import { MeetingSchemaType } from './type';
import { meetingSchema } from './schemas';

const Meetings = () => {
  const { courses, courseMeeting } = useAppSelector((state) => state.coursesReducer);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm<MeetingSchemaType>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(meetingSchema),
  });

  const [disabled, setDisabled] = useState(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleCourseUpdateMeet = (data: MeetingSchemaType) => {
    dispatch({
      type: SagaAction.COURSE_UPDATE,
      payload: { id: data.courseId, meetingUrl: randomID(5) },
    });
  };

  const handleCourseDeleteMeet = () => {
    dispatch({
      type: SagaAction.COURSE_UPDATE,
      payload: { id: courseMeeting?.id, meetingUrl: null },
    });
    dispatch({ type: SagaAction.COURSE_MEETING_DELETE });
    setDisabled(false);
  };

  const onConnectClick = () => navigate(`/main/chat?roomID=${courseMeeting?.meetingUrl}`);

  useEffect(() => {
    dispatch({ type: SagaAction.COURSE_MEETING_GET });
  }, [isSubmitSuccessful, courses]);

  useMemo(() => {
    if (courseMeeting) setValue('courseId', courseMeeting?.name);
  }, [courseMeeting]);

  useEffect(() => {
    if ((isSubmitSuccessful && courseMeeting) || courseMeeting) {
      setDisabled(true);
    }
  }, [courseMeeting, isSubmitSuccessful]);

  return (
    <div className='meeting'>
      <div className='meeting__title'>ЗУСТРІЧІ</div>
      <form
        className='course-modal__form-container'
        onSubmit={handleSubmit(handleCourseUpdateMeet)}
      >
        <div className='meeting__select-container'>
          <Controller
            control={control}
            name='courseId'
            render={({ field: { onBlur, onChange, value } }) => (
              <Select
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                showSearch
                disabled={disabled}
                optionFilterProp='children'
                size='large'
                className='meeting__select'
                placeholder='Виберіть курс'
                filterOption={(input, option) => filterOption(input, option)}
                filterSort={(optionA, optionB) => filterSort(optionA, optionB)}
                options={(courses || []).map((course) => ({
                  value: course.id,
                  label: course.name,
                }))}
                onDropdownVisibleChange={() => {
                  dispatch({ type: SagaAction.COURSES_GET });
                }}
              />
            )}
          />
          {errors.courseId && <p className='form-error-label'>{errors.courseId.message}</p>}
        </div>
        <div className='meeting__button-container'>
          {!courseMeeting?.meetingUrl ? (
            <Button
              type='primary'
              htmlType='submit'
              className='meeting__button'
              shape='round'
              icon={<VideoCameraAddOutlined className='icon' />}
            >
              Розпочати зустріч
            </Button>
          ) : (
            <>
              <Button
                type='primary'
                className='meeting__button-connect'
                shape='round'
                icon={<PlayCircleOutlined className='icon' />}
                onClick={onConnectClick}
              >
                Приєднатися
              </Button>
              <Button
                type='primary'
                danger
                className='meeting__button-connect'
                shape='round'
                icon={<ApiOutlined className='icon' />}
                onClick={handleCourseDeleteMeet}
              >
                Завершити
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Meetings;
