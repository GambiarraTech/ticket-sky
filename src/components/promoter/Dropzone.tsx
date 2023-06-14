import { useCallback, useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { MdAddBox } from 'react-icons/md';
import style from '../../styles/promoter/dropzone.module.css';

/**
 * Props para o componente Dropzone.
 */
interface Props {
    onFileUploaded: (file: File) => void;
}

/**
 * Componente Dropzone para upload de arquivos.
 */
const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState('');

    /**
     * Função de callback chamada quando um arquivo é solto na área do Dropzone.
     * Extrai o arquivo aceito, cria uma URL para o arquivo e chama a função de callback `onFileUploaded`.
     */
    const onDrop = useCallback(
        (acceptedFiles: any) => {
            const file = acceptedFiles[0];

            // Cria uma URL para o arquivo selecionado
            const fileUrl = URL.createObjectURL(file);

            setSelectedFileUrl(fileUrl);

            // Chama a função de callback `onFileUploaded` passando o arquivo selecionado
            onFileUploaded(file);
        },
        [onFileUploaded]
    );

    // Configurações do Dropzone usando o hook `useDropzone` do pacote `react-dropzone`
    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' as unknown as Accept });

    return (
        <div data-testid="dropzone" className={style.dropzone} {...getRootProps()}>
            {/* Input para selecionar o arquivo */}
            <input {...getInputProps()} accept="image/*" />

            {/* Exibe a imagem selecionada se existir, caso contrário exibe um ícone de adicionar arquivo */}
            {selectedFileUrl ? (
                <img src={selectedFileUrl} alt="Banner do evento" />
            ) : (
                <p>
                    <MdAddBox />
                </p>
            )}
        </div>
    );
};

export default Dropzone;
