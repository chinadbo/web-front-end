/**
 * 原型链继承
 * 将父类的实例作为子类的原型对象;
 * 缺点：
 *  1、所有子类实例共享父类引用类型的属性
 *  2、创建子类实例，不能向父类构造函数传递参数
 *  3、无法实现多继承
 */
function Super() {
  this.property = true
}
Super.prototype.getSuperProperty = function () {
  return this.property
}

function Sub() {
  this.subProperty = false
}
Sub.prototype = new Super()
Sub.prototype.getSubProperty = function () {
  return this.subProperty
}

// const instance = new Sub()
// console.log(instance instanceof Sub)
// console.log(Sub.prototype.isPrototypeOf(instance))
// console.log(instance instanceof Super)
// console.log(instance.getSuperProperty())
// console.log(instance.getSubProperty())

/**
 * 经典继承/构造函数继承
 * 借用父类的构造函数
 * 通过apply，call改变父类的构造函数的执行环境
 * 缺点： 
 *  1、实例并不是父类的实例，只是子类的实例
 *  2、只能继承父类的实例属性和方法，不能继承原型属性和方法
 *  3、无法实现函数复用，每个子类都有父类实例函数的副本，影响性能
 */
function SuperColor(name) {
  this.colors = ['red', 'blue']
  this.name = name
}
function SubColor() {
  SuperColor.call(this, 'Children color')
}

const instanceColor1 = new SubColor()
instanceColor1.colors.push('pink')
const instanceColor2 = new SubColor()

// console.log(instanceColor1.colors)
// console.log(instanceColor2.colors)
// console.log(instanceColor2.name)
// console.log(instanceColor1 instanceof SubColor)
// console.log(instanceColor1 instanceof SuperColor)
// console.log(instanceColor1 instanceof Object)

/**
 * 组合继承（原型链+构造函数）
 * 用原型链实现对原型属性和方法的继承，用经典继承来实现对实例属性的继承
 * 缺点： 
 *  1、调用两次父类构造函数，生成了两份实例，子类实例在子类原型上给屏蔽了
 */

 function TeamSuper(name) {
   this.name = name
   this.colors = ['pink', 'blue']
 }
 TeamSuper.prototype.sayColor = function () {
   console.log(this.colors)
 }
 function TeamSub(name, age) {
   TeamSuper.call(this, name)
   this.age = age
 }
 TeamSub.prototype = new TeamSuper()
 TeamSub.prototype.constructor = TeamSub
 TeamSub.prototype.sayAge = function () {
   console.log(this.age)
 }
//  const instanceTeam1 = new TeamSub('team sub 1 name', 24)
//  instanceTeam1.colors.push('red')
//  console.log(instanceTeam1.colors)
//  instanceTeam1.sayColor()
//  instanceTeam1.sayAge()
//  const instanceTeam2 = new TeamSub('team sub 2 name', 30)
//  console.log(instanceTeam2.colors)
//  instanceTeam2.sayColor()
//  instanceTeam2.sayAge()


/**
 * 寄生式继承
 * 砍掉父类的实例属性，在调用两次父类的构造函数的时候，就不会初始化两次实例方法/属性，避免组合继承的缺点。
 * 
 */

function ParasiticSub(name, age) {
  ParasiticSuper.call(this, name)
  this.age = age
}

function ParasiticSuper (name) {
  this.name = name
  this.colors = ['pink', 'blue']
}


(function () {
  // 创建一个没有实例方法的类
  const NoInstance = function () {}
  NoInstance.prototype = ParasiticSuper.prototype
  // 将实例作为子类的原型
  ParasiticSub.prototype = new NoInstance()
  ParasiticSub.prototype.constructor = ParasiticSub
})()

ParasiticSuper.prototype.sayName = function () {
  console.log(this.name)
}

ParasiticSub.prototype.sayAge = function () {
  console.log(this.age)
}



// const instanceParasit1 = new ParasiticSub('child', 23)
// instanceParasit1.colors.push('green')
// console.log(instanceParasit1.name, instanceParasit1.colors)
// instanceParasit1.sayAge()
// instanceParasit1.sayName()
// const instanceParasit2 = new ParasiticSub('child', 23)
// instanceParasit2.colors.push('white')
// console.log(instanceParasit2.name, instanceParasit2.colors)
// instanceParasit2.sayAge()
// instanceParasit2.sayName()
