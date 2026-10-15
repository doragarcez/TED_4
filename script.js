// ===== Constantes e variáveis =====
// Regra prática: o álcool compensa se custar até 70% do preço da gasolina
const LIMITE = 0.7;

// ===== Entrada com prompt =====
// prompt() devolve sempre texto (string) ou null se o usuário cancelar
let nomePosto = prompt("Qual o nome do posto? (pode deixar em branco)");
if (nomePosto === null) {
  nomePosto = "";
}
nomePosto = nomePosto.trim();
console.log("Posto informado:", nomePosto || "(nenhum)");

// ===== Seleção de elementos (DOM) =====
const telaForm = document.getElementById("tela-form");
const telaResultado = document.getElementById("tela-resultado");
const inputAlcool = document.getElementById("alcool");
const inputGasolina = document.getElementById("gasolina");
const erro = document.getElementById("erro");
const posto = document.getElementById("posto");
const valorCombustivel = document.getElementById("valor-combustivel");
const formula = document.getElementById("formula");

// Conversão de tipo: string -> number
// Aceita vírgula ou ponto como separador decimal
function lerNumero(texto) {
  return parseFloat(texto.replace(",", ".").trim());
}

// Formata como moeda brasileira
function formatarReal(numero) {
  return numero.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Formata percentual com 1 casa decimal
function formatarPercentual(numero) {
  return numero.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }) + "%";
}

function calcular() {
  const alcool = lerNumero(inputAlcool.value);
  const gasolina = lerNumero(inputGasolina.value);

  // Validação com condicional
  if (!(alcool > 0) || !(gasolina > 0)) {
    erro.textContent = "Informe os dois preços com valores maiores que zero.";
    console.log("Entrada inválida:", inputAlcool.value, inputGasolina.value);
    return;
  }

  erro.textContent = "";

  // Cálculo matemático: razão álcool / gasolina
  const razao = alcool / gasolina;
  const percentual = razao * 100;

  // Condicional if / else
  let escolha;
  if (razao <= LIMITE) {
    escolha = "Álcool";
  } else {
    escolha = "Gasolina";
  }

  console.log("Razão:", razao, "->", escolha);

  // Saída na página (DOM + textContent)
  posto.textContent = nomePosto ? "Posto " + nomePosto : "";
  valorCombustivel.textContent = escolha;
  formula.textContent =
    formatarReal(alcool) + " ÷ " + formatarReal(gasolina) +
    " = " + formatarPercentual(percentual) + " (limite: 70%)";

  telaForm.classList.remove("ativa");
  telaResultado.classList.add("ativa");
}

function voltar() {
  inputAlcool.value = "";
  inputGasolina.value = "";
  telaResultado.classList.remove("ativa");
  telaForm.classList.add("ativa");
  inputAlcool.focus();
}

// Saída com alert
function explicarRegra() {
  alert(
    "Regra dos 70%:\n\n" +
    "Divida o preço do álcool pelo da gasolina.\n" +
    "• Resultado até 0,70 (70%): abasteça com álcool.\n" +
    "• Acima disso: abasteça com gasolina.\n\n" +
    "Isso acontece porque o álcool rende cerca de 30% menos que a gasolina."
  );
}

// ===== Eventos =====
document.getElementById("btn-calcular").addEventListener("click", calcular);
document.getElementById("btn-voltar").addEventListener("click", voltar);
document.getElementById("btn-regra").addEventListener("click", explicarRegra);

[inputAlcool, inputGasolina].forEach(function (campo) {
  campo.addEventListener("keydown", function (e) {
    if (e.key === "Enter") calcular();
  });
});