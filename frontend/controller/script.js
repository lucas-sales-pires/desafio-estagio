const produtoFormulario = document.querySelector('#produtoFormulario');
const tabelaProdutos = document.querySelector('#tabelaProdutos tbody');
const nome = document.querySelector('#nome');
const valor = document.querySelector('#valor');
const descricao = document.querySelector('#descricao');
const removerTodos = document.querySelector('#removerTodos');
const tabelaCadastro = document.querySelector('#cadastro');
const tabelaListagem = document.querySelector('#listaProdutos');
const cadastro = document.querySelector('#cadastro');
const novoProduto = document.querySelector('#novoProduto');

const botoesRadio = document.querySelectorAll('input[name="disponivel"]');
let disponivel = false; 

botoesRadio.forEach(botaoRadio => {
    botaoRadio.addEventListener('change', () => {
        disponivel = botaoRadio.value === 'sim';
    });
});



produtoFormulario.addEventListener('submit', async event => {
    event.preventDefault();
    


    await axios.post('http://localhost:3000/cadastrar', {
        nome: nome.value,
        preco: valor.value,
        descricao: descricao.value,
        disponivel: disponivel
    })
    .then(() => {
        tabelaProdutos.innerHTML = ''; 
        tabelaListagem.style.display = 'block';
        cadastro.style.display = 'none';
        atualizarTabelaProdutos(); 
    });

});


async function atualizarTabelaProdutos() {
    const response = await axios.get('http://localhost:3000/listar');

    response.data.sort((a, b) => b.preco - a.preco);

    tabelaProdutos.innerHTML = '';

    response.data.forEach(produto => {
        const novaLinha = document.createElement('tr');

        const celulaNome = document.createElement('td');
        celulaNome.textContent = produto.nome;
        novaLinha.appendChild(celulaNome);

        const celulaDescricao = document.createElement('td');
        celulaDescricao.textContent = produto.descricao;
        novaLinha.appendChild(celulaDescricao);

        const celulaValor = document.createElement('td');
        celulaValor.textContent = `R$ ${produto.preco}`;
        novaLinha.appendChild(celulaValor);

        const celulaDisponivel = document.createElement('td');
        celulaDisponivel.textContent = produto.disponivel ? 'Sim' : 'Não';
        novaLinha.appendChild(celulaDisponivel);

        tabelaProdutos.appendChild(novaLinha);
    });
}

atualizarTabelaProdutos(); 

removerTodos.addEventListener('click', async () => {
    await axios.delete('http://localhost:3000/deletar')
    .then(() => {
        tabelaProdutos.innerHTML = '';
    });
});

novoProduto.addEventListener('click', () => {
    tabelaListagem.style.display = 'none';
    cadastro.style.display = 'block';
});
