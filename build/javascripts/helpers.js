function notify(o,a){$(".notify").html(o).fadeIn(),$(".notify").addClass(a),$(".notify").css("top",$(window).scrollTop()),setTimeout(function(){$(".notify").html("").removeClass(a).fadeOut()},3e3)}function openModal(o,a){$(o+" .modal .content").html(a),$(".overlay").css("top",$("body").scrollTop()),$(".overlay").addClass("active"),$(o+" .modal").addClass("active"),$("body").addClass("noscroll"),$(o+" .modal .fa-times").click(closeModal),$(o+" .modal .cancel").click(closeModal)}function closeModal(){$(".overlay").removeClass("active"),$(".modal").removeClass("active"),$("body").removeClass("noscroll")}function updateUrl(o,a){var l="page="+a;return currentParams=o.match(/page=\d+/),null===currentParams?(l=o.indexOf("?")>-1?"&"+l:"?"+l,o+=l):o=o.replace(/page=\d+/,l),o}