
function parse(data) {
	var result = Papa.parse(data, {header: false});
	return result;
}

document.getElementById('file_upload_button').addEventListener('change', upload);
function upload(evt) {
        console.log("uploading")
	var data = null;
	var file = evt.target.files[0];
	var reader = new FileReader();
	reader.readAsText(file);
	reader.onload = function(event) {
		var csvData = event.target.result;
		
		data = parse(csvData);
		
		console.log(data);
		
		return data;
	};
	reader.onerror = function() {
		alert('Unable to read ' + file.fileName);
	};

};


