/*get Browser*/
'use strict';
class getBrowser {
    constructor() {
        this.userAgent = navigator.userAgent;
        this.Android = this.userAgent.indexOf('Android') > -1 || this.userAgent.indexOf('Linux') > -1;
        this.IPhone = this.userAgent.indexOf("iPhone") != -1;
        this.Ios = this.userAgent.indexOf('iPhone') > -1 || this.userAgent.indexOf('Mac') > -1;
        this.Ipad = this.userAgent.indexOf('iPad') > -1;
        this.Opera = this.userAgent.indexOf("Opera") > -1;
        this.IE = this.userAgent.indexOf("compatible") > -1 && this.userAgent.indexOf('MSIE') > -1 && !this.Opera;
        this.Edge = this.userAgent.indexOf("Edge") > -1;
        this.FireFox = this.userAgent.indexOf('Firefox') > -1;
        this.Safari = this.userAgent.indexOf('Safari') > -1 && this.userAgent.indexOf('Chrome') == -1;
        this.Chrome = !this.Edge && this.userAgent.indexOf('Chrome') > -1 && this.userAgent.indexOf('Safari') > -1;
        this.IE11 = this.userAgent.indexOf('Trident') > -1 && this.userAgent.indexOf('rv:11.0') > -1;
        this.Wechat=!!this.userAgent.match(/MicroMessenger/i);
        this.Weibo=!!this.userAgent.match(/Weibo/i);
        this.UCBrowser=!!this.userAgent.match(/UCBrowser/i);
        this.QQ=!!this.userAgent.match(/QQ/i);
        this.QQBrowser=!this.userAgent.indexOf('MQQBrowser') > -1 && this.userAgent.indexOf('QQ/');
        this.WinWeChat=!!this.userAgent.match(/WindowsWeChat/i); // PC微信端
    }

    isOS() {
        if (!!this.userAgent.match(/compatible/i) || this.userAgent.match(/Windows/i)) {
            fun( 'windows');
        } else if (!!this.userAgent.match(/Macintosh/i) || this.userAgent.match(/Macintosh/i)) {
            fun( 'macOS');
        } else if (!!this.userAgent.match(/iphone/i) || this.userAgent.match(/Ipad/i)) {
            fun( 'ios');
        } else if (!!this.userAgent.match(/android/i)) {
            fun( 'android');
        } else {
            fun( 'other');
        }
    }

    isTerminal() {
        if (this.IPhone) {
            fun( 'iPhone');
        } else if (this.Android) {
            fun( 'Android');
        } else if (!!this.userAgent.match(/MacIntel/i) || this.userAgent.match(/Macintosh/i)) {
            fun( 'Mac');
        } else if (!!this.userAgent.match(/compatible/i) || this.userAgent.match(/Windows/i)) {
            fun( 'Windows');
        } else if (this.Ipad) {
            fun( 'iPad');
        }

    }

    isEntry() { // 浏览器入口
        if (this.Chrome) {
            fun( 'Chrome');
        }
        if(this.FireFox){
            fun( 'FireFox');
        }
        if(this.Safari){
            fun( 'Safari');
        }
        if(this.IE11){
            fun( 'Ie11');
        }
        if(this.IE){
            fun('Ie')
        }
        if(this.Edge){
            fun( 'Edge');
        }

        if(this.Wechat || this.Android && this.QQBrowser=='-1' && this.QQ){ // 判断安卓 QQ内置 或者 QQ浏览器   微信X5内核
            if(this.Wechat && this.Android){
                fun('AndroidWeChat');
            }else if(this.WinWeChat ){
                alert('电脑微信端');
            }else if(this.Android) {
                fun('AndroidQQBrowser');
            }
        }else if(this.Android && this.QQ){
            fun('AndroidQQ');
        }

        if(this.IPhone && this.Wechat){
            fun('IosWeChat');
        }

        if(this.Weibo){
            fun('WeiBo')
        }

        if(this.UCBrowser){
            fun('UCBrowser');
        }

        if(this.IPhone && this.QQBrowser=='-1' && this.QQ ){ // iPhone QQ内置 或 QQ浏览器
            fun('IosQQBrowser');
        }else if(this.IPhone && this.QQ){
            fun('IosQQ');
        }
    }

    isMobile(){ //detection PC and Mobile
        if(!!this.userAgent.match(/AppleWebKit.*Mobile.*/) && !!this.userAgent.match(/AppleWebKit/)){
            document.writeln('Browser:'+'Mobile Browser'+'<hr>');
        }else {
            document.writeln('Browser:'+'Desktop Browser'+'<hr>');
        }
    }
    isIe(){
        if(this.IE){
            var reIE=new RegExp('MSIE (\\d+\\.\\d+);');
            reIE.test(this.userAgent);
            var IE_version=parseFloat(["$1"]);

            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(this.userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion == 7) {
                document.writeln("IE版本:"+7+'<br>');
            } else if (fIEVersion == 8) {
                document.writeln("IE版本:"+8+'<br>');
            } else if (fIEVersion == 9) {
                document.writeln("IE版本:"+9+'<br>');
            } else if (fIEVersion == 10) {
                document.writeln("IE版本:"+10+'<br>');
            } else {
                document.writeln("IE版本:"+6+'<br>');//IE版本<=7
            }
        }else {

        }
    }

}

function fun(name){
    console.log(name)
}
