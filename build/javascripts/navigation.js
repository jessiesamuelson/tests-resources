function toggleSection(e){if(e.attr("href").indexOf("#")>-1){$(".current").removeClass("current");var t=$.trim(e.attr("class").replace("current",""));e.parent().addClass("current"),$("section."+t).addClass("current")}}function detectSection(){var e=window.location.hash,t=window.location.href;t.indexOf("/channel-manager")>-1&&""===e&&(window.location.hash="#all",e="#all"),toggleSection($("a[href='"+e+"']"))}function clearResultButton(){$(".search-channels .channel-list").children().length>0?$(".search-channels .clear").addClass("dirty"):$(".search-channels .clear").removeClass("dirty")}function authenticate(){var e="9eea613f3d7acca493702b7dc066e132";$.ajax({url:"http://waywire.com/_check_session?sess_id="+e,type:"GET",success:function(e){200!=e.status&&(window.location="http://waywire.com/login")}})}$(function(){authenticate(),detectSection(),$(window).on("popstate",detectSection),clearResultButton(),$(".channels nav a").click(function(e){toggleSection($(e.target))})});