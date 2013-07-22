var Badge = {
  updateBadge: function(){
    var ls = JSON.parse(localStorage.getItem('names'));
    var rows = Alumni.getAlumniRows();
    var names = $.map(rows, function(row){
      return row.name;
    });
    var badgeCount = this.getDiffCount(names, ls);

    localStorage.setItem('names', JSON.stringify(names));
    chrome.browserAction.setBadgeText({ text: badgeCount > 0 ? badgeCount.toString() : ''});
  },

  getDiffCount: function(arr1, arr2){
    var diffs = 0;
    if(arr2 !== null){
      arr1.forEach(function(entry){
        if(arr2.indexOf(entry) <= -1){
          diffs++;
        }
      });
    }
    else{
      diffs = arr1.length;
    }
    return diffs;
  },

  showError: function(){
    return;
  },

  fetchData: function(){
    AlumniHttp.requestAlumni()
      .done(Alumni.handleAlumni.bind(Alumni))
      .fail(this.showError)
      .always(this.updateBadge.bind(this));

    chrome.alarms.create({delayInMinutes: 30});
  }
};

chrome.alarms.onAlarm.addListener(function() {
  Badge.fetchData();
});

Badge.fetchData();