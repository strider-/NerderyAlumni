var Badge = {
 
  updateBadge: function (e, data) {
    var $td = data.find('td:contains("Termination")');
    // loca storage crap here
    var arr = $.makeArray($td);
    var arrNew = [];
    arr.forEach(function(entry) {
      arrNew.push(entry.outerText);
    }); 
    
    var ls = JSON.parse(localStorage.getItem('names'));
    var badgeCount = 0;

    if(ls){
        // compare old to new
        arrNew.forEach(function(entry) {
          if(ls.indexOf(entry) <= -1){
            badgeCount++;
          }
        }); 
      }
      else{        
        badgeCount = e;
      }
      localStorage.setItem('names', JSON.stringify(arrNew));
    chrome.browserAction.setBadgeText({ text: badgeCount > 0 ? badgeCount.toString() : ''});
  },
  fetchData: function () {
   AlumniHttp.requestAlumni(function(e, f) {
      $alumni = $(e.responseText).find('tr:contains("Termination")');
      Badge.updateBadge($alumni.length.toString(), $alumni);
    })
   chrome.alarms.create({delayInMinutes: 30});
  }
};

chrome.alarms.onAlarm.addListener(function() {
  Badge.fetchData();
});

Badge.fetchData();