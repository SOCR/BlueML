// var Results = require('./models/Results');

module.exports = function(app) {
    console.log('in routes.js');
	// server routes ===========================================================
	// handle things like api calls
	// authentication routes
	app.get('/rest/results', function(req, res) {
        console.log('Getting results...');
        var filename = "test.eeg";
        var disease = "epileptic seizure";
        var temp = Math.floor(Math.random() * 10);
        console.log(temp);
        var template = {}
        if(temp > 5) {
            template = {
            filename: filename,
            disease: disease,
            model: "Neural Network Model",
            dataset: "Seizure Recognition Dataset",
            accuracy: "99%",
            symptoms: ["Uncontrollable jerking movements of the arms and legs", "Loss of consciousness or awareness", "Psychic symptoms such as fear, anxiety or deja vu"],
            treatments: ["Anti-epileptic drugs", "Vagus nerve stimulator", "Brain surgery"]}
        }
        else{
            template = {filename: filename,
            disease: "none",
            model: "Neural Network Model",
            dataset: "Seizure Recognition Dataset",
            accuracy: "99%",
            symptoms:  [],
            treatments: []}
        }
        console.log(template);
        res.send(template);
    });

    app.post('/rest/testing/datasets/upload', function(req, res) {
        console.log('Upload Testing data!!!');
        res.send({});
    });



    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        //res.sendfile('./public/views/index.html'); // load our public/index.html file
        res.render("index");
    });

};