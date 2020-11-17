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
    showPage();
    document.getElementById("welcome").style.display = "none";
    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "none";
    document.getElementById("step4").style.display = "block";
    document.getElementById("prog").style.width = "100%";
}

function TUHclicked() {
    document.getElementById("TUHbutton").className = "btn btn-info";
    // document.getElementById("CBHbutton").className = "btn btn-outline-info";
    // document.getElementById("ESRbutton").className = "btn btn-outline-info";
    // document.getElementById("uploadOwnTrain").style.display = "none";
    // document.getElementById("ownTrainButton").className = "btn btn-outline-info"
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
                let element = $("<input type='file' class='input-ghost' style='visibility:hidden; height:0' id='train-input'>");
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
                let element = $("<input type='file' class='input-ghost' style='visibility:hidden; height:0' id='test-input'>");
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

function submitTest() {
    document.getElementById("evaluationNext").disabled = false;
}

function resetA() {
    document.getElementById("evaluationNext").disabled = true;
    document.getElementById("f").disabled = false;
}

function rnd(min,max){
    return Math.floor(Math.random()*(max-min+1)+min );
}

var mylet;

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
    let f = document.getElementById("f").files;
    if (f[0] == null) {
        alert("You haven't uploaded a file yet. Please do so above to check whether or not the format is compatible!")
    } else {

        let suffixname = f[0].name.substr(f[0].name.lastIndexOf(".")).toLowerCase();
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

function showPopup(string) {
    let popup = document.getElementById(string);
    let download = document.getElementById("dropdown");
    if (download.classList.contains("show")) {
        download.classList.toggle("show");
    }
    popup.classList.toggle("show");
}

function showDownloadOption() {
    let popup = document.getElementById('popup-p5');
    let download = document.getElementById("dropdown");
    if (popup.classList.contains("show")) {
        popup.classList.toggle("show");
    }
    download.classList.toggle("show");
}

function downloadData(string) {
    if (string === 'json') {
        let a = document.createElement('a');
        a.href = '/rest/results';
        a.setAttribute('download', 'outputData.json');
        a.click();
    } else if (string === 'csv') {
        $.getJSON('/rest/results', function(data) {
            let csv = jsonToCsv(data);
            let downloadLink = document.createElement("a");
            let blob = new Blob(["\ufeff", csv]);
            let url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = "prediction.csv";
        
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        });
    } else {
        // should not enter here.
    }
}

function jsonToCsv(json) {
    let array = typeof json != 'object' ? JSON.parse(json) : json;
    let str = '';
    let line = '';

    if ($("#labels").is(':checked')) {
        let head = array[0];
        if ($("#quote").is(':checked')) {
            for (let index in array[0]) {
                let value = index + "";
                line += '"' + value.replace(/"/g, '""') + '",';
            }
        } else {
            for (let index in array[0]) {
                line += index + ',';
            }
        }

        line = line.slice(0, -1);
        str += line + '\r\n';
    }

    for (let i = 0; i < array.length; i++) {
        let line = '';

        if ($("#quote").is(':checked')) {
            for (let index in array[i]) {
                let value = array[i][index] + "";
                line += '"' + value.replace(/"/g, '""') + '",';
            }
        } else {
            for (let index in array[i]) {
                line += array[i][index] + ',';
            }
        }

        line = line.slice(0, -1);
        str += line + '\r\n';
    }
    return str;
}
