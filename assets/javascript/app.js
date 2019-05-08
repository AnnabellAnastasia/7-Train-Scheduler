// Global variables

var trainName = "";
var trainDestination = "";
var trainTime = "";
var trainFrequency = "";
var trainnextArrival = "";
var trainMinutesAway = "";

// jQuery global variables
var jTrain = $("#train-name");
var jTrainDestination = $("#train-destination")
// jQuery Mask plugin
var jTrainTime = $("#train-time").mask("00:00");
var jTimeFreq = $("#time-freq").mask("00");

// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDRc8WHqEiPmt5eZgB_HxRygGA31dqHKPg",
    authDomain: "train-schedule-bd950.firebaseapp.com",
    databaseURL: "https://train-schedule-bd950.firebaseio.com",
    projectId: "train-schedule-bd950",
    storageBucket: "train-schedule-bd950.appspot.com",
    messagingSenderId: "236709814864"
};
firebase.initializeApp(config);




// Assign the reference to the database to a variable named 'database'

var database = firebase.database();
database.ref("/trains").on("child_added", function (snapshot) {
    // create local variables to store the data from firebase
    var trainDiff = 0;
    var trainRemainder = 0;
    var minutesTillArrival = "";
    var nextTrainTime = "";
    var frequency = snapshot.val().frequency;
    // compute the difference in time from 'now' and the first train UNIX timestamp, store in var and convert in minutes
    trainDiff = moment().diff(moment.unix(snapshot.val().time), "minutes");

    // get the remainder of time by using moderator with the frequency and time difference , store in var
    trainRemainder = trainDiff % frequency;

    // subtract the remainder from the frequency, store in var
    nextTrainTime = moment().add(minutesTillArrival, "m").format("hh:mm A");

    // appent to our table of trains, inside tbody, with a new row of the train data
    $("#table-data").append(
        "<tr><td>" + snapshot.val().name + "</td>" +
        "<td>" + snapshot.val().destination + "</td>" +
        "<td>" + frequency + "</td>" +
        "<td>" + MinutesTillArrival + "</td>" +
        "<td>" + nextTrainTime + "  " + "<a><span class='glyphicon glyphicon-remove icon-hidden' aria-hidden='true'></span><a> + </td><tr>"
    );
    $("span").hide();

    // Hover view of delate button
    $().hover(
        function(){
            $(this).find("span").show();
        },
        function() {
            $(this).find("span").hide();
        });




// function to call the button event, and store the values in the input form
var storeInput = function(event) {
    // prevent from reseting
    event.preventDefault();

    // get and store input values
    trainName = jTrain.val().trim();
    trainDestination = jTrainDestination.val().trim();
    trainTime = moment(jTrainTime.val().trim(), "HH:mm").subtract(1, "years").format("X");
    trainFrequency = jTimeFreq.val().trim();

    // add to firebase database
    database.ref("/trains").push({
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency,
        nextArrival: nextArrival,
        minutesAway: minutesAway,
        date_added: firebase.database.ServerValue.TIMESTAMP
    });

    // alert that train was added
    alert("Train successfully added!");
    jTrain.val("");
    jTrainDestination.val("");
    jTrainTime.val("");
    jTimeFreq.val("");
};

// Calls storeInputs function if submit button clicked
$("#btn-add").on("click", function(event) {
    // form validation - if empty - alert
    if (jTrain.val().length === 0 || jTrainDestination.val().length === 0 || jTrainTime.val().length === 0 || jTimeFreq === 0) {
        alert("Please Fill All Required Fields");
    } else {
        // if form is filled out, run function
        storeInputs(event);
    }
});
// Calls storeInputs function if enter key is clicked

$('form').on("keypress", function(event) {
    if (event.which === 13) {
        // form validation - if empty - alert
        if (jTrain.val().length === 0 || jTrainDestination.val().length === 0 || jTrainTime.val().length === 0 || jTimeFreq === 0) {
            alert("Please Fill All Required Fields");
        } else {
            // if form is filled out, run function
            storeInputs(event);
        }
    }
});
});
