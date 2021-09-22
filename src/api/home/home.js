import { request } from '@/utils/net/request'

export function getChannels() {
    // console.log(store.state.user);
    return request({
      method: 'GET',
      url: '/app/v1_0/user/channels'
    })
};

export function getArticle(params) {
    // console.log(store.state.user);
    return request({
      method: 'GET',
      url: '/app/v1_1/articles',
      params
    })
};

export function getAllChannels() {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels',
  })
};

export function getSearchThinks(q) {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
};

export function getSearchList(params) {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
};

export function getDetails(article_id) {
  return request({
    method: 'GET',
    url: '/app/v1_0/articles/'+article_id,
  })
};

export function getComments(params) {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
};