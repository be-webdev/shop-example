$(document).ready(function(){
    $(".filter-button").click(function(){
        var value = $(this).attr('data-filter');
        
        if(value == "all")
        {
            $('.filter').show('1000');
        }
        else
        {
            $(".filter").not('.'+value).hide('3000');
            $('.filter').filter('.'+value).show('3000');
            
        }
    });

    $('.js-scroll-trigger').click(function() {
        $('.navbar-collapse').collapse('hide');
    });

    $(function() {                       
        $('#btn-cart').click(function() {  
            $('#minicart, body').addClass("active");
        });
    });

    $(function() {                       
        $('#close-cart').click(function() {  
            $('#minicart, body').removeClass("active");  
        });
    });
});