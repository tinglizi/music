// 数组去重
// 1.
// 先定义一个空数组，使用indexOf检查是否有重复的元素，如果没有则添加到数组中
var arr1= [1,2,5,6,7,8,5,1,8,6,7,9]
var result = []
for (var i = 0; i < arr1.length; i++){
  if(result.indexOf(arr1[i]) == -1){
    result.push(arr1[i])
  }
}
//2.

