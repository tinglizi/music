export const Singer = (item) => {
  return {
    // id, 歌手名, 头像，
    id: item.id,
    name: item.name,
    avatar: item.img1v1Url,
    aliaName: item.alias.join(' / ')
  }
}
