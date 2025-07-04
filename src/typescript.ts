//Tipos primitivos
let valor: number = 3000;
let nome: string = "João";
let isPago: boolean = false;
let qualquer: any = "";
qualquer = 22;

//Arrays
const lista: number[] = [];
lista.push(13, 22.5, 22, 89, 1.58);

//tipos personalizados / type alias
type TransacaoTeste = {
    tipoTransacao: TipoTransacaoTeste,
    data: Date,
    valor: number
}

//Enum
enum TipoTransacaoTeste {
    DEPOSITO = "Depósito",
    TRANSFERENCIA = "Transferência",
    PAGAMENTO_BOLETO = "Pagamento de Boleto"
}

const novaTransacao: TransacaoTeste = {
    tipoTransacao: TipoTransacaoTeste.PAGAMENTO_BOLETO,
    data: new Date(),
    valor: 0
}