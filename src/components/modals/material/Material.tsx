import { Button, Input, Modal, Radio, RadioChangeEvent, UploadFile, UploadProps } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect, useRef, SetStateAction, Dispatch } from 'react';

import './Material.scss';

import { useAppDispatch } from '../../../hooks/reduxhooks';
import { materialSchema } from './schemas';
import { MaterialSchemaType } from './type';
import { CourseActivityTypeEnum, FileEntity, SagaAction } from '../../../common/types';
import { materialOptions } from './contants';
import FileUpload from '../../fileUpload/FileUpload';

interface IProps {
  id: string | undefined;
  name: string;
  type: SagaAction;
  onStart: boolean;
  materialName?: string;
  materialFile?: Partial<FileEntity> | undefined;
  createMode?: boolean;
  handleClose: () => void;
}

const MaterialModal = (props: IProps) => {
  const { onStart, handleClose, id, name, type, materialName, createMode, materialFile } = props;

  const [typeActivity, setType] = useState(CourseActivityTypeEnum.LECTURE);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const uploadRef = useRef<{ setFileList: Dispatch<SetStateAction<UploadFile<any>[]>> }>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<MaterialSchemaType>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      type: CourseActivityTypeEnum.LECTURE,
    },
    resolver: zodResolver(materialSchema),
  });

  const dispatch = useAppDispatch();

  const clearFileList = () => {
    setFileList([]);
    uploadRef.current && uploadRef.current.setFileList([]);
  };

  const handleMaterialSubmit = async (data: MaterialSchemaType) => {
    dispatch({
      type,
      payload: { id, data, file: fileList[0]?.originFileObj },
    });
    handleClose();
  };

  const onDraggerChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    if (newFileList[0]) newFileList[0].status = 'done';
    setFileList(newFileList);
  };

  useEffect(() => {
    reset({
      title: materialName,
      type: typeActivity,
    });
  }, [materialName]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      clearFileList();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Modal centered open={onStart} onCancel={handleClose} footer={null} width={630}>
      <div className='course-modal'>
        <div className='course-modal__title-container'>{name} матеріал</div>
        <form
          className='course-modal__form-container'
          onSubmit={handleSubmit(handleMaterialSubmit)}
        >
          {createMode && (
            <div className='course-modal__radio-container'>
              <label htmlFor='type'>
                <Controller
                  control={control}
                  name='type'
                  render={({ field }) => (
                    <Radio.Group
                      options={materialOptions}
                      onChange={({ target: { value } }: RadioChangeEvent) => {
                        setType(value);
                        reset({
                          type: value,
                        });
                        field.onChange(value);
                      }}
                      optionType='button'
                      defaultValue={typeActivity}
                    />
                  )}
                />
              </label>
            </div>
          )}
          <div className='course-modal__input-container'>
            <label htmlFor='title'>
              Назва
              <Controller
                control={control}
                name='title'
                render={({ field: { onBlur, onChange, value } }) => (
                  <Input
                    size='large'
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    disabled={isSubmitting}
                  />
                )}
              />
            </label>
            {errors.title && <p className='form-error-label'>{errors.title.message}</p>}
          </div>
          <div className='course-modal__dragger-container '>
            <FileUpload
              id={materialFile?.id as string}
              name={materialFile?.filename as string}
              url={materialFile?.src as string}
              onChange={onDraggerChange}
              ref={uploadRef}
            />
          </div>
          <div className='course-modal__button-container'>
            <Button
              shape='round'
              type='primary'
              htmlType='submit'
              className='course-modal__button button'
            >
              {name}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default MaterialModal;
