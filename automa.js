/* Definizione di un automa: <alfabeto,K,transizioni,q0,F> */

// alfabeto = caratteri ammissibili nella lettura della stringa
// K = insieme di stati possibili
// transizioni = mappa di <(statoAttuale,letteraSottoTestina),statoNuovo>
// q0 = stato di partenza
// F = sottoinsieme di K che stabilisce stati finali

const STATO_POZZO = "[ ]";
/**
 * Automa - costruttore vuoto
 *
 */
function Automa() {

}

/**
 * Automa - costruttore con tutti i parametri
 *
 * @param  {type} alfabeto      description
 * @param  {type} stati         description
 * @param  {type} transizioni   description
 * @param  {type} statoIniziale description
 * @param  {type} statiFinali   description
 */
function Automa(alfabeto, stati, transizioni, statoIniziale, statiFinali) {
    this.alfabeto = alfabeto;
    this.stati = stati;
    this.transizioni = transizioni;
    this.mappaDiTransizioni = new Map();
    for (let transizione of transizioni) {
        this.mappaDiTransizioni.set(transizione.statoPresente,
            transizione.statoDiArrivo);
    }
    this.statoIniziale = statoIniziale;
    this.statiFinali = statiFinali;
    this.statoPresente = statoIniziale;
};


/**
 * Automa.prototype.eseguiComputazione - Vogliamo effettuare una computazione
 * dell'automa sulla stringa passata per parametro.
 *
 * @param  {type} stringa stringa da riconoscere se appartenente al linguaggio
 * @return {type}         description
 */
Automa.prototype.eseguiComputazione = function(stringa) {
    if(stringa.length==0) return this.statiFinali.has(this.statoIniziale);
    for (i = 0; i < stringa.length; i++)
        this.eseguiProssimaComputazione(stringa.charAt(i));
};

/**
 * eseguiProssimaComputazione - Dato in input un carattere, ci muoviamo dallo
 * stato iniziale al prossimo stato secondo la mappa delle transizioni.
 * Ovvero modifichiamo lo stato presente a seconda di ciò che l'automa legge
 * sotto la testina.
 *
 * @param  {type} carattere description
 * @return {type}           description
 */
Automa.prototype.eseguiProssimaComputazione = function(carattere) {
    if (this.statoPresente == STATO_POZZO) {
        this.statoPresente = STATO_POZZO;
        return;
    }
    var prossimoStato = this.mappaDiTransizioni.get(this.statoPresente + ',' +
        carattere);
    if (prossimoStato)
        this.statoPresente = prossimoStato;
    else this.statoPresente = STATO_POZZO;
};

Automa.prototype.isStringaDelLinguaggio = function(stringa) {
    this.eseguiComputazione(stringa);
    var appartiene= this.statiFinali.has(this.statoPresente);
    this.statoPresente=this.statoIniziale;
    return appartiene;
}

Automa.prototype.toString = function() {
    var statiFinaliStringa = "\nStati Finali: ";
    for (let statoFinale of this.statiFinali)
        statiFinaliStringa += statoFinale + " ";
    var statiStringa = "\nStati dell'automa: ";
    for (let stato of this.stati)
        statiStringa += stato + " ";
    var transizioniStringa = "\nTransizioni: ";
    for (let transizione of this.transizioni)
        transizioniStringa += transizione.toString()+"; ";
    descrizioneAutoma = [
        this.alfabeto.toString(), statiStringa, transizioniStringa,
        "\nStato Iniziale: " + this.statoIniziale,
        statiFinaliStringa
    ];
    return descrizioneAutoma.toString();
}

module.exports = Automa;
