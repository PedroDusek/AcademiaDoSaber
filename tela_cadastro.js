// JavaScript para a página de cadastro da Academia do Saber
document.addEventListener('DOMContentLoaded', function() {
    const botaoAluno = document.getElementById('botaoAluno');
    const botaoProfessor = document.getElementById('botaoProfessor');
    const corujaAluno = document.getElementById('corujaAluno');
    const corujaProfessor = document.getElementById('corujaProfessor');
    const inputNomeSobrenome = document.getElementById('inputNomeSobrenome');
    const inputUsuario = document.getElementById('inputUsuario');
    const inputEmail = document.getElementById('inputEmail');
    const inputConfirmarEmail = document.getElementById('inputConfirmarEmail');
    const inputSenhaCadastro = document.getElementById('inputSenhaCadastro');
    const inputConfirmarSenha = document.getElementById('inputConfirmarSenha');
    const botoEnviar = document.querySelector('.boto-enviar');

    function selecionarTipo(tipo) {
        if (tipo === 'aluno') {
            corujaAluno.style.display = 'block';
            corujaProfessor.style.display = 'none';
            corujaAluno.classList.remove('coruja-professor');
        } else if (tipo === 'professor') {
            corujaAluno.style.display = 'block';
            corujaProfessor.style.display = 'none';
            corujaAluno.classList.add('coruja-professor');
        }
    }

    function checarAtivarBotaoEnviar() {
        const nome = inputNomeSobrenome.value.trim();
        const usuario = inputUsuario.value.trim();
        const email = inputEmail.value.trim();
        const confirmarEmail = inputConfirmarEmail.value.trim();
        const senha = inputSenhaCadastro.value.trim();
        const confirmarSenha = inputConfirmarSenha.value.trim();
        if (nome && usuario && email && confirmarEmail && senha && confirmarSenha) {
            botoEnviar.classList.add('ativo');
            botoEnviar.classList.remove('inativo');
        } else {
            botoEnviar.classList.remove('ativo');
            botoEnviar.classList.add('inativo');
        }
    }

    inputNomeSobrenome.addEventListener('input', checarAtivarBotaoEnviar);
    inputUsuario.addEventListener('input', checarAtivarBotaoEnviar);
    inputEmail.addEventListener('input', checarAtivarBotaoEnviar);
    inputConfirmarEmail.addEventListener('input', checarAtivarBotaoEnviar);
    inputSenhaCadastro.addEventListener('input', checarAtivarBotaoEnviar);
    inputConfirmarSenha.addEventListener('input', checarAtivarBotaoEnviar);

    // Opcional: impedir envio se não estiver ativo
    botoEnviar.addEventListener('click', function(e) {
        if (!botoEnviar.classList.contains('ativo')) {
            e.preventDefault();
            return;
        }
        // Aqui você pode adicionar a lógica de envio do cadastro
        // alert('Cadastro enviado!'); // Removido
    });

    botaoAluno.addEventListener('click', function() {
        selecionarTipo('aluno');
        inputUsuario.placeholder = 'Nome de Usuário';
        inputUsuario.value = '';
        checarAtivarBotaoEnviar();
    });
    botaoProfessor.addEventListener('click', function() {
        selecionarTipo('professor');
        inputUsuario.placeholder = 'Código de Professor';
        inputUsuario.value = '';
        checarAtivarBotaoEnviar();
    });

    // Inicializa o botão como inativo
    botoEnviar.classList.add('inativo');

    // Inicialmente, coruja pousada no botão de aluno
    selecionarTipo('aluno');

    // Função para alternar visibilidade da senha
    function togglePasswordVisibility(input, icon) {
        if (input.type === 'password') {
            input.type = 'text';
            icon.src = 'img/olho_aberto_senha.png';
        } else {
            input.type = 'password';
            icon.src = 'img/olho_fechado_senha.png';
        }
    }

    // Seletores dos campos e ícones de senha
    const senhaInput = document.getElementById('inputSenhaCadastro');
    const senhaIcon = document.querySelector('.botes-cadastro4 .eye-off .icon');
    const senhaEye = document.querySelector('.botes-cadastro4 .eye-off');

    const confirmarSenhaInput = document.getElementById('inputConfirmarSenha');
    const confirmarSenhaIcon = document.querySelector('.botes-cadastro5 .eye-off .icon');
    const confirmarSenhaEye = document.querySelector('.botes-cadastro5 .eye-off');

    if (senhaEye && senhaIcon && senhaInput) {
        senhaEye.addEventListener('click', function() {
            togglePasswordVisibility(senhaInput, senhaIcon);
        });
    }
    if (confirmarSenhaEye && confirmarSenhaIcon && confirmarSenhaInput) {
        confirmarSenhaEye.addEventListener('click', function() {
            togglePasswordVisibility(confirmarSenhaInput, confirmarSenhaIcon);
        });
    }

    // Redirecionar para a tela de login ao clicar no botão voltar
    const botaoVoltar = document.getElementById('groupContainer');
    if (botaoVoltar) {
        botaoVoltar.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }

    function mostrarCadastroConcluido() {
        const popup = document.getElementById('cadastroConcluidoPopup');
        const blur = document.getElementById('cadastroConcluidoBlur');
        if (popup) {
            popup.innerHTML = '<iframe src="cadastro_concluido.html" style="width:100vw;height:100vh;border:none;"></iframe>';
            popup.style.display = 'block';
        }
        if (blur) blur.style.display = 'block';
    }

    window.fecharCadastroConcluidoPopup = function() {
        const popup = document.getElementById('cadastroConcluidoPopup');
        const blur = document.getElementById('cadastroConcluidoBlur');
        if (popup) {
            popup.style.display = 'none';
            popup.innerHTML = '';
        }
        if (blur) blur.style.display = 'none';
    };

    window.addEventListener('message', function(event) {
        if (event.data && event.data.action === 'fecharCadastroConcluidoPopup') {
            window.fecharCadastroConcluidoPopup();
        }
    });

    // Adicionar evento ao botão ENVIAR
    setTimeout(() => {
        const enviarBtn = document.querySelector('.boto-enviar');
        if (enviarBtn) {
            enviarBtn.addEventListener('click', function(e) {
                e.preventDefault();
                mostrarCadastroConcluido();
            });
        }
    }, 100);
});
