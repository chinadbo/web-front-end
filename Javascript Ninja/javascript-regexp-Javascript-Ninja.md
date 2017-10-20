## 正则表达式
正则表达式通常被称为一个模式（pattern），是一个用简单方式描述或匹配一系列符合某个句法规则的字符串
通过正则字面量 和构造器创建正则表达式： 

`const pattern = /text/g, text = new RegExp('test', 'igm')`

* i - 不区分大小写
* g - 匹配模式中所有实例
* m - 允许匹配多个行

###  匹配一类字符
匹配一个有限字符集中的某一个字符，将字符集放在中括号内，来指定该字符集操作符（字符类操作符）：
* [abc] 表示匹配'a','b','c'中的任何一个字符
* [^abc] 表示除'a','b','c'以外的任意字符
* [a-m] 表示从'a'到'm'之间的所有字符都在字符集内
### 操作符
1. 转义（\），\\[, \],\\\
2. 匹配开始(^)
3. 匹配结束($)
4. 匹配开始到结束(/^test$/)
5. 重复出现
    * 出现一次或根本不出现（字符后加？），如/t?est/可匹配test或est
    * 出现一次或多次（字符后加+），如/t+est/可匹配test,ttest,ttttttest,d但不能匹配est
    * 出现0或多次（字符后加*），如/t*est/可匹配test,est,ttest
    * 指定重复次数（{num}）,/a{4}/匹配联系四个'a'字符的字符串，/a{4,10}/匹配4至10个'a'，/a{4,}/匹配大于等于4个'a'的字符串
6. 预定义字符类
    * \t 水平制表符
    * \b 空格
    * \v 垂直制表符
    * \f 换页符
    * \r 回车
    * \n 换行符
    * . 除了\n之外任意字符
    * \d 任意数字，等价[0-9]
    * \D 任意非数字，等价[^0-9]
    * \w 包括下划线的任意单词字符，等价[A-Za-z0-9]
    * \W 任何非单词字符,等价[^A-Za-z0-9]
    * \s 任何空白字符，空格、制表符、换页符等
    * \S 任何非空白字符
    * \b 匹配单词边界
    * \B 匹配非单词边界
7. 分组（()）,/(ab)+/匹配一个或多个连续的子字符串'ab'
8. 或操作符(OR), /(ab)+|(cd)+/匹配一次或多次的'ab'或者'cd'
9. 反向引用(反斜杠后面加一个要引用的捕获数量)
    /^([dtn])a\1/ 匹配：任意d,t,n开头，且后面跟着一个a，并且再后面跟着的是和第一个捕获相同字符的字符串

## 编译正则表达式
正则表达式在创建之后都处于编译后的状态，正则表达式只编译一次，并将其保存在一个变量中以供后续使用。
```html
<div class='samurai ninja'></div>
<div class='ninja samurai'></div>
<div></div>
<span class='samurai ninja ronin'>
```
创建测试对象，多个元素包含多个样式
```javascript
function findClassInElements(className, type){
    const elems = document.getElementsByTagName(type || '*')
    //用传入的样式名称编译一个正则
    const regex = new RegExp("(^|\\s)" + className + "(\\s|$)")

    let results = []
    for (let i = 0;i < elems.length; i++){
        //进行正则匹配
        if(regex.test(elems[i].className)) results.push(elems[i])
    }
    return results
}
```

##捕获匹配的片段
利用String对象的match()方法，使用局部正则表达式会返回一个数组，该数组包含匹配成功的整个字符串和其他捕获结果。

### 使用match进行全局和局部搜索的不同
```javascript
const html = "<div class='test'><b>Hello</b><i>world!</i></div>"
const results = html.match(/<(\/?)(\w+)([^>]*?)>/)
//results = ["<div class='test'>", "", "div", " class='test'"]

const all = html.match(/<(\/?)(\w+)([^>]*?)>/g)
//all = ["<div class='test'>", "<b>", "</b>", "<i>" ,"</i>", "</div>"]
```
### 捕获的引用
有两种方法，可以引用捕获到的结果：自身匹配，替换字符串

使用反向引用匹配HTML标签内容
```javascript
const html = "<b class='hello'>Hello</b><i>world!</i>"
const pattern = /<(\w+)([^>]*)>(.*?)<(\/\1)/g

let match = patterb.exec(html)
//match = ["<b class='hello'>","b"," class='hello'","Hello"]

match = pattern.exec(html)
//match = ["<i>world!</i>","i","","world!"]
```

调用replace替换字符串

`'fontFamily'.replace(/([A-Z])/g)', '-$1').toLowerCase() // font-family`

没有捕获的分组

要让这一组括号不进行结果捕获，正则表达式的语法允许我们在开始括号后加一个?:标记，这就是被动子表达式。

`const pattern = /((?:ninja-)+)sword/`

`const ninja = 'ninja-ninja-sword'.match(pattern) // ninja[1] == 'ninja-ninja'`

### 利用函数进行替换

1. 将中横线字符串转换成驼峰拼写法

    ```javascript
    function upper(all, letter){return letter.toUpperCase()}
    'border-bottom-width'.replace(/-(\w)/g,upper)
    //borderBottomWidth
    ```
2. foo=1&foo=2&blah=a&blah=b&foo=3 转换成 foo=1,2,3&blah=a,b
    ```javascript
    function compress(source){
        let keys = {}
        source.replace(/([^=&]+)=([^&]*)/g, function(full, key, value){
            keys[key] = (keys[key] ? keys[key] + ',' : '') + value
            return ''
        })

        let result = []
        for (let key in keys){
            result.push(key + '=' + keys[key])
        }
        return result.join('&)
    }
    ```

##解决常见问题

1. 修剪字符串
    * 删除多余空格
        `function trim(str){return (str || '').replace(/^\s+|\s+$/g, '')`
    * 匹配换行符
        ```javascript
        var html = '<b>hello</b>\n<i>world</i>'
        //没有匹配换行符
        /.*/.exec(html)[0] == '<b>hello</b>'
        //使用空白符匹配所有元素
        /[\S\s]*/.exec(html)[0] = '<b>hello</b>\n<i>world</i>'
        //另一种方式
        /(?:.|\s)*/.exec(html)[0] = '<b>hello</b>\n<i>world</i>'
    * 匹配Unicode字符
        ```javascript
        var text = "\u5FCD\u8005\u30D1\u30EF\u30FC"
        //匹配包括Unicode在内的所有字符
        var matchAll = /[\w\u0080 -\uFFFF_-]+/
        ```
    * 转义字符

            `var pattern = /^((\w+)|(\\.))+$/` 
            该正则表达式允许匹配一个单词字符，或一个反斜杠及后面跟随任意字符，或者两者都匹配