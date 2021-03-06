// +---------------------------------------------------------------------- 
// | 广西西途比网络科技有限公司 www.c2b666.com 
// +---------------------------------------------------------------------- 
// | 功能描述: 全局变量 
// +---------------------------------------------------------------------- 
// | 时　　间: 2019-11-19 09:28:11  
// +---------------------------------------------------------------------- 
// | 代码创建: 朱荻 <292018748@qq.com> 
// +---------------------------------------------------------------------- 
// | 版本信息: V1.0.0 
// +---------------------------------------------------------------------- 
// | 代码修改:（修改人 - 修改时间） 
// +----------------------------------------------------------------------

export default {
    // 正在执行登录中
    network: {
        running: false,
        refresh: false,
        paddingList: [],
        requestList: []
    },
    // 用户信息
    user: {
        isLogin: false,
        id: null,
        originalData: null,
        token: {
            accessToken: null,
            refreshToken: null,
            expiresIn: 0,
            scope: null
        }
    }
}
