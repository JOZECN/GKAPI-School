$(function() {
    $('.signin').click(function (){
        $('.flip-item-front').css("z-index","1");
        $('.flip-item-front').css("transform","rotateY(180deg)");
        $('.flip-item-back').css("z-index","2");
        $('.flip-item-back').css("transform","rotateY(0deg)");
    });
    $('.login').click(function (){
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
                    if(response.status){
                        alert(response.msg);
                        window.location.href='\\user\\' + $.trim($('.login-username input').val());
                    }else{
                        alert(response.msg);
                    }
                }
            })
        }
    });

    $('.sign-btn').click(function(){
        if(!$.trim($('.sign-schoolNo-input').val()) || !$('.previewImg').val() || !$.trim($('.sign-password input').val()) || !$.trim($('.sign-name input').val()) || !$.trim($('.sign-card input').val())){
            alert("请填写完整！");
        }else if(!$('.approve').prop('checked')){
            alert("请同意《GKAPI协议》！");
        }else {
            var sid = $.trim($('.sign-schoolNo-input').val());
            var pwd = $.trim($('.sign-password input').val());
            var sname = $.trim($('.sign-name input').val());
            var sex = $('.sign-sex select option:selected').val();
            var card = $.trim($('.sign-card input').val());
            var file = $('.previewImg').get(0).files[0];

            var formData = new FormData();
            formData.append("file", file);
            var confirm = window.confirm("务必确认信息填写正确，点击”确认“将无法更改！");
            if(confirm == true){
                $.ajax({
                    type: 'POST',
                    url: '/api/user/sidCheck',
                    data: {
                        sid: sid
                    },
                    dataType: 'json',
                    success: function (response) {
                        if(response.status){
                            $.ajax({
                                type: 'POST',
                                url: '/api/file/uploadUserImg',
                                data: formData,
                                cache: false,
                                contentType: false,
                                processData: false,
                                success: function (response) {
                                    if(response.status){
                                        $.ajax({
                                            type: 'POST',
                                            url: '/api/user/register',
                                            data: {
                                                sid: sid,
                                                pwd: pwd,
                                                sname: sname,
                                                sex: sex,
                                                card: card,
                                                img: response.url
                                            },
                                            dataType: 'json',
                                            success: function (response) {
                                                if(response.status){
                                                    alert(response.msg)
                                                    $('.flip-item-front').css("z-index","2");
                                                    $('.flip-item-front').css("transform","rotateY(0deg)");
                                                    $('.flip-item-back').css("z-index","1");
                                                    $('.flip-item-back').css("transform","rotateY(180deg)");
                                                }else{
                                                    alert(response.msg)
                                                }
                                            }
                                        })
                                    }else{
                                        alert(response.msg)
                                    }
                                }
                            })
                        }else{
                            alert(response.msg)
                        }
                    }
                })
            }
        }
    })
})

function imgUpload(file){
    if(file.files && file.files[0]){
        $(".imgUpload").html('<img>');
        var img = $(".imgUpload img");
        var reader = new FileReader();
        reader.onload = function(evt){
            img.attr("src",evt.target.result);
        }
        reader.readAsDataURL(file.files[0]);
    }
}