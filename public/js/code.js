window.onload = document.getElementById("main").style.display = "none";

function showWelcome() {
    document.getElementById("welcome").style.display = "block";
    document.getElementById("main").style.display = "none";
}
function step1() {
    document.getElementById("welcome").style.display = "none";
    document.getElementById("main").style.display = "block";
    document.getElementById("step1").style.display = "block";
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "none";
    document.getElementById("step4").style.display = "none";
    document.getElementById("prog").style.width = "25%"
}
function step2() {
    document.getElementById("welcome").style.display = "none";
    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "block";
    document.getElementById("step3").style.display = "none";
    document.getElementById("step4").style.display = "none";
    document.getElementById("prog").style.width = "50%"
}
function step3() {
    closepage();

    document.getElementById("welcome").style.display = "none";
    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "block";
    document.getElementById("step4").style.display = "none";
    document.getElementById("prog").style.width = "75%"
}
function step4() {
    document.getElementById("welcome").style.display = "none";
    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "none";
    document.getElementById("step4").style.display = "block";
    document.getElementById("prog").style.width = "100%"
}
function TUHclicked() {
    document.getElementById("TUHbutton").className = "btn btn-info";
    document.getElementById("CBHbutton").className = "btn btn-outline-info";
    document.getElementById("ESRbutton").className = "btn btn-outline-info";
    document.getElementById("uploadOwnTrain").style.display = "none";
    document.getElementById("ownTrainButton").className = "btn btn-outline-info"
    document.getElementById("step2Button").disabled = false;
}

function CBHclicked() {
    document.getElementById("TUHbutton").className = "btn btn-outline-info";
    document.getElementById("CBHbutton").className = "btn btn-info";
    document.getElementById("ESRbutton").className = "btn btn-outline-info";
    document.getElementById("uploadOwnTrain").style.display = "none";
    document.getElementById("ownTrainButton").className = "btn btn-outline-info"
    document.getElementById("step2Button").disabled = false;
}
function ESRclicked() {
    document.getElementById("TUHbutton").className = "btn btn-outline-info";
    document.getElementById("CBHbutton").className = "btn btn-outline-info";
    document.getElementById("ESRbutton").className = "btn btn-info";
    document.getElementById("uploadOwnTrain").style.display = "none";
    document.getElementById("ownTrainButton").className = "btn btn-outline-info"
    document.getElementById("step2Button").disabled = false;
}
function ownTrainingReveal() {
    if (document.getElementById("uploadOwnTrain").style.display == "none") {
        document.getElementById("ownTrainButton").className = "btn btn-info"
        document.getElementById("TUHbutton").className = "btn btn-outline-info";
        document.getElementById("CBHbutton").className = "btn btn-outline-info";
        document.getElementById("ESRbutton").className = "btn btn-outline-info";
        document.getElementById("uploadOwnTrain").style.display = "block";
        document.getElementById("step2Button").disabled = true
    } else {
        document.getElementById("uploadOwnTrain").style.display = "none";
        document.getElementById("ESRbutton").className = "btn btn-info";
        document.getElementById("ownTrainButton").className = "btn btn-outline-info"
        document.getElementById("step2Button").disabled = false;
    }
}
function bs_input_file() {
    $(".input-file").before(
        function() {
            if ( ! $(this).prev().hasClass('input-ghost') ) {
                var element = $("<input type='file' class='input-ghost' style='visibility:hidden; height:0' id='train-input'>");
                element.attr("name",$(this).attr("name"));
                element.change(function(){
                    element.next(element).find('input').val((element.val()).split('\\').pop());
                });
                $(this).find("button.btn-choose").click(function(){
                    element.click();
                });
                $(this).find("button.btn-reset").click(function(){
                    element.val(null);
                    $(this).parents(".input-file").find('input').val('');
                });
                // $(this).find('input').css("cursor","pointer");
                $(this).find('input').mousedown(function() {
                    $(this).parents('.input-file').prev().click();
                    return false;
                });
                return element;
            }
        }
    );
    $(".input-file2").before(
        function() {
            if ( ! $(this).prev().hasClass('input-ghost') ) {
                var element = $("<input type='file' class='input-ghost' style='visibility:hidden; height:0' id='test-input'>");
                element.attr("name",$(this).attr("name"));
                element.change(function(){
                    element.next(element).find('input').val((element.val()).split('\\').pop());
                });
                $(this).find("button.btn-choose").click(function(){
                    element.click();
                });
                $(this).find("button.btn-reset").click(function(){
                    element.val(null);
                    $(this).parents(".input-file2").find('input').val('');
                });
                // $(this).find('input').css("cursor","pointer");
                $(this).find('input').mousedown(function() {
                    $(this).parents('.input-file2').prev().click();
                    return false;
                });
                return element;
            }
        }
    );
}
$(function() {
    bs_input_file();
});
var slider = new Slider("#ex8", {
    tooltip: 'always'
});

function showReferences() {
    if (document.getElementById("collapseOne").className == "collapse hidden") {
        document.getElementById("collapseOne").className = "collapse show";
    } else {
        document.getElementById("collapseOne").className = "collapse hidden";
    }
}
function resetA() {
    document.getElementById("evaluationNext").disabled = true;
    document.getElementById("f").disabled = false;
}
function rnd(min,max){
    return Math.floor(Math.random()*(max-min+1)+min );
}
var myVar;
function myFunction() {
    showPage();
    setTimeout(step3, rnd(3000, 5000));
}
function showPage() {
    document.getElementById("loader").style.display = "block";
}
function closepage(){
    document.getElementById("loader").style.display = "none";
}


function check() {
    var f = document.getElementById("f").files;
    if (f[0] == null) {
        alert("You haven't uploaded a file yet. Please do so above to check whether or not the format is compatible!")
    } else {

        var suffixname = f[0].name.substr(f[0].name.lastIndexOf(".")).toLowerCase();
        if(suffixname !== ".csv")
        {

            alert("Sorry, your file is not in CSV format! Please upload another file.");
        }
        else if(f[0].name !== "eeg1.csv" && f[0].name !== "eeg2.csv"){
            alert("Sorry, your file is not in EEG dataset! Please upload another file.");
        } else {
            alert("File compatible!");
            document.getElementById("evaluationNext").disabled = false;
            document.getElementById("f").disabled = true;
        }
    }
}


var app = angular.module("BlueML", []);

app.controller("resultsController", function($scope, $http){
    $scope.uploadOwnTestFile = function(){
        $http.post("http://localhost:8080/rest/results", formData).then(function (res) {
            console.log(res);
            $scope.res = res.data;
            $scope.disease = res.data.disease;

            $scope.diagnosis = function () {
                // console.log($scope.disease);
                if ($scope.disease == "none") return false;
                return true;
            }
        });
    };
});

// app.controller("uploadTrainController", function($scope, $http){
//     $scope.uploadOwnTrainFile = function(){
//         var trainFile = document.getElementById("train-input").files[0];
//         if (trainFile == null){
//             alert("Please specify training data path");
//             return;
//         }
//         var formData = new FormData();
//         formData.append('file', trainFile);
//         $http.post("http://localhost:8080/rest/training/datasets/upload", formData)
//             .then(
//                 function (data){
//                     console.log("Upload successfully!");
//                 },
//                 function(data){
//                     console.log("Upload failed!");
//                 });
//     };
// });