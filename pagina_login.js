// JavaScript para a página de login da Academia do Saber

document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos da página
    const checkbox = document.querySelector('.caixa-seleo');
    const checkboxChild = document.querySelector('.caixa-seleo-child');
    const manterLogadoText = document.querySelector('.me-mantenha-logado');
    const cadastreSeAqui = document.getElementById('cADASTRESEAQUIText');
    const esqueciMinhaSenha = document.getElementById('eSQUECIMINHASENHA');
    const botoEntrar = document.querySelector('.boto-entrar');
    const botoRevelarSenha = document.querySelector('.boto-revelarocultar-senha');
    const olharSenha = document.querySelector('.olhar-senha');
    const botoProfessor = document.querySelector('.boto-tipo-de-acesso');
    const botoAluno = document.querySelector('.boto-tipo-de-acesso1');
    
    // Estado da caixa de seleção
    let checkboxChecked = false;
    
    // Função para alternar o estado da caixa de seleção
    function toggleCheckbox() {
        checkboxChecked = !checkboxChecked;
        
        if (checkboxChecked) {
            // Marcar a caixa
            checkboxChild.classList.add('checked');
            checkboxChild.innerHTML = '✓';
        } else {
            // Desmarcar a caixa
            checkboxChild.classList.remove('checked');
            checkboxChild.innerHTML = '';
        }
        
        // Salvar estado no localStorage
        localStorage.setItem('manterLogado', checkboxChecked);
        
        console.log('Checkbox ' + (checkboxChecked ? 'marcada' : 'desmarcada'));
    }
    
    // Função para alternar visibilidade da senha
    function togglePasswordVisibility() {
        const senhaInput = document.getElementById('inputSenha');
        const eyeIcon = document.getElementById('iconeOlhoSenha');
        
        if (senhaInput.type === 'password') {
            senhaInput.type = 'text';
            eyeIcon.src = 'img/olho_aberto_senha.png';
        } else {
            senhaInput.type = 'password';
            eyeIcon.src = 'img/olho_fechado_senha.png';
        }
    }
    
    // Função para alternar seleção de tipo de usuário
    let tipoSelecionado = false;
    function selectUserType(type) {
        if (!tipoSelecionado) tipoSelecionado = true;
        botoProfessor.classList.remove('selecionado');
        botoAluno.classList.remove('selecionado');
        if (type === 'professor') {
            botoProfessor.classList.add('selecionado');
            localStorage.setItem('tipoUsuario', 'professor');
        } else if (type === 'aluno') {
            botoAluno.classList.add('selecionado');
            localStorage.setItem('tipoUsuario', 'aluno');
        } else {
            localStorage.removeItem('tipoUsuario');
        }
    }
    
    // Função para validar formulário
    function validarFormulario() {
        const nomeEmail = document.getElementById('inputNomeEmail').value;
        const senha = document.getElementById('inputSenha').value;
        
        if (nomeEmail.trim() === '') {
            alert('Por favor, insira seu nome ou email.');
            document.getElementById('inputNomeEmail').focus();
            return false;
        }
        
        if (senha.trim() === '') {
            alert('Por favor, insira sua senha.');
            document.getElementById('inputSenha').focus();
            return false;
        }
        
        return true;
    }
    
    // Função para fazer login
    async function fazerLogin() {
        if (!validarFormulario()) return;
        const login = document.getElementById('inputNomeEmail').value.trim();
        const senha = document.getElementById('inputSenha').value.trim();
        const tipo = botoProfessor.classList.contains('selecionado') ? 'professor' : (botoAluno.classList.contains('selecionado') ? 'aluno' : '');
        let encontrou = false;
        try {
            const response = await fetch('logins_teste.txt');
            const text = await response.text();
            const linhas = text.split(/\r?\n/);
            for (const linha of linhas) {
                if (!linha.trim()) continue;
                const [loginArq, senhaArq, tipoArq] = linha.split(';').map(x => x.trim());
                if (login === loginArq && senha === senhaArq && tipo === tipoArq) {
                    encontrou = true;
                    break;
                }
            }
        } catch (e) {
            mostrarErroLogin();
            return;
        }
        if (encontrou) {
            botoEntrar.style.opacity = '1';
            botoEntrar.style.cursor = 'pointer';
            const originalText = botoEntrar.querySelector('.sou-professor').textContent;
            botoEntrar.querySelector('.sou-professor').textContent = 'ENTRANDO...';
            setTimeout(() => {
                alert('Login realizado com sucesso!');
                botoEntrar.querySelector('.sou-professor').textContent = originalText;
            }, 2000);
        } else {
            mostrarErroLogin();
        }
    }
    
    // Função para checar se pode ativar o botão ENTRAR
    function checarAtivarBotaoEntrar() {
        const nomeEmail = document.getElementById('inputNomeEmail').value.trim();
        const senha = document.getElementById('inputSenha').value.trim();
        const professorSelecionado = botoProfessor.classList.contains('selecionado');
        const alunoSelecionado = botoAluno.classList.contains('selecionado');
        if (nomeEmail && senha && (professorSelecionado || alunoSelecionado)) {
            botoEntrar.classList.add('ativo');
        } else {
            botoEntrar.classList.remove('ativo');
        }
    }

    // Listeners para ativar o botão dinamicamente
    document.getElementById('inputNomeEmail').addEventListener('input', checarAtivarBotaoEntrar);
    document.getElementById('inputSenha').addEventListener('input', checarAtivarBotaoEntrar);
    botoProfessor.addEventListener('click', checarAtivarBotaoEntrar);
    botoAluno.addEventListener('click', checarAtivarBotaoEntrar);

    // Botão entrar só funciona se ativo
    botoEntrar.addEventListener('click', function(e) {
        if (!botoEntrar.classList.contains('ativo')) {
            e.preventDefault();
            return;
        }
        fazerLogin();
    });
    
    // Event Listeners
    
    // Caixa de seleção "Me mantenha logado"
    checkbox.addEventListener('click', toggleCheckbox);
    manterLogadoText.addEventListener('click', toggleCheckbox);
    
    // Botão revelar/ocultar senha
    botoRevelarSenha.addEventListener('click', togglePasswordVisibility);
    olharSenha.addEventListener('click', togglePasswordVisibility);
    
    // Seleção de tipo de usuário
    botoProfessor.addEventListener('click', () => {
        selectUserType('professor');
        checarAtivarBotaoEntrar();
    });
    botoAluno.addEventListener('click', () => {
        selectUserType('aluno');
        checarAtivarBotaoEntrar();
    });
    
    // Botão entrar
    // botoEntrar.addEventListener('click', fazerLogin); // Removido para usar o novo listener
    
    // Links de cadastro e esqueci senha
    cadastreSeAqui.addEventListener('click', function() {
        window.location.href = 'tela_cadastro.html';
    });
    
    esqueciMinhaSenha.addEventListener('click', function() {
        alert('Redirecionando para recuperação de senha...');
        // Aqui você pode adicionar o redirecionamento real
    });
    
    // Carregar estado salvo ao carregar a página
    function carregarEstadoSalvo() {
        const manterLogadoSalvo = localStorage.getItem('manterLogado');
        // Não restaura mais a seleção de tipo de usuário
        if (manterLogadoSalvo === 'true') {
            checkboxChecked = true;
            toggleCheckbox();
        }
        // Ambos começam sem selecionado
        botoProfessor.classList.remove('selecionado');
        botoAluno.classList.remove('selecionado');
        tipoSelecionado = false;
    }
    
    // Adicionar efeitos visuais
    function adicionarEfeitosVisuais() {
        // Efeito hover nos botões
        const botoes = [botoProfessor, botoAluno]; // Remover botoEntrar daqui
        
        botoes.forEach(botao => {
            botao.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.transition = 'transform 0.2s ease';
            });
            
            botao.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Efeito hover na caixa de seleção
        checkbox.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        checkbox.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Efeito hover nos links
        const links = [cadastreSeAqui, esqueciMinhaSenha];
        
        links.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.color = '#faba16';
                this.style.transition = 'color 0.3s ease';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.color = '#fff';
            });
        });
    }
    
    // Inicializar
    carregarEstadoSalvo();
    adicionarEfeitosVisuais();
    
    // Adicionar funcionalidade de teclado
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            fazerLogin();
        }
    });
    
    // Foco automático no primeiro campo
    document.getElementById('inputNomeEmail').focus();
    
    // Navegação entre campos com Tab
    document.getElementById('inputNomeEmail').addEventListener('keydown', function(event) {
        if (event.key === 'Tab' && !event.shiftKey) {
            event.preventDefault();
            document.getElementById('inputSenha').focus();
        }
    });
    
    document.getElementById('inputSenha').addEventListener('keydown', function(event) {
        if (event.key === 'Tab' && event.shiftKey) {
            event.preventDefault();
            document.getElementById('inputNomeEmail').focus();
        }
    });
    
    // Limpar campos ao clicar
    document.getElementById('inputNomeEmail').addEventListener('click', function() {
        if (this.value === '') {
            this.placeholder = '';
        }
    });
    
    document.getElementById('inputSenha').addEventListener('click', function() {
        if (this.value === '') {
            this.placeholder = '';
        }
    });
    
    // Restaurar placeholder quando campo fica vazio
    document.getElementById('inputNomeEmail').addEventListener('blur', function() {
        if (this.value === '') {
            this.placeholder = 'nome ou email';
        }
    });
    
    document.getElementById('inputSenha').addEventListener('blur', function() {
        if (this.value === '') {
            this.placeholder = 'Sua Senha';
        }
    });
    
    console.log('JavaScript da página de login carregado com sucesso!');
}); 

// Função para mostrar o modal de erro de login
function mostrarErroLogin() {
    const popup = document.getElementById('erroLoginPopup');
    const blur = document.getElementById('erroLoginBlur');
    if (popup) {
        popup.innerHTML = '<iframe src="erro_login.html" style="width:100vw;height:100vh;border:none;"></iframe>';
        popup.style.display = 'block';
    }
    if (blur) blur.style.display = 'block';
}
// Função para esconder o modal
// function esconderErroLogin() {
//     const modal = document.getElementById('erroLoginModal');
//     if (modal) modal.style.display = 'none';
// }
// Adicionar listener ao botão VOLTAR do modal
// setTimeout(() => {
//     const voltarBtn = document.getElementById('erroLoginVoltar');
//     if (voltarBtn) {
//         voltarBtn.addEventListener('click', esconderErroLogin);
//     }
// }, 100); 

window.fecharErroLoginPopup = function() {
    const popup = document.getElementById('erroLoginPopup');
    const blur = document.getElementById('erroLoginBlur');
    if (popup) {
        popup.style.display = 'none';
        popup.innerHTML = '';
    }
    if (blur) blur.style.display = 'none';
}; 

window.addEventListener('message', function(event) {
    if (event.data && event.data.action === 'fecharErroLoginPopup') {
        window.fecharErroLoginPopup();
    }
}); 