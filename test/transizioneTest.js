var chai = require('chai')
var assert = chai.assert
var Transizione = require(__dirname + '/../transizione.js')

describe('transizioneTest', function() {
  var transizione = new Transizione("q0",'a',"q1");
  it("Costruisco transizione <q0,a> -> q1",
      function() {
          assert.equal("q0,a", transizione.statoPresente);
          assert.equal("q1", transizione.statoDiArrivo);
      })
})
