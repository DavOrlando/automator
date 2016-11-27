var prompt = require('prompt');

var Transizione = require(__dirname + '/transizione.js');
var utils = require(__dirname + '/utils.js');
var Alfabeto = require(__dirname + '/alfabeto.js')
var Automa = require(__dirname + '/automa.js')

//
// Start the prompt
//
//
// Disable prompt's built-in SIGINT handling:
//
prompt.start();
var schema = {
    properties: {
        alfabeto: {
            pattern: /^([a-z], )*[a-z]$/,
            message: 'Esempio di inserimento: a, b',
            required: true
        },
        stati: {
            pattern: /^(q[0-9], )*q[0-9]$/,
            message: 'Esempio di inserimento: q0,q1,q2',
            required: true
        },
        transizioni: {
            pattern: /^(<q[0-9],[a-z]>->q[0-9], )*<q[0-9],[a-z]>->q[0-9]$/,
            message: 'Esempio di inserimento:<q0,a>->q1, <q0,b>->q2',
        },
        statoIniziale: {
            pattern: /^q[0-9]$/,
            message: 'Esempio di inserimento: q0',
            required: true
        },
        statiFinali: {
            pattern: /^(q[0-9], )*q[0-9]$/,
            message: 'Esempio di inserimento: q0,q1,q2',
            required: true
        }
    }
};

var schema_linguaggio = {
    properties: {
        stringa: {
            pattern: /^([a-z])*[a-z]$/,
            message: 'Esempio di inserimento: aba',
            required: true
        }
    }
};



//
// Get two properties from the user: username and email
//
prompt.get(schema,
    function(err, result) {
        //creazione alfabeto
        var alfabeto = new Alfabeto();
        alfabeto.addInsiemeDiCaratteri(new Set(result.alfabeto.split(", ")));

        //creazione insieme di stati
        var statiAutoma = new Set(result.stati.split(", "));

        //creazione transizioni
        var setTransizioni = utils.leggiTransizioniDaStringa(result.transizioni);

        //impostazione stato finale
        var statiFinali = new Set(result.statiFinali.split(", "));

        //impostazione stato iniziale
        var statoIniziale = result.statoIniziale;

        automa = new Automa(alfabeto, statiAutoma, setTransizioni, statoIniziale, statiFinali);
        console.log(automa.toString());

        var readline = require('readline');
        var rl = readline.createInterface(process.stdin, process.stdout);
        rl.setPrompt('Inserisci la stringa da riconoscere o exit per terminare: ');
        rl.prompt();
        rl.on('line', function(line) {
                if (line === "exit") rl.close();
                console.log(automa.isStringaDelLinguaggio(line));
                rl.prompt();
            })
            .on('close', function() {
                process.exit(0);
            });
    });
