export function fileToBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export function extractFileType(file: File): [string, string] {
  const slashIdx = file.type.indexOf('/');
  const fileType = file.type.slice(0, slashIdx);
  const fileFormat = file.type.slice(slashIdx + 1);
  return [fileType, fileFormat];
}

export function blobToFile(blob: Blob, fileName: string): File {
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  return new File([blob], fileName);
}
