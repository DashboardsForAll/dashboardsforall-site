'use strict';
/* =========================================================
   Modo demonstração (apresentação para clientes)
   - Todas as funções do painel funcionam, mas nada é salvo:
     os dados ficam só na memória da página e voltam ao exemplo ao recarregar.
   - Dados fictícios, com datas calculadas a partir de hoje.
   ========================================================= */

const LOGO_SVG = `<svg viewBox="0 0 64 64" width="84" height="84" aria-label="Confeitaria" role="img">
  <path d="M32 6c2 0 3.5 1.6 3.5 3.5S34 13 32 13s-3.5-1.6-3.5-3.5S30 6 32 6z" fill="var(--gold)"/>
  <rect x="30.5" y="13" width="3" height="9" rx="1.5" fill="var(--gold)"/>
  <path d="M12 34c0-5.5 4.5-10 10-10h20c5.5 0 10 4.5 10 10v4H12z" fill="var(--surface-3)" stroke="var(--primary)" stroke-width="2"/>
  <path d="M12 36c3 3 6 3 9 0s6-3 9 0 6 3 9 0 6-3 9 0 3 3 4 0" fill="none" stroke="var(--primary)" stroke-width="2.5" stroke-linecap="round"/>
  <rect x="8" y="38" width="48" height="16" rx="4" fill="var(--primary)"/>
  <rect x="4" y="54" width="56" height="4" rx="2" fill="var(--gold)"/>
</svg>`;

/* dia relativo a hoje: d(-3) = três dias atrás */
function d(n) { const t = new Date(); return isoDate(new Date(t.getFullYear(), t.getMonth(), t.getDate() + n)); }

function demoSeed() {
  let n = 0;
  const id = p => `${p}${String(++n).padStart(3, '0')}`;
  const T0 = Date.now() - 1e8;
  const it = (qtd, medida, ingrediente) => ({ qtd, medida, ingrediente });

  const receitas = [
    { id: 'r-chocolate', nome: 'Bolo de Chocolate', rendimento: 2, partes: [
      { nome: 'Massa', itens: [it(4, 'unidade', 'Ovo'), it(3, 'xícara', 'Farinha de trigo'), it(2, 'xícara', 'Açúcar'), it(6, 'colher sopa', 'Chocolate em pó'), it(240, 'ml', 'Leite'), it(120, 'ml', 'Óleo'), it(1, 'colher sopa', 'Fermento')] },
      { nome: 'Recheio', itens: [it(2, 'caixa', 'Leite condensado'), it(1, 'caixa', 'Creme de leite'), it(4, 'colher sopa', 'Chocolate em pó'), it(20, 'g', 'Manteiga')] },
    ] },
    { id: 'r-cenoura', nome: 'Bolo de Cenoura', rendimento: 1.5, partes: [
      { nome: 'Massa', itens: [it(3, 'unidade', 'Cenoura'), it(3, 'unidade', 'Ovo'), it(240, 'ml', 'Óleo'), it(2, 'xícara', 'Açúcar'), it(2.5, 'xícara', 'Farinha de trigo'), it(1, 'colher sopa', 'Fermento')] },
      { nome: 'Cobertura', itens: [it(3, 'colher sopa', 'Chocolate em pó'), it(3, 'colher sopa', 'Açúcar'), it(20, 'g', 'Manteiga'), it(60, 'ml', 'Leite')] },
    ] },
    { id: 'r-redvelvet', nome: 'Bolo Red Velvet', rendimento: 2, partes: [
      { nome: 'Massa', itens: [it(3, 'unidade', 'Ovo'), it(3, 'xícara', 'Farinha de trigo'), it(1.5, 'xícara', 'Açúcar'), it(240, 'ml', 'Leite'), it(120, 'ml', 'Óleo'), it(1, 'colher sopa', 'Chocolate em pó'), it(10, 'ml', 'Corante vermelho'), it(1, 'colher sopa', 'Fermento')] },
      { nome: 'Recheio', itens: [it(300, 'g', 'Cream cheese'), it(1, 'caixa', 'Creme de leite'), it(0.5, 'xícara', 'Açúcar')] },
    ] },
    { id: 'r-brigadeiro', nome: 'Brigadeiro Gourmet (cento)', rendimento: 1.2, partes: [
      { nome: 'Massa', itens: [it(4, 'caixa', 'Leite condensado'), it(6, 'colher sopa', 'Chocolate em pó'), it(40, 'g', 'Manteiga')] },
      { nome: 'Acabamento', itens: [it(200, 'g', 'Chocolate granulado')] },
    ] },
  ];

  // compras: alguns ingredientes com duas levas para mostrar o custo médio ponderado
  const compra = (dia, ingrediente, quantidade, medida, valor) => ({ id: id('c'), seq: T0 + n, ingrediente, quantidade, medida, valor, data: d(dia) });
  const compras = [
    compra(-40, 'Ovo', 60, 'unidades', 42),
    compra(-40, 'Farinha de trigo', 60, 'xícara', 28),
    compra(-40, 'Açúcar', 50, 'xícara', 22),
    compra(-40, 'Chocolate em pó', 120, 'colher sopa', 38),
    compra(-40, 'Leite', 6, 'litros', 33),
    compra(-40, 'Óleo', 2, 'litros', 18),
    compra(-40, 'Fermento', 30, 'colher sopa', 9),
    compra(-40, 'Leite condensado', 20, 'caixas', 110),
    compra(-40, 'Creme de leite', 15, 'caixas', 52),
    compra(-40, 'Manteiga', 1000, 'g', 48),
    compra(-40, 'Cenoura', 20, 'unidades', 12),
    compra(-40, 'Corante vermelho', 60, 'ml', 15),
    compra(-40, 'Cream cheese', 600, 'g', 45),
    compra(-40, 'Chocolate granulado', 1000, 'g', 32),
    compra(-12, 'Chocolate em pó', 100, 'colher sopa', 35),
    compra(-10, 'Ovo', 30, 'unidades', 24),
    compra(-8, 'Leite condensado', 12, 'caixas', 72),
  ];

  const snap = r => ({ nome: r.nome, rendimento: r.rendimento, itens: JSON.parse(JSON.stringify(r.partes.flatMap(p => p.itens))) });
  const R = Object.fromEntries(receitas.map(r => [r.id, r]));
  const produto = (dia, receitaId, peso, quantidade, extra) => ({ id: id('p'), seq: T0 + 1000 + n, receitaId, peso, quantidade, data: d(dia), snapshot: snap(R[receitaId]), ...extra });
  const pChoc = produto(-5, 'r-chocolate', 2, 2, { porFatias: false, valor: 120 });
  const pCen = produto(-2, 'r-cenoura', 1.5, 1, { porFatias: true, fatias: 12, valorFatia: 9 });
  const pRed = produto(-1, 'r-redvelvet', 2, 1, { porFatias: false, valor: 160 });
  const produtos = [pChoc, pCen, pRed];

  const venda = (o) => ({ id: id('v'), criadoEm: d(-1), status: 'pendente', bandeira: '', ...o });
  const pronta = (p, qtd, unidade, cliente, valor, dia, extra) => venda({ tipo: 'estoque', produtoId: p.id, nome: p.snapshot.nome, unidade, qtd, cliente, valor, dataEntrega: d(dia), ...extra });
  const encomenda = (receitaId, peso, qtd, cliente, valor, dia, extra) => venda({
    tipo: 'encomenda', receitaId, nome: R[receitaId].nome, snapshot: snap(R[receitaId]), peso, qtd, cliente, valor,
    entrada: round2(valor / 2), retirada: round2(valor - round2(valor / 2)), dataEntrega: d(dia), dataBaixa: diaAnterior(d(dia)), entradaPaga: false, ...extra,
  });
  const vendas = [
    encomenda('r-cenoura', 1.5, 1, 'Ana Beatriz Rocha', 95, -35, { status: 'entregue', entregueEm: d(-35), entradaPaga: true, entradaPagaEm: d(-40), seqBaixa: T0 + 2001, plataforma: 'Presencial', pagamento: 'Vale-alimentação', bandeira: 'Alelo' }),
    encomenda('r-redvelvet', 2, 1, 'Luciana Prado', 170, -7, { status: 'entregue', entregueEm: d(-7), entradaPaga: true, entradaPagaEm: d(-12), seqBaixa: T0 + 2002, plataforma: 'WhatsApp', pagamento: 'Crédito', bandeira: 'Elo' }),
    pronta(pChoc, 1, 'bolo', 'Mariana Lopes', 120, -4, { status: 'entregue', entregueEm: d(-4), seqBaixa: T0 + 2003, plataforma: 'iFood', pagamento: 'Crédito', bandeira: 'Visa' }),
    pronta(pCen, 4, 'fatia', 'Carlos Mendes', 36, -1, { status: 'entregue', entregueEm: d(-1), seqBaixa: T0 + 2004, plataforma: 'Presencial', pagamento: 'Pix' }),
    pronta(pCen, 2, 'fatia', 'Juliana Reis', 18, 0, { plataforma: 'WhatsApp', pagamento: 'Dinheiro' }),
    pronta(pRed, 1, 'bolo', 'Fernanda Alves', 160, 1, { plataforma: 'WhatsApp', pagamento: 'Pix' }),
    encomenda('r-brigadeiro', 1.2, 1, 'Patrícia Gomes', 180, 3, { entradaPaga: true, entradaPagaEm: d(-1), seqBaixa: T0 + 2005, plataforma: 'WhatsApp', pagamento: 'Pix' }),
    encomenda('r-chocolate', 3, 1, 'Roberto Lima', 210, 6, { plataforma: 'WhatsApp', pagamento: 'Débito', bandeira: 'Mastercard' }),
    encomenda('r-redvelvet', 2, 1, 'Camila Torres', 175, 9, { plataforma: 'iFood', pagamento: 'Vale-refeição', bandeira: 'Ticket' }),
  ];
  return { receitas, compras, produtos, vendas };
}

/* ---- substituições do armazenamento: nada é gravado ---- */
let fotoDemo = null;
seed = demoSeed;
save = function () { /* demonstração: não salva */ };
getPhoto = function () { return fotoDemo; };
setPhoto = function (url) { fotoDemo = url; };

function startDemo() {
  sync.mode = 'memory';
  db = demoSeed();
  sync.loaded = true;
  sync.status = 'Modo demonstração: dados fictícios. Nada do que for lançado é salvo; ao recarregar a página, o exemplo volta ao início.';
  render();
}
ACTIONS.reset = async () => {
  if (!await ask({ title: 'Voltar aos dados de exemplo?', body: 'Tudo o que foi lançado nesta demonstração será descartado.', ok: 'Voltar ao exemplo' })) return;
  db = demoSeed(); ui.recipeForm = ui.productForm = ui.saleForm = ui.compraForm = null; render(); toast('Dados de exemplo restaurados.');
};

startDemo();
