import React from 'react';
import Image from 'next/image';
import axios from 'axios';

function LohGoogleImage({
  fileID = '',
  alt = '',
  width = 400,
  height = 400,
  quality = 20,
  style = {},
  ...props
}) {
  const [state, setState] = React.useState(`/cache/${fileID}.png`);
  const [error, setError] = React.useState(0);
  React.useEffect(() => {
    if (fileID === '') {
      setState(`/ledonhome/file-error.jpg`);
      return;
    }
    if (fileID !== '') {
      if (error === 3) {
        setState(`/ledonhome/no-image.jpg`);
      }
      if (error === 2) {
        setState(`/cache/${fileID}.png`);
      }
      if (error === 1) {
        axios.post(`/api/ledonhome/deluminator/${fileID}`).then(null).catch(null);
        setState(`https://drive.google.com/uc?export=view&id=${fileID}`);
      }
    }
  }, [error]);
  React.useEffect(() => {
    if (fileID === '') {
      setState(`/ledonhome/no-image.jpg`);
    }
  }, [state]);

  return (
    <Image
      style={{ width: '100%', height: 'auto', ...style }}
      src={state}
      width={width}
      height={height}
      priority
      alt={alt}
      quality={quality}
      onError={() => {
        setError(error + 1);
      }}
      {...props}
    />
  );
}

export default LohGoogleImage;
