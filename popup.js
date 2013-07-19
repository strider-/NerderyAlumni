var AlumniGenerator = {
  handleAlumni: function(e){
    var body = e;
    body = body.replace(/\/workdetail.php/g, 'https://mainframe.nerdery.com/workdetail.php/');
    var $alumni = $(body).find('tr:contains("Termination")');
    $alumni.find('a').attr('target', '_blank');

    this.showAlumni($alumni);
  },

  showAlumni: function ($alumni) {
    var data = $alumni.map(function(index,value) {
      var cells = this.extractCells(value.innerHTML);
      return {
        wo: cells[1],
        div: cells[2],
        date: cells[3],
        days: cells[4],
        name: cells[5]
      };
    }.bind(this));

    this.getCompiledMarkup({ rows: data.toArray() }, function(markup){
      $('body').empty().append(markup);
      chrome.browserAction.setBadgeText({ text:''});
    });
  },

  extractCells: function(row){
    var re = /<td>(.*?)<\/td>/g;
    var arr = [];
    var ret = [];
    while((arr = re.exec(row)) !== null){
      ret.push(arr[1]);
    }
    return ret;
  },

  handleError: function(e){
    this.showError(e.statusText);
  },

  showError: function(text){
    $('body').append('Error: ' + text);
  },

  getTemplate: function(cb){
    $.get('views/popup-table.mustache', cb);
  },

  getCompiledMarkup: function(data, cb){
    this.getTemplate(function(template){
      cb(Mustache.to_html(template, data));
    });
  }
};

document.addEventListener('DOMContentLoaded', function () {
  /*AlumniHttp.requestAlumni(function(e, f) {
      AlumniGenerator.showAlumni(e.responseText);
  });*/
  $.get('https://mainframe.nerdery.com/workman.php?queue=Tech%20Services')
    .done(AlumniGenerator.handleAlumni.bind(AlumniGenerator))
    .fail(AlumniGenerator.handleError.bind(AlumniGenerator));
});