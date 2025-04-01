import { useState } from "react";

export default function SimuladorImportacao() {
  const [fob, setFob] = useState(0);
  const [peso, setPeso] = useState(0);
  const [regime, setRegime] = useState("lucro_real");
  const [resultado, setResultado] = useState<string | null>(null);

  const simular = () => {
    const cambio = 5.75;
    const frete_mar = 23000;
    const armazenagem = 5300;
    const afrmm = 5772;
    const taxas = 500;
    const sda = 2000;
    const frete_rod = 2500;
    const honorarios = 1500;

    const ii = 0.14;
    const ipi = 0.06;
    const pis = 0.0186;
    const cofins = 0.0854;
    const icms = 0.18;

    const valor_fob_brl = fob * cambio;
    const custos_fixos = frete_mar + armazenagem + afrmm + taxas + sda + frete_rod + honorarios;
    const custo_unitario = valor_fob_brl + (custos_fixos / peso);

    const valor_ii = custo_unitario * ii;
    const valor_ipi = (custo_unitario + valor_ii) * ipi;
    const valor_pis = custo_unitario * pis;
    const valor_cofins = custo_unitario * cofins;
    const base_icms = (custo_unitario + valor_ii + valor_ipi + valor_pis + valor_cofins) / (1 - icms);
    const valor_icms = base_icms * icms;

    const custo_total = custo_unitario + valor_ii + valor_ipi + valor_pis + valor_cofins + valor_icms;

    let preco_final = 0;
    if (regime === "simples") preco_final = custo_total * 1.3;
    else if (regime === "lucro_presumido") preco_final = custo_total * 1.25;
    else preco_final = custo_total * 1.15;

    setResultado(preco_final.toFixed(2));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-xl space-y-4">
      <h1 className="text-2xl font-bold">Simulador de Importação 5A Inox</h1>
      <input
        type="number"
        placeholder="FOB (USD) por kg ou metro"
        className="border p-2 w-full rounded"
        onChange={(e) => setFob(parseFloat(e.target.value))}
      />
      <input
        type="number"
        placeholder="Peso total (kg)"
        className="border p-2 w-full rounded"
        onChange={(e) => setPeso(parseFloat(e.target.value))}
      />
      <select
        className="border p-2 w-full rounded"
        onChange={(e) => setRegime(e.target.value)}
      >
        <option value="lucro_real">Lucro Real</option>
        <option value="lucro_presumido">Lucro Presumido</option>
        <option value="simples">Simples Nacional</option>
      </select>
      <button onClick={simular} className="bg-blue-600 text-white p-2 rounded w-full">
        Calcular Preço Final
      </button>
      {resultado && (
        <div className="text-lg font-semibold text-center">
          Preço Final Estimado: R$ {resultado}
        </div>
      )}
    </div>
  );
}