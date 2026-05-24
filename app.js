/**
 * LÓGICA E INTERATIVIDADE - PROTOCOLO LEVEZA 21
 * Forix Group - Saúde & Ciência Aplicada
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initVSL();
  initBreathingWidget();
  initScheduleTabs();
  initSubstitutionsSimulator();
  initFAQ();
  initABTesting();
});

/* ==========================================================================
   HEADER TRANSITIONS
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   VSL (VIDEO SALES LETTER) CUSTOM MOCK PLAYER
   ========================================================================== */
function initVSL() {
  const placeholder = document.getElementById('vslPlaceholder');
  const videoElement = document.getElementById('vslVideo');
  
  if (placeholder && videoElement) {
    placeholder.addEventListener('click', () => {
      // Simular carregamento premium de vídeo
      placeholder.innerHTML = `
        <div class="vsl-overlay" style="display: flex; flex-direction: column; justify-content: center; align-items: center; background: rgba(10, 25, 47, 0.95);">
          <div class="spinner" style="width: 50px; height: 50px; border: 4px solid rgba(255,255,255,0.1); border-top: 4px solid var(--secondary-mint); border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px;"></div>
          <span style="color: #FFFFFF; font-weight: 600; font-size: 0.95rem;">Carregando vídeo científico de alta resolução...</span>
        </div>
        <style>
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        </style>
      `;
      
      setTimeout(() => {
        placeholder.style.display = 'none';
        videoElement.style.display = 'block';
        videoElement.play().catch(err => {
          console.log("Auto-play blocked, playing with controls", err);
          videoElement.controls = true;
          videoElement.play();
        });
      }, 1500);
    });
  }
}

/* ==========================================================================
   WIDGET DE ANCORAGEM RESPIRATÓRIA (MÓDULO 1)
   ========================================================================== */
function initBreathingWidget() {
  const circle = document.getElementById('breathCircle');
  const text = document.getElementById('breathText');
  const timerDisplay = document.getElementById('breathTimer');
  const controlBtn = document.getElementById('breathControlBtn');
  
  let breathingInterval = null;
  let countdownInterval = null;
  let isRunning = false;
  let totalTime = 180; // 3 minutos em segundos
  let phaseTime = 4; // Ciclos de 4s (in, hold, out)
  let currentPhase = 'idle'; // inhale, hold, exhale
  
  function updateTimerText(sec) {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  function startBreathing() {
    isRunning = true;
    controlBtn.textContent = 'Parar Exercício';
    controlBtn.style.backgroundColor = '#FF5A5F';
    controlBtn.style.color = '#FFFFFF';
    
    // Timer decrescente de 3 minutos
    countdownInterval = setInterval(() => {
      totalTime--;
      updateTimerText(totalTime);
      
      if (totalTime <= 0) {
        stopBreathing();
        alert('Parabéns! Técnica de 3 minutos concluída. Seu cortisol diminuiu.');
      }
    }, 1000);
    
    runCycle();
  }
  
  function runCycle() {
    if (!isRunning) return;
    
    // Fase 1: Inalar (4s)
    currentPhase = 'inhale';
    text.textContent = 'Inale';
    circle.className = 'breathing-circle inhale';
    
    breathingInterval = setTimeout(() => {
      if (!isRunning) return;
      
      // Fase 2: Segurar (4s)
      currentPhase = 'hold';
      text.textContent = 'Segure';
      circle.className = 'breathing-circle inhale hold';
      
      breathingInterval = setTimeout(() => {
        if (!isRunning) return;
        
        // Fase 3: Exalar (4s)
        currentPhase = 'exhale';
        text.textContent = 'Exale';
        circle.className = 'breathing-circle exhale';
        
        breathingInterval = setTimeout(() => {
          if (!isRunning) return;
          // Reiniciar ciclo
          runCycle();
        }, 4000);
        
      }, 4000);
      
    }, 4000);
  }
  
  function stopBreathing() {
    isRunning = false;
    controlBtn.textContent = 'Iniciar Exercício';
    controlBtn.style.backgroundColor = 'var(--secondary-mint)';
    controlBtn.style.color = 'var(--primary-deep)';
    
    clearInterval(countdownInterval);
    clearTimeout(breathingInterval);
    
    circle.className = 'breathing-circle';
    text.textContent = 'Começar';
    totalTime = 180;
    updateTimerText(totalTime);
  }
  
  if (controlBtn) {
    controlBtn.addEventListener('click', () => {
      if (isRunning) {
        stopBreathing();
      } else {
        startBreathing();
      }
    });
  }
}

/* ==========================================================================
   TABULADOR DO CRONOGRAMA DE 21 DIAS (MÓDULO 2)
   ========================================================================== */
function initScheduleTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      
      // Remover classe active de todos os botões e conteúdos
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      
      // Adicionar active aos selecionados
      tab.classList.add('active');
      const activeContent = document.getElementById(`tab-${target}`);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   SIMULADOR DE SUBSTITUIÇÕES INTELIGENTES (MÓDULO 3)
   ========================================================================== */
function initSubstitutionsSimulator() {
  const btns = document.querySelectorAll('.sim-btn');
  const cards = document.querySelectorAll('.sim-card');
  
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.sim;
      
      // Remover active
      btns.forEach(b => b.classList.remove('active'));
      cards.forEach(c => c.classList.remove('active'));
      
      // Ativar correspondente
      btn.classList.add('active');
      const activeCard = document.getElementById(`sim-${category}`);
      if (activeCard) {
        activeCard.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   FAQ ACCORDION
   ========================================================================== */
function initFAQ() {
  const questions = document.querySelectorAll('.faq-question');
  
  questions.forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentNode;
      const isActive = item.classList.contains('active');
      
      // Fechar todos
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
      });
      
      // Se não estava ativo, abre
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   A/B TESTING DEMONSTRATION SUITE
   ========================================================================== */
function initABTesting() {
  const abTrigger = document.getElementById('abPanelTrigger');
  const abPanel = document.getElementById('abPanel');
  const abClose = document.getElementById('abPanelClose');
  const abSelect = document.getElementById('abSelect');
  
  // Elementos da página que vão sofrer a alteração de A/B
  const heroHeadline = document.getElementById('abHeadline');
  const mainCTA = document.getElementById('abMainCTA');
  
  // Textos das variações
  const variations = {
    A: {
      headline: "A Culpa Nunca Foi Sua: Quebre o Sequestro Hormonal do Cortisol e Ative a Queima Real em 21 Dias.",
      cta: "Quero Minha Leveza Agora!"
    },
    B: {
      headline: "Cansada de lutar contra a balança? Conheça o método científico de 21 dias que desativa o estresse e liberta você da culpa alimentar.",
      cta: "Desative o Cortisol e Comece Hoje"
    }
  };
  
  // Carregar versão prévia ou selecionar aleatório
  let currentVersion = localStorage.getItem('abVersion');
  if (!currentVersion || !variations[currentVersion]) {
    // 50% de chance para cada versão
    currentVersion = Math.random() < 0.5 ? 'A' : 'B';
    localStorage.setItem('abVersion', currentVersion);
  }
  
  // Aplicar versão inicial
  applyABVersion(currentVersion);
  
  // Registrar visualizações simuladas localmente
  incrementStats(currentVersion, 'views');
  updateStatsDisplay();
  
  // Ouvinte de clique nos CTAs para registrar conversão simulada
  document.querySelectorAll('a[href*="hotmart.com"]').forEach(el => {
    el.addEventListener('click', () => {
      incrementStats(localStorage.getItem('abVersion') || 'A', 'clicks');
      updateStatsDisplay();
    });
  });
  
  // Lógica do painel de controle
  if (abTrigger && abPanel) {
    abTrigger.addEventListener('click', () => {
      abPanel.classList.toggle('active');
    });
  }
  
  if (abClose) {
    abClose.addEventListener('click', () => {
      abPanel.classList.remove('active');
    });
  }
  
  if (abSelect) {
    abSelect.value = currentVersion;
    abSelect.addEventListener('change', (e) => {
      const selected = e.target.value;
      localStorage.setItem('abVersion', selected);
      applyABVersion(selected);
      incrementStats(selected, 'views');
      updateStatsDisplay();
    });
  }
  
  function applyABVersion(version) {
    const data = variations[version];
    if (heroHeadline && data) {
      heroHeadline.textContent = data.headline;
    }
    if (mainCTA && data) {
      mainCTA.textContent = data.cta;
    }
  }
  
  function incrementStats(version, type) {
    const key = `ab_${version}_${type}`;
    let count = parseInt(localStorage.getItem(key) || '0');
    count++;
    localStorage.setItem(key, count.toString());
  }
  
  function updateStatsDisplay() {
    const viewsA = parseInt(localStorage.getItem('ab_A_views') || '0') + 120; // adic. base simulada
    const clicksA = parseInt(localStorage.getItem('ab_A_clicks') || '0') + 8;
    const viewsB = parseInt(localStorage.getItem('ab_B_views') || '0') + 115;
    const clicksB = parseInt(localStorage.getItem('ab_B_clicks') || '0') + 12;
    
    const ctrA = viewsA > 0 ? ((clicksA / viewsA) * 100).toFixed(2) : '0.00';
    const ctrB = viewsB > 0 ? ((clicksB / viewsB) * 100).toFixed(2) : '0.00';
    
    const statsADisp = document.getElementById('abStatsA');
    const statsBDisp = document.getElementById('abStatsB');
    
    if (statsADisp) {
      statsADisp.innerHTML = `Views: <span>${viewsA}</span> | Clicks: <span>${clicksA}</span> | CTR: <span style="color: var(--secondary-mint)">${ctrA}%</span>`;
    }
    if (statsBDisp) {
      statsBDisp.innerHTML = `Views: <span>${viewsB}</span> | Clicks: <span>${clicksB}</span> | CTR: <span style="color: var(--secondary-mint)">${ctrB}%</span>`;
    }
  }
}
