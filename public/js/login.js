$(function() {
    $('.signin').click(function(){
        $('.flip-item-front').css("z-index","1");
        $('.flip-item-front').css("transform","rotateY(180deg)");
        $('.flip-item-back').css("z-index","2");
        $('.flip-item-back').css("transform","rotateY(0deg)");
    })
    $('.login').click(function(){
        $('.flip-item-front').css("z-index","2");
        $('.flip-item-front').css("transform","rotateY(0deg)");
        $('.flip-item-back').css("z-index","1");
        $('.flip-item-back').css("transform","rotateY(180deg)");
    })
})