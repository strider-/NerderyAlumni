var AlumniGenerator = {
  
  requestAlumni: function() {
    var req = new XMLHttpRequest();
    req.open("GET", 'https://mainframe.nerdery.com/workman.php?queue=Tech%20Services', false);
    req.onload = this.showAlumni.bind(this);
    req.send(null);
  },
 
  showAlumni: function (e) {        
    var oldStr = e.target.responseText;
    var newStr = oldStr.replace(/\/workdetail.php/g, 'https://mainframe.nerdery.com/workdetail.php/');
    var $alumni = $(newStr).find('tr:contains("Termination")');
    var $div = $('<div>').addClass("alumni-table");
    var $table = $('<table>');
    $table.append("<tr><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>Term Date</td><td></td><td>Name</td></tr>");    
    $.each($alumni, function(index, value) {                  
      $(value).find('a').attr("target","_blank");
      $table.append(value);
    });
    $table.appendTo($div);
    $('body').append($div);  
  }
};

document.addEventListener('DOMContentLoaded', function () {  
  AlumniGenerator.requestAlumni();
});
