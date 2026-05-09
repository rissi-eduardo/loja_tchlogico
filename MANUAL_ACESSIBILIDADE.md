<!-- 
  ESTRUTURA DO MANUAL - ORIENTAÇÃO PARA MANUTENÇÃO:
  1. Use títulos (#) para separar as categorias de deficiência.
  2. Use listas (-) para descrever o passo a passo do teste.
  3. Mantenha a linguagem clara e objetiva para facilitar o uso de tradutores de Libras ou leitores de tela.
-->

# 📘 Manual Técnico de Acessibilidade - TCHLogico

Este documento serve para validar as tecnologias de inclusão aplicadas neste projeto de **Tecnologia de Ponta**.

---

### 1. Área: Deficiência Visual (Cegueira Total)
**Tecnologia:** Web Speech API (Síntese de Voz).
- **Como validar:** Realize uma busca de produto. O sistema deve anunciar vocalmente: *"Encontrei X produtos"*.
- **Manutenção:** No arquivo `main.js`, a função `anunciarPorVoz()` nunca deve ser removida ou silenciada.

### 2. Área: Baixa Visão e Cognição
**Tecnologia:** Web Audio API (Frequência Senoidal 880Hz).
- **Como validar:** Ao adicionar um item ao carrinho, ouça o "Bip". Ele confirma a ação sem necessidade de ler a tela.
- **Manutenção:** A frequência de 880Hz (Nota Lá) foi escolhida por ser amigável ao ouvido humano; evite frequências muito agudas.

### 3. Área: Deficiência Motora
**Tecnologia:** Gerenciamento de Foco e Tabulação.
- **Como validar:** Navegue usando apenas a tecla `TAB`. O foco deve ser um contorno azul nítido.
- **Manutenção:** Mantenha a propriedade `outline` no CSS para o estado `:focus-visible`.

### 4. Área: Sensibilidade Visual (Cinetose)
**Tecnologia:** Media Query `prefers-reduced-motion`.
- **Como validar:** Ative a redução de movimento no seu sistema operacional; o site deve parar de "sacudir" o carrinho.
- **Manutenção:** Sempre envolva animações de sacudida (shake) dentro desta regra no CSS.

---

<!-- 
  DICA PARA O DESENVOLVEDOR:
  Para que o manual seja lido perfeitamente por PCDs, não use tabelas complexas,
  pois elas confundem a ordem de leitura dos softwares de acessibilidade.
-->

**Documentação preparada por [Rissi Eduardo]**
