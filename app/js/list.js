$(function() {
  var $contentUl = $('.content ul'),
      $tagList = $('.tag-list'),
      $search = $('.list-search input'),
      $searchStyle = $('.list-search-style');

  _showAll();

  function _showAll() {
    $.getJSON('/json/pageList.json', function(data) {
      for (var i = 0; i < data.length; i++) {
        $contentUl.append(
          '<li class="' + data[i].tag + '" data-title="' + data[i].title.toLowerCase() + '">' +
          '<i></i>' +
          '<h3>' + data[i].date + '</h3>' +
          '<a href="' + data[i].site + '">' +
          '<h2>' + data[i].title + '</h2>' +
          '</a>' +
          '</li>'
        );
      }
    $('.content h1 span').text(data.length);
    _filter();
    _search();
    });
  }

  function _filter() {
    $tagList.show();
    $tagList.find('i').on('click',function(){
      $tagList.find('i').addClass('not-this');
      $(this).removeClass('not-this');
      _trackGA('filterClick');
      var tagName = $(this).attr('class');
      if(tagName=='tag-all'){
        $contentUl.find('li').removeAttr('style');
        $search.val('');
        $searchStyle.html('');
      }
      else{
        $contentUl.find('li').hide();
        $contentUl.find('li.'+tagName).show();
        $search.val('');
      }
    });
  }

  function _search() {
    $search.on('change paste keyup',function(){
      var value = $(this).val().toLowerCase();
      _trackGA('list-Search')
      if($('.content i.tag-all').hasClass('not-this')){
        $tagList.find('i').addClass('not-this');
        $('.content i.tag-all').removeClass('not-this');
        $contentUl.find('li').removeAttr('style');
        _searchStart(value);
      }else{
        if(!value){
          $searchStyle.html('');
        }
        else{
          _searchStart(value);
        }
      }
      function _searchStart(v){
        $searchStyle.html(
          '#container .content li:not([data-title*="' + v + '"]) {display: none;}'
        );
      }
    });
  }

  function _trackGA(peopleEvent) {
    ga('send', 'event', peopleEvent, peopleEvent);
  }

});
