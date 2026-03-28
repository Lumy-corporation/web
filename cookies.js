// cookies.js - PROTOCOLE DE SIGNAL LUMY CORPORATION
document.addEventListener("DOMContentLoaded", function() {
    // 1. Structure HTML adaptée au Thème Aura (Clair/Saphir)
    const cookieHTML = `
    <style>
        .cookie-banner {
            position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
            width: 90%; max-width: 420px;
            background: rgba(255, 255, 255, 0.6); /* Transparence Aura */
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            border: 1px solid rgba(255, 255, 255, 0.8); 
            border-radius: 30px;
            padding: 30px; z-index: 10000; display: none;
            box-shadow: 0 20px 50px rgba(0,0,0,0.05);
            font-family: 'Inter', sans-serif;
            animation: slideUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        @keyframes slideUp {
            from { transform: translate(-50%, 50px); opacity: 0; }
            to { transform: translate(-50%, 0); opacity: 1; }
        }

        .cookie-content h4 { 
            font-family: 'Orbitron', sans-serif;
            color: #1d1d1f; 
            margin-bottom: 12px; 
            letter-spacing: 2px; 
            font-size: 0.85rem; 
            text-transform: uppercase; 
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .cookie-content h4 i { color: #00b4cc; }

        .cookie-content p { 
            font-size: 0.85rem; 
            color: #424245; 
            line-height: 1.6; 
            margin-bottom: 25px; 
        }

        .cookie-btns { display: flex; gap: 12px; }

        .cookie-btn { 
            flex: 1; padding: 14px; border-radius: 18px; border: none; 
            font-size: 0.7rem; cursor: pointer; text-transform: uppercase; 
            font-weight: 800; transition: all 0.3s; 
            font-family: 'Orbitron', sans-serif;
            letter-spacing: 1px;
        }

        /* Bouton Autoriser - Style Lumy Signature */
        .accept { 
            background: #1d1d1f; 
            color: #fff; 
        }

        .accept:hover { 
            background: #000;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        /* Bouton Refuser - Discret */
        .refuse { 
            background: rgba(0, 0, 0, 0.05); 
            color: #424245; 
            border: 1px solid rgba(0, 0, 0, 0.05); 
        }

        .refuse:hover { 
            background: rgba(0, 0, 0, 0.1); 
        }
    </style>

    <div id="cookieBanner" class="cookie-banner">
        <div class="cookie-content">
            <h4><i class="fas fa-wave-square"></i> Signal Lumy</h4>
            <p>Autoriser le système <b>Lumy Corporation</b> à analyser ton signal pour optimiser l'interface LumyOS ?</p>
            <div class="cookie-btns">
                <button id="btnAccept" class="cookie-btn accept">Autoriser</button>
                <button id="btnRefuse" class="cookie-btn refuse">Refuser</button>
            </div>
        </div>
    </div>
    `;

    // 2. Injection
    document.body.insertAdjacentHTML('beforeend', cookieHTML);

    const banner = document.getElementById('cookieBanner');
    const btnAccept = document.getElementById('btnAccept');
    const btnRefuse = document.getElementById('btnRefuse');
    const cookieStatus = localStorage.getItem('lumy_cookies');

    // 3. Logique
    if (!cookieStatus) {
        banner.style.display = 'block';
    } else if (cookieStatus === 'accepted') {
        activateAnalytics();
    }

    function activateAnalytics() {
        if (typeof gtag === 'function') {
            gtag('consent', 'update', { 'analytics_storage': 'granted' });
            console.log("[SYSTEM] : Signal Lumy synchronisé.");
        }
    }

    btnAccept.onclick = function() {
        localStorage.setItem('lumy_cookies', 'accepted');
        activateAnalytics();
        banner.style.display = 'none';
    };

    btnRefuse.onclick = function() {
        localStorage.setItem('lumy_cookies', 'refused');
        banner.style.display = 'none';
        console.log("[SYSTEM] : Signal Lumy restreint.");
    };
});

// Fonction pour réinitialiser le choix des cookies
function resetCookieProtocol() {
    // 1. Suppression de la donnée dans le stockage local
    localStorage.removeItem('lumy_cookies');
    
    // 2. Notification console style AuraOS
    console.log("[SYSTEM] : Protocole de Signal réinitialisé. Relancement du bandeau...");
    
    // 3. Optionnel : Faire réapparaître le bandeau immédiatement s'il est présent dans le DOM
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.style.display = 'block';
    } else {
        // Si la bannière n'est pas chargée, on recharge la page pour appliquer les changements
        window.location.reload();
    }
}

// 4. Liaison avec ton bouton "Reset"
// Assure-toi que ton bouton dans le HTML a l'id="resetCookiesBtn"
document.addEventListener("DOMContentLoaded", function() {
    const resetBtn = document.getElementById('resetCookiesBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function(e) {
            e.preventDefault();
            resetCookieProtocol();
        });
    }
});