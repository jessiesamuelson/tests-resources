function notify(message, status) {
  $('.notify').html(message).fadeIn();
  $('.notify').addClass(status);

  setTimeout(function() {
    $('.notify').html('').removeClass(status).fadeOut();
  }, 3000);
}

function openModal(container, msg) {
  $(container+' .modal .content').html(msg);
  $('.overlay').css('top', $('body').scrollTop());

  $('.overlay').addClass('active');
  $(container+' .modal').addClass('active');
  $('body').addClass('noscroll');

  $(container+' .modal .fa-times').click(closeModal); 
  $(container+' .modal .cancel').click(closeModal); 
}
 
function closeModal() {
  $('.overlay').removeClass('active');
  $('.modal').removeClass('active');
  $('body').removeClass('noscroll');
} 