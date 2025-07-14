// Função para abrir popup de aviso de alteração de senha
window.abrirPopupAvisoAlterarSenha = function() {
    var blur = document.getElementById('avisoAlterarSenhaBlur');
    var popup = document.getElementById('avisoAlterarSenhaPopup');
    if (!blur || !popup) return;
    popup.innerHTML = '<iframe src="aviso_alterar_senha.html" style="width:100vw;height:100vh;border:none;"></iframe>';
    popup.style.display = 'block';
    blur.style.display = 'block';
};
window.fecharPopupAvisoAlterarSenha = function() {
    var blur = document.getElementById('avisoAlterarSenhaBlur');
    var popup = document.getElementById('avisoAlterarSenhaPopup');
    if (popup) {
        popup.style.display = 'none';
        popup.innerHTML = '';
    }
    if (blur) blur.style.display = 'none';
};
window.addEventListener('message', function(event) {
    if (event.data && event.data.action === 'fecharPopupAvisoAlterarSenha') {
        window.fecharPopupAvisoAlterarSenha();
    }
});
// Ativação do botão ENVIAR EMAIL
var inputEmail = document.getElementById("inputEmailRecuperacao");
var btnEnviar = document.querySelector(".boto-enviar-cdigo");
function checarAtivarBotaoEnviar() {
    if (inputEmail && btnEnviar) {
        if (inputEmail.value.trim() !== "") {
            btnEnviar.classList.add('ativo');
            btnEnviar.classList.remove('inativo');
        } else {
            btnEnviar.classList.remove('ativo');
            btnEnviar.classList.add('inativo');
        }
    }
}
if (inputEmail && btnEnviar) {
    btnEnviar.classList.add('inativo');
    inputEmail.addEventListener('input', checarAtivarBotaoEnviar);
}
// Evento de click também no texto do botão ENVIAR EMAIL
var btnEnviarTexto = document.querySelector('.enviar-email');
if (btnEnviarTexto) {
    btnEnviarTexto.addEventListener('click', function(e) {
        var btnEnviar = document.querySelector('.boto-enviar-cdigo');
        if (btnEnviar && btnEnviar.classList.contains('ativo')) {
            window.abrirPopupAvisoAlterarSenha();
        }
    });
}
// Evento do botão Voltar ao Início
var groupContainer = document.getElementById("groupContainer");
if(groupContainer) {
    groupContainer.addEventListener("click", function (e) {
        window.location.href = 'index.html';
    });
} 