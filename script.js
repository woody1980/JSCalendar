

var uncheck = 'no';
/* ==========================================================================
   Calendar Refactor II
========================================================================== */

glob = {};

/* ==========================================================================
Call Objects
========================================================================== */

//Build Class with all Methods in it!
function calBuild() {
    this.buildDay = function (n) {
        blankDays();
    }

    this.numDays = function (n) {
        blankDays();
    }

    this.buildWeeks = function (n) {
        buildWeekRows();
    }
}



/* ==========================================================================
 Objects
========================================================================== */

var cal = [
       { current: 0, month: 'January', days: 31, blank_days: 3 },
       { current: 1, month: 'February', days: 28, blank_days: 6 },
       { current: 2, month: 'March', days: 31, blank_days: 1 },
       { current: 3, month: 'April', days: 30, blank_days: 3 },
       { current: 4, month: 'May', days: 31, blank_days: 4 },
       { current: 5, month: 'June', days: 30, blank_days: 3 },
       { current: 6, month: 'July;', days: 31, blank_days: 3 },
       { current: 7, month: 'August', days: 31, blank_days: 3 },
       { current: 8, month: 'September', days: 31, blank_days: 1 },
       { current: 9, month: 'October', days: 31, blank_days: 3 },
       { current: 10, month: 'November', days: 30, blank_days: 4 },
       { current: 11, month: 'December', days: 32, blank_days: 1 }
];


//Static Current Month


//current 
var gmo = new Date(),
curr_mo = gmo.getMonth(),
curr_yr = gmo.getFullYear();
curr_day = gmo.getDate();
static_mo = gmo.getMonth();

//Print month

/* ==========================================================================
Code
========================================================================== */

function buildDays() { }

//list number of days
glob.t = cal[curr_mo].days;
glob.r = cal[curr_mo].month;
glob.bl = cal[curr_mo].blank_days;
glob.cd = cal[curr_mo].current;
glob.l;

//count number of days in months make rows divisible by 7
//var dateRow	 = $('<tr class="dateRow">');		
$('#calRow').text(cal[curr_mo].month);

//var dateRows = parseInt(t / 7);
//alert(dateRows);

//Build for blank days
var blankDays = function () {
    for (h = 0; h < glob.bl; h++) {
        alert(glob.bl)
        var blank = '<td class=" daySpan blan">' + '<span></span> </td>';
        $('.table tbody').append(blank);
    }
}

//Build number days
var buildNumDays = function () {
    for (l = 1; l < glob.t; l++) {
        var showDay = '<td class="' + 'd_' + glob.l + ' daySpan">' + '<span class="date">' + l + '</span>' + '<span class="curr_day no_visi">&#8226;</span>' + '</td>';
        $('.table tbody').append(showDay);
    }
}

//alert(cd + " " + static_mo);

//Selected
var buildWeekRows = function () {
    var ix = 1, yx = 1;
    $('td.daySpan').each(function () {
        $(this).addClass('row' + ix);
        $(this).addClass('no' + yx);
        if (ix < 7) {
            ix++;
        } else {
            ix = 1;
            yx++;
        }
    });

    $('td.no1').wrapAll('<tr>');
    $('td.no2').wrapAll('<tr>');
    $('td.no3').wrapAll('<tr>');
    $('td.no4').wrapAll('<tr>');
    $('td.no5').wrapAll('<tr>');

    $('#ical .table tr td ').css('width', '');
}

//Show the current day
function buildCurrentDay() {
    $('td.daySpan span').each(function () {
        if ($(this).text() == curr_day && glob.cd == static_mo) {
            $(this).next().removeClass('no_visi').addClass('yes_visi');
            //alert($(this).text() + " " + curr_day + " " + cd + " "+ static_mo);
        } else {
            $(this).next().removeClass('yes_visi').addClass('no_visi');
        }
    });
} buildCurrentDay();

//Attach all the elements 
//$('div#timeList').append(tabl);
//$(tabl).append(trow);
//$(trow).append(thead);

// set Day Labels  for the Calendars
function addDayNames() {
    var cnt = 0;
    var dayDate;
    $('td.daySpan').each(function () {

        $(this).addClass('dayNumb_' + cnt);
        cnt++;

        if (cnt > 6) {
            cnt = 0;
        }

        switch (cnt) {
            case 0:
                $(this).children().addClass('Saturday');
                break;
            case 1:
                $(this).children().addClass('Sunday');
                break;
            case 2:
                $(this).children().addClass('Monday');
                break;
            case 3:
                $(this).children().addClass('Tuesday');
                break;
            case 4:
                $(this).children().addClass('Wednesday');
                break;
            case 5:
                $(this).children().addClass('Thursday');
                break;
            case 6:
                $(this).children().addClass('Friday');
                break;
        }
    });
} addDayNames();

//Available, Unavailable 
//if month isnt current month - set available days starting at 1

function unAvailableDays() {
    var hh = 1;
    $('td.daySpan').each(function () {
        if (glob.cd == static_mo) {

            if ($(this).children('span.date').text() >= curr_day) {
                $(this).addClass('avail');

                //var unAvail = Math.floor(Math.random() * 32);

                if ($(this).children('span.date').text() == 8) {
                    $(this).removeClass('avail');
                }
                if ($(this).children('span.date').text() == 15) {
                    $(this).removeClass('avail');
                }
                if ($(this).children('span.date').text() == 11) {
                    $(this).removeClass('avail');
                }
                if ($(this).children('span.date').text() == 25) {
                    $(this).removeClass('avail');
                }
                if ($(this).children('span.date').text() == 26) {
                    $(this).removeClass('avail');
                }

                //get date 

                var r = $(this).children('span:first').attr('class').substr(5);
                var u = $('#calRow').attr('class').substr(4);
                var t = $(this).find('.date').text()

                //send var
                if ($(this).hasClass("avail")) {
                    buildDateDropDown(r, u, t);
                }

            } else {
                $(this).addClass('unavailable');
            }

        } else {

            if ($(this).hasClass('blan')) {

            } else {
                $(this).addClass('avail');

                //get date 
                var r = $(this).children('span:first').attr('class').substr(5);
                var u = $('#calRow').attr('class').substr(4);
                var t = $(this).find('.date').text()

                //send var
                if ($(this).hasClass("avail")) {
                    buildDateDropDown(r, u, t);
                }
            }

        }
    });
} unAvailableDays();

//buildDateDropDown

function buildDateDropDown(r, u, t) {
    $('select.dateMenu').append('<option class="' + t + '" id="' + t + '">' + r + ' , ' + u + ' ' + t + '</option>')
}


$('.avail').click(function () {

    //Show the available times info
    //getTimes();
    alert("you have selected a day")

    //Make Green
    $(this).addClass('select').siblings().removeClass('select');
    $(this).addClass('select').parent().siblings().children('.avail').removeClass('select');

    //Add Border
    $(this).addClass('bord').siblings().removeClass('bord');
    $(this).addClass('bord').parent().siblings().children('.avail').siblings().removeClass('bord');


    //Display Appointment Info
    $('span.dateDate').text($(this).find('.date').text());
    $('span.dateMonth').text($('#calRow').attr('class').substr(4));
    $('span.dateofDay').text($(this).find('.date').attr('class').substr(5));

    //Take credentials
    $('input#day_date_var').val($(this).find('.date').text());
    $('input#day_month_var').val($('#calRow').attr('class').substr(4));
    $('input#day_day_var').val($(this).find('.date').attr('class').substr(5));

    //Adjust Menu 
    var f = $(this).find('.date').text();

    $('select.dateMenu option').each(function () {
        if ($(this).attr('id') == f) {
            //console.log( $(this).attr('id') + f);
            $(this).attr("selected", "selected");
        }
    });

});


//}	



//Select Date from Dropdown
$('select.dateMenu').change(function () {
    //option value
    optional = $(this).children(':selected').attr('id');

    //getTimes();

    // Selected Actions
    $('.avail').each(function () {

        if (optional == $(this).children('span:first').text()) {

            //Make Green
            $(this).addClass('select').siblings().removeClass('select');
            $(this).addClass('select').parent().siblings().children('.avail').removeClass('select');

            //Add Border
            $(this).addClass('bord').siblings().removeClass('bord');
            $(this).addClass('bord').parent().siblings().children('.avail').siblings().removeClass('bord');

            //Display Appointment Info
            $('span.dateDate').text($(this).find('.date').text());
            $('span.dateMonth').text($('#calRow').attr('class').substr(4));
            $('span.dateofDay').text($(this).find('.date').attr('class').substr(5));

            //Take credentials
            $('input#day_date_var').val($(this).find('.date').text());
            $('input#day_month_var').val($('#calRow').attr('class').substr(4));
            $('input#day_day_var').val($(this).find('.date').attr('class').substr(5));

        }

    });



});



var startCal = new calBuild();
startCal.buildDay(blankDays);
startCal.numDays(buildNumDays);
startCal.buildWeeks(buildWeekRows);



