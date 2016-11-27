/**
 * Alfabeto è l'insieme dei caratteri
 */

/**
 * Alfabeto - Costruttore dell'alfabeto vuoto
 *
 */
function Alfabeto() {
    this.caratteri = new Set();
};

/**
 * Alfabeto.prototype.addCarattere - description
 *
 * @param  {char} carattere carattere da agggiungere
 */
Alfabeto.prototype.addCarattere = function(carattere) {
    this.caratteri.add(carattere);
};

/**
 * Alfabeto.prototype.addInsiemeDiCaratteri - description
 *
 * @param  {setOfCharacter} insiemeDiCaratteri insieme di caratteri da aggiungere
 */
Alfabeto.prototype.addInsiemeDiCaratteri = function(insiemeDiCaratteri) {
    for (let carattere of insiemeDiCaratteri)
        this.caratteri.add(carattere);
}

Alfabeto.prototype.toString = function() {
    alfabetoString = "Alfabeto: ";
    for (let carattere of this.caratteri)
        alfabetoString += carattere+", ";
    return alfabetoString;
}
module.exports = Alfabeto;
