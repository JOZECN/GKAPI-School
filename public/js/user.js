$(function() {
    $('.revise-btn').click(function(){
        $('.revise-btn').css("display","none");
        $('.save-btn').css("display","inline-block");
        $('.user-password-old').css("display","inline-block");
        $('.user-password-new').css("display","inline-block");
        $('.user-major input').removeAttr("disabled");
        $('.user-identity input').removeAttr("disabled");
        $('.user-department input').removeAttr("disabled");
    })
    $('.save-btn').click(function(){
        $('.revise-btn').css("display","inline-block");
        $('.save-btn').css("display","none");
        $('.user-major input').attr("disabled",true);
        $('.user-identity input').attr("disabled",true);
        $('.user-department input').attr("disabled",true);
        $('.user-password-old').css("display","none");
        $('.user-password-new').css("display","none");
    })

    $('.loginout-btn a').click(function(){
        $.ajax({
            type: 'post',
            url: '/api/user/logout',
            data: {
                sid: $(".user-no span:last-child").text()
            },
            dataType: 'json',
            success: function (response) {
                alert(response.msg);
                window.location.href = '/';
            }
        })
    })
})