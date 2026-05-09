<!-- 
  GUIA DE MANUTENÇÃO GLOBAL (PCD e Não-PCD):
  1. Use títulos claros e emojis para navegação visual rápida.
  2. Mantenha os links de documentos em blocos destacados.
  3. Descrições curtas facilitam a leitura por sintetizadores de voz.
-->

# 💻 Loja TCHLogico! - Tecnologia de Ponta

<!-- Badges de Identificação Rápida -->
![Status](https://shields.io)
![Acessibilidade](https://shields.io)
![SEO](https://shields.io)

Projeto de vitrine tecnológica integrada à **API do Mercado Livre**, priorizando a **Acessibilidade Universal** e o alto desempenho com curadoria de **Rissi Eduardo**.

---

## 📌 Sumário de Documentação
<!-- Links diretos para facilitar a auditoria técnica e manutenção -->
- 📑 [**Memorial Descritivo**](MEMORIAL_DESCRITIVO.md) - Decisões técnicas e arquitetura.
- 📘 [**Manual de Acessibilidade**](MANUAL_ACESSIBILIDADE.md) - Guia prático de testes e validação.
- ⚖️ [**Licença MIT**](LICENSE) - Termos de uso e proteção de autoria.

---

## 🔍 Análise de Modificações (Changelog Técnico)
*Nesta versão final, o projeto foi reestruturado para conformidade com a LGPD e WCAG 2.1.*

1. **`index.html`:** Inclusão de CDNs oficiais, **H1 Profissional** focado em SEO e integração de **Modais Acessíveis** para Ajuda e Privacidade (LGPD).
2. **`style.css`:** Arquitetura com **Variáveis CSS (:root)**, micro-interação *Shake-Cart* e suporte a `prefers-reduced-motion`.
3. **`main.js`:** Implementação de **Feedback Multissensorial** (Voz e Beep 880Hz), máscaras de CEP e anúncios via `Web Speech API`.

---

## ♿ Ecossistema de Acessibilidade
O projeto garante que a tecnologia de ponta seja acessível a todos:
- **Vocal (Voz):** O site utiliza a *Web Speech API* para anunciar resultados e status.
- **Sonoro (Beep):** Um sinal sonoro de 880Hz confirma ações para usuários com baixa visão.
- **Visual (Animação):** O carrinho realiza uma "sacudida" (Shake) ao receber produtos.
- **Semântica:** Uso total de `aria-live`, `labels` e `alt text` para leitores de tela.

---

## 📖 Tutorial de Uso

### Para Usuários Inexperientes
- **Pesquisa:** Digite o produto no campo de busca e clique no botão azul "Buscar".
- **Comprar:** Clique em "Adicionar". Um som e uma mensagem vocal confirmarão a ação.
- **CEP:** Informe seu CEP; o traço `-` é colocado automaticamente pelo sistema.

### Para Usuários Experientes / PCDs
- **Atalhos:** Use a tecla **TAB** para navegar. O foco possui contorno de alto contraste.
- **Leitores de Tela:** O sistema anunciará automaticamente: "Encontrei X produtos".
- **Privacidade:** Acesse o link no rodapé para visualizar os termos sob as normas da LGPD.

---

## 🛠️ Guia do Programador (Instalação e Manutenção)
1. **Clone o projeto:** 
   ```bash
   git clone https://github.com/rissi-eduardo/loja_tchlogico
   ```
2. **Execute:** Abra o arquivo `index.html` em um navegador moderno.

### Orientações para Manutenções Periódicas
- **Acessibilidade:** Ao alterar o JS, valide se a função `anunciarPorVoz()` continua disparando.
- **Estilo:** Mantenha o contraste de cores das variáveis `--primary-color`.
- **Documentação:** Sempre atualize o Manual de Acessibilidade se houver mudanças na interface.

---

## 🛠️ Tecnologias Utilizadas
- HTML5 Semântico | Bootstrap 5.3 | JavaScript ES6+ | Web Speech & Audio API | Mercado Livre & ViaCEP APIs.

---
**Desenvolvido por [Rissi Eduardo](https://github.com/rissi-eduardo/)**  
*Inovação e Acessibilidade: Tecnologia de Ponta para todos os usuários.*
