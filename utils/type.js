class Type {
  isString (o)  {// 是否是字符串
    return Object.prototype.toString.call(o).slice(8, -1) === 'String'
  }
  isNumber (o) {// 是否是数字
    return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
  }
  isBoolean (o) {// 是否是boolean
    return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
  }
  isFunction (o) {// 是否是函数
    return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
  }
  isNull (o) {// 是否是NUll
    return Object.prototype.toString.call(o).slice(8, -1) === 'Null'
  }
  isUndefined(o) {// 是否是undefined
    return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'
  }
  isObject (o) {// 是否是Object
    return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
  }
  isArray (o) {// 是否是Array
    return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
  }
  isDate (o) {// 是否是Date
    return Object.prototype.toString.call(o).slice(8, -1) === 'Date'
  }
  isRegExp (o) {// 是否RegExp
    return Object.prototype.toString.call(o).slice(8, -1) === 'RegExp'
  }
  isError (o) {// 是否是Error
    return Object.prototype.toString.call(o).slice(8, -1) === 'Error'
  }
  isSymbol (o) {// 是否是Symbol
    return Object.prototype.toString.call(o).slice(8, -1) === 'Symbol'
  }
  isPromise (o) {// 是否是Promise
    return Object.prototype.toString.call(o).slice(8, -1) === 'Promise'
  }
  isSet (o) {// 是否是Set
    return Object.prototype.toString.call(o).slice(8, -1) === 'Set'
  }

  isIos () { 
    const u = navigator.userAgent
    if (u.indexOf('iPhone') > -1){
      return true
    }
  }
  isPC () { // 是否是PC客户端
    const u = navigator.userAgent
    const agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
    let flag = true
    for (let i = 0, il = agents.length; i < il; i++) {
      if(u.indexOf(agents[i]) > -1) {
        flag = false
        break
      }
    }
    return flag
  }

  browserType(){
    const userAgent = navigator.userAgent //取得浏览器的userAgent字符串
    const isOpera = userAgent.indexOf("Opera") > -1 //判断是否Opera浏览器
    const isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera //判断是否IE浏览器
    const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1
    const isEdge = userAgent.indexOf("Edge") > -1 && !isIE //判断是否IE的Edge浏览器  
    const isFF = userAgent.indexOf("Firefox") > -1 //判断是否Firefox浏览器
    const isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1 //判断是否Safari浏览器
    const isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1 //判断Chrome浏览器

    if (isIE) {
        const reIE = new RegExp("MSIE (\\d+\\.\\d+);")
        reIE.test(userAgent)
        const fIEVersion = parseFloat(RegExp["$1"])
        if(fIEVersion == 7) return "IE7"
        else if(fIEVersion == 8) return "IE8"
        else if(fIEVersion == 9) return "IE9"
        else if(fIEVersion == 10) return "IE10"
        else return "IE7以下" //IE版本过低
    }
    if (isIE11) return 'IE11'
    if (isEdge) return "Edge"
    if (isFF) return "FF"
    if (isOpera) return "Opera"
    if (isSafari) return "Safari"
    if (isChrome) return "Chrome"
  }
  checkStr (str, type) { // 常用字符串检测
    switch (type) {
      case 'phone': // 手机号码
        return /^1[3|4|5|6|7|8][0-9]{9}$/.test(str)
      case 'tel': // 座机
        return /^(0\d{2, 3}-\d{7, 8})(-\d{1,4})?$/.test(str)
      case 'card': // 身份证
        return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str)
      case 'pwd': // 密码以字母开头，长度在6-18位，只能包含字母、数字和下划线
        return /^[a-zA-Z]\w{5-17}$/.test(str)
      case 'postal': //邮政编码
        return /[1-9]\d{5}(?!\d)/.test(str)
      case 'qq': //qq
        return /^[1-9][0-9]{4,9}$/.test(str)
      case 'email': //email
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str)
      case 'money': // 金额（小数点后两位）
        return /^\d*(?:\.\d{0,2})?$/.test(str)
      case 'url': // url
        return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
      case 'ip': //ip
        return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str)
      case 'date': //date
        return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
      case 'number': //date
        return /^[0-9]$/.test(str)
      case 'english': //english
        return /^[a-zA-Z]+$/.test(str)
      case 'chinese': // 中文
        return /^[\u4E00-\u9FA5]+$/.test(str)
      case 'lower': // 小写
        return /^[a-z]+$/.test(str)
      case 'upper': // 小写
        return /^[A-Z]+$/.test(str)
      case 'html': // html
        return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str)
      default:
        return true
    }
  }
  // 严格的身份证校验
  isCard (id) {
    if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(id)) return false // 身份证长度不符
    
    const aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
    if (!aCity[parseInt(id.substr(0, 2))]) return false // 身份证地区非法

    // 出生日期校验
    const birth = id.substr(6, 4) + '/' + id.substr(10, 2) + '/' + id.substr(12, 2), d = new Date(birth)
    if (birth != (d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate())) return false // 出生日期非法

    // 身份证号码校验
    let sum = 0
    const codes = '10X98765432', weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    for (let i = 0, il = id.length - 1; i < il; i++) {
      sum += id[i] * weights[i]
    }
    const last = codes[sum % 11] // 计算最后一位身份证号码
    if (id[id.length - 1] != last) return false // 身份证非法
    return true
  }
}