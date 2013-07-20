var AlumniHttp = {
  getTemplate: function(cb){
    $.get('views/popup-table.mustache', cb);
  },

  getCompiledMarkup: function(data, cb){
    this.getTemplate(function(template){
      cb(Mustache.to_html(template, data));
    });
  },

  requestAlumni: function(callback) {
    return $.get('https://mainframe.nerdery.com/workman.php?queue=Tech%20Services');
  }
};