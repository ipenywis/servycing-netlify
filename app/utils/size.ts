export function bytesToSize(bytes: any): string {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)) as any);
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
}
