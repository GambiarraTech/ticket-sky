import { useCallback, useState } from 'react';
import {Accept, useDropzone } from 'react-dropzone';
import { MdAddBox } from 'react-icons/md';
import style from '../../styles/promoter/dropzone.module.css';
import { Anybody } from 'next/font/google';
import { stringify } from 'querystring';

interface Props{
    onFileUploaded:(file: File) => void;
}

 const Dropzone:React.FC<Props>  =({onFileUploaded}) =>{

  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback((acceptedFiles: any) => {

    const file = acceptedFiles[0];

    const fileUrl = URL.createObjectURL(file);

    setSelectedFileUrl(fileUrl);

    onFileUploaded(file);
  }, [onFileUploaded]);
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' as unknown as Accept,});

  return (
    <div className={style.dropzone} {...getRootProps()}>
      <input {...getInputProps()} accept='image/*' />
      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt="Banner do evento" />
      ) : (
        <p>
          <MdAddBox />
        </p>
      )}
    </div>
  );
}
export default Dropzone;
