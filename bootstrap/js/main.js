$(function() {

    baguetteBox.run('.gallery');

    $(window).on('load', function () {
        $('.preloader').delay(500).fadeOut('show', function() {
            $(this).attr('style', 'display : none !important');
        });
    });


    $(window).scroll(function(){
        if($(this).scrollTop() > 300) {
            $('.scrollToTop').fadeIn();
        }else{
            $('.scrollToTop').fadeOut();
        }
    });

    $('.scrollToTop').click(function() {
        $('html, body').animate({scrollTop : 0}, 800)
    });
});





function onYouTubeIframeAPIReady() {
            var iStatus;

            oPlayer = new YT.Player('videoPlayer', {
                events: {
                    'onStateChange': onPlayerStateChange
                }
            });

            var $playButton = $('#videoPlayBtn');
            $playButton.on("click", function() {
                if (iStatus == YT.PlayerState.PLAYING) {
                    $playButton.show();
                    oPlayer.pauseVideo();
                    iStatus = YT.PlayerState.PAUSED;
                } else {
                    oPlayer.playVideo();
                    iStatus = YT.PlayerState.PLAYING;
                    $playButton.hide();
                }
            });

            function onPlayerStateChange(event) {
                if (event.data == YT.PlayerState.PAUSED) {
                    $playButton.show();
                    iStatus = YT.PlayerState.PAUSED;
                } else if (event.data == YT.PlayerState.PLAYING) {
                    iStatus = YT.PlayerState.PLAYING;
                    $playButton.hide();
                }
            }
        }

        var tag = document.createElement('script');
        if(location.protocol.indexOf('file') != -1) {
     tag.src = "http://www.youtube.com/iframe_api";
} else {
     tag.src = "//www.youtube.com/iframe_api";
     // or location.protocol  + '//www.youtube.com/iframe_api'
}
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);