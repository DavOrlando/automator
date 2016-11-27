var Transizione = require(__dirname + '/transizione.js');

module.exports = {
    leggiTransizioniDaStringa: function(stringaTransizioni) {
        var setTransizioni = new Set();
        var transStrs = stringaTransizioni.split(", ");
        for (transStr in transStrs) {
            setTransizioni.add(
                new Transizione(transStrs[transStr].substring(1, 3),
                    transStrs[transStr].substring(4, 5),
                    transStrs[transStr].substring(8, 10)));
        }
        return setTransizioni;
    }
}
