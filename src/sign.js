(function () {
    let signupBtn = document.getElementById('sign-btn');
    signupBtn.addEventListener('click',function () {
        console.log("-=-=-=");
        let inputs = document.getElementsByTagName('input');
        let values = [];
        if(inputs) {
            for (let i = inputs.length-1,element;i>=0;i--) {
                element = inputs[i];
                if(!element.value) break;
                if(element.type === 'password'){
                    values.push(element.value);
                } else {
                    values.unshift(element.value);
                }
            }
        }
        if(values.length > 0) {
            values = values.join('&');
            console.log(values);
        } else {
            alert("用户名或密码不能为空！");
        }

    });
    signupBtn = null;
})();