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
                socket.send(JSON.stringify({event: "signup", user: values[0], password: values[1]}));
                socket.onmessage = function (event) {
                    let state = Number(event.data);
                    if (state === 200) {
                        if (confirm('注册成功！')) {
                            window.location.href = '../sign_in/index.html';
                            localStorage.setItem('__username', values[0]);
                        }
                    } else if (state === 409) {
                        alert('用户名已存在！');
                        socket.close();
                    }
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