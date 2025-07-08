const URL = 'http://localhost:8081';
const GRID = document.getElementById('grid');

async function getPaleta() {
    try {
        const res = await fetch(`${URL}/paleta`);
        const data = await res.json();
        return data;
    } catch (err) {
        console.log('Erro GET', err);
        return null;
    }
}

async function showPaleta() {
    getPaleta().then(paleta => {
        paleta.forEach(cor => {
            GRID.appendChild(buildCor(cor));
        });
    })
}

showPaleta();

function buildCor(cor) {
    const div = document.createElement('div');
    div.classList.add('cor');
    div.setAttribute('data-id', cor.id);
    div.style.backgroundColor = cor.hex;

    const pNome = document.createElement('p');
    const pHex = document.createElement('p');
    pNome.innerText = cor.nome.toUpperCase();
    pHex.innerText = cor.hex.toUpperCase();
    pNome.classList.add('nome');
    pHex.classList.add('hex');

    let corTexto = setCorTexto(cor.hex);
    pNome.style.color = corTexto; 
    pHex.style.color = corTexto; 

    div.append(pNome, pHex);
    return div;
}

function setCorTexto(cor) {
    const r = parseInt(cor.slice(1, 3), 16);
    const g = parseInt(cor.slice(3, 5), 16);
    const b = parseInt(cor.slice(5, 7), 16);
    const luminancia = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    if (luminancia < 128) {
        return 'var(--color6)';
    } else {
        return 'var(--color8)';
    }
}