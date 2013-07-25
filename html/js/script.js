$(document).ready(function() {

    NA.controller.initialize(function() {
        if(window.location.hash) {
            NA.controller.goToPage(window.location.hash);
        }

        //all popups
        $('.fancybox').fancybox();

        //popup submit button
        $('.popup').find('a.submit').on('click', function(e) {
            e.preventDefault();
            var type = $(this).closest('.popup').attr('id');
            switch (type) {
                case 'nieuw':
                    alert('nummer toevoegen aan flexslider en deze ws her-initialiseren');
                    break;
                case 'melding':
                    alert('melding opslaan en tonen bij de studiezaal pagina');
                    break;
            }
            $.fancybox.close();
        });

        //show change bar
        $('#balie').find('a.nr').on('click', function(e) {
            e.preventDefault();
            $(this).closest('.page').find('a.nr.selected').removeClass('selected');
            $(this).addClass('selected');
            var nr = $(this).find('span').html();
            var changeNav = $(this).closest('.page').find('nav.change');
            var actionsNav = $(this).closest('.page').find('nav.actions');
            changeNav.find('.nummer').html(nr);

            actionsNav.hide();
            changeNav.show();
        });

        //delete pasnr
        $('#balie').find('a.delete').on('click', function(e) {
            e.preventDefault();
            var selectedPas = $(this).closest('.page').find('a.nr.selected');
            alert('zet nr uit: delete uit balie pagina');
            if (selectedPas.closest('.row').find('.col').length === 1) {
                //only 1 col left in this row, so delete row with the remaining selected col
                selectedPas.closest('.row').remove();
            } else {
                //delete the col
                selectedPas.closest('.col').remove();
            }
            var changeNav = $(this).closest('.page').find('nav.change');
            var actionsNav = $(this).closest('.page').find('nav.actions');
            actionsNav.show();
            changeNav.hide();
        });

        //show change bar
        $('#depot').find('a.nr').on('click', function(e) {
            e.preventDefault();
            $(this).closest('.page').find('a.nr.selected').removeClass('selected');
            $(this).addClass('selected');
            var nr = $(this).find('span').html();
            var changeNav = $(this).closest('.page').find('nav.change');
            changeNav.find('.nummer').html(nr);
            if ($(this).hasClass('enabled')) {
                changeNav.find('.text').text('uitzetten');
            } else {
                changeNav.find('.text').text('aanzetten');
            }
            changeNav.show();
        });

        $('#depot .change').find('a.btn').on('click', function(e) {
            e.preventDefault();
            alert('doe wat');
            var selectedPas = $(this).closest('.page').find('a.nr.selected');
            var changeNav = $(this).closest('.page').find('nav.change');
            if (selectedPas.hasClass('enabled')) {
                selectedPas.removeClass('enabled');
                changeNav.find('.text').text('aanzetten');
            } else {
                selectedPas.addClass('enabled');
                changeNav.find('.text').text('uitzetten');
            }
        });



        //all sliders
        $('.flexslider').flexslider({
            animation: "slide",
            animationSpeed: 1000,
            slideshowSpeed: 10000,
            directionNav: false,
            keyboard: false,
            slideshow: true,
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

//popup melding
function meldingKeyPress()
{
    var s = $("#nieuw_tafelnummer").val();
    $("#nieuw_tafelnummer_value").text(s);
}

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