function WebSocketHandler() {
}
WebSocketHandler.prototype = {
    name:"WebSocketHandle",
    constructor:WebSocketHandler,
    CONST:{
        IP:'localhost',
        PORT:'8081'
    },
    _url:null,
    _count:0,
    createConnection:function(port,ip){
        if(window.WebSocket) {
            let url = this.normalizeUrl(port,ip);
            return new WebSocket(url);
        } else {
            alert('您的浏览器不支持WebSocket协议传输数据！');
        }
    },
    reconnection:function (cb) {
        this._count++;
        if(this._count < 3) {
            let url = this.normalizeUrl();
            var socket =  new WebSocket(url);
            var self = this;
            socket.onopen = function(event){
                cb.call(null,event);
            };
            socket.onerror = function () {
                  self.reconnection(cb);
            };
        } else {
            alert('网络错误，请与管理员联系！QQ:776440448');
        }
    },
    normalizeUrl:function (port,ip) {
        if(!this._url) {
            let arr = ['ws://'];
            if(port) {
                this.CONST.PORT = port;
            }
            ip = ip ? this.CONST.IP = ip:this.CONST.IP;
            arr.push(ip+':');
            port = port ? this.CONST.PORT = port:this.CONST.PORT;
            arr.push(port);
            this._url = arr.join('');
        }
       return this._url;
    }
};