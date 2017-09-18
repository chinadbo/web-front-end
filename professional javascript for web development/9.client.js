var client = function() {
    // 呈现引擎
    /**
    * 每个呈现引擎都对应着一个属性，默认值为0，如果检测到哪一个呈现引擎，就将该引擎的版本号以浮点数值
    * 形式写入相应的属性。呈现引擎的完整版本号则以字符串形式写入 ver 属性.
    */
    var engine = {
      ie: 0,
      gecko: 0,
      webkit: 0,
      khtml: 0,
      opera: 0,
  
  
      // 完整的版本号
      var: null
  };
  
  
    // 浏览器
    /**
    * 与 engine 变量一样，除了当前使用的浏览器，其他属性的值都保持为0。当前浏览器的这个属性保存的是
    * 浮点数值形式版本号。 ver 同上。
    */
    var browser = {
    // 主要的浏览器
      ie: 0,
      firefox: 0,
      safari: 0,
      konq: 0,
      opera: 0,
      chrome: 0,
  
  
      // 具体的版本号
      ver: null
  };
  
  
    // 平台、设备和操作系统
    /**
    * 与呈现引擎不同，在不能访问操作系统或版本的情况下，平台信息通常是很有限的。对这三个平台，浏览器
    * 一般只报告 Windows 版本。所以新变量 system 的每个属性最初值都保存着布尔值 false。
    * 在确定平台时，检测 navigator.platform 要比检测用户代理字符串更简单，后者在不同浏览器中会给出
    * 不同的平台信息。navigator.platform 属性可能的值包括：
    * "Win32"、"Win64"、"MacPPC"、"MacIntel"、"X11" 和 "Linux i686"
    * 这些值在不同浏览器都是一致的。
    */
    var system = {
      win: false,/*Windows*/
      mac: false,/*Mac*/
      x11: false,/*Unix*/
  
  
      // 移动设备
      iphone: false,
      ipod: false,
      ipad: false,
      ios: false,
      android: false,
      nokiaN: false,
      winMobile: false,
  
  
      // 游戏系统
      wii: false,/*任天堂*/
      playstation: false /*playstation 3,简称 PS3*/
  };
  
  
    // 检测呈现引擎和浏览器
    var ua = navigator.userAgent;
    /**
    * 要识别 opera，必须得检测 window.opera 对象。Opera 5及更高版本中都有这个对象。在 Opera 7.6       
    * 及更高版本中，调用 Version() 方法可以返回一个表示浏览器版本的字符串，而这也是确定 Opera 版本
    * 号的最佳方式。至于要检测更早版本的 Opera，可以直接检查用户代理字符串，因为早期版本不支持隐藏身
    * 份。但是在 07年底 Opera 的最高版本已经是 9.5 了，所以现在不太可能有人还在使用 7.6 之前的版本。
    */
    if (window.opera) {
      engine.ver = browser.ver = window.opera.version();
      engine.opera = browser.opera = parseFloat(engine.ver);
  } 
    /**
    * WebKit 的用户代理字符串中的 "AppleWebKit"是独一无二的，所以检测这个字符串最合适。
    * eg:
    * "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko)       
    * Chrome/48.0.2564.116 Safari/537.36"
    */
    else if (/AppleWebKit\/(\S+)/.test(ua)) {
      engine.ver = RegExp["$1"];
      engine.webkit = parseFloat(engine.ver);
  
  
      // 此时确定是 Chrome 还是 Safari
      if (/Chrome\/(\S+)/.test(ua)) {
          browser.ver = RegExp["$1"];
          browser.chrome = parseFloat(browser.ver);
      } else if (/Version\/(\S+)/.test(ua)) {
          browser.ver = RegExp["$1"];
          browser.safari = parseFloat(browser.ver);
      } else {
          // 近似确定版本号
          var safariVersion = 1;
          if (engine.webkit < 100) {
              safariVersion = 1;
          } else if (engine.webkit < 312) {
              safariVersion = 1.2;
          } else if (engine.webkit < 412) {
              safariVersion = 1.3;
          } else if (engine.webkit < 523) {
              safariVersion = 2;
          } else if (engine.webkit < 525) {
              safariVersion = 3;
          } else {
              safariVersion = 3.1;
          }
  
  
          browser.safari = browser.ver = safariVersion;
      } 
  } 
    /**
    * 先检测 KHTML,因为 KHTML 的 UA 中也包含了 "Gecko",因此在排除 KHTML 之前，我们无法准确检测基于
    * Gecko 的浏览器。
    * KHTML 与 WebKit 的版本号在 UA 中的格式差不多，因此用了类似的正则表达式。但由于在 Konqueror 
    * 3.1 及更高的版本中不包含 KHTML 的版本，所以要使用 Konqueror 的版本来代替，所以有了后面的正则
    * 表达式。
    */
    else if (/KHTML\/(\S+)/.test(ua) || /Kongqueror\/([^;]+)/.test(ua)) {
          engine.ver = browser.ver = RegExp["$1"];
          engine.khtml = browser.konq = parseFloat(engine.ver);
  } 
    /**
    * Gecko 的版本号不会出现在字符串 "Gecko" 的后面，而是会出现在字符串 "rv:" 的后面。
    */
    else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
          engine.ver = RegExp["$1"];
          engine.gecko = parseFloat(engine.ver);
      // 确定是不是 Firefox
      if (/Firefox\/(\S+)/.test(ua)) {
          browser.ver = RegExp["$1"];
          browser.firefox = parseFloat(browser.ver);
      }
  } 
    // IE 的版本号位于字符串 "MSIE" 的后面，一个分号的前面
    else if (/MSIE ([^;]+)/.test(ua)) {
          engine.ver = browser.ver = RegExp["$1"];
          engine.ie = browser.ie = parseFloat(engine.ver);
  }
  
  
    // 检测浏览器
    // browser.ie = engine.ie;
    // browser.opera = engine.opera;
  
  
    // 检测平台
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
  
  
    // 检测 Windows 操作系统
    // 第一个捕获组匹配 95、98、9x、NT、ME 或 XP，第二个捕获组只针对 Windows ME 及所有 Windows
    // NT 的变体。
    /**
    * 要理解下面的正则表达式，首先要知道不同浏览器在表示不同的 Windows 操作系统时给出的不同字符串。
    * windows版本    IE4+          Gecko          Opera<7          0pera7+      WebKit
    *    95      " Windows 95"    "Win95"      "Windows 95"     "Windows 95      n/a
    *    98       "Windows 98"    "Win98"      "Windows 98"     "Windows 98"     n/a
    *  NT 4.0     "Windows NT"   "WinNT4.O"    "Windows NT 4.O" "Windows NT 4.0" n/a
    *   2000   "Windows NT 5.0" "Windows NT 5.O""Windows 2000"  "Windows NT 5.O" n/a
    *    ME       "Win 9x 4.90" "Win 9x 4.90"   "Windows ME"    "Win 9x 4.90"    n/a
    *    XP  "Windows NT 5.1" "Windows NT 5.1""Windows XP"   "Windows NT 5.1""Windows NT 5.1"
    *  Vista "Windows NT 6.0" "Windows NT 6.0"    n/a        "Windows NT 6.0""Windows NT 6.0"
    *    7   "Windows NT 6.1" "Windows NT 6.1"    n/a        "Windows NT 6.1""Windows NT 6.1"
  */
    if (system.win) {
      if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
          if (RegExp["$1"] == "NT") {
              switch(RegExp["$2"]) {
                case "5.0":
                  system.win = "2000";
                  break;
                case "5.1":
                  system.win = "XP";
                  break;
                case "6.0":
                  system.win = "Vista";
                  break;
                case "6.1":
                  system.win = 7;
                  break;
                default:
                  system.win = "NT";
                  break;
              }
          } else if (RegExp["$1"] == "9x") {
              system.win = "ME";
          } else {
              system.win = RegExp["$1"];
          }
      }
  }
  
  
    // 移动设备
    system.iphone = ua.indexOf("iPhone") > -1;
    system.ipad = ua.indexOf("iPad") > -1;
    system.ipod = ua.indexOf("iPod") > -1;
    system.nokiaN = ua.indexOf("nokiaN") > -1;
  
  
    // windows mobile，简称 Windows CE，用于 Pocket PC 和 Smartphone 中。
    /**
    * 在 Windows Mobile 5.0 及以前版本，上面两种设备的 UA 很相似，比如：
    * Mozilla/4.0 (compatible; MSIE 4.01; Windows CE; PPC; 240x320)
    * Mozilla/4.0 (compatible; MSIE 4.01; Windows CE; Smartphone; 176x220)
    * 因为在 Windows Mobile 5.0 以后版本的浏览器中，移除了上面的记号 "PPC" 和 "Smartphone"，
    * 所以不建议测试字符串中的 "PPC" 和 "Smartphone"。一般情况下，只是到某个设备使用的是 Windows
    * Mobile 就足够了。
    * Windows Phone 7 的 UA 稍有改进，基本格式如下：
    * Mozilla/4.0 (compatible; MSIE 7.0; Windows Phone OS 7.0; Trident/3.1; IEMobile/7.0)
    * Asus; Galaxy6
    * 其中，Windows 操作符的标识符与以往完全不同，在这个用户代理中， client.system.win == "Ph"
    */
    if (system.win == "CE") {
      system.winMobile = system.win;
    } else if (system.win == "Ph") {
      if(/Windows Phone OS (\d+\.\d+)/.test(ua)) {
          system.win = "Phone";
          system.winMobile = parseFloat(RegExp["$1"]);
      }
    }
  
  
    // 检测 iOS 版本
    /**
    * iOS 3 之前，UA 只包含 "CPU like Max OS",后来 iPhone 中又改成 "CPU iPhone OS 3_0 like Mac
    * OS X", iPad 中又改成 "CPU OS 3_2 like Mac OS X"。
    */
    if (system.mac && ua.indexOf("Mobile") > -1) {
      if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
          system.ios = parseFloat(RegExp.$1.replace("_","."));
      } else {
          system.ios = 2;// 因为没有办法确定到底是什么版本，所以设置为更早的版本比较稳妥。
      }
    }
  
  
    // 检测 Android 版本,只需简单的获取字符串 "Android" 紧随其后的版本号
    if (/Android (\d+\.\d+)/.test(ua)) {
      system.android = parseFloat(RegExp.$1);
    }
  
  
    // 游戏系统
    system.wii = ua.indexOf("Wii") > -1;
    system.playstation = /playstation/i.test(ua);
  
  
    // 返回这些对象
    return {
      engine: engine,
      browser: browser,
      system: system
    };
  }();

console.log(client)