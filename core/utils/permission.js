// +---------------------------------------------------------------------- 
// | 广西西途比网络科技有限公司 www.c2b666.com 
// +---------------------------------------------------------------------- 
// | 功能描述: 权限效验类 
// +---------------------------------------------------------------------- 
// | 时　　间: 2019-11-19 09:29:18  
// +---------------------------------------------------------------------- 
// | 代码创建: 朱荻 <292018748@qq.com> 
// +---------------------------------------------------------------------- 
// | 版本信息: V1.0.0 
// +---------------------------------------------------------------------- 
// | 代码修改:（修改人 - 修改时间） 
// +----------------------------------------------------------------------

import regeneratorRuntime from './runtime'

export default class {

    static _setting(params) {
        return new Promise((resolve, reject) => {
            wx.getSetting({
                success(res) {
                    if (typeof (res.authSetting[params]) != 'undefined' && res.authSetting[params]) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            })
        });
    }



    static async check(params) {
        let has = await this._setting(params);             
        if (!has) {
            return new Promise((resolve, reject) => {
                wx.authorize({
                    scope: params,
                    success() {
                        resolve()
                    },
                    fail(e) {
                        reject();
                    }
                })
            })
        }
    }

}