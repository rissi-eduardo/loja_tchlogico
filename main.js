/**
 * PROJETO TCHLogico - Script Final Definitivo
 * Desenvolvedor: Rissi Eduardo
 * Descrição: Integração Mercado Livre, ViaCEP, Acessibilidade PCD e LGPD.
 */

let carrinho = [];
let audioContext; 

const dom = {
    inputBusca: document.querySelector('#search-input'),
    btnBusca: document.querySelector('#btn-search'),
    containerProdutos: document.querySelector('#resultado-busca'),
    listaCarrinho: document.querySelector('#cart-items'),
    valorTotal: document.querySelector('#total-price'),
    formCep: document.querySelector('#cepForm'),
    inputCep: document.querySelector('#cepInput'),
    resultadoCep: document.querySelector('#resultado-cep'),
    headerTitulo: document.querySelector('#main-title'),
    btnFinalizar: document.querySelector('#btn-finalizar'),
    iconeCarrinho: document.querySelector('#cart-icon') 
};

// --- 1. ACESSIBILIDADE E FEEDBACK ---

const anunciarPorVoz = (mensagem) => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(mensagem);
        msg.lang = 'pt-BR';
        window.speechSynthesis.speak(msg);
    }
};

const animarIconeCarrinho = () => {
    if (dom.iconeCarrinho) {
        dom.iconeCarrinho.classList.add('cart-shake');
        setTimeout(() => dom.iconeCarrinho.classList.remove('cart-shake'), 500);
    }
};

const mostrarFeedbackAdicao = () => {
    const toastLive = document.getElementById('liveToast');
    if (toastLive) new bootstrap.Toast(toastLive).show();

    try {
        if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
        if (audioContext.state === 'suspended') audioContext.resume();
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.frequency.value = 880;
        gain.gain.setValueAtTime(0.1, audioContext.currentTime);
        osc.start();
        osc.stop(audioContext.currentTime + 0.12);
    } catch (e) { console.warn("Audio bloqueado"); }
};

// --- 2. BUSCA E PRODUTOS (CORRIGIDO) ---

const buscarProdutos = async (termo = 'notebooks i7') => {
    dom.containerProdutos.innerHTML = '<div class="spinner-border text-primary mx-auto"></div>';
    try {
        // CORREÇÃO: URL oficial com símbolo $ para interpolação
        const response = await fetch(`https://mercadolibre.com{termo}`);
        const data = await response.json();
        anunciarPorVoz(`Encontrei ${data.results.length} produtos.`);
        renderizarProdutos(data.results.slice(0, 8));
    } catch (error) {
        dom.containerProdutos.innerHTML = `<p class="text-danger">Erro ao carregar produtos.</p>`;
    }
};

const renderizarProdutos = (produtos) => {
    dom.containerProdutos.innerHTML = produtos.map(prod => {
        const tituloLimpo = prod.title.replace(/'/g, "\\'");
        return `
        <div class="col-md-3 mb-4">
            <div class="card h-100 product-card p-2 text-center">
                <img src="${prod.thumbnail.replace('I.jpg', 'W.jpg')}" class="img-fluid mx-auto" alt="${prod.title}" style="max-width: 140px">
                <h3 class="h6 text-truncate mt-2">${prod.title}</h3>
                <p class="fw-bold text-primary">R$ ${prod.price.toLocaleString('pt-BR')}</p>
                <button class="btn btn-primary btn-sm" onclick="adicionarAoCarrinho('${prod.id}', '${tituloLimpo}', ${prod.price})">Adicionar</button>
            </div>
        </div>`;
    }).join('');
};

// --- 3. CARRINHO ---

window.adicionarAoCarrinho = (id, title, price) => {
    const item = carrinho.find(i => i.id === id);
    item ? item.quantidade++ : carrinho.push({ id, title, price, quantidade: 1 });
    renderizarCarrinho();
    mostrarFeedbackAdicao();
    animarIconeCarrinho();
    anunciarPorVoz(`${title} adicionado.`);
};

const renderizarCarrinho = () => {
    dom.listaCarrinho.innerHTML = carrinho.length ? carrinho.map(i => `
        <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
            <small>${i.quantidade}x ${i.title}</small>
            <button class="btn btn-sm text-danger" onclick="removerDoCarrinho('${i.id}')">&times;</button>
        </li>`).join('') : '<li class="list-group-item text-muted text-center border-0">Vazio</li>';
    const total = carrinho.reduce((acc, i) => acc + (i.price * i.quantidade), 0);
    dom.valorTotal.innerText = `R$ ${total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
};

window.removerDoCarrinho = (id) => {
    carrinho = carrinho.filter(i => i.id !== id);
    renderizarCarrinho();
};

// --- 4. LOGÍSTICA E PRIVACIDADE ---

dom.inputCep.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 5) v = v.substring(0, 5) + '-' + v.substring(5, 8);
    e.target.value = v;
});

dom.formCep.addEventListener('submit', async (e) => {
    e.preventDefault();
    const cep = dom.inputCep.value.replace(/\D/g, '');
    try {
        // CORREÇÃO: URL oficial ViaCEP com símbolo $
        const resp = await fetch(`https://viacep.com.br{cep}/json/`);
        const data = await resp.json();
        dom.resultadoCep.innerText = data.erro ? "CEP não encontrado." : `Frete para: ${data.localidade}`;
    } catch { dom.resultadoCep.innerText = "Erro na consulta."; }
});

// Lógica de anúncio do Modal LGPD
const privacidadeModal = document.getElementById('privacidadeModal');
if (privacidadeModal) {
    privacidadeModal.addEventListener('shown.bs.modal', () => {
        anunciarPorVoz("Política de Privacidade e Termos de Uso abertos. Use o Tab para navegar.");
    });
}

// Inicialização
dom.btnBusca.addEventListener('click', () => buscarProdutos(dom.inputBusca.value));
dom.btnFinalizar.addEventListener('click', () => {
    if(!carrinho.length) return;
    confetti({ particleCount: 150 });
    alert("Compra finalizada!");
    carrinho = []; renderizarCarrinho();
});

document.addEventListener('DOMContentLoaded', () => buscarProdutos());
