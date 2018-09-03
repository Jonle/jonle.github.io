(function () {
    let signupBtn = document.getElementById('sign-btn');
    signupBtn.addEventListener('click', function () {
        let inputs = document.getElementsByTagName('input');
        let values = [];
        if (inputs) {
            for (let i = inputs.length - 1, element; i >= 0; i--) {
                element = inputs[i];
                if (!element.value) break;
                if (element.type === 'password') {
                    values.push(element.value);
                } else {
                    values.unshift(element.value);
                }
            }
        }

        if (values.length > 0) {
            let onopen = function (event) {
                let socket = event.currentTarget;
                socket.send(JSON.stringify({eventType: "signup", data:values}));
                socket.onmessage = function (event) {
                    console.log(event);
                    let obj = JSON.parse(event.data);
                    let code = obj.code;
                    let message = obj.message;
                    if (code === 200 && confirm(message)) {
                        window.location.href = '../sign_in/index.html';
                        localStorage.setItem('__username', values[0]);
                        localStorage.setItem('__userid', obj.id);
                    } else if (code === 409 || code === 404) {
                        alert(message);
                    }
                    socket.close();
                };
            };

            let ws = new WebSocketHandler();
            let socket = ws.createConnection();
            socket.onopen = onopen;
            socket.onerror = function () {
                ws.reconnection(onopen);
            };
        } else {
            alert("用户名或密码不能为空！");
        }
    });
    signupBtn = null;
})();