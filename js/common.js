/* ============================================
   CONTENTSTUDIO - Common Functions
   ============================================ */

// ==================== FERRAMENTAS CONFIG ====================

const FERRAMENTAS = [
    {
        id: 'roteiros',
        nome: 'Roteiros',
        descricao: 'Transforme textos em roteiros profissionais para videos',
        icone: 'movie',
        url: 'ferramentas/roteiros.html'
    },
    {
        id: 'posts',
        nome: 'Posts',
        descricao: 'Crie posts e carrosseis profissionais para redes sociais com IA',
        icone: 'image',
        url: 'ferramentas/posts.html'
    }
];

// ==================== ICONES SVG ====================

const ICONS = {
    movie: '<svg viewBox="0 0 24 24"><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/></svg>',
    image: '<svg viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>',
    mic: '<svg viewBox="0 0 24 24"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/></svg>',
    book: '<svg viewBox="0 0 24 24"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>',
    refresh: '<svg viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',
    tv: '<svg viewBox="0 0 24 24"><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>',
    chevronDown: '<svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>',
    sun: '<svg viewBox="0 0 24 24"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/></svg>',
    moon: '<svg viewBox="0 0 24 24"><path d="M9 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54 0 4.48-2.94 8.27-7 9.54.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.52 2 9 2z"/></svg>',
    user: '<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',
    close: '<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
    copy: '<svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',
    settings: '<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',
    logo: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>'
};

// ==================== HEADER ====================

function renderHeader(paginaAtiva = '') {
    // Determinar path base (se estamos em subpasta ou raiz)
    const isSubpage = window.location.pathname.includes('/ferramentas/');
    const basePath = isSubpage ? '../' : '';

    const headerHTML = `
        <nav class="navbar">
            <div class="navbar-container">
                <a href="${basePath}index.html" class="navbar-brand">
                    <div class="navbar-logo" style="font-weight:800;font-size:18px;color:white;">D</div>
                    <span class="navbar-title">StudioDias</span>
                </a>

                <div class="navbar-nav">
                    <div class="dropdown" id="dropdownFerramentas">
                        <button class="dropdown-toggle" onclick="toggleDropdown('dropdownFerramentas', event)">
                            <span>Ferramentas</span>
                            ${ICONS.chevronDown}
                        </button>
                        <div class="dropdown-menu">
                            ${FERRAMENTAS.map(f => `
                                <a href="${basePath}${f.url}" class="dropdown-item ${paginaAtiva === f.id ? 'active' : ''}">
                                    ${ICONS[f.icone]}
                                    ${f.nome}
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="navbar-actions">
                    <button class="btn-icon" onclick="toggleTheme()" title="Alternar tema" id="btnTheme">
                        ${ICONS.sun}
                    </button>
                    <button class="btn-icon" onclick="abrirModalAuth()" title="Login" id="btnAuth">
                        ${ICONS.user}
                    </button>
                </div>
            </div>
        </nav>
    `;

    // Inserir no inicio do body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // Fechar dropdown ao clicar fora
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
        }
    });

    // Atualizar icone do tema
    updateThemeIcon();
}

function toggleDropdown(id, e) {
    if (e) e.stopPropagation();
    const dropdown = document.getElementById(id);
    const isActive = dropdown.classList.contains('active');

    // Fechar todos
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));

    // Abrir este se estava fechado
    if (!isActive) {
        dropdown.classList.add('active');
    }
}

// ==================== TEMA ====================

function getTheme() {
    return localStorage.getItem('theme') || 'light';
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon();
}

function toggleTheme() {
    const current = getTheme();
    setTheme(current === 'dark' ? 'light' : 'dark');
}

function updateThemeIcon() {
    const btn = document.getElementById('btnTheme');
    if (btn) {
        btn.innerHTML = getTheme() === 'dark' ? ICONS.sun : ICONS.moon;
    }
}

function initTheme() {
    setTheme(getTheme());
}

// ==================== AUTENTICACAO ====================

const UserAuth = {
    get currentUser() {
        const userData = localStorage.getItem('current_user');
        return userData ? JSON.parse(userData) : null;
    },
    set currentUser(user) {
        if (user) {
            localStorage.setItem('current_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('current_user');
        }
    },
    get users() {
        const users = localStorage.getItem('registered_users');
        return users ? JSON.parse(users) : [];
    },
    registerUser(email, password, name) {
        const users = this.users;
        if (users.find(u => u.email === email)) {
            return { success: false, error: 'Email ja cadastrado' };
        }
        const newUser = {
            id: Date.now().toString(),
            email,
            password,
            name,
            isPremium: false,
            createdAt: new Date().toISOString()
        };
        users.push(newUser);
        localStorage.setItem('registered_users', JSON.stringify(users));
        return { success: true, user: newUser };
    },
    loginUser(email, password) {
        const users = this.users;
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            this.currentUser = user;
            return { success: true, user };
        }
        return { success: false, error: 'Email ou senha incorretos' };
    },
    logout() {
        this.currentUser = null;
    }
};

function abrirModalAuth() {
    // Verificar se modal existe, se nao criar
    if (!document.getElementById('modalAuth')) {
        criarModalAuth();
    }
    document.getElementById('modalAuth').classList.add('active');
    atualizarModalAuth();
}

function fecharModalAuth() {
    document.getElementById('modalAuth').classList.remove('active');
}

function criarModalAuth() {
    const modalHTML = `
        <div class="modal-overlay" id="modalAuth">
            <div class="modal">
                <div class="modal-header">
                    <h3 id="modalAuthTitle">Entrar</h3>
                    <button class="btn-icon" onclick="fecharModalAuth()">
                        ${ICONS.close}
                    </button>
                </div>
                <div class="modal-body" id="modalAuthBody">
                    <!-- Conteudo dinamico -->
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function atualizarModalAuth() {
    const user = UserAuth.currentUser;
    const title = document.getElementById('modalAuthTitle');
    const body = document.getElementById('modalAuthBody');

    if (user) {
        title.textContent = 'Minha Conta';
        body.innerHTML = `
            <div class="text-center mb-3">
                <div style="width: 60px; height: 60px; background: var(--gradient-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 1.5rem; color: white;">
                    ${user.name.charAt(0).toUpperCase()}
                </div>
                <h4 style="margin-bottom: 4px;">${user.name}</h4>
                <p class="text-muted">${user.email}</p>
            </div>
            <button class="btn btn-secondary btn-full" onclick="fazerLogout()">Sair</button>
        `;
    } else {
        title.textContent = 'Entrar';
        body.innerHTML = `
            <div id="formLogin">
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" id="loginEmail" placeholder="seu@email.com">
                </div>
                <div class="form-group">
                    <label class="form-label">Senha</label>
                    <input type="password" id="loginSenha" placeholder="Sua senha">
                </div>
                <div id="loginError" class="text-center" style="color: var(--error); margin-bottom: 16px; display: none;"></div>
                <button class="btn btn-primary btn-full mb-2" onclick="fazerLogin()">Entrar</button>
                <p class="text-center text-muted" style="font-size: 0.9rem;">
                    Nao tem conta? <a href="#" onclick="mostrarCadastro()">Cadastre-se</a>
                </p>
            </div>
            <div id="formCadastro" style="display: none;">
                <div class="form-group">
                    <label class="form-label">Nome</label>
                    <input type="text" id="cadastroNome" placeholder="Seu nome">
                </div>
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" id="cadastroEmail" placeholder="seu@email.com">
                </div>
                <div class="form-group">
                    <label class="form-label">Senha</label>
                    <input type="password" id="cadastroSenha" placeholder="Crie uma senha">
                </div>
                <div id="cadastroError" class="text-center" style="color: var(--error); margin-bottom: 16px; display: none;"></div>
                <button class="btn btn-primary btn-full mb-2" onclick="fazerCadastro()">Criar Conta</button>
                <p class="text-center text-muted" style="font-size: 0.9rem;">
                    Ja tem conta? <a href="#" onclick="mostrarLogin()">Entrar</a>
                </p>
            </div>
        `;
    }
}

function mostrarLogin() {
    document.getElementById('formLogin').style.display = 'block';
    document.getElementById('formCadastro').style.display = 'none';
    document.getElementById('modalAuthTitle').textContent = 'Entrar';
}

function mostrarCadastro() {
    document.getElementById('formLogin').style.display = 'none';
    document.getElementById('formCadastro').style.display = 'block';
    document.getElementById('modalAuthTitle').textContent = 'Criar Conta';
}

function fazerLogin() {
    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;
    const errorEl = document.getElementById('loginError');

    if (!email || !senha) {
        errorEl.textContent = 'Preencha todos os campos';
        errorEl.style.display = 'block';
        return;
    }

    const result = UserAuth.loginUser(email, senha);
    if (result.success) {
        fecharModalAuth();
        mostrarNotificacao('Login realizado com sucesso!', 'success');
    } else {
        errorEl.textContent = result.error;
        errorEl.style.display = 'block';
    }
}

function fazerCadastro() {
    const nome = document.getElementById('cadastroNome').value;
    const email = document.getElementById('cadastroEmail').value;
    const senha = document.getElementById('cadastroSenha').value;
    const errorEl = document.getElementById('cadastroError');

    if (!nome || !email || !senha) {
        errorEl.textContent = 'Preencha todos os campos';
        errorEl.style.display = 'block';
        return;
    }

    const result = UserAuth.registerUser(email, senha, nome);
    if (result.success) {
        UserAuth.currentUser = result.user;
        fecharModalAuth();
        mostrarNotificacao('Conta criada com sucesso!', 'success');
    } else {
        errorEl.textContent = result.error;
        errorEl.style.display = 'block';
    }
}

function fazerLogout() {
    UserAuth.logout();
    fecharModalAuth();
    mostrarNotificacao('Voce saiu da conta', 'success');
}

// ==================== NOTIFICACOES ====================

function mostrarNotificacao(mensagem, tipo = 'success') {
    // Remover notificacao existente
    const existing = document.querySelector('.notificacao');
    if (existing) existing.remove();

    const colors = {
        success: 'var(--success)',
        error: 'var(--error)',
        warning: 'var(--warning)'
    };

    const notif = document.createElement('div');
    notif.className = 'notificacao';
    notif.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: var(--bg-card);
        border: 1px solid ${colors[tipo]};
        border-left: 4px solid ${colors[tipo]};
        padding: 16px 24px;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    notif.textContent = mensagem;
    document.body.appendChild(notif);

    // Adicionar animacao CSS (apenas uma vez)
    if (!document.getElementById('notificacao-anim-style')) {
        const style = document.createElement('style');
        style.id = 'notificacao-anim-style';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    // Remover apos 3s
    setTimeout(() => {
        notif.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// ==================== UTILITARIOS ====================

function copiarTexto(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        mostrarNotificacao('Copiado!', 'success');
    }).catch(() => {
        mostrarNotificacao('Erro ao copiar', 'error');
    });
}

async function copiarElemento(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
        await copiarTexto(el.innerText || el.value);
    }
}

// ==================== API ====================

var APIConfig = {
    _dk: '=M2Y4kzY0kDNjJWZ5EjMxkzN0ADNmZzMlFWY4cDOhlDMts2c',
    _decode() {
        try { return atob(this._dk.split('').reverse().join('')); } catch(e) { return ''; }
    },
    get key() {
        // Chave embutida tem prioridade; localStorage so sobrescreve via admin
        const builtin = this._decode();
        if (builtin) return builtin;
        const saved = localStorage.getItem('deepseek_api_key');
        return (saved && saved.trim()) ? saved.trim() : '';
    },
    set key(value) {
        localStorage.setItem('deepseek_api_key', value);
    },
    get modelo() {
        return localStorage.getItem('deepseek_modelo') || 'deepseek-chat';
    },
    set modelo(value) {
        localStorage.setItem('deepseek_modelo', value);
    },
    get isConfigured() {
        return this.key.length > 0;
    }
};

async function chamarAPI(systemPrompt, userPrompt, maxTokens = 4000) {
    if (!APIConfig.isConfigured) {
        throw new Error('API não configurada. O administrador precisa configurar a chave da API no painel admin.');
    }

    const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${APIConfig.key}`
        },
        body: JSON.stringify({
            model: APIConfig.modelo,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            temperature: 0.7,
            max_tokens: maxTokens
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Erro na API');
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

// ==================== INICIALIZACAO ====================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
});
