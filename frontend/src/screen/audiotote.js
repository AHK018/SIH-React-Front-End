import React, { useState } from 'react';

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const downloadLink = URL.createObjectURL(selectedFile);
      const a = document.createElement('a');
      a.href = downloadLink;
      a.download = selectedFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      // Handle error if no file is selected
      console.error('No file selected!');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Download File</button>
    </div>
  );
};

export default FileUploader;
