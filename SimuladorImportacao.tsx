import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SimuladorImportacao() {
  const [fob, setFob] = useState(0);
  const [peso, setPeso] = useState(0);
  const [regime, setRegime] = useState("lucro_real");
  const [resultado, setResultado] = useState(null);

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
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardContent className="space-y-4 p-4">
          <h2 className="text-xl font-bold">Simulador de Importação 5A Inox</h2>
          <Input type="number" placeholder="FOB (USD) por kg ou metro" onChange={(e) => setFob(parseFloat(e.target.value))} />
          <Input type="number" placeholder="Peso total (kg)" onChange={(e) => setPeso(parseFloat(e.target.value))} />
          <select className="w-full border rounded p-2" onChange={(e) => setRegime(e.target.value)}>
            <option value="lucro_real">Lucro Real</option>
            <option value="lucro_presumido">Lucro Presumido</option>
            <option value="simples">Simples Nacional</option>
          </select>
          <Button onClick={simular}>Calcular Preço Final</Button>
          {resultado && (
            <div className="text-lg font-medium">Preço Final Estimado: R$ {resultado}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
