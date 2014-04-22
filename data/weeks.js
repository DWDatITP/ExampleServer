var weekData = [
  {number: 1, date: new Date(2014, 2, 26)},
  {number: 2, date: new Date(2014, 3, 2)},
  {number: 3, date: new Date(2014, 3, 9)},
  {number: 4, date: new Date(2014, 3, 16)},
  {number: 5, date: new Date(2014, 3, 23)},
  {number: 6, date: new Date(2014, 3, 30)},
  {number: 7, date: new Date(2014, 4, 6)}
];

module.exports = {
  allWeeks: function(){
    return weekData;
  },

  findByNumber: function(number){
    return weekData[number-1];
  },

  currentWeek: function(){
    var i;
    var week;
    var now = new Date();

    // go through the week in reverse
    for (i = weekData.length - 1; i >= 0; i--) {
      week = weekData[i];
      if (week.date < now) {
        return week;
      }
    }
  }
};
