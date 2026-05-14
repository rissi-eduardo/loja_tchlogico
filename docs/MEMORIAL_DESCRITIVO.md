<!-- 
  MEMORIAL DESCRITIVO - PROJETO TCHLogico
  Guia de Manutenção:
  - Mantenha a terminologia técnica (WCAG, LGPD, APIs) correta.
  - Atualize a seção de 'Arquivos Reestruturados' caso novas dependências sejam adicionadas.
-->

# 📑 Memorial Descritivo de Atualizações Técnicas - TCHLogico

Este documento detalha as decisões estruturais, a arquitetura e a criação de novos módulos focados em **Acessibilidade Universal (WCAG 2.1)** e **Proteção de Dados (LGPD)**.

---

## 🎯 Objetivo do Projeto
Transformar uma plataforma de e-commerce em um ecossistema inclusivo, removendo barreiras de acesso para PCDs (Pessoas com Deficiência) e garantindo conformidade jurídica e técnica.

## 🏗️ Arquitetura e Decisões Técnicas

### 1. Frontend e Interface (UX/UI)
- **Bootstrap 5.3:** Implementado para garantir responsividade nativa (Mobile-First) e o uso de componentes acessíveis como Modais e Toasts.
- **Arquitetura Baseada em Variáveis (CSS :root):** Implementação de tokens para controle centralizado de cores e transições, facilitando manutenções periódicas e garantindo contraste visual.
- **Microinterações e UX:** 
    - **Animações Intencionais:** Criação da animação `@keyframes shake-cart` para feedback visual imediato.
    - **Suporte à Cinetose:** Inclusão da regra `prefers-reduced-motion` para respeitar usuários com sensibilidade visual.

### 2. Engenharia de Acessibilidade (Feedback Multissensorial)
- **Feedback Vocal (Web Speech API):** Integração para anúncio auditivo de eventos críticos (resultados de busca e confirmações de compra).
- **Feedback Sonoro (Web Audio API):** Implementação de bipe em frequência senoidal pura (880Hz - Nota Lá) para autonomia de usuários com baixa visão.
- **Semântica e ARIA:** Uso estratégico de `aria-live` e etiquetas ARIA para garantir que leitores de tela priorizem mensagens de status sem interrupções.

### 3. Integrações de API e Dados
- **Mercado Livre API:** Integração assíncrona (`fetch`) com tratamento de erros para exibição de produtos em tempo real.
- **ViaCEP API:** Implementação de máscaras dinâmicas e validação inteligente de CEP para otimização da experiência logística.
- **Privacidade (LGPD):** Texto jurídico focado na transparência, coleta mínima de dados e uso restrito de cookies técnicos.

---

## 📂 Inventário de Arquivos do Projeto

### Arquivos Reestruturados
- **`index.html`:** Otimização da hierarquia H1 para SEO e substituição de links genéricos por CDNs oficiais.
- **`style.css`:** Centralização de estilos e suporte a tecnologias assistivas visuais.
- **`main.js`:** Lógica de negócio consolidada com os novos módulos de feedback vocal e sonoro.

### Novos Arquivos de Sustentação
- **`README.md`:** Documentação centralizada com badges de status e instruções de instalação.
- **`MANUAL_ACESSIBILIDADE.md`:** Guia prático de testes detalhando a operação das funções de inclusão.
- **`LICENSE`:** Aplicação da Licença MIT para proteção de autoria e transparência jurídica.

---

**Desenvolvido por:** Rissi Eduardo  
**Data da última atualização:** Maio de 2027

