// ---------- SAFE ELEMENT SELECT ----------
const aiMascot = document.getElementById('ai-mascot');
const eyesContainer = document.querySelector('.eyes-container');
const eyes = document.querySelectorAll('.eye');

const chatbotContainer = document.getElementById('chatbot-container');
const closeChat = document.getElementById('close-chat');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');


// ---------- MASCOT EYE TRACK ----------
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let currentEyeX = 0;
let currentEyeY = 0;

let targetEyeX = 0;
let targetEyeY = 0;

let idleTimer;
let isIdle = false;

let idleTargetX = 0;
let idleTargetY = 0;


function resetIdleTimer() {
    isIdle = false;
    clearTimeout(idleTimer);

    idleTimer = setTimeout(() => {
        isIdle = true;
        idleLook();
    }, 3000);
}

function idleLook() {
    if (!isIdle) return;

    idleTargetX = (Math.random() - 0.5) * 8;
    idleTargetY = (Math.random() - 0.5) * 8;

    setTimeout(idleLook, 1500);
}


if (aiMascot) {
    resetIdleTimer();

    window.addEventListener("mousemove", e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        resetIdleTimer();
    });

    function animateEyes() {
        const rect = aiMascot.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        if (!isIdle) {
            const angle = Math.atan2(mouseY - cy, mouseX - cx);
             const rawDist = Math.hypot(mouseX - cx, mouseY - cy);
            const dist = Math.min(10, Math.pow(rawDist / 120, 0.7) * 10);

            targetEyeX = Math.cos(angle) * dist;
            targetEyeY = Math.sin(angle) * dist;
        } else {
            targetEyeX = idleTargetX;
            targetEyeY = idleTargetY;
        }

        const smoothness = 0.08;

        currentEyeX += (targetEyeX - currentEyeX) * smoothness;
        currentEyeY += (targetEyeY - currentEyeY) * smoothness;

        if (eyesContainer) {
            eyesContainer.style.transform =`translate(${currentEyeX}px, ${currentEyeY}px)`;
        }

        requestAnimationFrame(animateEyes);
    }

    animateEyes();


    function blink() {
        eyes.forEach(e => e.classList.add("blinking"));

        setTimeout(() => {
            eyes.forEach(e => e.classList.remove("blinking"));
        }, 150);

        setTimeout(blink, Math.random() * 4000 + 2000);
    }

    blink();
}


// ---------- MASCOT CLICK → CHAT ----------
if (aiMascot && chatbotContainer && chatInput) {
    aiMascot.addEventListener("click", () => {
        chatbotContainer.classList.add("active");
        chatInput.focus();
    });
}

if (closeChat && chatbotContainer) {
    closeChat.addEventListener("click", () => {
        chatbotContainer.classList.remove("active");
    });
}


// ---------- GEMINI SMART MEMORY CHAT ----------

const GEMINI_API_KEY = "AIzaSyDuSGnr1nym8TfTo9UmUR6GQfbgewNpNwo";

let conversationHistory = [
    {
        role: "user",
        parts: [{ text: "You are an AI assistant for Mukillesh portfolio. Answer professionally and briefly." }]
    }
];

if (chatForm && chatMessages && chatInput) {

    chatForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const text = chatInput.value.trim();
        if (!text) return;

        // show user message
        const userMsg = document.createElement("div");
        userMsg.className = "message user-message";
        userMsg.textContent = text;
        chatMessages.appendChild(userMsg);

        chatInput.value = "";

        // thinking message
        const botMsg = document.createElement("div");
        botMsg.className = "message bot-message";
        botMsg.textContent = "Thinking...";
        chatMessages.appendChild(botMsg);

        chatMessages.scrollTop = chatMessages.scrollHeight;

        // store memory
        conversationHistory.push({
            role: "user",
            parts: [{ text }]
        });

        try {

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent`,
                {
                    method: "POST",
                   headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": GEMINI_API_KEY
                    },
                   body: JSON.stringify({
    contents: [
        {
            role: "user",
            parts: [
                {
                    text:
                        "You are Mukillesh portfolio AI assistant. Answer professionally. Conversation: " +
                        conversationHistory.map(m => m.parts[0].text).join("\n")
                }
            ]
        }
    ]
})
                }
            );

            const data = await response.json();
            console.log(data);

            const reply =
                data.candidates?.[0]?.content?.parts?.[0]?.text ||
                "AI is thinking... try again.";

            botMsg.textContent = reply;

            // store AI reply memory
            conversationHistory.push({
                role: "model",
                parts: [{ text: reply }]
            });

        } catch (err) {
            botMsg.textContent = "Error connecting to AI.";
        }

    });

}