import axios from 'axios'
axios.defaults.baseURL = 'http://120.79.162.149:3000'
axios.defaults.timeout = 3000
// 获取轮播图
export const banner = () => {
  return axios.get('/banner')
}
// 获取推荐歌单
export const recommendList = () => {
  return axios.get('/personalized')
}
// 获取推荐歌单列表
export const recommendListDetail = (id) => {
  return axios.get(`/playlist/detail?id=${id}`)
}
// 获取推荐歌曲
export const recommendSong = () => {
  return axios.get('/personalized/newsong')
}

// 获取歌曲排行
export const rank = (index) => {
  return axios.get(`/top/list?idx=${index}`)
}

// 获取歌手列表
export const getSingers = () => {
  return axios.get('/top/artists?limit=100')
}

// 获取热门搜索
export const getHotSearch = () => {
  return axios.get('/search/hot')
}

// 获取搜索信息
export const getSearchSong = (keyword, page) => {
  return axios.get(`/search?keywords=${keyword}&offset=${page}`)
}

// 获取搜索的专辑名称
export const getAlbum = (keyword) => {
  return axios.get(`/search/suggest?keywords=${keyword}`)
}

// 获取歌手歌曲信息
export const getArtist = (id) => {
  return axios.get(`/artists?id=${id}`)
}

// 获取播放歌曲
export const getPlaySong = (id) => {
  return axios.get(`/music/url?id=${id}`)
}
// 获取播放歌曲歌词
export const getLyric = (id) => {
  return axios.get(`/lyric?id=${id}`)
}

// 获取歌曲详情
export const getSongDetail = (id) => {
  return axios.get(`/song/detail?ids=${id}`)
}
