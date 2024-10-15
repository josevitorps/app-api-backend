async function obterUsuarioDetalhes() {
    const token = localStorage.getItem('token');
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    console.log('Token:', token);
    console.log('User ID:', userId);

    try {
        if (token && userId) {
            const response = await fetch(`http://localhost:8000/api/user/visualizar/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const usuario = await response.json();
                document.getElementById('nome').value = usuario.user.name;
                document.getElementById('email').value = usuario.user.email;                
            } else {
                const errorResponse = await response.json();
                throw new Error('Erro ao buscar os detalhes do usuário');
            }
        } else {
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Erro:', error);
        exibirMensagemErro('Erro ao carregar os detalhes do usuário');
    }
}

function exibirMensagemErro(mensagem) {
    const mensagemErro = document.getElementById('mensagemErro');
    mensagemErro.textContent = mensagem;
    mensagemErro.classList.remove('d-none');
}

async function salvarAlteracoes(event) {
    event.preventDefault();

    const token = localStorage.getItem('token');
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    try {
        if (token && userId) {
            const response = await fetch(`http://localhost:8000/api/user/atualizar/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: nome, email: email })
            });

            if (response.ok) {
                window.location.href = 'listar.html'; 
            } else {
                const errorResponse = await response.json();
                throw new Error('Erro ao atualizar os detalhes do usuário');
            }
        } else {
            window.location.href = 'login.html'; 
        }
    } catch (error) {
        console.error('Erro:', error);
        exibirMensagemErro('Erro ao salvar as alterações do usuário');
    }
}
document.addEventListener('DOMContentLoaded', obterUsuarioDetalhes);
document.getElementById('formEditarUsuario').addEventListener('submit', salvarAlteracoes);
document.getElementById('voltarBtn').addEventListener('click', function() {
    window.history.back(); 
});
