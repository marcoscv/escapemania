$.fn.extend({
    animateCss: function(animationName, callback) {
        var animationEnd = (function(el) {
        var animations = {
            animation: 'animationend',
            OAnimation: 'oAnimationEnd',
            MozAnimation: 'mozAnimationEnd',
            WebkitAnimation: 'webkitAnimationEnd',
        };

        for (var t in animations) {
            if (el.style[t] !== undefined) {
            return animations[t];
            }
        }
        })(document.createElement('div'));

        this.addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName);

        if (typeof callback === 'function') callback();
        });

        return this;
    },
});

(function($) {
    "use strict"; // Start of use strict
  
    // Smooth scrolling using jQuery easing
    $('a.nav-link[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - 70)
          }, 1000, "easeInOutExpo");
          return false;
        }
      }
    });
  
    // Closes responsive menu when a scroll trigger link is clicked
    $('.nav-link').click(function() {
      $('.navbar-collapse').collapse('hide');
    });
  
    // Collapse Navbar
    var navbarCollapse = function() {
      if ($("#navbarEscape").offset().top > 100) {
        $("#navbarEscape").addClass("navbar-shrink");
      } else {
        $("#navbarEscape").removeClass("navbar-shrink");
      }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
  
  })(jQuery); // End of use strict