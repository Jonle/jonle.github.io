(function () {
    let d = document,
        w = window,
        p = parseInt,
        dd = d.documentElement,
        db = d.body,
        dc = d.compatMode === 'CSS1Compat',
        dx = dc ? dd: db,
        ec = encodeURIComponent;


    w.CHAT = {
        msgObj:d.getElementById("message"),
        screenheight:w.innerHeight ? w.innerHeight : dx.clientHeight,
        username:null,
        userid:null,
        socket:null,
        //让浏览器滚动条保持在最低部
        scrollToBottom:function(){
            w.scrollTo(0, this.msgObj.clientHeight);
        },
        //退出，本例只是一个简单的刷新
        logout:function(){
            //this.socket.disconnect();
            location.reload();
        },
        //提交聊天消息内容
        submit:function(){
            let content = d.getElementById("content").value;
            if(content !== ''){
                let obj = {
                    userid: this.userid,
                    username: this.username,
                    content: content
                };
                this.socket.send(JSON.stringify({eventType:'message', data:obj}));
                d.getElementById("content").value = '';
            }
            return false;
        },
        //更新系统消息，本例中在用户加入、退出的时候调用
        updateSysMsg:function(obj, action){
            //当前在线用户列表
            let onlineUsers = obj.onlineUsers;
            //当前在线人数
            let onlineCount = obj.onlineCount;
            //新加入用户的信息
            let username = obj.data.username;

            //更新在线人数
            let userhtml = '';
            let separator = '';
            for(let key in onlineUsers) {
                if(onlineUsers.hasOwnProperty(key)){
                    userhtml += separator+onlineUsers[key];
                    separator = '、';
                }
            }
            d.getElementById("onlinecount").innerHTML = '当前共有 '+onlineCount+' 人在线，在线列表：'+userhtml;

            //添加系统消息
            let html = '';
            html += '<div class="msg-system">';
            html += username;
            html += (action === 'login') ? ' 加入了聊天室' : ' 退出了聊天室';
            html += '</div>';
            let section = d.createElement('section');
            section.className = 'system J-mjrlinkWrap J-cutMsg';
            section.innerHTML = html;
            this.msgObj.appendChild(section);
            this.scrollToBottom();
        },
        init:function(){
            this.username = localStorage.getItem('__username');
            localStorage.removeItem('__username');
            this.userid = localStorage.getItem('__userid');
            localStorage.removeItem('__userid');

            d.getElementById("showusername").innerHTML = this.username;
            this.msgObj.style.minHeight = (this.screenheight - db.clientHeight + this.msgObj.clientHeight) + "px";
            this.scrollToBottom();

            let onopen = (event) => {
                let socket = this.socket = event.currentTarget;
                socket.send(JSON.stringify({eventType:'login',data:{username:this.username}}));

                d.getElementById('chatbox').style.display = 'block';

                socket.onmessage = (event) => {
                    let obj = JSON.parse(event.data);
                    if(obj.eventType !== 'message') {
                        CHAT.updateSysMsg(obj, obj.eventType);
                    } else {
                        let isme = (obj.data.userid === CHAT.userid);
                        let contentDiv = '<div>'+obj.data.content+'</div>';
                        let usernameDiv = '<span>'+obj.data.username+'</span>';

                        let section = d.createElement('section');
                        if(isme){
                            section.className = 'username';
                            section.innerHTML = contentDiv + usernameDiv;
                        } else {
                            section.className = 'service';
                            section.innerHTML = usernameDiv + contentDiv;
                        }
                        CHAT.msgObj.appendChild(section);
                        CHAT.scrollToBottom();
                    }
                };
            };

            let ws = new WebSocketHandler();
            let socket = ws.createConnection('8081');
            socket.onopen = onopen;
            socket.onerror = function () {
                ws.reconnection(onopen);
            };
        }
    };
    //通过“回车”提交信息
    d.getElementById("content").onkeydown = function(e) {
        e = e || event;
        if (e.keyCode === 13) {
            CHAT.submit();
        }
    };
    w.CHAT.init();
})();