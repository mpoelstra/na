$(document).ready(function() {

    $('.fancybox').fancybox();

    NA.controller.initialize(function() {
        if(window.location.hash) {
            NA.controller.goToPage(window.location.hash);
        }



        $('.flexslider').flexslider({
            animation: "slide",
            animationSpeed: 1000,
            slideshowSpeed: 10000,
            directionNav: false,
            keyboard: false,
            slideshow: false,
            start: function(slider) {
                //alert(slider.count);
                slider.find('.meter').animate({
                    width: '100%'
                }, 9000, 'linear', function() {
                    // Animation complete.
                    //slider.find('.meter').css('width','0%');
                });
            },
            before: function(slider) {
                //alert(slider.count);
                //slider.find('.meter').css('width','0%');
            },
            after: function(slider) {
                //alert(slider.count);
                slider.find('.meter').css('width','0%');
                slider.find('.meter').animate({
                    width: '100%'
                }, 9000, 'linear', function() {
                    // Animation complete.
                    // slider.find('.meter').css('width','0%');
                });
            }
        });
    });

});

//log messages to console when available
function l(msg) {
    var useAlertsWhenNoConsole = false; // zet op true om console logging in alerts te laten verschijnen
    if (typeof console === "undefined" || typeof console.log === "undefined") {
        if (useAlertsWhenNoConsole) {
            alert(msg);
        }
    } else {
        console.log(msg)
    }
}