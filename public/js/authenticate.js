$(function() {
    $.ajax({
        type: 'post',
        url: '/api/user/authenticate',
        data: null,
        dataType: 'json',
        success: function (response) {
            if(response.status){
                if(window.location.pathname == '/'){
                    if(response.sid != '' || response.sid != null || response.sid != undefined){
                        window.location.href = '/user/' + response.sid;
                    }
                }
            }else{
                if(window.location.pathname != '/'){
                    alert(response.msg);
                    window.location.href = '/';
                }
            }
        }
    })
})