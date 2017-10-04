$(function(){

    $(window).on('load resize scroll', function(){
        var rows = document.getElementsByClassName('row');
        DisplayElementInViewport($('#row-1'), 'allow-show');
        DisplayElementInViewport($('#row-2'), 'allow-show');
        DisplayElementInViewport($('#row-3'), 'allow-show');
        DisplayElementInViewport($('#row-4'), 'allow-show');

        
        
    });

    function DisplayElementInViewport(element, newClass) {
        if (inViewPort(element)){
            element.addClass(newClass);
        }
    }

    function inViewPort(element) {
        if (typeof jQuery === "function" && element instanceof jQuery) {
            element = element[0];
        }
        var elementBounds = element.getBoundingClientRect();
        return (
            elementBounds.top >= 0 &&
            elementBounds.left >= 0 &&
            elementBounds.bottom <= $(window).height() &&
            elementBounds.right <= $(window).width()
        )
    }


});