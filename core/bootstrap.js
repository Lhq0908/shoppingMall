// +---------------------------------------------------------------------- 
// | 广西西途比网络科技有限公司 www.c2b666.com 
// +---------------------------------------------------------------------- 
// | 功能描述: 框架启动类 
// +---------------------------------------------------------------------- 
// | 时　　间: 2019-11-19 09:26:49  
// +---------------------------------------------------------------------- 
// | 代码创建: 朱荻 <292018748@qq.com> 
// +---------------------------------------------------------------------- 
// | 版本信息: V1.0.0 
// +---------------------------------------------------------------------- 
// | 代码修改:（修改人 - 修改时间） 
// +----------------------------------------------------------------------

import Config from './config'
import Network from './network'
import Runtime from './runtime'
import Util from './utils/util'

export default class Bootstrap {

    constructor(options) {
        Object.assign(Config, options);
        // API 地址
        if (Config.debug) {
            Config.baseApi = Config.debugApi;
        }
        // 全局配置
        wx.$config = this.config = Config;
        // 全局运行时变量
        wx.$runtime = Runtime;
        // 工具类
        wx.$utils = Util;
        // 附加工具类
        for (const item of Config.attachUtils) {
            wx.$utils[item.name] = item.cls
        }

        if (wx.$config.trace == true) {
            console.log('全局配置', wx.$config);
            console.log('运行时变量', wx.$runtime);
            console.log('工具类', wx.$utils);
        }

        this.attach();

    }

    static init(options) {
        // 类实例
        let instance = new Bootstrap(options);

        instance.checkPermission();
        instance.network();

        // 路由监听必须最后执行
        instance.routeListener();
    }

    // 检查权限
    checkPermission() {

    }

    // 初始化网络框架
    network() {
        wx.$network = new Network();
    }

    routeListener() {
        wx.onAppRoute(res => {
            // 重置网络请求
            wx.$network.clearRequest();
            // 注入页面变量
            let pages = getCurrentPages();
            if (pages.length > 0) {
                let curPage = pages[pages.length - 1];
                curPage.setData({
                    '__HOST__': Config.debug ? Config.debugApi : Config.baseApi,
                    '__STATIC__': Config.staticPath
                })
            }
        })
        wx.onAppRouteDone(res => {

        })
    }

    attach() {
        Date.prototype.format = function (fmt) {
            let o = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "H+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3),
                "S": this.getMilliseconds()
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (let k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
            return fmt;
        }
    }

}