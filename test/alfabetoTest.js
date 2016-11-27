var chai = require('chai')
var assert = chai.assert
var Alfabeto = require(__dirname + '/../alfabeto.js')

describe('alfabetoTest', function() {
    var alfabetoVuoto = new Alfabeto();

    it("La costruzione dell'alfabeto vuoto genera un alfabeto con 0 caratteri",
        function() {
            assert.equal(0, alfabetoVuoto.caratteri.size);
        })
    it("Aggiunta del carattere 'a' all'alfabeto vuoto",
        function() {
            alfabetoVuoto.addCarattere('a');
            assert.isTrue(alfabetoVuoto.caratteri.has('a'));
        })

    it("Aggiunta dei caratteri a e b con il metodo di aggiunta carattere singolo",
        function() {
            alfabetoVuoto.addCarattere('a');
            alfabetoVuoto.addCarattere('b');
            assert.isTrue(alfabetoVuoto.caratteri.has('a'));
            assert.isTrue(alfabetoVuoto.caratteri.has('b'));
        })

    it("Aggiunta dei caratteri a e b con il metodo di aggiunta multipla",
        function() {
            var insiemeDiCaratteri = new Set();
            insiemeDiCaratteri.add('a');
            insiemeDiCaratteri.add('b');
            alfabetoVuoto.addInsiemeDiCaratteri(insiemeDiCaratteri);
            assert.isTrue(alfabetoVuoto.caratteri.has('a'));
            assert.isTrue(alfabetoVuoto.caratteri.has('b'));
        })
})
