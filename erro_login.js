document.addEventListener('DOMContentLoaded', function() {
    var groupContainer = document.getElementById("groupContainer");
    if(groupContainer) {
        groupContainer.addEventListener("click", function (e) {
            if (window.parent !== window) {
                window.parent.postMessage({ action: 'fecharErroLoginPopup' }, '*');
            } else {
                window.history.back();
            }
        });
    }
}); 