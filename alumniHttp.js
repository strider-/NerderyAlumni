var AlumniHttp = {
  requestAlumni: function(callback) {
    var req = new XMLHttpRequest();
    req.open("GET", 'https://mainframe.nerdery.com/workman.php?queue=Tech%20Services', false);
    req.onload = callback.bind(this, req);
    req.send(null);
 }
}