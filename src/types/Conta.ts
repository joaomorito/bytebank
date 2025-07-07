import { Transacao } from "./Transacao.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { GrupoTransacao } from "./GrupoTransacao.js";

let saldo: number = JSON.parse(localStorage.getItem("saldo")) || 0;
const transacaoes: Transacao[] = JSON.parse(localStorage.getItem("transacoes"), (key: string, value: string) => {
    if (key == "data") {
        return new Date(value);
    }

    return value;
}) || [];

function debitar(valor: number): void {
    if (valor <= 0) {
        throw new Error("O valor a ser debitado deve ser maior que 0");
    }
    if (valor > saldo) {
        throw new Error("Saldo insuficiente!");
    }

    saldo -= valor;
    localStorage.setItem("saldo", saldo.toString());
}

function depositar(valor: number): void {
    if (valor <= 0) {
        throw new Error("O valor a ser depositado deve ser maior que 0");
    }
    saldo += valor;
    localStorage.setItem("saldo", saldo.toString());
}

const Conta = {
    getSaldo() {
        return saldo;
    },
    
    getDataAcesso() {
        return new Date();
    },

    getGruposTransacoes(): GrupoTransacao[] {
        const gruposTransacoes: GrupoTransacao[] = [];
        const listaTransacoes: Transacao[] = structuredClone(transacaoes);
        const transacoesOrdenadas: Transacao[] = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        let labelAtualGrupoTransacao: string = "";

        for (let transacao of transacoesOrdenadas) {
            let labelGrupoStransacao: string = transacao.data.toLocaleDateString("pt-br", { month: "long", year: "numeric"});
            if (labelAtualGrupoTransacao != labelGrupoStransacao) {
                labelAtualGrupoTransacao = labelGrupoStransacao;
                gruposTransacoes.push({
                    label: labelGrupoStransacao,
                    transacoes: []
                });
            }
            gruposTransacoes.at(-1).transacoes.push(transacao);
        }

        return gruposTransacoes;
    },

    registrarTransacao(novaTransacao: Transacao): void {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
                depositar(novaTransacao.valor);
            } else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
                debitar(novaTransacao.valor);
            } else {
                throw new Error("Tipo de Transação é inválido");
            }

            transacaoes.push(novaTransacao);
            console.log(this.getGruposTransacoes);
            localStorage.setItem("transacoes", JSON.stringify(transacaoes));
    }
}

export default Conta;