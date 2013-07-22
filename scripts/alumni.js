var Alumni = {
  handleAlumni: function(e){
    var body = e;
    body = body.replace(/\/workdetail.php/g, 'https://mainframe.nerdery.com/workdetail.php/');
    var $alumni = $(body).find('tr:contains("Termination")');
    $alumni.find('a').attr('target', '_blank');

    this.$alumni = $alumni;
  },

  getAlumniRows: function($alumni){
    return this.$alumni.map(function(index,value) {
      var cells = this.extractCells(value.innerHTML);
      return {
        wo: cells[1],
        div: cells[2],
        date: cells[3],
        days: cells[4],
        name: cells[5]
      };
    }.bind(this)).toArray();
  },

  extractCells: function(row){
    var re = /<td>(.*?)<\/td>/g;
    var arr = [];
    var ret = [];
    while((arr = re.exec(row)) !== null){
      ret.push(arr[1]);
    }
    return ret;
  }
};