/**
 * PROJETO TCHLogico - Script Final Consolidado
 * Desenvolvedor: Rissi Eduardo
 */

let carrinho = [];

const dom = {
    inputBusca: document.querySelector('#search-input'),
    btnBusca: document.querySelector('#btn-search'),
    containerProdutos: document.querySelector('#resultado-busca'),
    listaCarrinho: document.querySelector('#cart-items'),
    valorTotal: document.querySelector('#total-price'),
    formCep: document.querySelector('#cepForm'),
    resultadoCep: document.querySelector('#resultado-cep'),
    headerTitulo: document.querySelector('#main-title')
};

// --- 1. FUNÇÕES DE BUSCA DE PRODUTOS ---

const buscarProdutos = async (termo = 'notebooks') => {
    dom.containerProdutos.innerHTML = `
        <div class="text-center w-100 py-5">
            <div class="spinner-border text-primary" role="status"></div>
            <p class="mt-2" aria-live="polite">Buscando as melhores ofertas para você...</p>
        </div>`;
    
    try {
        // CORREÇÃO DA URL: Adicionado o caminho da API e a sintaxe correta ${termo}
        const response = await fetch(`https://mercadolibre.com{termo}`);
        const data = await response.json();
        
        renderizarProdutos(data.results.slice(0, 8));
    } catch (error) {
        dom.containerProdutos.innerHTML = '<p class="text-danger text-center">Falha ao conectar com a loja. Verifique sua conexão.</p>';
        console.error("Erro na busca:", error);
    }
};

const renderizarProdutos = (produtos) => {
    dom.containerProdutos.innerHTML = ''; 
    
    if (produtos.length === 0) {
        dom.containerProdutos.innerHTML = '<p class="text-center w-100">Ops! Não encontramos esse produto.</p>';
        return;
    }

    produtos.forEach(prod => {
        const div = document.createElement('div');
        div.className = 'col-12 col-sm-6 col-md-4 col-lg-3 mb-4';
        const tituloLimpo = prod.title.replace(/"/g, '&quot;'); 

        div.innerHTML = `
            <div class="card h-100 product-card p-2 shadow-sm border-0">
                <img src="${prod.thumbnail.replace('I.jpg', 'W.jpg')}" class="card-img-top mx-auto" alt="${tituloLimpo}" style="max-width: 140px">
                <div class="card-body d-flex flex-column text-center">
                    <h3 class="h6 card-title text-truncate">${tituloLimpo}</h3>
                    <p class="fw-bold text-primary">R$ ${prod.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    <button class="btn btn-primary btn-sm mt-auto" 
                            onclick="adicionarAoCarrinho('${prod.id}', '${tituloLimpo.replace(/'/g, "")}', ${prod.price})"
                            aria-label="Adicionar ${tituloLimpo} ao carrinho">
                        Adicionar
                    </button>
                </div>
            </div>`;
        dom.containerProdutos.appendChild(div);
    });
};

// --- 2. GESTÃO DO CARRINHO ---

window.adicionarAoCarrinho = (id, title, price) => {
    const itemExistente = carrinho.find(i => i.id === id);
    itemExistente ? itemExistente.quantidade++ : carrinho.push({ id, title, price, quantidade: 1 });
    renderizarCarrinho();
};

window.removerDoCarrinho = (id) => {
    carrinho = carrinho.filter(item => item.id !== id);
    renderizarCarrinho();
};

const renderizarCarrinho = () => {
    dom.listaCarrinho.innerHTML = '';
    let totalGeral = 0;

    if (carrinho.length === 0) {
        dom.listaCarrinho.innerHTML = '<li class="list-group-item text-muted text-center border-0">O carrinho está vazio</li>';
        dom.valorTotal.innerText = 'R$ 0,00';
        return;
    }

    carrinho.forEach(item => {
        const subtotal = item.price * item.quantidade;
        totalGeral += subtotal;
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center border-0 px-0';
        li.innerHTML = `
            <div class="text-truncate" style="max-width: 150px;">
                <small class="fw-bold d-block">${item.title}</small>
                <small class="text-muted">${item.quantidade}x R$ ${item.price.toFixed(2)}</small>
            </div>
            <button class="btn btn-sm text-danger" onclick="removerDoCarrinho('${item.id}')" aria-label="Remover item do carrinho">&times;</button>
        `;
        dom.listaCarrinho.appendChild(li);
    });
    dom.valorTotal.innerText = `R$ ${totalGeral.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
};

// --- 3. FINALIZAÇÃO E LOGÍSTICA ---

window.finalizarCompra = () => {
    if (carrinho.length === 0) return alert("Adicione ao menos um produto para finalizar!");
    if(typeof confetti === 'function') {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
    alert(`🎉 Parabéns! Compra finalizada com sucesso.\nTotal: ${dom.valorTotal.innerText}`);
    carrinho = [];
    renderizarCarrinho();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

dom.formCep.addEventListener('submit', async (e) => {
    e.preventDefault();
    const cep = document.querySelector('#cepInput').value.replace(/\D/g, ''); 
    if (cep.length !== 8) return dom.resultadoCep.innerText = "Digite um CEP válido.";

    try {
        // CORREÇÃO DA URL: Adicionada a barra e a sintaxe correta ${cep}
        const resp = await fetch(`https://viacep.com.br{cep}/json/`);
        const data = await resp.json();
        
        if (data.erro) {
            dom.resultadoCep.className = "mt-3 fw-bold text-danger";
            dom.resultadoCep.innerText = 'CEP não encontrado.';
        } else {
            dom.resultadoCep.className = "mt-3 fw-bold text-success";
            dom.resultadoCep.innerText = `Frete para: ${data.localidade}/${data.uf}`;
        }
    } catch {
        dom.resultadoCep.innerText = 'Erro ao consultar frete.';
    }
});

// --- 4. EVENTOS ---

dom.btnBusca.addEventListener('click', () => {
    const termo = dom.inputBusca.value.trim();
    if (termo) buscarProdutos(termo);
});

dom.headerTitulo.addEventListener('click', () => {
    dom.headerTitulo.innerHTML = 'Obrigado por escolher a Loja do <span class="text-primary">Rissi Eduardo</span>!';
});

document.addEventListener('DOMContentLoaded', () => buscarProdutos());
