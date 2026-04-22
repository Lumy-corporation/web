(function() {
    // --- 1. INJECTION DE LA FAVICON (INDISPENSABLE POUR LES 15 PAGES) ---
    const injectFavicon = function() {
        // Supprime l'ancienne icône si elle existe pour éviter les conflits
        const existingFavicon = document.querySelector("link[rel*='icon']");
        if (existingFavicon) existingFavicon.remove();

        const link = document.createElement('link');
        link.type = 'image/png';
        link.rel = 'shortcut icon';
        link.href = 'logo.png'; // Chemin relatif pour GitHub Pages
        document.head.appendChild(link);
        
        // Version Apple
        const appleLink = document.createElement('link');
        appleLink.rel = 'apple-touch-icon';
        appleLink.href = 'logo.png';
        document.head.appendChild(appleLink);
    };

    // --- 2. INJECTION DE LA NAVBAR ---
    const injectLumyNavbar = function() {
        if (document.getElementById('lumy-navbar-permanent')) return;

        const navbarHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Orbitron:wght@900&display=swap');

            .navbar {
                position: fixed; top: 0; left: 0; right: 0; height: 90px;
                background: transparent; display: flex; 
                justify-content: space-between; align-items: center;
                padding: 0 5%; z-index: 10000; font-family: 'Inter', sans-serif;
                transition: all 0.5s ease;
            }

            .navbar.scrolled {
                height: 70px; 
                background: var(--bento-bg, rgba(255,255,255,0.8)); 
                backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
                border-bottom: 1px solid var(--bento-border, rgba(0,0,0,0.1));
            }

            .nav-logo {
                font-family: 'Orbitron', sans-serif; font-weight: 900; font-size: 1.4rem;
                background: linear-gradient(90deg, #00f2ff, #b400ff);
                -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                text-decoration: none; letter-spacing: 3px;
            }

            .nav-links { display: flex; gap: 5px; align-items: center; }
            .nav-item { position: relative; padding: 10px 0; }
            
            .nav-link-main {
                color: var(--text-main, #1d1d1f) !important;
                text-decoration: none; font-size: 0.65rem;
                font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;
                padding: 12px 18px; border-radius: 12px; transition: 0.3s;
                cursor: pointer; display: flex; align-items: center; gap: 5px;
            }

            .nav-link-main:hover {
                background: rgba(180, 0, 255, 0.1);
                backdrop-filter: blur(10px);
            }

            .dropdown-menu {
                position: absolute; top: 100%; left: 50%; 
                transform: translateX(-50%) translateY(10px);
                background: var(--bento-bg, white);
                backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
                border: 1px solid var(--bento-border, rgba(0,0,0,0.1));
                border-radius: 20px; min-width: 200px; padding: 10px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                opacity: 0; visibility: hidden;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .nav-item:hover .dropdown-menu {
                opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0px);
            }

            .dropdown-menu a {
                color: var(--text-main, #1d1d1f) !important;
                text-decoration: none; font-size: 0.6rem;
                font-weight: 700; text-transform: uppercase; display: block;
                padding: 12px 15px; border-radius: 10px; transition: 0.2s;
            }

            .dropdown-menu a:hover {
                background: rgba(0, 242, 255, 0.1);
                color: #00b4cc !important;
                padding-left: 20px;
            }

            .nav-item i { transition: transform 0.3s; font-size: 0.5rem; color: var(--text-main, #1d1d1f); }
            .nav-item:hover i { transform: rotate(180deg); }

            .btn-apply {
                background: linear-gradient(90deg, #00f2ff, #b400ff);
                color: white !important; border-radius: 100px !important;
                padding: 12px 25px !important; margin-left: 10px;
                box-shadow: 0 4px 15px rgba(180, 0, 255, 0.3);
            }
        </style>

        <nav class="navbar" id="lumy-navbar-permanent">
            <a href="index.html" class="nav-logo">LUMY CORP</a>
            
            <div class="nav-links">
                <a href="index.html" class="nav-link-main">Accueil</a>
                
                <div class="nav-item">
                    <div class="nav-link-main">Services <i class="fas fa-chevron-down"></i></div>
                    <div class="dropdown-menu">
                        <a href="missions.html">Missions</a>
                        <a href="avancement.html">Avancement</a>
                        <a href="actu.html">Actu</a>
                    </div>
                </div>

                <a href="qui sommes nous.html" class="nav-link-main">Qui sommes-nous</a>

                <div class="nav-item">
                    <div class="nav-link-main">Contact <i class="fas fa-chevron-down"></i></div>
                    <div class="dropdown-menu">
                        <a href="contact.html">Nous contacter</a>
                        <a href="communaute.html">Communauté</a>
                        <a href="don.html">Faire un don</a>
                    </div>
                </div>

                <a href="postuler.html" class="nav-link-main btn-apply">Postuler</a>
            </div>
        </nav>
        `;

        document.body.insertAdjacentHTML('afterbegin', navbarHTML);

        window.addEventListener('scroll', () => {
            const nav = document.getElementById('lumy-navbar-permanent');
            if (window.scrollY > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        });
    };

    // --- 3. EXÉCUTION ---
    injectFavicon(); // On injecte l'image direct
    
    if (document.body) {
        injectLumyNavbar();
    } else {
        document.addEventListener("DOMContentLoaded", injectLumyNavbar);
    }
})();
