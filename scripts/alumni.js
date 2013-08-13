var Alumni = {
  handleAlumni: function(e){
    var body = e;
    body = body.replace(/\/workdetail.php/g, 'https://mainframe.nerdery.com/workdetail.php/');
    var $alumni = $(body).find('tr:contains("Termination")');
    $alumni.find('a').attr('target', '_blank');

    this.$alumni = $alumni;
  },

  getAlumniRows: function(){
    return this.$alumni && this.$alumni.map(function(index,value) {
      var cells = this.extractCells(value.innerHTML);
      var rn = this.getReasonAndName(cells[5]);

      return {
        woLink: cells[1],
        div: cells[2],
        date: cells[3],
        days: cells[4],
        nameLink: cells[5],
        pic: this.getPic(rn.name),
        reason: rn.reason
      };
    }.bind(this)).toArray();
  },

  getPic: function(fullName){
    return 'https://mainframe.nerdery.com/profile_pics/' + this.getMainframeName(fullName) + '.jpg';
  },

  getMainframeName: function(fullName){
    var name = fullName.split(' ');
    var fName = '';
    var lName = '';

    if(typeof name !== 'undefined' && name.length > 1){
      fName = name[0];
      lName = name[1];
    }

    return fName.toLowerCase().charAt(0) + lName.toLowerCase();
  },

  getReasonAndName: function(str){
    var reasonName = str.match(/>(.*)</);
    var reason = '';
    var name = '';

    if(reasonName !== null && typeof reasonName !== 'undefined' && reasonName.length > 1){
      var spl = reasonName[1].split(':');
      if(spl.length > 1){
        reason = spl[0].trim();
        name = spl[1].trim();
      }
    }

    return {
      reason: reason,
      name: name
    };
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