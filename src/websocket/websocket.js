function WebSocketHandler() {
    this.userName = '';
    this.userPassword = '';
}
WebSocketHandler.prototype = {
    name:"WebSocketHandle",
    constructor:WebSocketHandler,
    CONST:{
        IP:'localhost',
        PORT:'8081'
    },
    _socket:null,
    _url:null,
    getWebSocket:function (port,ip) {
        if(!this._socket) {
            let url = this.normalizeUrl(port,ip);
            let socket = this._socket = new WebSocket(url);
            // 连接建立时触发
            socket.onopen = function () {
                console.log('onOpen');
            };
            // 客户端接收服务端数据时触发
            socket.onmessage = function (event) {
                let re_data = event.data;

                console.log("server->client:",re_data);
            };
            // 通信发生错误时触发
            socket.onerror = function () {

            };
            // 通信关闭时触发
            socket.onclose = function () {
                console.log("close-connection");
            };
        } else {
            alert('您的浏览器不支持WebSocket协议传输数据！');
        }
        return this._socket;
    },
    normalizeUrl:function (port,ip) {
        if(!this._url) {
            let arr = ['ws:'];
            arr.push(ip||this.CONST.IP);
            arr.push(port||this.CONST.PORT);
            this._url = arr.join('');
        }
       return this._url;
    }
};
window.ws = new WebSocketHandler();