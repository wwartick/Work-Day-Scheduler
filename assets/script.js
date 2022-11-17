//display current date on header
var todaysDate = moment().utcOffset(-7).format("dddd, MMMM D, YYYY");
$("#currentDay").text(todaysDate);

//generates time blocks
var rowGenerator = function() {

    for(var i=9; i<18; i++) {
        var newRow = $("<div>")
            .addClass("row");

        var hourBox  = $("<div>")
            .addClass("col-w hourBox")

        var timeH5 = $("<h5>")
            .addClass("text-right p-1 hour")
            .text(i + ":00");

        var textAreaBox= $("<div>")
            .addClass("col-8");

        var textArea = $("<textarea>")
            .addClass("task-box")
            .attr("id", "text-" + i);

        var btnBox = $("<div>")
            .addClass("col-2 btnBox");

        var saveBtn = $("<button>")
            .addClass("saveBtn")
            .attr("id", "btn-" + i);

        var saveIcon = $("<span>")
            .addClass("oi oi-pin");

        taskBackground(textArea, i);

        //appends time blocks to html
        hourBox.append(timeH5);
        textAreaBox.append(textArea);
        saveBtn.append(saveIcon);
        btnBox.append(saveBtn);
        newRow.append(hourBox);
        newRow.append(textAreaBox);
        newRow.append(btnBox);
        $(".container").append(newRow);

        // load saved tasks
        loadTask(textArea, i);
    };
};

//changes background color based on current time compared to timeblock time
var taskBackground = function(textBox, index) {

    var time = moment().utcOffset(-7).format("H");

    $(textBox).removeClass("past present future");

    if (index < time) {
        $(textBox).addClass("past");
    } else if (index > time){
        $(textBox).addClass("future");
    } else {
        $(textBox).addClass("present");
        }
};

//loads tasks
var loadTask = function(textArea, index) {
    textArea.val(localStorage.getItem("hour" + index));
};

//saves tasks
var saveTask = function(thisBtn) {
    var taskText = $(thisBtn).parent('.btnBox').parent('.row').children('.col-8').children('.task-box').val();
    var taskTime = $(thisBtn).parent('.btnBox').parent('.row').children('.hourBox').children('.hour').text();

    
    if (taskTime.length === 5) {
        var newTime = taskTime[0] + taskTime[1];
    }
    //if it is 9:00
    else { 
        var newTime = taskTime[0];
    }

    localStorage.setItem("hour" + newTime, taskText);
};

//focuses text area on click
$(".task-box").on("click", "p", function(){
    var text = $(this)
        .text()
        .trim();

    var textInput = $("<textarea>")
        .addClass("task-box")
        .val(text); 

    $(this).replaceWith(textInput);

    textInput.trigger("focus");

});

//replaces text value when user clicks out of text area
$(".task-box").on("blur", "textarea", function(){
    var text = $(this)
    .val()
    .trim();

    var taskP = $("<p>")
    .addClass("m-1")
    .text(text);

    $(this).replaceWith(taskP);
});

//gets btn id for which text area to save
for (var i=9; i<18; i++) {
    $(".container").on("click", "#btn-" + i, function() {
        saveTask(this);
    });
};

// create initial time block rows
rowGenerator();

// call coloring tasks after rows are created
taskBackground();

