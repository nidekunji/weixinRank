/**
 * @author uu
 * @desc 工具箱
 */

module.exports = {
  getRandom: getRandom,
  getDistance: getDistance,
  getRadian: getRadian,
  getAngle: getAngle,
}
//-------------函数---------------
//获取随机整数
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
//计算两点间的距离并返回
function getDistance(pos1, pos2) {
  return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) +
      Math.pow(pos1.y - pos2.y, 2));
}
/*角度 弧度转换
角度 = 弧度 * 180 / Math.PI
弧度 = 角度 * Math.PI / 180*/
//计算弧度并返回
function getRadian(point) {
  this._radian = Math.PI / 180 * this._getAngle(point);
  return this._radian;
}
//计算角度并返回
function getAngle(point) {
  var pos = this.ring.getPosition();
  this._angle = Math.atan2(point.y - pos.y, point.x - pos.x) * (180 / Math.PI);
  return this._angle;
}