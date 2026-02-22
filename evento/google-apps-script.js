// ============================================================
// GOOGLE APPS SCRIPT — Evento: Confirmacao de Presenca
// Cole este codigo em: Extensoes > Apps Script (na planilha)
// ============================================================

// ===== CONFIGURACAO =====
var CONFIG = {
  EVENTO_NOME: 'Apresentacao do Ensino Nacional',
  EVENTO_DATA: '21 de marco de 2025',
  EVENTO_HORA: '19h',
  EVENTO_LOCAL: 'A definir',
  EMAIL_REMETENTE: 'StudioDias Eventos',
  DIAS_ANTES_LEMBRETE: 3
};

// ============================================================
// 1. RECEBER CONFIRMACAO (chamado pelo formulario)
// ============================================================
function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var nome = e.parameter.nome || '';
  var email = e.parameter.email || '';
  var whatsapp = e.parameter.whatsapp || '';

  if (nome && email) {
    // Verifica duplicata por email
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      var emails = sheet.getRange(2, 2, lastRow - 1, 1).getValues().flat();
      if (emails.includes(email)) {
        return ContentService.createTextOutput('DUPLICADO').setMimeType(ContentService.MimeType.TEXT);
      }
    }

    // Adiciona: Nome | Email | WhatsApp | Data Confirmacao | Lembrete Enviado
    sheet.appendRow([
      nome,
      email,
      whatsapp,
      new Date().toLocaleString('pt-BR'),
      'NAO'
    ]);
  }

  return ContentService.createTextOutput('OK').setMimeType(ContentService.MimeType.TEXT);
}

// ============================================================
// 2. ENVIAR LEMBRETES POR EMAIL — Agendar no Trigger
// ============================================================
function enviarLembretes() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  var dados = sheet.getRange(2, 1, lastRow - 1, 5).getValues();
  var enviados = 0;

  for (var i = 0; i < dados.length; i++) {
    var nome = dados[i][0];
    var email = dados[i][1];
    var lembreteEnviado = dados[i][4];

    if (lembreteEnviado === 'SIM') continue;

    try {
      enviarEmailLembrete(nome, email);
      sheet.getRange(i + 2, 5).setValue('SIM');
      enviados++;
      Logger.log('Email enviado para: ' + email);
    } catch (err) {
      Logger.log('Erro email ' + email + ': ' + err);
    }
  }

  Logger.log('Total de lembretes enviados: ' + enviados);
}

// ============================================================
// 3. EMAIL DE LEMBRETE (HTML bonito)
// ============================================================
function enviarEmailLembrete(nome, email) {
  var assunto = '🔔 Lembrete: ' + CONFIG.EVENTO_NOME + ' em ' + CONFIG.DIAS_ANTES_LEMBRETE + ' dias!';

  var corpo = '<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:20px;">'
    + '<div style="max-width:500px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1);">'
    + '<div style="background:#0C2D48;padding:30px;text-align:center;">'
    + '<h1 style="color:#F5C542;margin:0;font-size:22px;">🔔 Lembrete</h1>'
    + '<p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:14px;">' + CONFIG.EVENTO_NOME + '</p>'
    + '</div>'
    + '<div style="padding:28px;">'
    + '<p style="font-size:16px;color:#333;">Ola, <strong>' + nome + '</strong>!</p>'
    + '<p style="font-size:14px;color:#666;line-height:1.6;">Estamos a <strong>' + CONFIG.DIAS_ANTES_LEMBRETE + ' dias</strong> do evento! Nao esqueca:</p>'
    + '<div style="background:#f8f9fa;border-left:4px solid #F5C542;padding:16px;margin:16px 0;border-radius:0 8px 8px 0;">'
    + '<p style="margin:0 0 6px;font-size:14px;"><strong>📅 Data:</strong> ' + CONFIG.EVENTO_DATA + '</p>'
    + '<p style="margin:0 0 6px;font-size:14px;"><strong>🕐 Horario:</strong> ' + CONFIG.EVENTO_HORA + '</p>'
    + '<p style="margin:0;font-size:14px;"><strong>📍 Local:</strong> ' + CONFIG.EVENTO_LOCAL + '</p>'
    + '</div>'
    + '<p style="font-size:14px;color:#666;">Nos vemos la! 🎉</p>'
    + '</div>'
    + '<div style="background:#f8f9fa;padding:16px;text-align:center;font-size:12px;color:#999;">'
    + 'Enviado por StudioDias Eventos'
    + '</div>'
    + '</div></body></html>';

  MailApp.sendEmail({
    to: email,
    subject: assunto,
    htmlBody: corpo,
    name: CONFIG.EMAIL_REMETENTE
  });
}

// ============================================================
// 4. CONFIGURAR TRIGGER AUTOMATICO
// Rode esta funcao UMA VEZ para agendar o envio de lembretes
// ============================================================
function configurarTriggerLembrete() {
  // Remove triggers antigos
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'enviarLembretes') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  // Agendar para dia 18/03/2025 as 9h (3 dias antes do evento)
  ScriptApp.newTrigger('enviarLembretes')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.TUESDAY)
    .atHour(9)
    .create();

  Logger.log('Trigger criado! Lembretes serao enviados dia 18/03/2025 as 9h.');
}

// ============================================================
// INSTRUCOES:
//
// 1. Planilha com cabecalhos: Nome | Email | WhatsApp | Data Confirmacao | Lembrete Enviado
// 2. Cole este codigo no Apps Script (Extensoes > Apps Script)
// 3. Faca Deploy como Web App (Executar como: Eu, Acesso: Qualquer pessoa)
// 4. Rode configurarTriggerLembrete() UMA VEZ para agendar emails
// 5. Teste enviando um formulario e verificando a planilha
// ============================================================
