$(function() {
    $('.signin').click(function(){
        $('.flip-item-front').css("z-index","1");
        $('.flip-item-front').css("transform","rotateY(180deg)");
        $('.flip-item-back').css("z-index","2");
        $('.flip-item-back').css("transform","rotateY(0deg)");
        $('.flip').css("top","calc(45% - 200px)");
        $('.flip').css("left","calc(50% - 300px)")
    })
})