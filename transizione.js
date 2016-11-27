/**
 * La transizione è una funzione che a partire da uno stato iniziale ed un
 * carattere sotto la testina è in grado di arrivare ad un nuovo stato
 */
const STATO_DI_PARTENZA = 0;
const CARATTERE_SOTTO_TESTINA=1;
/**
 * Transizione - description
 *
 * @param  {<string,char>} statoPresente
 * @param  {string} statoDiArrivo
 */
function Transizione(statoDiPartenza,carattereSottoTestina,statoDiArrivo) {
    this.statoPresente = [statoDiPartenza,carattereSottoTestina].toString();
    this.statoDiArrivo = statoDiArrivo;
};

Transizione.prototype.toString = function(){
  transizioneString = ("<"+this.statoPresente+"> -> "+this.statoDiArrivo);
  return transizioneString;
}

module.exports = Transizione;
