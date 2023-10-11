import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone({ onFilesSelected, file, onFileRemoved }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log(acceptedFiles); // Ver el archivo seleccionado
      onFilesSelected(acceptedFiles[0]); // Tomamos solo el primer archivo
    },
    [onFilesSelected]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false, // Permitir solo un archivo
  });

  return (
    <div {...getRootProps()} className="relative border-2 border-dashed p-4">
      <input {...getInputProps()} />
      {file ? (
        <div className="mb-2 flex items-center justify-between">
          <p>{file.name}</p>
          <span className="cursor-pointer" onClick={onFileRemoved}>
            X
          </span>
        </div>
      ) : (
        <p className="text-gray-500">
          Arrastra y suelta un archivo aquí, o haz clic para seleccionar uno
        </p>
      )}
    </div>
  );
}

export default Dropzone;
