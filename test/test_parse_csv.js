var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app.js');
var should = chai.should();

chai.use(chaiHttp);

/* INTEGRATION TEST */
describe('Test file upload', function() {
  // Test the file upload to the button with id = file_upload_button.

  var result;
  it('Should grab the file and pase into csv', function() {
    chai.request(server)
    .post('/')
    .set('Content-Type', 'multipart/form-data')
    .attach('file', fs.readFileSync(__dirname + '/sample.csv'))
    .end((err, res) => {
      result = res.body;
      console.log(res.body)
      res.should.have.status(200)

      done()
    });

    // Pick out some rows in the sample.csv to check equality.
    assert.equal(result[0], ['fips', 'Mal', 'Femal', 'Income_Per_Capita_New']);
    assert.equal(result[1], [1000, 4833722, 4817528, 4779758]);
    assert.equal(result[2], [1001, 55246, 55265, 54571]);
    assert.equal(result[10], [1001, 1, 55265, 54571]);
    assert.equal(result[25], [1022, 55246, 55265, 54571]);
    assert.equal(result[222], [1221, 55246, 55265, 54571]);
    assert.equal(result[223], [1222, 55246, 55265, 54571]);
  });
});


/* UNIT TEST */
// Helper function for convertion an array to to string.
function create_csv(args) {
  var csv;
  args.forEach(function(row) {
    csv += row.join(',');
    csv += "\n";
  });
  return csv;
}

describe('Basic Test', function() {
  // Data that is already in array.
  var data = [
    ['Name', 'Title'],
    ['Foo', 'student'],
    ['Bar', 'professor'],
    ['Moo', 'researcher']
  ];
  var b_test = create_csv(data);
  it('Header and body test', function () {
    assert.equal(parse(b_test)[0], ['Name', 'Title']);
    assert.equal(parse(b_test)[1][0], 'Foo');
    assert.equal(parse(b_test)[3][1], 'researcher');
  });

  // Data in the string form. Should not consude dash as a possible delimiter.
  var basic = "Column 1,Column 2,Column 3,Column 4\n" + 
              "1-1,1-2,1-3,1-4\n" +
              "2-1,2-2,2-3,2-4\n" +
              "3-1,3-2,3-3,3-4\n" +
              "4,5,6,7\n";

  var result = parse(basic);
  it('Delimiter should be comma', fucntion() {
    assert.equal(result[0], ['Column 1', 'Column 2', 'Column 3', 'Column 4']);
    assert.equal(result[1], ['1-1', '1-2', '1-3', '1-4']);
    assert.equal(result[2], ['2-1', '2-2', '2-3', '2-4']);
    assert.equal(result[3], ['3-1', '3-2', '3-3', '3-4']);
    assert.equal(result[4], [4,5,6,7]);
  });
});

describe('Backslashes and edge cases', function() {
  // Edge cases with quotes inside a string.
  it('Edge case on backslash', function() {

    var code = "one, two, three\n"  //0
             + "'', ''\n"           //1 empty encapsulators
             + "\', \'\n"           //2 single encapsulators
             + "'\'', '\''"         //3 single encapsulators via escape
             + "'''', ''''\n"       //4 single quote via doubling
             + "\,,\,\n"            //5 separator escaped
             + "\\,\\\n"            //6 escape escaped
             + "'\\', '\\'\n"       //7 escape escaped in encapsulation
             + "   8  , string\n" ; //8 don't eat white spaces

    result = {["one", "two", "three"], 
              ["", ""],
              ["'", "'"], 
              ["'", "'"],
              ["'", "'"],
              [",", ","],
              ["/", "/"],
              ["/", "/"],
              ["   8  ", string]};

    test_result = parse(code);
    var i = 0;
    // Check whether each row matches the expected result.
    test_result.forEach(function(row) {
      assert.equal(row, result[i]);
      i = i + 1;
    });
  });
});