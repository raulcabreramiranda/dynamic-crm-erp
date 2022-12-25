export const MimeTypesImage = [
  { ext: 'bmp', mime: 'image/bmp' },
  { ext: 'gif', mime: 'image/gif' },
  { ext: 'jpeg', mime: 'image/jpeg' },
  { ext: 'jpg', mime: 'image/jpeg' },
  { ext: 'png', mime: 'image/png' },
  { ext: 'svg', mime: 'image/svg+xml' },
];

export const MimeTypesImageOthers = [
  { ext: 'ico', mime: 'image/vnd.microsoft.ico' },
  { ext: 'tif', mime: 'image/tiff' },
  { ext: 'tiff', mime: 'image/tiff' },
  { ext: 'webp', mime: 'image/webp' },
];

export const MimeTypesPDF = [{ ext: 'pdf', mime: 'application/pdf' }];

export const MimeTypesUpload = MimeTypesImage.concat(MimeTypesPDF);
