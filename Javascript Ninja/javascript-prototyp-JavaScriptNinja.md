# 原型与面向对象
>javascript有几个和原型、实例化、继承相关的陷阱
## 扩展对象
使用hasOwnProperty方法辨别Object原型扩展
```javascript
Object.prototype.keys = function(){
    let keys = []
    for (let i in this) {
        if(this.hasOwnProperty(i)) keys.push(i)
    }
    return keys
}
```
通过使用hasOwnProperty忽略原型对象上的属性，从而跳过原型上的属性

## 扩展数字

原生对象Number，JavaScript在解析数字和数字的属性时结果让人疑惑。（数字变量、数字表达式、数字字面量）

## 子类化原生对象

模拟Array功能，而不是扩展子类
```javascript
function MyArray(){}
MyArray.prototype.length = 0
(function(){
    const methods = ['push', 'pop', 'shift', 'unshift','slice', 'splice', 'join']
    for(let i = 0; i < methods.length; i++)(function(name){
        MyArray.prototype[name] = function(){
            return Array.prototype[name].apply(this, arguments)
        }
    })(methods[i])
})()

let mine = new MyArray()
mine.push(1,2,3)
```

## 实例化问题
直接调用函数还是作为构造器进行调用
```javascript
function(first, last){
    if(!(this instanceof arguments.callee)){
        return new User(first, last)
        //如果错误调用，进行修复
    }
    this.name = first + ' ' + last 
}

const name = 'nokia'
const user = User('ioo', 'du') //错误调用，应该加new
```

## 编写类风格的代码

经典继承语法示例
```javascript
let Person = Object.subClass({
    init: function(isDancing){
        this.dancing = isDancing
    },
    dance: function(){
        return this.dancing
    }
})
let Ninja = Person.subClass({
    init: function(){
        this._super(false)
    },
    dance: function(){
        return this._super
    },
    swingSword: function(){
        return true
    }
})

const person = new Person()
console.log(person.dance())
const ninja = new Ninja()
console.log(ninja.swingSword())
console.log(!ninja.dance())
console.log(person instanceof Person)
console.log(ninja instanceof Ninja && ninja instanceof Person)
```
