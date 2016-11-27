var chai = require('chai')
var assert = chai.assert
var Automa = require(__dirname + '/../automa.js')
var Alfabeto = require(__dirname + "/../alfabeto.js");
var Transizione = require(__dirname + '/../transizione.js')

function creaAutomaConUnSoloStato() {
    monoAlfabeto = new Alfabeto();
    monoAlfabeto.addCarattere('a');

    stati = new Set();
    stati.add("q0");

    statiFinali = stati;

    transizioni = new Set();
    transizioni.add(new Transizione("q0", 'a', "q0"));

    return new Automa(monoAlfabeto, stati, transizioni, "q0", statiFinali);
}

describe('automaTest', function() {

    it("Costruzione di un automa con un alfabeto monocarattere e un solo stato" +
        "che è anche finale ed un unica transizione.",
        function() {
            var automaConUnoStato = creaAutomaConUnSoloStato();

            assert.equal(1, automaConUnoStato.alfabeto.caratteri.size);
            assert.equal(1, automaConUnoStato.stati.size);
            assert.equal(1, automaConUnoStato.mappaDiTransizioni.size);
            assert.equal("q0", automaConUnoStato.statoIniziale);
            assert.equal(1, automaConUnoStato.statiFinali.size);
        });

    it("Stampa di un automa con tutte le sue caratteristiche",
        function() {
            var automaConUnoStato = creaAutomaConUnSoloStato();
            var descrizioneAutoma = automaConUnoStato.toString();
            console.log(descrizioneAutoma);
        });
    it("Computazione <q0, a> -> q0",
        function() {
            var automaConUnoStato = creaAutomaConUnSoloStato();
            automaConUnoStato.eseguiProssimaComputazione('a');
            assert.equal("q0", automaConUnoStato.statoPresente);
        });

    it("Computazione <q0, b> -> [ ]",
        function() {
            var automaConUnoStato = creaAutomaConUnSoloStato();
            automaConUnoStato.eseguiProssimaComputazione('b');
            assert.equal("[ ]", automaConUnoStato.statoPresente);
        });

    it("Computazione <[ ], a> -> [ ]",
        function() {
            var automaConUnoStato = creaAutomaConUnSoloStato();
            automaConUnoStato.statoPresente = "[ ]";
            automaConUnoStato.eseguiProssimaComputazione('a');
            assert.equal("[ ]", automaConUnoStato.statoPresente);
        });
    it("Computazione <[ ], aaa> -> [ ]",
        function() {
            var automaConUnoStato = creaAutomaConUnSoloStato();
            automaConUnoStato.statoPresente = "[ ]";
            automaConUnoStato.eseguiComputazione('aaa');
            assert.equal("[ ]", automaConUnoStato.statoPresente);
        });

    it("Computazione <q0, aaa> -> q0",
        function() {
            var automaConUnoStato = creaAutomaConUnSoloStato();
            automaConUnoStato.eseguiComputazione('aaa');
            assert.equal("q0", automaConUnoStato.statoPresente);
        });

    it("Computazione <q0, aba> -> [ ]",
        function() {
            var automaConUnoStato = creaAutomaConUnSoloStato();
            automaConUnoStato.eseguiComputazione('aba');
            assert.equal("[ ]", automaConUnoStato.statoPresente);
        });
    it("Accettazione della stringa \"aaa\" appartenente al linguaggio",
        function() {
            var automaConUnoStato = creaAutomaConUnSoloStato();
            assert.isTrue(automaConUnoStato.isStringaDelLinguaggio('aaa'));
        });
    it("Non Accettazione della stringa \"aba\" non appartenente al linguaggio",
        function() {
            var automaConUnoStato = creaAutomaConUnSoloStato();
            assert.isFalse(automaConUnoStato.isStringaDelLinguaggio('aba'));
        });


    //Test con automa che riconosce il linguaggio A. A è rappresentato dalla
    //seguente espressione regolare (ab+c)(ab+c)*
    function creaAutomaPerLinguaggioA() {
        //creazione alfabeto
        var setABC = new Set();
        setABC.add('a');
        setABC.add('b');
        setABC.add('c');
        var alfabetoABC = new Alfabeto(setABC);

        //creazione insieme di stati
        var statiAutoma = new Set();
        statiAutoma.add("q0");
        statiAutoma.add("q1");
        statiAutoma.add("q2");

        //creazione transizioni
        var setTransizioni = new Set();
        setTransizioni.add(new Transizione("q0", 'a', "q1"));
        setTransizioni.add(new Transizione("q0", 'c', "q2"));
        setTransizioni.add(new Transizione("q1", 'b', "q2"));
        setTransizioni.add(new Transizione("q2", 'c', "q2"));
        setTransizioni.add(new Transizione("q2", 'a', "q1"));

        //impostazione stato finale
        var statiFinali = new Set();
        statiFinali.add("q2");

        //impostazione stato iniziale
        var statoIniziale = "q0";

        return new Automa(alfabetoABC, statiAutoma, setTransizioni, statoIniziale, statiFinali);
    }

    it("Accettazione della stringa \"ab\" appartenente al linguaggio",
        function() {
            var automaPerA = creaAutomaPerLinguaggioA();
            assert.isTrue(automaPerA.isStringaDelLinguaggio('ab'));
        });
    it("Non accettazione della stringa \"aba\" non appartenente al linguaggio",
        function() {
            var automaPerA = creaAutomaPerLinguaggioA();
            assert.isFalse(automaPerA.isStringaDelLinguaggio('aba'));
        });
    it("Accettazione della stringa \"abccccccccccccccccc\" appartenente al linguaggio",
        function() {
            var automaPerA = creaAutomaPerLinguaggioA();
            assert.isTrue(automaPerA.isStringaDelLinguaggio('abccccccccccccccccc'));
        });
    it("Non accettazione della stringa \"ababbb\" non appartenente al linguaggio",
        function() {
            var automaPerA = creaAutomaPerLinguaggioA();
            assert.isFalse(automaPerA.isStringaDelLinguaggio('ababbb'));
        });
    it("Non accettazione della stringa \"cababbb\" non appartenente al linguaggio",
        function() {
            var automaPerA = creaAutomaPerLinguaggioA();
            assert.isFalse(automaPerA.isStringaDelLinguaggio('cababbb'));
        });
    it("Accettazione della stringa \"cabababababababccccab\" appartenente al linguaggio",
        function() {
            var automaPerA = creaAutomaPerLinguaggioA();
            assert.isTrue(automaPerA.isStringaDelLinguaggio('cabababababababccccab'));
        });
})
