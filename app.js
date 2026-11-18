/**
 * ElevenLabs Anime Voice Studio - Seiyuu & Narration Logic
 * Neural Character Speech Synthesizer with Cyberpunk & Anime Aesthetics
 */

// Default verified credentials provided by user
const DEFAULT_API_KEY = 'sk_1bcb39d22e32fc1cde32abdafa6c055d63aa714449a06b8e';
const STORAGE_KEY_API = 'elevenlabs_custom_api_key';

// Model specifications & metadata
const MODEL_DETAILS = {
  'eleven_multilingual_v2': {
    badge: 'Multilingual v2',
    description: 'Supreme emotional range, dramatic pauses & cinematic Japanese/English inflection.'
  },
  'eleven_turbo_v2_5': {
    badge: 'Turbo v2.5',
    description: 'High-speed neural generation with ultra-low latency & pristine fidelity across 32 languages.'
  },
  'eleven_flash_v2_5': {
    badge: 'Flash v2.5',
    description: 'Blazing fast real-time conversational streaming and rapid anime action turnarounds.'
  },
  'eleven_monolingual_v1': {
    badge: 'English v1',
    description: 'Classic expressive neural synthesis tuned specifically for English anime dubbing.'
  },
  'eleven_turbo_v2': {
    badge: 'Turbo v2',
    description: 'Fast, cost-efficient synthesis calibrated for responsive anime action dialogue.'
  },
  'eleven_multilingual_v1': {
    badge: 'Multilingual v1',
    description: 'First generation multilingual speech model for standard applications.'
  }
};

// Anime Seiyuu Roster & Character Profiles
const ANIME_CHARACTERS = {
  'pFZP5JQG7iQjIQuC4Bku': {
    key: 'sakura',
    name: 'Sakura (サクラ)',
    role: '🌸 Tsundere Idol',
    avatar: 'assets/sakura.jpg',
    quote: '"B-Baka! Don\'t get the wrong idea, I\'m only narrating because you asked!"',
    desc: 'Sweet, spirited & emotionally vibrant voice perfect for heroines and idols.',
    defaultStability: 0.40,
    defaultSimilarity: 0.85,
    defaultStyle: 0.35
  },
  'iP95p4xoKVk53GoZ742B': {
    key: 'ren',
    name: 'Ren (レン)',
    role: '⚡ Shonen Protagonist',
    avatar: 'assets/ren.jpg',
    quote: '"I will never give up! Our bond will pierce through any darkness!"',
    desc: 'Energetic, bold & passionate shonen hero delivery with fierce resolve.',
    defaultStability: 0.35,
    defaultSimilarity: 0.80,
    defaultStyle: 0.45
  },
  'JBFqnCBsd6RMkjVDRZzb': {
    key: 'kage',
    name: 'Kage (影 - カゲ)',
    role: '🗡️ Dark Sorcerer',
    avatar: null,
    avatarSymbol: '🌙',
    quote: '"Gaze into the eternal void. The shadows obey only my command."',
    desc: 'Deep, mysterious & commanding cadence for sorcerers, villains & cool senpais.',
    defaultStability: 0.55,
    defaultSimilarity: 0.85,
    defaultStyle: 0.20
  },
  'Xb7hH8MSUJpSbSDYk0k2': {
    key: 'aoi',
    name: 'Chibi Aoi (アオイ)',
    role: '🎀 Kawaii Vtuber',
    avatar: null,
    avatarSymbol: '🍙',
    quote: '"Konbanwa minna-san! Today is going to be super exciting, yay!"',
    desc: 'Bright, cheerful, and crystal-clear companion voice for mascots and VTubers.',
    defaultStability: 0.50,
    defaultSimilarity: 0.75,
    defaultStyle: 0.15
  },
  'nPczCjzI2devNBz1VWQn': {
    key: 'takeshi',
    name: 'Takeshi (タケシ)',
    role: '🛡️ Mecha Commander',
    avatar: null,
    avatarSymbol: '⚔️',
    quote: '"All units, prepare orbital descent! We hold the line until the end!"',
    desc: 'Authoritative, deep baritone for battle-hardened commanders and mecha pilots.',
    defaultStability: 0.60,
    defaultSimilarity: 0.85,
    defaultStyle: 0.25
  },
  'cgSgspJ2msm6clMCkdW9': {
    key: 'celeste',
    name: 'Celeste (セレスト)',
    role: '👑 Astral Empress',
    avatar: null,
    avatarSymbol: '🔮',
    quote: '"The stars have aligned. Your fate has already been written in the cosmos."',
    desc: 'Warm, regal & enchanting voice suited for archmages and royal heroines.',
    defaultStability: 0.50,
    defaultSimilarity: 0.80,
    defaultStyle: 0.20
  },
  'onwK4e9ZLuTAKqWW03F9': {
    key: 'daniel',
    name: 'Daniel (ダン)',
    role: '🎙️ Anime Host',
    avatar: null,
    avatarSymbol: '📺',
    quote: '"Next time on Cyber Galaxy: The battle for the celestial core begins!"',
    desc: 'Polished, dramatic documentary & episode preview narrator.',
    defaultStability: 0.55,
    defaultSimilarity: 0.80,
    defaultStyle: 0.20
  },
  'custom': {
    key: 'custom',
    name: 'Custom Seiyuu ID',
    role: '⚙️ Custom Voice',
    avatar: null,
    avatarSymbol: '✨',
    quote: '"Equipped custom ElevenLabs Voice ID from your account."',
    desc: 'Enter any valid ElevenLabs voice ID to synthesize speech.',
    defaultStability: 0.50,
    defaultSimilarity: 0.75,
    defaultStyle: 0.00
  }
};

// Preset Anime Dialogue Snippets
const ANIME_SAMPLE_PROMPTS = {
  shonen: "Ore no ban da! Even if the sky shatters and the entire universe stands against me, my spirit will never waver! Let the resonance of our hearts pierce through the heavens! IKUZO—!",
  tsundere: "B-Baka! It's not like I generated this narration specifically because I wanted to hear your voice or anything... D-Don't get the wrong idea, okay?! But if you want to listen together, I guess it can't be helped...",
  mecha: "Sensory neural bridge: Synchronized at 400%. Initiating plasma drive overdrive. All tactical flight units, prepare for orbital descent and break through the planetary defense barrier!",
  isekai: "Wait... a glowing summoning circle in my bedroom?! Did I just get reincarnated into the Grand Astral Empire with maxed-out magical stats?! Hey system, show me my skill tree right now!",
  villain: "Fools... you speak of justice and the power of friendship as if the cosmos cares for your fragile ideals. Gaze into the eternal void, and witness true infinity.",
  slice: "Oha-yo~! Don't tell me you overslept on the first day of the academy cultural festival again! Hurry up, or I'm eating your melon bread before the opening ceremony starts!"
};

// Application State
let currentApiKey = localStorage.getItem(STORAGE_KEY_API);
if (!currentApiKey || currentApiKey === 'sk_f7d553334b6c6d4de408027c405a433b00e5615cc373cbbd') {
  currentApiKey = DEFAULT_API_KEY;
  localStorage.setItem(STORAGE_KEY_API, DEFAULT_API_KEY);
}

const state = {
  apiKey: currentApiKey,
  isGenerating: false,
  isPlaying: false,
  currentAudioUrl: null,
  activeTrackMeta: null,
  history: [],
  audioContext: null,
  analyser: null,
  sourceNode: null,
  animationFrameId: null
};

// DOM Elements
const elements = {
  // Config & Selects
  modelSelect: document.getElementById('modelSelect'),
  currentModelBadge: document.getElementById('currentModelBadge'),
  modelDescription: document.getElementById('modelDescription'),
  voiceSelect: document.getElementById('voiceSelect'),
  voiceGenderBadge: document.getElementById('voiceGenderBadge'),
  voiceDescription: document.getElementById('voiceDescription'),
  customVoiceRow: document.getElementById('customVoiceRow'),
  customVoiceInput: document.getElementById('customVoiceInput'),
  characterCardsGrid: document.getElementById('characterCardsGrid'),
  
  // Monitor Character Display
  activeVoiceAvatar: document.getElementById('activeVoiceAvatar'),
  soundRing: document.getElementById('soundRing'),
  activeVoiceName: document.getElementById('activeVoiceName'),
  activeVoiceRole: document.getElementById('activeVoiceRole'),
  activeVoiceQuote: document.getElementById('activeVoiceQuote'),

  // Script Editor
  textInput: document.getElementById('textInput'),
  pasteBtn: document.getElementById('pasteBtn'),
  clearBtn: document.getElementById('clearBtn'),
  charCount: document.getElementById('charCount'),
  wordCount: document.getElementById('wordCount'),
  estTime: document.getElementById('estTime'),
  
  // Voice Controls
  stabilitySlider: document.getElementById('stabilitySlider'),
  stabilityVal: document.getElementById('stabilityVal'),
  similaritySlider: document.getElementById('similaritySlider'),
  similarityVal: document.getElementById('similarityVal'),
  styleSlider: document.getElementById('styleSlider'),
  styleVal: document.getElementById('styleVal'),
  speakerBoostToggle: document.getElementById('speakerBoostToggle'),
  
  // Primary Trigger
  playBtn: document.getElementById('playBtn'),
  playIconSvg: document.getElementById('playIconSvg'),
  loadingSpinnerSvg: document.getElementById('loadingSpinnerSvg'),
  playBtnText: document.getElementById('playBtnText'),
  generationStatus: document.getElementById('generationStatus'),
  statusPulse: document.getElementById('statusPulse'),
  generationStatusText: document.getElementById('generationStatusText'),
  
  // Player & Visualizer
  audioStateTag: document.getElementById('audioStateTag'),
  visualizerCanvas: document.getElementById('visualizerCanvas'),
  visualizerEmptyState: document.getElementById('visualizerEmptyState'),
  trackTitle: document.getElementById('trackTitle'),
  trackSpecs: document.getElementById('trackSpecs'),
  downloadBtn: document.getElementById('downloadBtn'),
  nativeAudio: document.getElementById('nativeAudioElement'),
  timelineWrapper: document.getElementById('timelineWrapper'),
  timelineProgress: document.getElementById('timelineProgress'),
  currentTimeLabel: document.getElementById('currentTimeLabel'),
  totalDurationLabel: document.getElementById('totalDurationLabel'),
  audioPlayToggle: document.getElementById('audioPlayToggle'),
  audioTogglePlaySvg: document.getElementById('audioTogglePlaySvg'),
  audioTogglePauseSvg: document.getElementById('audioTogglePauseSvg'),
  volumeBtn: document.getElementById('volumeBtn'),
  volumeHighSvg: document.getElementById('volumeHighSvg'),
  volumeMuteSvg: document.getElementById('volumeMuteSvg'),
  volumeSlider: document.getElementById('volumeSlider'),
  speedBtns: document.querySelectorAll('.speed-btn'),
  
  // History
  historyCount: document.getElementById('historyCount'),
  historyList: document.getElementById('historyList'),
  clearHistoryBtn: document.getElementById('clearHistoryBtn'),
  
  // Modal & API
  apiStatusPill: document.getElementById('apiStatusPill'),
  apiStatusText: document.getElementById('apiStatusText'),
  openSettingsBtn: document.getElementById('openSettingsBtn'),
  settingsModal: document.getElementById('settingsModal'),
  closeSettingsBtn: document.getElementById('closeSettingsBtn'),
  cancelSettingsBtn: document.getElementById('cancelSettingsBtn'),
  saveApiKeyBtn: document.getElementById('saveApiKeyBtn'),
  apiKeyInput: document.getElementById('apiKeyInput'),
  toggleKeyVisibilityBtn: document.getElementById('toggleKeyVisibilityBtn'),
  keyValidationBadge: document.getElementById('keyValidationBadge'),
  
  // Toast & Sakura
  toastContainer: document.getElementById('toastContainer'),
  sakuraCanvas: document.getElementById('sakuraCanvas')
};

/* ==========================================================================
   Initialization
   ========================================================================== */
function init() {
  setupEventListeners();
  updateTextStats();
  updateModelInfo();
  updateCharacterProfile(elements.voiceSelect.value);
  updateApiKeyDisplay();
  initVisualizerCanvas();
  initSakuraBackground();
}

/* ==========================================================================
   Event Listeners Setup
   ========================================================================== */
function setupEventListeners() {
  // Model Select Change
  elements.modelSelect.addEventListener('change', updateModelInfo);

  // Voice Select Dropdown Change
  elements.voiceSelect.addEventListener('change', (e) => {
    updateCharacterProfile(e.target.value);
  });

  // Interactive Character Card Clicks
  document.querySelectorAll('.char-card').forEach(card => {
    card.addEventListener('click', () => {
      const voiceId = card.dataset.voiceId;
      elements.voiceSelect.value = voiceId;
      updateCharacterProfile(voiceId);
      triggerAvatarPulse();
    });
  });

  // Textarea input & stats
  elements.textInput.addEventListener('input', updateTextStats);

  // Anime Preset Chips
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active-preset'));
      chip.classList.add('active-preset');

      const sampleKey = chip.dataset.sample;
      if (ANIME_SAMPLE_PROMPTS[sampleKey]) {
        elements.textInput.value = ANIME_SAMPLE_PROMPTS[sampleKey];
        updateTextStats();
        showToast(`Loaded ${chip.textContent} dialogue`, 'info');
        elements.textInput.focus();
      }
    });
  });

  // Editor Tools
  elements.pasteBtn.addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        elements.textInput.value = text;
        updateTextStats();
        showToast('Pasted clipboard text // 貼付完了', 'success');
      }
    } catch {
      showToast('Clipboard access denied. Please paste manually.', 'error');
    }
  });

  elements.clearBtn.addEventListener('click', () => {
    elements.textInput.value = '';
    updateTextStats();
    elements.textInput.focus();
  });

  // Hotkey: Ctrl + Enter to narrate
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      elements.playBtn.click();
    }
  });

  // Sliders
  elements.stabilitySlider.addEventListener('input', (e) => {
    elements.stabilityVal.textContent = parseFloat(e.target.value).toFixed(2);
  });
  elements.similaritySlider.addEventListener('input', (e) => {
    elements.similarityVal.textContent = parseFloat(e.target.value).toFixed(2);
  });
  elements.styleSlider.addEventListener('input', (e) => {
    elements.styleVal.textContent = parseFloat(e.target.value).toFixed(2);
  });

  // Primary Action: Start Narration
  elements.playBtn.addEventListener('click', handleStartNarration);

  // Audio Play / Pause Toggle
  elements.audioPlayToggle.addEventListener('click', toggleAudioPlayback);

  // Native Audio Events
  elements.nativeAudio.addEventListener('play', () => {
    state.isPlaying = true;
    updatePlaybackUI();
    ensureAudioContext();
    elements.soundRing.classList.add('active');
  });
  elements.nativeAudio.addEventListener('pause', () => {
    state.isPlaying = false;
    updatePlaybackUI();
    elements.soundRing.classList.remove('active');
  });
  elements.nativeAudio.addEventListener('ended', () => {
    state.isPlaying = false;
    updatePlaybackUI();
    elements.soundRing.classList.remove('active');
  });
  elements.nativeAudio.addEventListener('timeupdate', updateTimeline);
  elements.nativeAudio.addEventListener('loadedmetadata', () => {
    elements.totalDurationLabel.textContent = formatTime(elements.nativeAudio.duration);
  });

  // Timeline Scrubber
  elements.timelineWrapper.addEventListener('click', seekAudio);

  // Speed controls
  elements.speedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.speedBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const speed = parseFloat(btn.dataset.speed);
      elements.nativeAudio.playbackRate = speed;
    });
  });

  // Volume & Mute
  elements.volumeSlider.addEventListener('input', (e) => {
    elements.nativeAudio.volume = parseFloat(e.target.value);
    elements.nativeAudio.muted = (elements.nativeAudio.volume === 0);
    updateVolumeIcon();
  });
  elements.volumeBtn.addEventListener('click', () => {
    elements.nativeAudio.muted = !elements.nativeAudio.muted;
    updateVolumeIcon();
  });

  // Download MP3
  elements.downloadBtn.addEventListener('click', downloadCurrentTrack);

  // Clear History
  elements.clearHistoryBtn.addEventListener('click', () => {
    state.history = [];
    renderHistory();
    showToast('Narration vault cleared', 'info');
  });

  // Modal Settings
  elements.openSettingsBtn.addEventListener('click', () => {
    elements.apiKeyInput.value = state.apiKey;
    elements.settingsModal.style.display = 'flex';
  });
  elements.closeSettingsBtn.addEventListener('click', () => {
    elements.settingsModal.style.display = 'none';
  });
  elements.cancelSettingsBtn.addEventListener('click', () => {
    elements.settingsModal.style.display = 'none';
  });
  elements.settingsModal.addEventListener('click', (e) => {
    if (e.target === elements.settingsModal) {
      elements.settingsModal.style.display = 'none';
    }
  });

  // Toggle API key visibility
  elements.toggleKeyVisibilityBtn.addEventListener('click', () => {
    elements.apiKeyInput.type = elements.apiKeyInput.type === 'password' ? 'text' : 'password';
  });

  // Save API Key
  elements.saveApiKeyBtn.addEventListener('click', () => {
    const key = elements.apiKeyInput.value.trim();
    if (!key) {
      showToast('Please enter an ElevenLabs API key', 'error');
      return;
    }
    state.apiKey = key;
    localStorage.setItem(STORAGE_KEY_API, key);
    updateApiKeyDisplay();
    elements.settingsModal.style.display = 'none';
    showToast('API Key saved successfully // 認証成功', 'success');
  });
}

/* ==========================================================================
   Model & Anime Character Handlers
   ========================================================================== */
function updateModelInfo() {
  const modelId = elements.modelSelect.value;
  const info = MODEL_DETAILS[modelId] || { badge: 'Selected Model', description: '' };
  elements.currentModelBadge.textContent = info.badge;
  elements.modelDescription.textContent = info.description;
}

function updateCharacterProfile(voiceId) {
  const char = ANIME_CHARACTERS[voiceId] || {
    key: 'custom',
    name: 'Voice ' + voiceId.slice(0, 6),
    role: 'Custom Seiyuu',
    avatar: null,
    quote: '"Voice profile active."',
    desc: 'Custom ElevenLabs voice.'
  };

  // Sync Voice Dropdown & custom input
  if (voiceId === 'custom') {
    elements.customVoiceRow.style.display = 'block';
  } else {
    elements.customVoiceRow.style.display = 'none';
  }

  elements.voiceGenderBadge.textContent = char.role.split(' ')[1] || 'Seiyuu';
  elements.voiceDescription.textContent = char.desc;

  // Sync Active Character Card in Grid
  document.querySelectorAll('.char-card').forEach(card => {
    if (card.dataset.voiceId === voiceId) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  // Update Holo-Monitor Character Banner
  elements.activeVoiceName.textContent = char.name;
  elements.activeVoiceRole.textContent = char.role;
  elements.activeVoiceQuote.textContent = char.quote;

  if (char.avatar) {
    elements.activeVoiceAvatar.src = char.avatar;
    elements.activeVoiceAvatar.style.display = 'block';
  } else {
    // If no custom avatar image, set Sakura or Ren or keep image
    if (char.key === 'ren') {
      elements.activeVoiceAvatar.src = 'assets/ren.jpg';
    } else {
      elements.activeVoiceAvatar.src = 'assets/sakura.jpg';
    }
  }

  // Adjust default sliders if provided
  if (char.defaultStability !== undefined) {
    elements.stabilitySlider.value = char.defaultStability;
    elements.stabilityVal.textContent = char.defaultStability.toFixed(2);
  }
  if (char.defaultSimilarity !== undefined) {
    elements.similaritySlider.value = char.defaultSimilarity;
    elements.similarityVal.textContent = char.defaultSimilarity.toFixed(2);
  }
  if (char.defaultStyle !== undefined) {
    elements.styleSlider.value = char.defaultStyle;
    elements.styleVal.textContent = char.defaultStyle.toFixed(2);
  }
}

function triggerAvatarPulse() {
  elements.soundRing.classList.add('active');
  setTimeout(() => {
    if (!state.isPlaying) {
      elements.soundRing.classList.remove('active');
    }
  }, 1200);
}

function updateTextStats() {
  const text = elements.textInput.value;
  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const estSeconds = Math.max(1, Math.round(words / 2.5));

  elements.charCount.textContent = `${chars} characters`;
  elements.wordCount.textContent = `${words} words`;
  elements.estTime.textContent = words > 0 ? `~${estSeconds}s speech` : `~0s speech`;
}

function updateApiKeyDisplay() {
  if (state.apiKey) {
    const masked = state.apiKey.length > 10 
      ? `${state.apiKey.slice(0, 6)}...${state.apiKey.slice(-4)}`
      : 'Active';
    elements.apiStatusText.textContent = `SEIYUU LINK // ACTIVE (${masked})`;
    elements.apiStatusPill.classList.remove('offline');
  } else {
    elements.apiStatusText.textContent = 'KEY MISSING // 未設定';
    elements.apiStatusPill.classList.add('offline');
  }
}

/* ==========================================================================
   Speech Narration Generation API Request
   ========================================================================== */
async function handleStartNarration() {
  // Unlock audio context synchronously on user gesture
  ensureAudioContext();

  const text = elements.textInput.value.trim();
  if (!text) {
    showToast('Please type or paste some text to narrate', 'error');
    elements.textInput.focus();
    return;
  }

  let voiceId = elements.voiceSelect.value;
  if (voiceId === 'custom') {
    voiceId = elements.customVoiceInput.value.trim();
    if (!voiceId) {
      showToast('Please enter a valid ElevenLabs Voice ID', 'error');
      elements.customVoiceInput.focus();
      return;
    }
  }

  const modelId = elements.modelSelect.value;
  const stability = parseFloat(elements.stabilitySlider.value);
  const similarity = parseFloat(elements.similaritySlider.value);
  const style = parseFloat(elements.styleSlider.value);
  const speakerBoost = elements.speakerBoostToggle.checked;

  // Set Loading State
  setLoadingState(true, 'Synthesizing anime speech with ElevenLabs...');
  elements.soundRing.classList.add('active');

  try {
    const endpoint = `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}`;
    const payload = {
      text: text,
      model_id: modelId,
      voice_settings: {
        stability: stability,
        similarity_boost: similarity,
        style: style,
        use_speaker_boost: speakerBoost
      }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'xi-api-key': state.apiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      let errorMsg = `HTTP Error ${response.status}`;
      try {
        const errJson = await response.json();
        if (errJson && errJson.detail && errJson.detail.message) {
          errorMsg = errJson.detail.message;
        } else if (errJson && errJson.detail) {
          errorMsg = JSON.stringify(errJson.detail);
        }
      } catch {
        // fallback text
      }
      throw new Error(errorMsg);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    // Get Voice and Model display names
    const char = ANIME_CHARACTERS[voiceId] || { name: 'Seiyuu ' + voiceId.slice(0, 6) };
    const modelInfo = MODEL_DETAILS[modelId] || { badge: modelId };

    const trackMeta = {
      id: Date.now(),
      title: text.length > 55 ? text.slice(0, 52) + '...' : text,
      fullText: text,
      voiceName: char.name,
      modelName: modelInfo.badge,
      audioUrl: audioUrl,
      audioBlob: audioBlob,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Load track into player
    loadAudioTrack(trackMeta, true);

    // Save into history
    state.history.unshift(trackMeta);
    renderHistory();

    setLoadingState(false, 'Speech generated successfully! // 詠唱完了');
    showToast('Anime speech synthesized and playing!', 'success');

  } catch (err) {
    console.error('ElevenLabs API Error:', err);
    setLoadingState(false, 'Generation failed // 失敗');
    elements.soundRing.classList.remove('active');
    showToast(err.message || 'Failed to generate voice narration', 'error');
  }
}

function setLoadingState(isLoading, message) {
  state.isGenerating = isLoading;
  elements.playBtn.disabled = isLoading;
  elements.playIconSvg.style.display = isLoading ? 'none' : 'block';
  elements.loadingSpinnerSvg.style.display = isLoading ? 'block' : 'none';
  elements.playBtnText.textContent = isLoading ? 'SYNTHESIZING... // 詠唱中' : 'START NARRATION // 詠唱開始';
  elements.statusPulse.style.display = isLoading ? 'inline-block' : 'none';
  elements.generationStatusText.textContent = message;
}

/* ==========================================================================
   Audio Player Management
   ========================================================================== */
function loadAudioTrack(trackMeta, autoPlay = true) {
  state.activeTrackMeta = trackMeta;
  state.currentAudioUrl = trackMeta.audioUrl;

  // Update UI Elements
  elements.trackTitle.textContent = `"${trackMeta.title}"`;
  elements.trackSpecs.textContent = `${trackMeta.voiceName} • ${trackMeta.modelName} • ElevenLabs`;
  elements.downloadBtn.disabled = false;
  elements.audioPlayToggle.disabled = false;

  // Load into native audio
  elements.nativeAudio.src = trackMeta.audioUrl;
  elements.visualizerEmptyState.style.opacity = '0';
  elements.visualizerEmptyState.style.pointerEvents = 'none';

  if (autoPlay) {
    elements.nativeAudio.play().catch(e => {
      console.warn('Autoplay prevented by browser, click play to hear:', e);
    });
  }
}

function toggleAudioPlayback() {
  if (!state.currentAudioUrl) return;

  if (elements.nativeAudio.paused) {
    elements.nativeAudio.play();
  } else {
    elements.nativeAudio.pause();
  }
}

function updatePlaybackUI() {
  const isPlaying = !elements.nativeAudio.paused && !elements.nativeAudio.ended;
  state.isPlaying = isPlaying;

  elements.audioTogglePlaySvg.style.display = isPlaying ? 'none' : 'block';
  elements.audioTogglePauseSvg.style.display = isPlaying ? 'block' : 'none';

  if (isPlaying) {
    elements.audioStateTag.textContent = 'SPEAKING // 発声中';
    elements.audioStateTag.classList.add('playing');
  } else {
    elements.audioStateTag.textContent = 'STANDBY // 待機中';
    elements.audioStateTag.classList.remove('playing');
  }
}

function updateTimeline() {
  const current = elements.nativeAudio.currentTime || 0;
  const duration = elements.nativeAudio.duration || 0;

  elements.currentTimeLabel.textContent = formatTime(current);
  if (duration > 0) {
    const percent = (current / duration) * 100;
    elements.timelineProgress.style.width = `${percent}%`;
    elements.totalDurationLabel.textContent = formatTime(duration);
  }
}

function seekAudio(e) {
  const rect = elements.timelineWrapper.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
  const duration = elements.nativeAudio.duration;

  if (duration) {
    elements.nativeAudio.currentTime = duration * ratio;
  }
}

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function updateVolumeIcon() {
  const isMuted = elements.nativeAudio.muted || elements.nativeAudio.volume === 0;
  elements.volumeHighSvg.style.display = isMuted ? 'none' : 'block';
  elements.volumeMuteSvg.style.display = isMuted ? 'block' : 'none';
}

function downloadCurrentTrack() {
  if (!state.activeTrackMeta) return;

  const a = document.createElement('a');
  a.href = state.activeTrackMeta.audioUrl;
  const sanitized = state.activeTrackMeta.voiceName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  a.download = `elevenlabs-anime-${sanitized}-${Date.now()}.mp3`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('Audio downloaded as MP3 // 保存完了', 'success');
}

/* ==========================================================================
   Real-Time Cyberpunk Waveform Visualizer (Web Audio API)
   ========================================================================== */
function initVisualizerCanvas() {
  const canvas = elements.visualizerCanvas;
  const ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio || 1);
    canvas.height = rect.height * (window.devicePixelRatio || 1);
  }
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  let phase = 0;

  function renderLoop() {
    state.animationFrameId = requestAnimationFrame(renderLoop);
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    if (state.analyser && state.isPlaying) {
      const bufferLength = state.analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      state.analyser.getByteFrequencyData(dataArray);

      const barCount = 42;
      const barWidth = (width / barCount) * 0.72;
      const barGap = (width / barCount) * 0.28;
      const step = Math.floor(bufferLength / barCount);

      for (let i = 0; i < barCount; i++) {
        const val = dataArray[i * step] / 255;
        const barHeight = Math.max(5, val * (height * 0.88));
        const x = i * (barWidth + barGap) + barGap / 2;
        const y = (height - barHeight) / 2;

        // Cyberpunk Anime Neon Gradient (Pink -> Purple -> Cyan)
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        gradient.addColorStop(0, '#ff2a85');
        gradient.addColorStop(0.5, '#9d4edd');
        gradient.addColorStop(1, '#00f5d4');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(x, y, barWidth, barHeight, 5);
        } else {
          ctx.rect(x, y, barWidth, barHeight);
        }
        ctx.fill();
      }

    } else {
      // Idle ambient neon wave
      phase += 0.04;
      ctx.beginPath();
      ctx.lineWidth = 2.5 * (window.devicePixelRatio || 1);
      ctx.strokeStyle = 'rgba(255, 42, 133, 0.35)';

      for (let x = 0; x < width; x += 4) {
        const y = height / 2 + Math.sin(x * 0.015 + phase) * 9 * Math.cos(x * 0.006);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Subtle cyan second wave
      ctx.beginPath();
      ctx.lineWidth = 1.5 * (window.devicePixelRatio || 1);
      ctx.strokeStyle = 'rgba(0, 245, 212, 0.25)';
      for (let x = 0; x < width; x += 4) {
        const y = height / 2 + Math.cos(x * 0.02 - phase) * 6;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }

  renderLoop();
}

function ensureAudioContext() {
  if (!state.audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      try {
        state.audioContext = new AudioCtx();
        state.analyser = state.audioContext.createAnalyser();
        state.analyser.fftSize = 256;
        state.analyser.smoothingTimeConstant = 0.8;

        if (!state.sourceNode) {
          state.sourceNode = state.audioContext.createMediaElementSource(elements.nativeAudio);
          state.sourceNode.connect(state.analyser);
          state.analyser.connect(state.audioContext.destination);
        }
      } catch (e) {
        console.warn('Could not initialize AudioContext for visualizer:', e);
      }
    }
  }

  if (state.audioContext && state.audioContext.state === 'suspended') {
    state.audioContext.resume().catch(() => {});
  }
}

/* ==========================================================================
   Floating Sakura & Cyber Sparkle Background Canvas
   ========================================================================== */
function initSakuraBackground() {
  const canvas = elements.sakuraCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const PETAL_COUNT = 38;

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = 7 + Math.random() * 9;
      this.speedX = -0.5 + Math.random() * 1.5;
      this.speedY = 0.8 + Math.random() * 1.6;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.03;
      this.opacity = 0.35 + Math.random() * 0.45;
      // Sakura pink or cyber cyan tint
      this.isCyan = Math.random() > 0.85;
    }

    update() {
      this.x += this.speedX + Math.sin(this.y * 0.01) * 0.5;
      this.y += this.speedY;
      this.rotation += this.rotationSpeed;

      if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, 0, 0, this.size);
      ctx.bezierCurveTo(-this.size, 0, -this.size / 2, -this.size / 2, 0, 0);

      if (this.isCyan) {
        ctx.fillStyle = '#00f5d4';
        ctx.shadowColor = '#00f5d4';
      } else {
        ctx.fillStyle = '#ff70a6';
        ctx.shadowColor = '#ff2a85';
      }
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < PETAL_COUNT; i++) {
    petals.push(new Petal());
  }

  function animateSakura() {
    ctx.clearRect(0, 0, width, height);
    for (const petal of petals) {
      petal.update();
      petal.draw();
    }
    requestAnimationFrame(animateSakura);
  }

  animateSakura();
}

/* ==========================================================================
   History Rendering
   ========================================================================== */
function renderHistory() {
  elements.historyCount.textContent = state.history.length;
  elements.clearHistoryBtn.style.display = state.history.length > 0 ? 'block' : 'none';

  if (state.history.length === 0) {
    elements.historyList.innerHTML = `<div class="history-empty">Generated anime narrations will appear here for instant replay &amp; download.</div>`;
    return;
  }

  elements.historyList.innerHTML = '';
  state.history.forEach((item, index) => {
    const el = document.createElement('div');
    el.className = 'history-item';
    el.innerHTML = `
      <div class="history-item-left">
        <button type="button" class="history-play-btn" title="Play Narration" data-index="${index}">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        </button>
        <div class="history-text">
          <div class="history-snippet" title="${item.fullText}">${item.title}</div>
          <div class="history-sub">${item.voiceName} • ${item.modelName} • ${item.timestamp}</div>
        </div>
      </div>
      <div class="history-actions">
        <button type="button" class="history-action-btn download-hist-btn" title="Download MP3" data-index="${index}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        </button>
        <button type="button" class="history-action-btn delete-hist-btn" title="Remove" data-index="${index}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
        </button>
      </div>
    `;

    // Replay item
    el.querySelector('.history-play-btn').addEventListener('click', () => {
      loadAudioTrack(item, true);
      showToast(`Playing "${item.title}"`, 'info');
    });

    // Download item
    el.querySelector('.download-hist-btn').addEventListener('click', () => {
      const a = document.createElement('a');
      a.href = item.audioUrl;
      a.download = `elevenlabs-anime-${item.id}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });

    // Delete item
    el.querySelector('.delete-hist-btn').addEventListener('click', () => {
      state.history.splice(index, 1);
      renderHistory();
    });

    elements.historyList.appendChild(el);
  });
}

/* ==========================================================================
   Toast Notification Utility
   ========================================================================== */
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = '🌸';
  if (type === 'success') icon = '✨';
  if (type === 'error') icon = '⚠️';

  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-message">${message}</span>
  `;

  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(30px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 4000);
}

// Start application
window.addEventListener('DOMContentLoaded', init);
