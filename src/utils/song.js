// 返回首页推荐歌单的信息
export const createRecommendSong = (item) => {
  return {
    // 歌曲id , 歌曲名称， 歌曲图片， 歌手
    id: item.id,
    name: item.name,
    picurl: item.song.album.picUrl,
    singer: item.song.artists[0].name
  }
}
