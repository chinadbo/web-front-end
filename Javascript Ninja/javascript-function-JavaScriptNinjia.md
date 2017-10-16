# 函数
## 递归
### 普通命名函数中的递归
> 回文
```javascript
function isPalindrome(text){
	if(text.length <= 1) return true
	if(text.charAt(0) != text.charAt(text.length - 1)) return false
	return isPalindrome(text.substr(1, text.length - 2))
}
```
### 内联命名函数
> 内联命名
```javascript
var ninja = {
	chrip: function signal(n) {
		return n > 1 ? signal(n-1) + '-chrip' : 'chrip'
	}
}
```
##可变长度的参数列表
###函数重载
```javascript
function multiMax(multi){
	return multi * Math.max.apply(Array.prototype.slice.call(arguments, 1))
}
```
###函数重载的方法
>addMethod({}, 'whatever', function(a,b){/*do something*/})
```
function addMethod(obj, name, fn){
	var old = obj[name]
	obj[name] = function(){
		if(fn.length == arguments.length){
			return fn.apply(this, arguments)
		}
		else if(typeof old == 'function'){
			return old.apply(this.arguments)
		}
	}
}
```
### 缓存记忆
通过缓存记忆方法，我们通过监控现有函数值的传入/传出来实现缓存记忆功能。通过闭包创建一个新函数，以便在函数调用的时候自动进行缓存记忆。

```
Function.prototype.memoized = function(key){
    this._values = this._values || {}
    return this._values[key] !== undefined ? this._values[key] : this._values[key] = this.apply(this, arguments)
}
Function.prototype.memoize = function(){
    //通过变量赋值将上下文带到闭包中
    var fn = this
    //在缓存记忆函数中封装原始的函数
    return function(){
        return fn.memoized.apply(fn, arguments)
    }
}
var isPrime = (function(num){
    var prime = num != 1
    for(var i = 2; i < num; i++){
        if(num % i == 0){
            prime = false
            break
        }
    }
    return prime
}).memoize()
```

##函数判断

```javascript
function isFunction(fn){
    return Object.prototype.toString.call(fn) === '[object function]'
}
```

##闭包

>闭包（closure）是一个函数在创建时允许该自身函数访问并操作该自身函数之外的变量时所创建的作用域。也就是说，闭包可以让函数访问所有的变量和函数，只要这些变量和函数存在于该函数声明时的作用于内。

```javascript
var outerValue = 'ninja'
var later
function outerFuntion(){
    var innerValue = 'samurai'

    function innerFunction(paramValue){
    assert(outerValue, 'Inner can see the ninja')
    assert(innerValue, 'Inner can see the samurai')
    assert(paramValue, 'Inner can see the paramValue')
    assert(tooLate, 'Inner can see the tooLate')
    }
    later = innerFunction
}
assert(!tooLate, 'Out can't see the ronin)
var tooLate = 'ronin'

outerFuntion()
later('wakizashi')

```

说明：

1. 内部函数的参数是包含在闭包中的
2. 作用域之外的所有变量，即便是函数声明之后的那些声明，也都包含在闭包中
3. 相同的作用域内，尚未声明的变量不能提前引用

第2、3点解释了为什么内部闭包可以访问到变量toolLate，而外部闭包不行。

### 私有变量

 使用闭包模拟私有变量，限制变量的作用域

```javascript
function Ninja(){
    var feints = 0
    this.getFeints = function(){
        return feints
    }
    this.feint = function(){
        feints++
    }
}
var ninja = new Ninja()
ninja.feint()
assert(ninja.getFeints() == 1, 'access feints')
assert(ninja.feints === undefined, 'inaccessible feints')
```

### 回调（callback）与计时器（timer）

在AJAX请求的callback里使用闭包

```
<div id="div"></div>
<button type="button" id="button"></button>

jQuery('#button').click(function(){
    var elem$ = jQuery('#div')
    elem$.html('Loading...')
    jQuery.ajax({
        url: 'test.html',
        success: function(html){
            assert(elem$, 'callback closure')
            elem$.html(html)
        }
    })
})
```

 在计时器间隔回调（timer interval callback）中使用闭包

```
<div id="div"></div>
animateIt('div')
function animateIt(elem){
    var elem = document.getElementById(elem)
    var tick = 0 //计数器
    var timer = setInterval(function() {
        if(tick < 100){
            elem.style.left = elem.style.top = tick + 'px'
            tick++
        }
        else{
            clearInterval(timer)
            assert(tick = 100, 'closure')
            assert(elem, 'closure')
            assert(timer, 'closure')
        }
    }, 10)

}
```

给事件处理程序绑定特定的上下文

```
function bind(context, name){
    return function(){
        return context[name].apply(context, arguments)
    }
}
var button = {
    clicked: false,
    click: function(){
        this.clicked = true
        assert(button.clicked, 'clicked')
        console.log(this)
    }
}
var elem = document.getElementById('click')
elem.addEventListener('click', bind(button, 'click'), false)
//利用bind函数，将button对象作为上下文绑定在事件处理程序上
```

### 偏应用函数

偏应用函数返回了一个含有预处理参数的新函数，以便后期可以调用。

>在一个函数中首先填充几个参数（然后再返回一个新函数）的技术称之为柯里化

柯里化函数示例(在第一个特定参数中进行填充)

```
Function.prototype.curry = function(){
    var fn = this,args = Array.prototype.slice.call(arguments)
    return function(){
        return fn.apply(this, args.concat(Array.prototype.slice.call(arguments)))
    }
}
```