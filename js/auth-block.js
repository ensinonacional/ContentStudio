// Sistema de Bloqueio por Senha
// Senha: diasdias

(function() {
    const SENHA_CORRETA = 'diasdias';
    const STORAGE_KEY = 'contentstudio_auth';

    // Verifica se já está autenticado
    function isAuthenticated() {
        const auth = localStorage.getItem(STORAGE_KEY);
        return auth === SENHA_CORRETA;
    }

    // Cria o modal de bloqueio
    function createBlockScreen() {
        const overlay = document.createElement('div');
        overlay.id = 'auth-overlay';
        overlay.innerHTML = `
            <style>
                #auth-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f0f1a 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 99999;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                }

                .auth-box {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    padding: 40px;
                    width: 100%;
                    max-width: 400px;
                    margin: 20px;
                    text-align: center;
                    backdrop-filter: blur(10px);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }

                .auth-logo {
                    font-size: 2rem;
                    font-weight: 800;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 8px;
                }

                .auth-subtitle {
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 0.9rem;
                    margin-bottom: 32px;
                }

                .auth-icon {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 24px;
                }

                .auth-icon svg {
                    width: 30px;
                    height: 30px;
                    fill: white;
                }

                .auth-title {
                    color: white;
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-bottom: 8px;
                }

                .auth-description {
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 0.9rem;
                    margin-bottom: 24px;
                }

                .auth-input {
                    width: 100%;
                    padding: 14px 18px;
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 12px;
                    color: white;
                    font-size: 1rem;
                    text-align: center;
                    letter-spacing: 2px;
                    outline: none;
                    transition: all 0.3s;
                    box-sizing: border-box;
                }

                .auth-input:focus {
                    border-color: #6366f1;
                    background: rgba(99, 102, 241, 0.1);
                }

                .auth-input::placeholder {
                    color: rgba(255, 255, 255, 0.3);
                    letter-spacing: normal;
                }

                .auth-button {
                    width: 100%;
                    padding: 14px;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    border: none;
                    border-radius: 12px;
                    color: white;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    margin-top: 16px;
                    transition: all 0.3s;
                }

                .auth-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
                }

                .auth-error {
                    color: #ef4444;
                    font-size: 0.85rem;
                    margin-top: 12px;
                    display: none;
                }

                .auth-error.show {
                    display: block;
                    animation: shake 0.5s;
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }

                .auth-footer {
                    margin-top: 24px;
                    color: rgba(255, 255, 255, 0.3);
                    font-size: 0.75rem;
                }
            </style>

            <div class="auth-box">
                <div class="auth-logo">ContentStudio</div>
                <div class="auth-subtitle">Plataforma de Criação de Conteúdo</div>

                <div class="auth-icon">
                    <svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
                </div>

                <div class="auth-title">Acesso Restrito</div>
                <div class="auth-description">Digite a senha para acessar a plataforma</div>

                <input type="password" class="auth-input" id="auth-password" placeholder="Digite a senha" autocomplete="off">
                <button class="auth-button" id="auth-submit">Entrar</button>
                <div class="auth-error" id="auth-error">Senha incorreta. Tente novamente.</div>

                <div class="auth-footer">Uso exclusivo interno</div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Esconde o conteúdo original
        document.body.style.overflow = 'hidden';

        // Foca no input
        setTimeout(() => {
            document.getElementById('auth-password').focus();
        }, 100);

        // Eventos
        document.getElementById('auth-submit').addEventListener('click', tryLogin);
        document.getElementById('auth-password').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                tryLogin();
            }
        });
    }

    // Tenta fazer login
    function tryLogin() {
        const input = document.getElementById('auth-password');
        const error = document.getElementById('auth-error');
        const senha = input.value;

        if (senha === SENHA_CORRETA) {
            localStorage.setItem(STORAGE_KEY, senha);
            document.getElementById('auth-overlay').remove();
            document.body.style.overflow = '';
        } else {
            error.classList.add('show');
            input.value = '';
            input.focus();

            setTimeout(() => {
                error.classList.remove('show');
            }, 3000);
        }
    }

    // Executa quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        if (!isAuthenticated()) {
            createBlockScreen();
        }
    }
})();
