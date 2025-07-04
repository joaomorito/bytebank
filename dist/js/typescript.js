//Tipos primitivos
let valor = 3000;
let nome = "João";
let isPago = false;
let qualquer = "";
qualquer = 22;
//Arrays
const lista = [];
lista.push(13, 22.5, 22, 89, 1.58);
//Enum
var TipoTransacaoTeste;
(function (TipoTransacaoTeste) {
    TipoTransacaoTeste["DEPOSITO"] = "Dep\u00F3sito";
    TipoTransacaoTeste["TRANSFERENCIA"] = "Transfer\u00EAncia";
    TipoTransacaoTeste["PAGAMENTO_BOLETO"] = "Pagamento de Boleto";
})(TipoTransacaoTeste || (TipoTransacaoTeste = {}));
const novaTransacao = {
    tipoTransacao: TipoTransacaoTeste.PAGAMENTO_BOLETO,
    data: new Date(),
    valor: 0
};
