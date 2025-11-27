const btn = document.getElementById('btn-gerar').addEventListener('click', gerarEtiquetas)
function gerarEtiquetas() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        unit: "mm",
        format: "a4"
    });

    // ===== DADOS ======
    const dados = {
        remetente: {
            cep: document.getElementById('cep_r').value,
            nome: document.getElementById('nome_r').value,
            logadouro: document.getElementById('logadouro_r').value,
            numero: document.getElementById('numero_r').value,
            complemento: document.getElementById('complemento_r').value,
            bairro: document.getElementById('bairro_r').value,
            cidade: document.getElementById('cidade_r').value,
            uf: document.getElementById('uf_r').value
        },
        destinatario: {
            cep: document.getElementById('cep_d').value,
            nome: document.getElementById('nome_d').value,
            logadouro: document.getElementById('logadouro_d').value,
            numero: document.getElementById('numero_d').value,
            complemento: document.getElementById('complemento_d').value,
            bairro: document.getElementById('bairro_d').value,
            cidade: document.getElementById('cidade_d').value,
            uf: document.getElementById('uf_d').value
        }
    };
    console.log(dados)

    // ===== TAMANHO DA SUA ETIQUETA =====
    const etiquetaW = 90;
    const etiquetaH = 130;

    // ===== TAMANHO DO RETÂNGULO =====
    const boxW = 95;   // você pediu 95mm (eixo X)
    const boxH = 55;   // você pediu 55mm (eixo Y)

    // ===== POSICIONAMENTO NO TOPO =====
    // topo da etiqueta começa no Y = 0
    // esquerda começa no X = 0
    const startX = 4;
    const startY = 4;

    // ===== DESENHO DOS CANTOS =====
    const cornerSize = 8; // tamanho das “quinas”

    // CANTO SUPERIOR ESQUERDO
    doc.line(startX, startY, startX + cornerSize, startY);              // horizontal
    doc.line(startX, startY, startX, startY + cornerSize);              // vertical

    // CANTO SUPERIOR DIREITO
    doc.line(startX + boxW, startY, startX + boxW - cornerSize, startY);
    doc.line(startX + boxW, startY, startX + boxW, startY + cornerSize);

    // CANTO INFERIOR ESQUERDO
    doc.line(startX, startY + boxH, startX + cornerSize, startY + boxH);
    doc.line(startX, startY + boxH, startX, startY + boxH - cornerSize);

    // CANTO INFERIOR DIREITO
    doc.line(startX + boxW, startY + boxH, startX + boxW - cornerSize, startY + boxH);
    doc.line(startX + boxW, startY + boxH, startX + boxW, startY + boxH - cornerSize);

    let contentY = startY + 60;
    doc.setFontSize(10);

    // -------- RECEBEDOR --------
    doc.text("Recebedor", startX + 1, contentY);

    const recTextWidth = doc.getTextWidth("Recebedor");
    const recLineStart = startX + 2 + recTextWidth + 2;

    doc.line(recLineStart, contentY - 1, startX + boxW - 2, contentY - 1);

    // Próxima linha
    contentY += 8;

    // -------- ASSINATURA --------
    doc.text("assinatura", startX + 2, contentY);

    const assTextWidth = doc.getTextWidth("assinatura");
    const assLineStart = startX + 1 + assTextWidth + 1;
    const assLineEnd = startX + boxW / 2;

    doc.line(assLineStart, contentY - 1, assLineEnd, contentY - 1);

    // -------- DOCUMENTO (mesma linha) --------
    const docText = "Documento";
    const docTextWidth = doc.getTextWidth(docText);

    const docTextX = assLineEnd + 4;

    doc.text(docText, docTextX, contentY);

    const docLineStart = docTextX + docTextWidth + 2;

    doc.line(docLineStart, contentY - 1, startX + boxW - 2, contentY - 1);
    // ===== ENTREGA NO VIZINHO =====

    // pequeno espaçamento antes da seção
    contentY += 5;

    // título com leve destaque
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Entrega no vizinho autorizada?", startX + 1, contentY);

    // volta para fonte normal
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    // caixas de seleção
    const boxSize = 3;

    // posição inicial das opções
    const optY = contentY + 2;

    // --- SIM ---
    doc.rect(startX + 4, optY, boxSize, boxSize);
    doc.text("Sim", startX + 4 + boxSize + 2, optY + 2.5);

    // --- NÃO ---
    const noX = startX + 30;
    doc.rect(noX, optY, boxSize, boxSize);
    doc.text("Não", noX + boxSize + 2, optY + 2.5);

    // atualiza Y para a próxima sessão
    contentY = optY + 10;

    // --- Linha de separação ---
    doc.setLineWidth(0.3);
    doc.line(4, 84, 100, 84);

    // --- Título "Destinatário" ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Destinatário", 5, 88);

    // --- Nome ---
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(dados.destinatario.nome, 6, 92);

    // --- Logradouro ---
    doc.text(dados.destinatario.logadouro, 6, 96);

    // --- Número (alinhado à direita) ---
    doc.text(dados.destinatario.numero, 55, 96, { align: "right" });

    // --- Complemento ---
    doc.text(dados.destinatario.complemento, 6, 100);

    // --- Bairro ---
    doc.text(dados.destinatario.bairro, 6, 104);

    // --- CEP ---
    doc.text(dados.destinatario.cep, 6, 108);

    // --- UF (à direita novamente) ---
    doc.text(dados.destinatario.cidade, 48, 108, { align: "right" });
    doc.text(dados.destinatario.uf, 55, 108, { align: "right" });

    const barcodeImg = gerarBarcode(dados.destinatario.cep);
    doc.addImage(barcodeImg, "PNG", 4, 110);

    // Desenhar quadrante externo
    doc.setLineWidth(0.5);
    doc.rect(4, 84, 97, 45);

    doc.setLineWidth(0.5);
    doc.rect(4, 73, 97, 10);

    //==== Destinatário ====

    // --- Nome ---
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(dados.remetente.nome, 6, 132);

    // --- Logradouro ---
    doc.text(dados.remetente.logadouro, 6, 136);

    // --- Número (alinhado à direita) ---
    doc.text(dados.remetente.numero, 55, 136, { align: "right" });

    // --- Complemento ---
    doc.text(dados.remetente.complemento, 6, 140);

    // --- Bairro ---
    doc.text(dados.remetente.bairro, 6, 144);

    // --- CEP ---
    doc.text(dados.remetente.cep, 6, 148);

    // --- UF (à direita novamente) ---
    doc.text(dados.remetente.cidade, 48, 148, { align: "right" });
    doc.text(dados.remetente.uf, 55, 148, { align: "right" });

    doc.setFontSize(36);
    doc.setTextColor(150, 150, 150); // cinza claro
    doc.setFont("helvetica", "bold");
    doc.text("Vt", 25, 35, { opacity: 0.2 });

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("virtual tag", 40, 35, { opacity: 0.2 });

    doc.output("dataurlnewwindow");


}
