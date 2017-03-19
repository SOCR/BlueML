var jsbin = {
  'root': 'http://jsbin.com',
  'shareRoot': 'http://jsbin.com',
  'runner': 'http://null.jsbin.com/runner',
  'static': 'http://static.jsbin.com',
  'version': '3.41.6',
  user: {},
};

(function () {
  if (jsbin.user && jsbin.user.name) {
    $('.loggedout').hide();
    var menu = $('.loggedin').show();
    var html = $('#profile-template').text();
    var $html = $(html.replace(/({.*?})/g, function (all, match) {
      var key = match.slice(1, -1).trim(); // ditch the wrappers
      return jsbin.user[key] || '';
    }));
    if (jsbin.user.pro) {
      document.documentElement.className += ' pro';
      $html.find('.gopro').remove();
    } else {
      $html.find('.pro').remove();
    }
    $('#control .loggedin').append($html);
  } else {
    $('.loggedin').hide();
    $('.loggedout').show();
  }
})();
