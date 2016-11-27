var chai = require('chai')
var assert = chai.assert
var utils = require(__dirname + '/../utils.js')

describe('utilsTest', function() {
  it("Provo a scomporre la stringa <q0,a>->q1, <q0,b>->q2",
      function() {
        var transizioni = utils.leggiTransizioniDaStringa("<q0,a>->q1, <q0,b>->q2");
        console.log(transizioni);
        assert.equal("2", transizioni.size);
      })
})
