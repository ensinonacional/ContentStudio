// ==================== CONFIGURAÇÃO GLOBAL ====================

// Configuração da API (salva no localStorage)
const APIConfig = {
    get key() {
        return localStorage.getItem('deepseek_api_key') || '';
    },
    set key(value) {
        localStorage.setItem('deepseek_api_key', value);
    },
    get modelo() {
        return localStorage.getItem('deepseek_modelo') || 'deepseek-chat';
    },
    set modelo(value) {
        localStorage.setItem('deepseek_modelo', value);
    }
};

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

// ==================== CONFIGURAÇÕES DE CONTEÚDO ====================

const tiposConfig = {
    stories: { gancho: true, cta: true, label: 'Stories' },
    reels: { gancho: true, cta: true, label: 'Reels / TikTok' },
    youtube: { gancho: true, cta: true, label: 'YouTube' },
    venda: { gancho: true, cta: true, label: 'Vídeo de Venda' },
    curso: { gancho: false, cta: false, label: 'Aula / Curso' },
    institucional: { gancho: false, cta: true, label: 'Institucional' },
    podcast: { gancho: true, cta: true, label: 'Podcast' }
};

const tomsConfig = {
    conversacional: { abertura: "E aí, ", transicao: "Olha só, ", fechamento: "É isso!", label: 'Conversacional' },
    amigavel: { abertura: "Oi! ", transicao: "E sabe o que mais? ", fechamento: "Espero ter ajudado!", label: 'Amigável' },
    profissional: { abertura: "", transicao: "Além disso, ", fechamento: "Obrigado pela atenção.", label: 'Profissional' },
    energetico: { abertura: "VAMOS LÁ! ", transicao: "E não para por aí! ", fechamento: "Bora!", label: 'Energético' },
    inspirador: { abertura: "Imagine ", transicao: "A verdade é que ", fechamento: "Comece agora.", label: 'Inspirador' },
    educativo: { abertura: "Hoje você vai aprender ", transicao: "É importante saber que ", fechamento: "Agora você sabe!", label: 'Educativo' },
    urgente: { abertura: "ATENÇÃO! ", transicao: "E mais: ", fechamento: "Não perca tempo!", label: 'Urgente' }
};

const redesConfig = {
    ensinonacional: { cta: 'Acesse a plataforma e continue aprendendo!', label: 'Ensino Nacional' },
    instagram: { cta: 'Salva esse post!', label: 'Instagram' },
    tiktok: { cta: 'Segue pra mais!', label: 'TikTok' },
    youtube: { cta: 'Se inscreve no canal!', label: 'YouTube' },
    linkedin: { cta: 'Compartilhe com sua rede!', label: 'LinkedIn' },
    facebook: { cta: 'Compartilhe!', label: 'Facebook' },
    twitter: { cta: 'RT se concorda!', label: 'X / Twitter' },
    outro: { cta: '', label: 'Outro' }
};

const ganchosConfig = {
    nenhum: { texto: '', visual: '', label: 'Sem gancho' },
    duvida: { texto: 'Você sabia que a maioria das pessoas erra nisso?', visual: 'Expressão de dúvida, interrogação na tela', label: 'Gerar dúvida' },
    desafio: { texto: 'Aposto que você não consegue fazer isso...', visual: 'Expressão desafiadora, gesto de "vem comigo"', label: 'Desafiar o espectador' },
    storytelling: { texto: 'Deixa eu te contar uma história...', visual: 'Close no rosto, ambiente intimista', label: 'Storytelling / História' },
    estatistica: { texto: '90% das pessoas não sabem disso...', visual: 'Número grande na tela, gráfico impactante', label: 'Estatística impactante' },
    pergunta: { texto: 'Você já se perguntou por que isso acontece?', visual: 'Expressão curiosa, interrogação animada', label: 'Pergunta direta' },
    controverso: { texto: 'Isso que vou falar vai contra tudo que você acredita...', visual: 'Expressão séria, corte dramático', label: 'Afirmação controversa' },
    problema: { texto: 'Se você tem esse problema, presta atenção...', visual: 'Expressão de preocupação, X vermelho', label: 'Apresentar problema' },
    curiosidade: { texto: 'O que eu vou mostrar agora vai te surpreender...', visual: 'Olhar misterioso, suspense', label: 'Despertar curiosidade' },
    promessa: { texto: 'Em 60 segundos você vai aprender algo que vai mudar seu jogo...', visual: 'Contagem regressiva, energia alta', label: 'Promessa de resultado' },
    erro: { texto: 'Esse é o erro número 1 que as pessoas cometem...', visual: 'Alerta, símbolo de erro na tela', label: 'Erro comum' },
    segredo: { texto: 'Vou revelar um segredo que poucos conhecem...', visual: 'Gesto de silêncio, ambiente exclusivo', label: 'Revelar segredo' },
    urgencia: { texto: 'Para tudo que você está fazendo agora...', visual: 'Gesto de pare, expressão urgente', label: 'Criar urgência' }
};

const ctasConfig = {
    nenhum: { texto: '', visual: '', label: 'Sem CTA' },
    comentar: { texto: 'Comenta aqui o que você achou!', visual: 'Ícone de comentário, seta apontando', label: 'Comenta aqui' },
    curtir: { texto: 'Deixa o like se esse conteúdo te ajudou!', visual: 'Coração animado, botão de curtir', label: 'Curte esse vídeo' },
    compartilhar: { texto: 'Manda pra alguém que precisa ver isso!', visual: 'Ícone de compartilhar, seta', label: 'Compartilha com alguém' },
    seguir: { texto: 'Segue aqui pra não perder nenhum conteúdo!', visual: 'Botão seguir destacado, seta', label: 'Segue para mais' },
    inscrever: { texto: 'Se inscreve no canal e ativa o sininho!', visual: 'Botão inscrever-se, sino animado', label: 'Se inscreve no canal' },
    salvar: { texto: 'Salva esse vídeo pra ver depois!', visual: 'Ícone de salvar/bookmark', label: 'Salva para depois' },
    link: { texto: 'Link na bio pra você saber mais!', visual: 'Seta apontando pra cima, destaque bio', label: 'Clica no link da bio' },
    proxima: { texto: 'Na próxima aula eu vou te mostrar o passo seguinte...', visual: 'Preview do próximo vídeo, seta', label: 'Veja a próxima aula' },
    ativar: { texto: 'Ativa as notificações pra não perder nada!', visual: 'Sino animado, toggle de notificação', label: 'Ativa as notificações' },
    baixar: { texto: 'Baixa o material gratuito no link!', visual: 'Ícone de download, mockup do material', label: 'Baixa o material' },
    comprar: { texto: 'Garanta o seu agora antes que acabe!', visual: 'Botão de compra, urgência, estoque', label: 'Garanta o seu agora' },
    contato: { texto: 'Me chama no direct que eu te ajudo!', visual: 'Ícone de mensagem, DM aberto', label: 'Chama no direct/WhatsApp' },
    marcar: { texto: 'Marca aquele amigo que precisa ver isso!', visual: 'Ícone de arroba, tag de menção', label: 'Marca um amigo' }
};

const refineConfigs = {
    'mais-curto': { label: 'Mais curto' },
    'mais-longo': { label: 'Mais detalhado' },
    'mais-informal': { label: 'Mais informal' },
    'mais-formal': { label: 'Mais formal' },
    'mais-energia': { label: 'Mais energia' },
    'mais-calmo': { label: 'Mais calmo' },
    'mais-vendedor': { label: 'Mais persuasivo' },
    'mais-educativo': { label: 'Mais educativo' },
    'gancho-forte': { label: 'Gancho mais forte' },
    'cta-forte': { label: 'CTA mais forte' },
    'mais-emocional': { label: 'Mais emocional' },
    'mais-direto': { label: 'Mais direto' }
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

const UserAuth = {
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

    // Usuários comuns (simulado - em produção seria um backend)
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
            password, // Em produção, seria hash
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
