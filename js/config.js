// ==================== CONFIGURAÇÃO GLOBAL ====================

// Configuração da API (salva no localStorage)
// Se common.js já definiu APIConfig, usa ele. Senão, cria aqui.
if (typeof window.APIConfig === 'undefined' || !window.APIConfig) {
    window.APIConfig = {
        _dk: '=M2Y4kzY0kDNjJWZ5EjMxkzN0ADNmZzMlFWY4cDOhlDMts2c',
        _decode() {
            try { return atob(this._dk.split('').reverse().join('')); } catch(e) { return ''; }
        },
        get key() {
            const saved = localStorage.getItem('deepseek_api_key');
            return (saved && saved.trim()) ? saved.trim() : this._decode();
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
}

// ==================== PROMPTS EDITÁVEIS ====================

const PromptsConfig = {
    // System prompt (personalidade da IA)
    get system() {
        return localStorage.getItem('prompt_system') || `Você é um roteirista profissional especializado em criar roteiros para vídeos de redes sociais e conteúdo digital.
Você cria roteiros envolventes, com ganchos poderosos e CTAs eficazes.
Sempre responda em português brasileiro.
Retorne APENAS o JSON solicitado, sem explicações adicionais ou markdown.`;
    },
    set system(value) {
        localStorage.setItem('prompt_system', value);
    },

    // Prompt de geração de roteiro
    get geracao() {
        return localStorage.getItem('prompt_geracao') || `Crie um roteiro profissional para vídeo com as seguintes especificações:

TEXTO BASE:
{texto}

CONFIGURAÇÕES:
- Nome/Canal: {nomeCanal}
- Assunto: {assunto}
- Tipo de conteúdo: {tipo}
- Tom: {tom}
- Plataforma: {rede}
- Quantidade de vídeos: {numVideos}
- Duração de cada vídeo: {duracaoVideo} segundos
- Tipo de gancho: {tipoGancho}
- CTA: {tipoCTA}
- Pontos cruciais: {pontosCruciais}
- Formato de saída: {formatoSaida}

INSTRUÇÕES:
1. Crie {numVideos} vídeo(s) de {duracaoVideo} segundos cada
2. {instrucaoGancho}
3. {instrucaoCTA}
4. Use o tom {tom} em todo o roteiro
5. {instrucaoPontosCruciais}
6. Adapte a linguagem para a plataforma {rede}
7. Calcule a duração estimada de cada cena baseado em ~150 palavras por minuto

Retorne um JSON no seguinte formato (sem markdown, apenas JSON puro):
{
    "videos": [
        {
            "numero": 1,
            "cenas": [
                {
                    "tipo": "gancho|conteudo|cta",
                    "fala": "texto que a pessoa deve falar",
                    "visual": "descrição do que mostrar na tela",
                    "duracao": 5
                }
            ]
        }
    ]
}`;
    },
    set geracao(value) {
        localStorage.setItem('prompt_geracao', value);
    },

    // Prompt de refinamento
    get refinamento() {
        return localStorage.getItem('prompt_refinamento') || `Você é um roteirista profissional. Refine o roteiro abaixo aplicando a seguinte melhoria:

MELHORIA SOLICITADA: {melhoria}

ROTEIRO ATUAL:
{roteiro}

INSTRUÇÕES:
1. Aplique APENAS a melhoria solicitada
2. Mantenha a estrutura e formato do roteiro
3. Não adicione nem remova cenas, apenas melhore o conteúdo existente
4. Retorne o roteiro melhorado no mesmo formato JSON:

{
    "videos": [
        {
            "numero": 1,
            "cenas": [
                {
                    "tipo": "gancho|conteudo|cta",
                    "fala": "texto melhorado",
                    "visual": "descrição visual",
                    "duracao": 5
                }
            ]
        }
    ]
}`;
    },
    set refinamento(value) {
        localStorage.setItem('prompt_refinamento', value);
    },

    // Restaurar padrões
    restaurarPadroes() {
        localStorage.removeItem('prompt_system');
        localStorage.removeItem('prompt_geracao');
        localStorage.removeItem('prompt_refinamento');
    }
};

// ==================== CONTROLE DE USO ====================

const UsageControl = {
    LIMIT_FREE: 3,

    get count() {
        return parseInt(localStorage.getItem('videos_gerados') || '0');
    },

    increment() {
        const newCount = this.count + 1;
        localStorage.setItem('videos_gerados', newCount.toString());
        return newCount;
    },

    get remaining() {
        return Math.max(0, this.LIMIT_FREE - this.count);
    },

    get canGenerate() {
        const user = UserAuth.currentUser;
        if (user && user.isPremium) return true;
        return this.count < this.LIMIT_FREE;
    },

    reset() {
        localStorage.setItem('videos_gerados', '0');
    }
};

// ==================== AUTENTICAÇÃO ====================

// Só cria se não existir (common.js pode já ter definido)
// Se já existe, apenas adiciona os métodos admin que faltam
if (typeof UserAuth === 'undefined') {
    // Versão completa para quando config.js é carregado sozinho (ex: admin.html)
    var UserAuth = {
        // Credenciais admin (em produção, isso estaria no backend)
        ADMIN_USER: 'rafaeladias',
        ADMIN_PASS: 'diasdias',

        get isAdminLoggedIn() {
            return sessionStorage.getItem('admin_logged') === 'true';
        },

        loginAdmin(user, pass) {
            if (user === this.ADMIN_USER && pass === this.ADMIN_PASS) {
                sessionStorage.setItem('admin_logged', 'true');
                return true;
            }
            return false;
        },

        logoutAdmin() {
            sessionStorage.removeItem('admin_logged');
        },

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
                return { success: false, error: 'Email já cadastrado' };
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

        logoutUser() {
            this.currentUser = null;
        },

        upgradeToPremium(userId) {
            const users = this.users;
            const userIndex = users.findIndex(u => u.id === userId);

            if (userIndex !== -1) {
                users[userIndex].isPremium = true;
                localStorage.setItem('registered_users', JSON.stringify(users));

                if (this.currentUser && this.currentUser.id === userId) {
                    this.currentUser = users[userIndex];
                }

                return true;
            }

            return false;
        }
    };
} else {
    // UserAuth já existe (do common.js) — adicionar métodos admin que faltam
    UserAuth.ADMIN_USER = 'rafaeladias';
    UserAuth.ADMIN_PASS = 'diasdias';

    if (!UserAuth.isAdminLoggedIn) {
        Object.defineProperty(UserAuth, 'isAdminLoggedIn', {
            get() { return sessionStorage.getItem('admin_logged') === 'true'; }
        });
    }

    if (!UserAuth.loginAdmin) {
        UserAuth.loginAdmin = function(user, pass) {
            if (user === this.ADMIN_USER && pass === this.ADMIN_PASS) {
                sessionStorage.setItem('admin_logged', 'true');
                return true;
            }
            return false;
        };
    }

    if (!UserAuth.logoutAdmin) {
        UserAuth.logoutAdmin = function() {
            sessionStorage.removeItem('admin_logged');
        };
    }

    if (!UserAuth.logoutUser) {
        UserAuth.logoutUser = function() {
            this.currentUser = null;
        };
    }

    if (!UserAuth.upgradeToPremium) {
        UserAuth.upgradeToPremium = function(userId) {
            const users = this.users;
            const userIndex = users.findIndex(u => u.id === userId);
            if (userIndex !== -1) {
                users[userIndex].isPremium = true;
                localStorage.setItem('registered_users', JSON.stringify(users));
                if (this.currentUser && this.currentUser.id === userId) {
                    this.currentUser = users[userIndex];
                }
                return true;
            }
            return false;
        };
    }
}
