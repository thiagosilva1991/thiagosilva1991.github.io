const pessoas = [
  { id: 'thiago', nome: "Thiago", valor: 389.69 },
  { id: 'paula', nome: "Paula", valor: 389.69 },
  { id: 'edna', nome: "Edna (sogra Thiago)", valor: 389.69 },
  { id: 'rodrigo', nome: "Rodrigo (cunhado Thiago)", valor: 389.69 },
  { id: 'patricia', nome: "Patricia (cunhada Thiago)", valor: 389.69 },
  { id: 'fatima', nome: "Fatima", valor: 267.85 },
  { id: 'eliseu', nome: "Eliseu (Amigo Tia Fatima)", valor: 267.85 },
  { id: 'tio_cido', nome: "Tio Cido", valor: 389.69 },
  { id: 'tia_dete', nome: "Tia Dete", valor: 389.69 },
  { id: 'gusta', nome: "Gusta", valor: 389.69 },
  { id: 'ricardo', nome: "Ricardo", valor: 389.69 },
  { id: 'eliane', nome: "Eliane", valor: 267.85 },
  { id: 'pereira', nome: "Pereira", valor: 267.85 },
  { id: 'tia_te', nome: "Tia Tê", valor: 267.85 },
  { id: 'camila', nome: "Camila", valor: 267.85 },
  { id: 'gabriel', nome: "Gabriel", valor: 389.69 },
  { id: 'tia_bene', nome: "Tia Bene", valor: 267.85 },
  { id: 'tio_vardo', nome: "Tio Vardo", valor: 267.85 },
  { id: 'michel', nome: "Michel", valor: 389.69 },
  { id: 'silmara', nome: "Silmara", valor: 267.85 },
  { id: 'mae_silmara', nome: "Mãe Silmara", valor: 267.85 },
  { id: 'heber', nome: "Heber", valor: 267.85 },
  { id: 'thais', nome: "Thais", valor: 132.14 },
  { id: 'adele', nome: "Adele (Esposa do Heber)", valor: 132.14 },
  { id: 'tia_lena', nome: "Tia Lena", valor: 132.14 },
  { id: 'tio_done', nome: "Tio Done", valor: 132.14 },
  { id: 'ruth', nome: "Ruth", valor: 132.14 },
  { id: 'familia_thais_01', nome: "Familia ela Thais Pessoa 01", valor: 132.14 }
];

const STORAGE_KEY = 'confirmacoes_chacara_31_12_02_01';

let confirmacoes = {};
let pessoaSelecionada = null;

function carregarConfirmacoes() {
  try {
    const salvo = localStorage.getItem(STORAGE_KEY);
    if (salvo) confirmacoes = JSON.parse(salvo) || {};
  } catch (e) {
    confirmacoes = {};
  }
}

function salvarConfirmacoes() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(confirmacoes));
  } catch (e) {}
}

const listaDiv = document.getElementById("lista-nomes");
const detalhesDiv = document.getElementById("detalhes");

function montarLista() {
  listaDiv.innerHTML = '';
  pessoas.forEach(p => {
    const div = document.createElement("div");
    div.className = "nome";
    div.dataset.id = p.id;
    div.innerHTML = <span>${p.nome}</span>;

    const status = confirmacoes[p.id];
    if (status === 'sim') {
      div.classList.add('respondeu-sim');
      const span = document.createElement('span');
      span.className = 'label';
      span.textContent = 'Vai';
      div.appendChild(span);
    } else if (status === 'nao') {
      div.classList.add('respondeu-nao');
      const span = document.createElement('span');
      span.className = 'label';
      span.textContent = 'Não vai';
      div.appendChild(span);
    }

    div.onclick = () => abrirDetalhes(p);
    listaDiv.appendChild(div);
  });
}

function abrirDetalhes(pessoa) {
  pessoaSelecionada = pessoa;
  document.getElementById("detalhes-nome").innerText = pessoa.nome;
  document.getElementById("detalhes-valor").innerText = pessoa.valor.toFixed(2).replace('.', ',');

  const status = confirmacoes[pessoa.id];
  const statusEl = document.getElementById('detalhes-status');
  if (status === 'sim') {
    statusEl.textContent = 'Você já marcou: VAI participar.';
    statusEl.style.color = '#1b7a31';
  } else if (status === 'nao') {
    statusEl.textContent = 'Você já marcou: NÃO vai participar.';
    statusEl.style.color = '#b02116';
  } else {
    statusEl.textContent = 'Escolha abaixo se você vai ou não.';
    statusEl.style.color = '#333';
  }

  detalhesDiv.style.display = "block";
}

function confirmar(vai) {
  if (!pessoaSelecionada) return;

  confirmacoes[pessoaSelecionada.id] = vai ? 'sim' : 'nao';
  salvarConfirmacoes();
  montarLista();

  const statusEl = document.getElementById('detalhes-status');
  statusEl.textContent = vai
    ? 'Presença confirmada! Você marcou que vai participar.'
    : 'Marcado que você NÃO vai participar.';
  statusEl.style.color = vai ? '#1b7a31' : '#b02116';

  alert(vai ? 'Presença confirmada!' : 'Marcado como não vai.');
}

function copiarPix() {
  const chave = document.getElementById('pix-chave').textContent.trim();
  navigator.clipboard.writeText(chave).then(() => {
    const msg = document.getElementById('copiar-msg');
    msg.textContent = 'Chave copiada!';
    setTimeout(() => msg.textContent = '', 2000);
  }).catch(() => {
    alert('Erro ao copiar.');
  });
}

carregarConfirmacoes();
montarLista();
