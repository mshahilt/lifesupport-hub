export const base64ToBlob = (base64: string): { file: File; fileType: string } => {
  const [header, data] = base64.split(',');
  const mimeType = header.match(/data:([^;]+)/)?.[1] || 'image/jpeg';
  const byteCharacters = atob(data);
  const byteNumbers = new Array(byteCharacters.length);
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType });
  const file = new File([blob], 'avatar.jpg', { type: mimeType });
  
  return { file, fileType: mimeType };
};