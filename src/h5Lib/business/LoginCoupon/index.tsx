import { Toast } from 'antd-mobile';
import React from 'react';
import style from './index.less';

export default function(props:any) {
  const {mainColor, fontColor, imgUrl} = props;
  return (
    <div className={style.loginContainer}>
      <img className={style.img} src={imgUrl}/>
      <div className={style.formItem}>
        <div className={style.lable}>手机号</div>
        <input className={style.input1} placeholder="请输入手机号"/>
      </div>
      <div className={style.formItem}>
        <div className={style.lable}>验证码</div>
        <input className={style.input2} placeholder="短信验证码"/>
        <button className={style.codeBtn} type="button" style={{backgroundColor: mainColor, color: fontColor}}>获取验证码</button>
      </div>
      <button
        className={style.submit}
        type="button"
        style={{backgroundColor: mainColor, color: fontColor}}
        onClick={()=>{Toast.success('领取成功！', 3, undefined, false);}}
      >立即领取</button>
    </div>
  );
}
