/**
 * Created by jakeclose on 2/14/17.
 */





// With JQuery
$('#ex1').slider({
    formatter: function(value) {
        return 'Current value: ' + value;
    }
});

// Without JQuery
var slider = new Slider('#ex1', {
    formatter: function(value) {
        return 'Current value: ' + value;
    }
});