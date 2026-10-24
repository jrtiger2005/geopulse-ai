// GeoPulse AI - Voice Assistant Engine (Speech-to-Text & Text-to-Speech)

const voiceState = {
    isListening: false,
    isSpeaking: false,
    autoSpeak: localStorage.getItem('geopulse_autospeak') === 'true',
    recognition: null,
    speechSupported: false,
    voiceSupported: false,
    selectedVoice: null,
    activeTargetInput: null
};

document.addEventListener('DOMContentLoaded', () => {
    initVoiceEngine();
});

function initVoiceEngine() {
    // 1. Check Speech Recognition (STT)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        voiceState.recognition = new SpeechRecognition();
        voiceState.recognition.continuous = false;
        voiceState.recognition.interimResults = true;
        voiceState.recognition.lang = 'en-US';
        voiceState.speechSupported = true;

        voiceState.recognition.onstart = () => {
            voiceState.isListening = true;
            updateMicUI(true);
        };

        voiceState.recognition.onresult = (event) => {
            let interim = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interim += event.results[i][0].transcript;
                }
            }

            if (voiceState.activeTargetInput) {
                const el = document.getElementById(voiceState.activeTargetInput);
                if (el) {
                    el.value = finalTranscript || interim;
                }
            }
        };

        voiceState.recognition.onerror = (event) => {
            console.warn('Voice Assistant STT Error:', event.error);
            voiceState.isListening = false;
            updateMicUI(false);
        };

        voiceState.recognition.onend = () => {
            voiceState.isListening = false;
            updateMicUI(false);

            // If input has text, trigger search or send
            if (voiceState.activeTargetInput) {
                const el = document.getElementById(voiceState.activeTargetInput);
                if (el && el.value.trim().length > 2) {
                    const source = voiceState.activeTargetInput.includes('tab') ? 'tab' : 'dock';
                    // Auto-send after 400ms pause if user stopped speaking
                    setTimeout(() => {
                        if (typeof sendChatMessage === 'function') {
                            sendChatMessage(el.value, source);
                        }
                    }, 400);
                }
            }
        };
    } else {
        console.info('SpeechRecognition is not supported in this browser.');
    }

    // 2. Check Speech Synthesis (TTS)
    if ('speechSynthesis' in window) {
        voiceState.voiceSupported = true;
        window.speechSynthesis.onvoiceschanged = () => {
            const voices = window.speechSynthesis.getVoices();
            // Prefer natural, fluent English voice
            voiceState.selectedVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Siri') || v.name.includes('Samantha') || v.name.includes('David'))) || voices.find(v => v.lang.startsWith('en')) || voices[0];
        };
    }

    updateAutoSpeakBadge();
}

function toggleVoiceInput(inputId) {
    if (!voiceState.speechSupported) {
        alert('Voice input (Speech Recognition) is not supported by your current browser. Please use Google Chrome or Microsoft Edge.');
        return;
    }

    if (voiceState.isListening) {
        voiceState.recognition.stop();
        voiceState.isListening = false;
        updateMicUI(false);
    } else {
        // Stop any active TTS reading when user speaks
        stopSpeaking();

        voiceState.activeTargetInput = inputId;
        try {
            voiceState.recognition.start();
        } catch (e) {
            console.error('Failed to start speech recognition:', e);
        }
    }
}

function updateMicUI(listening) {
    const micButtons = document.querySelectorAll('.btn-voice-mic');
    micButtons.forEach(btn => {
        if (listening) {
            btn.classList.add('bg-red-500', 'text-white', 'animate-pulse', 'shadow-lg', 'shadow-red-500/50');
            btn.classList.remove('bg-slate-100', 'text-slate-600', 'hover:bg-slate-200');
            btn.innerHTML = `
                <span class="flex items-center gap-1 font-mono text-[11px] font-bold">
                    <span class="w-2 h-2 rounded-full bg-white animate-ping"></span>
                    <span>LISTENING...</span>
                </span>
            `;
        } else {
            btn.classList.remove('bg-red-500', 'text-white', 'animate-pulse', 'shadow-lg', 'shadow-red-500/50');
            btn.classList.add('bg-slate-100', 'text-slate-600', 'hover:bg-slate-200');
            btn.innerHTML = `??`;
        }
    });
}

function speakBriefing(rawText, messageIndex = null) {
    if (!voiceState.voiceSupported) return;

    // If already speaking the same message, toggle pause/stop
    if (voiceState.isSpeaking) {
        window.speechSynthesis.cancel();
        voiceState.isSpeaking = false;
        updateSpeakerUI(null, false);
        return;
    }

    window.speechSynthesis.cancel();

    // Clean text for natural speech (remove markdown tags, citations, symbols)
    let clean = rawText
        .replace(/###\s+/g, '')
        .replace(/####\s+/g, '')
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\[Source:[^\]]+\]/g, '')
        .replace(/[???????????????]/g, '')
        .replace(/&bull;/g, ', ')
        .replace(/\n+/g, ' ');

    // Truncate to first 500 words for optimal voice readout
    const words = clean.split(' ');
    if (words.length > 300) {
        clean = words.slice(0, 300).join(' ') + '... End of tactical summary.';
    }

    const utterance = new SpeechSynthesisUtterance(clean);
    if (voiceState.selectedVoice) {
        utterance.voice = voiceState.selectedVoice;
    }
    utterance.rate = 1.05; // Natural crisp pace
    utterance.pitch = 1.0;

    utterance.onstart = () => {
        voiceState.isSpeaking = true;
        updateSpeakerUI(messageIndex, true);
    };

    utterance.onend = () => {
        voiceState.isSpeaking = false;
        updateSpeakerUI(messageIndex, false);
    };

    utterance.onerror = () => {
        voiceState.isSpeaking = false;
        updateSpeakerUI(messageIndex, false);
    };

    window.speechSynthesis.speak(utterance);
}

function stopSpeaking() {
    if (voiceState.voiceSupported && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        voiceState.isSpeaking = false;
        updateSpeakerUI(null, false);
    }
}

function updateSpeakerUI(messageIndex, active) {
    // Update global soundwave header
    const soundwave = document.getElementById('global-soundwave');
    if (soundwave) {
        if (active) {
            soundwave.classList.remove('hidden');
        } else {
            soundwave.classList.add('hidden');
        }
    }

    // Update individual message speaker button
    if (messageIndex !== null) {
        const btn = document.getElementById(`btn-speak-${messageIndex}`);
        if (btn) {
            if (active) {
                btn.classList.add('bg-sky-500', 'text-white', 'border-sky-600');
                btn.classList.remove('bg-slate-100', 'text-slate-600');
                btn.innerHTML = `
                    <div class="flex items-center gap-1.5">
                        <span class="w-1.5 h-3 bg-white animate-pulse"></span>
                        <span class="w-1.5 h-4 bg-white animate-pulse delay-75"></span>
                        <span class="w-1.5 h-2.5 bg-white animate-pulse delay-150"></span>
                        <span>STOP AUDIO</span>
                    </div>
                `;
            } else {
                btn.classList.remove('bg-sky-500', 'text-white', 'border-sky-600');
                btn.classList.add('bg-slate-100', 'text-slate-600');
                btn.innerHTML = `?? Listen Briefing`;
            }
        }
    }
}

function toggleAutoSpeak() {
    voiceState.autoSpeak = !voiceState.autoSpeak;
    localStorage.setItem('geopulse_autospeak', voiceState.autoSpeak);
    updateAutoSpeakBadge();
}

function updateAutoSpeakBadge() {
    const btn = document.getElementById('btn-auto-speak-toggle');
    if (btn) {
        if (voiceState.autoSpeak) {
            btn.className = 'text-[10px] font-mono px-2.5 py-1 rounded-lg bg-sky-600 text-white font-bold transition flex items-center gap-1 shadow-sm';
            btn.innerHTML = `<span>?? Voice Briefings: ON</span>`;
        } else {
            btn.className = 'text-[10px] font-mono px-2.5 py-1 rounded-lg bg-slate-200 text-slate-600 hover:bg-slate-300 font-semibold transition flex items-center gap-1';
            btn.innerHTML = `<span>?? Voice Briefings: OFF</span>`;
        }
    }
}
