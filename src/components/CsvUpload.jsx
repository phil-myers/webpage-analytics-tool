import { useRef, useState } from 'react';
import { parseAmazonCsv } from '../utils/parseAmazonCsv';
import sampleProducts from '../data/products.json';

function CsvUpload({ onDataLoaded }) {
  const fileInputRef = useRef(null);
  const [error, setError] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    setError(null);

    const text = await file.text();
    const { products, skippedRows, error: parseError } = parseAmazonCsv(text);

    if (parseError) {
      setError(parseError);
      return;
    }
    if (products.length === 0) {
      setError('No valid product rows were found in this file.');
      return;
    }

    onDataLoaded(products, skippedRows);
  };

  const handleInputChange = (e) => {
    handleFile(e.target.files?.[0]);
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div className="csv-upload">
      <div
        className={`csv-upload__dropzone${isDragOver ? ' csv-upload__dropzone--active' : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click();
        }}
      >
        <p className="csv-upload__title">Upload a CSV to get started</p>
        <p className="csv-upload__hint">Drag and drop a file here, or click to browse</p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleInputChange}
          hidden
        />
      </div>

      {error && <p className="csv-upload__error">{error}</p>}

      <button
        type="button"
        className="csv-upload__sample-button"
        onClick={() => onDataLoaded(sampleProducts, 0)}
      >
        Preview with sample data
      </button>
    </div>
  );
}

export default CsvUpload;
