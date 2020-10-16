// +---------------------------------------------------------------------- 
// | 广西西途比网络科技有限公司 www.c2b666.com 
// +---------------------------------------------------------------------- 
// | 功能描述: 网络框架 
// +---------------------------------------------------------------------- 
// | 时　　间: 2019-11-19 09:27:53  
// +---------------------------------------------------------------------- 
// | 代码创建: 朱荻 <292018748@qq.com> 
// +---------------------------------------------------------------------- 
// | 版本信息: V1.0.0 
// +---------------------------------------------------------------------- 
// | 代码修改:（修改人 - 修改时间） 
// +----------------------------------------------------------------------

import Config from './config'
import Runtime from './runtime'
// import regeneratorRuntime, { async } from './utils/runtime'

export default class Network {

  constructor(args) {
    this.config = {
      showLoading: true,
      delayed: 1000,
      beforeRequest: null,
      afterRequest: null,
      isLogin: false,
      contentType: 'application/x-www-form-urlencoded'
    }
    this.baseApi = Config.debug ? Config.debugApi : Config.baseApi;
    Object.assign(this.config, args);
  }

  /**
   * 微信登录
   */
  async _login() {
    return new Promise((resolve, reject) => {
      if (Runtime.user.isLogin) {
        resolve();
      } else if (Runtime.network.running) {
        reject();
      } else {
        Runtime.network.running = true;
        const _this = this;
        wx.login({
          success: data => {
            wx.showLoading({
              title: '正在登录'
            });
            wx.request({
              method: 'POST',
              url: this.baseApi + Config.passport,
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                clientId: Config.client.clientId,
                clientSecret: Config.client.clientSecret,
                appId: Config.appId,
                code: data.code
              },
              success(response) {
                const data = response.data;
                if (data.code == 200) {
                  Runtime.network.running = false;
                  Runtime.user.isLogin = true;
                  Runtime.user.token.accessToken = data.result.access_token;
                  Runtime.user.token.refreshToken = data.result.refresh_token;
                  Runtime.user.token.scope = data.result.scope;
                  resolve();
                } else {
                  _this._showError('客户端授权失败', () => {
                    wx.hideLoading()
                  });
                }
              },
              fail(e) {
                console.log(e);
                _this._showError('[客户端授权]无法连接服务器', () => {
                  wx.hideLoading()
                });
              }
            })
          }
        })
      }
    })
  }

  /**
   * 刷新 TOKEN
   */
  async _refresh() {
    return new Promise((resolve, reject) => {
      if (!Runtime.network.refresh) {
        resolve();
      } else {
        Runtime.network.refresh = true;
        const _this = this;
        wx.login({
          success: data => {
            wx.showLoading({
              title: '正在登录'
            });
            wx.request({
              method: 'POST',
              url: this.baseApi + Config.refreshApi,
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                'grant_type': 'refresh_token',
                'client_id': Config.client.clientId,
                'client_secret': Config.client.clientSecret,
                'scope': Runtime.user.token.scope,
                'refresh_token': Runtime.user.token.refreshToken
              },
              success(response) {

                if (response.statusCode == 200) {
                  const data = response.data;
                  Runtime.network.refresh = false;
                  Runtime.user.isLogin = true;
                  Runtime.user.token.accessToken = data.access_token;
                  Runtime.user.token.refreshToken = data.refresh_token;
                  Runtime.user.token.scope = data.scope;

                  resolve();
                } else {
                  _this._showError('客户端授权失败', () => {
                    wx.hideLoading()
                  });
                }
              },
              fail(e) {
                console.log(e);
                _this._showError('[客户端授权]无法连接服务器', () => {
                  wx.hideLoading()
                });
              }
            })
          }
        })
      }
    })
  }

  get(api, params = {}) {
    return this._request(api, params, 'GET');
  }

  post(api, params) {
    return this._request(api, params, 'POST');
  }

  put(api, params) {
    return this._request(api, params, 'PUT');
  }

  delete(api, params) {
    return this._request(api, params, 'DELETE');
  }

  _request(api, params, method) {
    return new Promise((resolve, reject) => {
      let c = (async () => {
        // 1.将请求压入等待队列
        Runtime.network.paddingList.push({ method, api, params, resolve, reject });
        // 2.判断是否登录               
        await this._login();
        // 3.登录成功后 发送所有阻塞的请求
        while (Runtime.network.paddingList.length > 0) {
          const request = Runtime.network.paddingList.shift();
          if (Runtime.network.refresh) {
            Runtime.network.requestList.push(request);
          } else {
            await this._sendRequest(request.api, request.params, request.method)
              .then((data) => {
                request.resolve(data);
              }).catch(e => {
                // TOKEN 需要刷新
                if (e == 402) {
                  Runtime.network.refresh = true;
                  // 将需要刷新的接口压入等待队列
                  Runtime.network.requestList.push(request);
                  let c = (async () => {
                    await this._refresh().catch(e => {});
                    Runtime.network.refresh = false;
                    while (Runtime.network.requestList.length > 0) {
                      const retry = Runtime.network.requestList.shift();
                      const reData = await this._sendRequest(retry.api, retry.params, retry.method);
                      retry.resolve(reData);
                    }
                  })();
                  c.catch(e => { console.log(e); })
                }
              });
          }
        }
      })();
      c.catch(e => {});
    })
  }

  async _sendRequest(api, params = {}, method = 'GET') {
    return new Promise((resolve, reject) => {
      // if (Runtime.user.isLogin) {
      //     Config.requestInterceptor().catch(() => { reject() });
      // }
      let delayedFlag = true;
      const _this = this;
      wx.request({
        url: this.baseApi + api,
        data: params,
        method: method,
        header: {
          authorization: 'Bearer ' + Runtime.user.token.accessToken,
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(result) {
          if (Config.trace) {
            console.log('\n');
            console.log('###', '发起请求', '-------');
            console.log('API名称', _this.__proto__.constructor.name);
            console.log('请求接口', _this.baseApi + api);
            console.log('接口参数', params);
            console.log('请求状态', result.statusCode);
            console.log('返回数据', result.data);
            console.log('###', '请求结束', '-------');
          }
          if (result.statusCode == 200) {
            const data = result.data;
            switch (data.code) {
              // 正常返回
              case 200:
                resolve(data);
                break;
              case 300:
                resolve(data);
                break;
                // 无效 token
              case 401:
                reject(data.code);
                break;
                // 过期
              case 402:
                reject(data.code);
                break;
            }
          } else {
            _this._showError('服务器发生错误', () => {});
          }

        },
        fail() {
          if (Config.trace) {
            console.log('\n');
            console.log('###', '请求失败->', _this.baseApi + api);
          }
          wx.showToast({
            title: '服务器连接失败',
            icon: 'none',
            duration: 2000
          });
        },
        complete() {
          if (_this.config.showLoading) {
            delayedFlag = false;
            wx.hideLoading();
          }
        }
      });
      // 发起请求后1秒
      if (_this.config.showLoading) {
        setTimeout(() => {
          if (delayedFlag) {
            wx.showLoading({
              title: '请稍候'
            });
          }
        }, _this.config.delayed);
      }
    })
  }

  // 重置网络请求状态
  clearRequest() {
    if (wx.$runtime.network.running || wx.$runtime.user.running) {
      wx.$runtime.network.requestList = [];
      wx.$runtime.network.running = false;
      wx.$runtime.user.running = false;
    }
  }



  _showError(message, callback = () => {}, duration = 2000) {
    wx.showToast({
      title: message,
      icon: 'none',
      duration: duration,
      success() {
        callback();
      }
    });
  }
}