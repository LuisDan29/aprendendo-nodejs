const URL = 'http://localhost:3000';
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
            const div = document.createElement('div');
            div.classList.add('cor');
            div.setAttribute('data-id', cor.id);
            div.style.backgroundColor = `${cor.hex}`;

            // const p = document.createElement('p');
            // p.innerText = `${cor.nome}`;
            // p.style.color = ajustarCor(cor.hex);

            // div.appendChild(p);
            GRID.appendChild(div);
        })
    })
}

showPaleta();

// function ajustarCor(cor) {
//     const valores = cor.match(/\d+/g).map(Number);
//     const [r, g, b] = valores;
//     const luminancia = 0.2126 * r + 0.7152 * g + 0.0722 * b;

//     if (luminancia < 128) {
//         return 'var(--color6)';
//     } else {
//         return 'var(--color8)';
//     }
// }