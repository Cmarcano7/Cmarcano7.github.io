// Acquiring the DOM

// Setting current day and time on the top of the page

$("#currentDay").text("Today is: " + moment().format("dddd, MMMM Do"));

$("#currentTime").text("Time: " + moment().format("h:mm:ss a"));

// Objects holding user input data
var userInput = {
    "8 am": [],
    "9 am": [],
    "10 am": [],
    "11 am": [],
    "12 pm": [],
    "1 pm": [],
    "2 pm": [],
    "3 pm": [],
    "4 pm": [],
    "5 pm": [],
};

var currentDate = moment().format("YYYYMMDD");

var savedDate = "";


$(document).ready(function(){
    
  if(!localStorage.getItem("userInput")) {
        updateCalendarTasks(userInput);
  } else {
    updateCalendarTasks(JSON.parse(localStorage.getItem("userInput")));
  };
  
  backgroundChange();

  saveDateToLocalStorage();

  clearSchedule();

});

// Functions for all events on the page

// Changes background based on classes made for time of day compared to current time
function backgroundChange() {

  var currentHour = moment().hour();
  $(".time-block").each( function() {
      var elementHour = parseInt($(this).attr("id"));
     
      if ( elementHour < currentHour ) {
          $(this).siblings("textarea").removeClass(["present", "future"]).addClass("past");
      }
      else if ( elementHour === currentHour ) {
          $(this).siblings("textarea").removeClass(["past", "future"]).addClass("present");
      }
      else {
          $(this).siblings("textarea").removeClass(["past", "present"]).addClass("future");
      }
  })
};

// Functions saving the users' input to the local storage(called above)
function initializeLocalStorage() {
  localStorage.setItem("userInput", JSON.stringify(userInput));
};

function saveToLocalStorage(dayObj) {
  localStorage.setItem("userInput", JSON.stringify(dayObj));
};

function saveDateToLocalStorage() {
  localStorage.setItem("savedDate", JSON.stringify(savedDate));
};

function saveSchedule(hourString, value) {
  if(!localStorage.getItem("userInput")) {
    initializeLocalStorage();
  };

  var workHours = JSON.parse(localStorage.getItem("userInput"));
  workHours[hourString] = value

  saveToLocalStorage(workHours);
};

function updateCalendarTasks(dayObject) {
  $(".row").each(function() {
    var result = $(this).children("div");
    $(this).children("textarea").text(dayObject[result.text()]);
  })
};

function saveDateToLocalStorage() {
  $(".saveBtn").click(function() {
    if( savedDate == "" ){
      savedDate = (moment().format("YYYYMMDD"));
      localStorage.setItem("savedDate", JSON.stringify(savedDate));
      savedDate = "";
    };
  });
};

function clearSchedule() {
  var localsavedDate = localStorage.getItem("savedDate", JSON.stringify(savedDate));
  
  if(currentDate = localsavedDate){
    return 
  } else{
    storage.clear();
  }
};

// Buttons save and clear below

// Function to save textarea content to localStorage
$(".saveBtn").click(function() {
  userText = $(this).siblings("textarea").val();
  hourSaved = $(this).siblings("div").text();
  
  saveSchedule(hourSaved, userText);
});

//Function to clear textarea, will not clear localStorage(will have to save after clearing to clear localStorage), just incase misclicked clear
$(".clearBtn").click(function() {
  $(this).siblings("textarea").val("");
});

