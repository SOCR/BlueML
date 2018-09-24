 /**
 * Created by jakeclose on 2/14/17.
 * Edited by thematthewchen in March 2018
 */
$(function () {
    $("#add_another_upload_button").click(function () {
        if( $('input[type="file"]').val() !== '') {
            add_upload_row();
        }
        console.log("no upload")
    });
   // check_for_select_file();


    $('input[type="file"]').change(function(e){
	$('next_module').disabled = false;
        var fileName = e.target.files[0].name;
        var reader = new FileReader();
        reader.onload = function(e) {
            //Reads in data from inputted file
            rawData = reader.result; //rawData holds information, global
            var parse = new Parser(); //create new instance of Parser class in parser.js
            /* 
            *
            * TODO: JSON is based off of aa3mia.dat from https://www.physionet.org/physiobank/database/aami-ec13/
            *       which has a format of 16 bits signed integers according to the header file
            *       
            *       Parsing and JSON format need to into account header files information
            *       Temporarily set to reading 10 chunks of sshorts for each.
            */
            var result = {
                'fips': parse.scan('sshort', rawData, 10), 
                'Mal': parse.scan('sshort', rawData, 10),
                'Femal': parse.scan('sshort', rawData, 10),
                'Income': parse.scan('sshort', rawData, 10)
            };
            console.log(result)
        }
        reader.readAsArrayBuffer(e.target.files[0]);


      //  alert('The file "' + fileName +  '" has been selected.');
        $(".file_upload tr *:nth-child(3)").show();
        $(".file_upload tr :nth-child(3)").text(fileName);
        $(".file_upload tr *:nth-child(4)").show();

        remove_or_show_nav_buttons()
        $('#add_another_upload_button').attr("disabled", false);
    });
});


function add_upload_row() {
    var currentFile_Num =  $('#file_upload_table tr').length;
    console.log(currentFile_Num);

    $deleteBTN = '<button type= "button" class="btn btn-default btn-sm" id = "delete_file_upload" onclick="deletetr(this)">  <span class="glyphicon glyphicon-minus"></span> Remove  </button>';

    console.log($deleteBTN);
    $("#file_upload_table").append('<tr><td>' + currentFile_Num  + '</td><td><input type="file" name="file" id = "file_upload_button"> </td><td> </td> <td>' + $deleteBTN + ' </td></tr>');
    $(".file_upload tr *:nth-child(3)").show();
    $(".file_upload tr *:nth-child(4)").show();

}

function deletetr(obj) {
    if ($('#file_upload_table tr').length > 2) { // If more than one row, remove it
        $(obj).parents("tr").remove();
    }
    else if ($('#file_upload_table tr').length == 2){ // If only one row left, clean it
        $(obj).parents("tr").remove();
        add_upload_row();
    }
}










