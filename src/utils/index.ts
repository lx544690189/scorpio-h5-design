
import OSS from 'ali-oss';

export const pxToVw = function(px:number){
  return px ? px / 750* 100 : 0;
};

export const ossClient = new OSS({
  region: 'oss-cn-hangzhou',
  accessKeyId: 'LTAI4GF5CXLoMx84LrAK4oGx',
  accessKeySecret: 'h1TDFYqF88odRg5KsALDUszTjAQz5b',
  bucket: 'design-html',
  secure: true,
  cname: true,
  endpoint: 'design-html.oss-cn-hangzhou.aliyuncs.com',
});

export const dataURLtoFile = function(dataUrl:string, fileName:string){
  const arr = dataUrl.split(',');
  // @ts-expect-error
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, {type: mime});
};

// 单纯的延时await写法
export const sleep = function(time:number):Promise<void>{
  return new Promise((resolve)=>{
    setTimeout(() => {
      resolve();
    }, time);
  });
};