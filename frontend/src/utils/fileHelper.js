export function getVideoBase64(url) {
  return new Promise(function(resolve, reject) {
    let dataURL = '';
    const video = document.createElement('video');
    video.setAttribute('crossOrigin', 'anonymous'); // 处理跨域
    video.setAttribute('src', url);
    video.setAttribute('width', 420);
    video.setAttribute('height', 360);
    video.muted = true;
    video.addEventListener('loadeddata', function() {
      setTimeout(() => {
        const canvas = document.createElement('canvas');
        const width = video.width; // canvas的尺寸和图片一样
        const height = video.height;
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(video, 0, 0, width, height); // 绘制canvas
        dataURL = canvas.toDataURL('image/jpeg'); // 转换为base64
        video.pause();
        resolve(dataURL);
      }, 200);
    });
    video.play();
  });
}
export function getObjectURL(file) {
  var url = null;
  if (window.createObjectURL != undefined) {
    // basic
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) {
    // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) {
    // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}
export function dataURItoBlob(base64Data) {
  let byteString;
  if (base64Data.split(',')[0].indexOf('base64') >= 0) { byteString = atob(base64Data.split(',')[1]); } else byteString = unescape(base64Data.split(',')[1]);
  const mime = base64Data
    .split(',')[0]
    .split(':')[1]
    .split(';')[0];
  const ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mime });
}
