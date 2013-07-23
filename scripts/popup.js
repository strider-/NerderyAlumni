var AlumniGenerator = {
  showAlumni: function(){
    var rows = Alumni.getAlumniRows();
    if(typeof rows !== 'undefined' && rows.length > 0){
      AlumniHttp.getCompiledMarkup({ rows: rows }, function(markup){
        $('body').empty().append(markup);
        AlumniGenerator.updatePics(rows);
        chrome.browserAction.setBadgeText({ text:''});
      });
    }
  },

  updatePics: function(rows){
    $(rows).each(function(index, item){
      var storedPic = localStorage.getItem(item.name);
      var updateRow = function(name, url) {
        var $rowImg = $('tr[data-name="' + name + '"]').find('img');
        $rowImg.attr('src', url)
          .parent()
          .attr('href', url);
      };

      if(storedPic === null) {
        $.ajax({
          type: 'GET',
          url: 'https://mainframe.nerdery.com/generic_autocomplete_ajax.php?s=' + item.name + '&t=crm',
          success: function(data){
            if(data.length > 0 && data[0].type === 'Nerds') {
              item.pic = 'https://mainframe.nerdery.com/profile_pics/' + data[0].value + '.jpg';
              updateRow(item.name, item.pic);
            }
            localStorage.setItem(item.name, item.pic);
          }
        });
      } else {
        updateRow(item.name, storedPic);
      }
    });
  },

  handleError: function(e){
    this.showError(e.statusText);
  },

  showError: function(text){
    $('body').append('Error: ' + text);
  },

  fetchData: function(){
    AlumniHttp.requestAlumni()
      .done(Alumni.handleAlumni.bind(Alumni))
      .fail(this.handleError)
      .always(this.showAlumni);
  }
};

AlumniGenerator.fetchData();