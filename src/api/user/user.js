import { request } from '@/utils/net/request'
// import store from '@/store/'

export function getUserLogin(data) {
    return request({
      method: 'POST',
      url: '/app/v1_0/authorizations',
      data
    })
};

export function getCurrentUser() {
  // console.log(store.state.user);
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
};