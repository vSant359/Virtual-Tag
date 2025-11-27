const cep_r = document.getElementById('cep_r').addEventListener('blur', function () {
buscarCEPRemetente(this.value)
});

function buscarCEPRemetente(cep) {
    //Remover caracteres não numéricos só por segurança
    cep = cep.replace(/\D/g, '');
    console.log(cep)

    if (cep && cep.length < 8) {
        alert('CEP inválido!');
        return;
    }
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
        if (data.erro) {
            alert('CEP não encontrado!');
            return;
        }
        // Preenche os campos
        document.getElementById('logadouro_r').value = data.logradouro || '';
        document.getElementById('bairro_r').value = data.bairro || '';
        document.getElementById('cidade_r').value = data.localidade || '';
        document.getElementById('uf_r').value = data.uf || '';
    })
    .catch(() => {
        alert('Erro ao buscar o CEP.');
    });
}


const cep_d = document.getElementById('cep_d').addEventListener('blur', function () {
buscarCEPDestinatario(this.value)
});

function buscarCEPDestinatario(cep) {
    //Remover caracteres não numéricos só por segurança
    cep = cep.replace(/\D/g, '');
    console.log(cep)

    if (cep && cep.length < 8) {
        alert('CEP inválido!');
        return;
    }
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
        if (data.erro) {
            alert('CEP não encontrado!');
            return;
        }
        // Preenche os campos
        document.getElementById('logadouro_d').value = data.logradouro || '';
        document.getElementById('bairro_d').value = data.bairro || '';
        document.getElementById('cidade_d').value = data.localidade || '';
        document.getElementById('uf_d').value = data.uf || '';
    })
    .catch(() => {
        alert('Erro ao buscar o CEP.');
    });
}


// ===== Gerando código de barras ====
function gerarBarcode(cep) {
    const canvas = document.getElementById("barcode");

    JsBarcode(canvas, cep, {
        format: "CODE128",
        lineColor: "#000",
        width: 1,
        height: 40,
        displayValue: false
    });
    return canvas.toDataURL("image/png");
}