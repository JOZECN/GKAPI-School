$(function() {
    $('.signin').click(function(){
        $('.flip-item-front').css("z-index","1");
        $('.flip-item-front').css("transform","rotateY(180deg)");
        $('.flip-item-back').css("z-index","2");
        $('.flip-item-back').css("transform","rotateY(0deg)");
    });
    $('.login').click(function(){
        $('.flip-item-front').css("z-index","2");
        $('.flip-item-front').css("transform","rotateY(0deg)");
        $('.flip-item-back').css("z-index","1");
        $('.flip-item-back').css("transform","rotateY(180deg)");
    });

    $('.login-btn').click(function(){
        if(!$.trim($('.login-username input').val()) || !$.trim($('.login-password input').val())){
            alert("请填写完整");
        }else{
            $.ajax({
                type: 'post',
                url: '/api/user/login',
                data: {
                    sid: $.trim($('.login-username input').val()),
                    pwd: $.trim($('.login-password input').val())
                },
                dataType: 'json',
                success: function (response) {
                    if(response.status != 1){
                        alert(response.msg);
                    }else{
                        alert(response.msg);
                    }
                }
            })
        }
    })
})