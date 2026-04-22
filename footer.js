(function() {
    const injectLumyFooter = function() {
        if (document.getElementById('lumy-footer-permanent')) return;

        if (!document.body) {
            setTimeout(injectLumyFooter, 50);
            return;
        }

        const footerHTML = `
        <style>
            /* --- CONFIGURATION FOOTER LUMY --- */
            .lumy-footer {
                width: 100%; background: rgba(245, 245, 247, 0.7); padding: 80px 5% 40px;
                margin-top: 60px; position: relative; font-family: 'Inter', sans-serif;
                clear: both; box-sizing: border-box; backdrop-filter: blur(20px);
                border-top: 1px solid rgba(255, 255, 255, 0.8);
                transition: background 0.5s ease, color 0.5s ease;
            }

            [data-theme="dark"] .lumy-footer {
                background: rgba(10, 10, 12, 0.85);
                border-top: 1px solid rgba(255, 255, 255, 0.05);
            }

            .lumy-footer::before {
                content: ""; position: absolute; top: 0; left: 10%; right: 10%; height: 1px;
                background: linear-gradient(90deg, transparent, rgba(0, 242, 255, 0.3), rgba(180, 0, 255, 0.3), transparent);
            }
            .footer-container { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 25px; }
            
            .footer-bento-card { 
                background: white; padding: 30px; border-radius: 24px; 
                border: 1px solid rgba(0, 0, 0, 0.03); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
                transition: background 0.5s ease, border 0.5s ease;
            }

            [data-theme="dark"] .footer-bento-card {
                background: rgba(26, 26, 30, 0.6);
                border: 1px solid rgba(255, 255, 255, 0.05);
            }

            .footer-brand h3 { font-family: 'Orbitron', sans-serif; font-size: 1.1rem; letter-spacing: 4px; background: linear-gradient(90deg, #1d1d1f, #b400ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0 0 20px 0; font-weight: 900; }
            
            [data-theme="dark"] .footer-brand h3 {
                background: linear-gradient(90deg, #ffffff, #b400ff);
                -webkit-background-clip: text;
            }

            .footer-brand p { font-size: 0.8rem; color: #666; line-height: 1.6; margin-bottom: 20px; transition: color 0.3s; }
            [data-theme="dark"] .footer-brand p { color: #a1a1a6; }
            
            .contact-group { margin-top: 10px; padding: 12px; border-radius: 14px; background: #fcfcfd; border: 1px solid rgba(0,0,0,0.02); transition: background 0.3s; }
            [data-theme="dark"] .contact-group { background: rgba(255, 255, 255, 0.03); }

            .contact-label { font-size: 0.55rem; color: #b4b4bb; letter-spacing: 1px; margin-bottom: 4px; font-weight: 800; text-transform: uppercase; }
            .footer-contact-link { font-size: 0.75rem; color: #1d1d1f; text-decoration: none; font-weight: 700; transition: 0.3s; display: block; }
            [data-theme="dark"] .footer-contact-link { color: #f5f5f7; }
            .footer-contact-link:hover { color: #00f2ff; transform: translateX(3px); }
            
            .footer-nav h4 { font-family: 'Orbitron', sans-serif; font-size: 0.7rem; color: #b4b4bb; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px; }
            .footer-nav ul { list-style: none; padding: 0; margin: 0; }
            .footer-nav ul li { margin-bottom: 12px; }
            .footer-nav ul li a { color: #1d1d1f; text-decoration: none; font-size: 0.8rem; transition: 0.3s; font-weight: 500; }
            [data-theme="dark"] .footer-nav ul li a { color: #f5f5f7; }
            .footer-nav ul li a:hover { color: #b400ff; padding-left: 5px; }

            .footer-social-wrapper { grid-column: span 3; display: flex; justify-content: center; margin-top: 20px; }
            .footer-social-bar { display: flex; gap: 20px; padding: 15px 30px; background: white; border-radius: 100px; border: 1px solid rgba(0,0,0,0.03); box-shadow: 0 10px 30px rgba(0,0,0,0.04); flex-wrap: wrap; justify-content: center; transition: background 0.3s; }
            [data-theme="dark"] .footer-social-bar { background: #1a1a1e; border: 1px solid rgba(255,255,255,0.05); }

            .footer-social-bar a { color: #b4b4bb; font-size: 1.3rem; transition: 0.4s; text-decoration: none; }
            .footer-social-bar a:hover { color: #00f2ff; transform: scale(1.3) translateY(-3px); }
            
            .footer-bottom { grid-column: span 3; margin-top: 40px; text-align: center; }
            .footer-info { font-size: 0.7rem; color: #86868b; letter-spacing: 0.5px; line-height: 1.8; max-width: 800px; margin: 0 auto; }
            .footer-info strong { color: #1d1d1f; }
            [data-theme="dark"] .footer-info strong { color: #ffffff; }

            .footer-credits { margin-top: 20px; font-size: 0.6rem; color: #d2d2d7; font-family: monospace; text-transform: uppercase; }
            
            .btn-reset-cookies { 
                background: #1d1d1f; color: white; border: none; padding: 10px 18px; 
                font-size: 0.65rem; font-family: 'Orbitron', sans-serif; cursor: pointer; 
                border-radius: 100px; transition: 0.4s; font-weight: 900; margin-top: 10px;
            }
            [data-theme="dark"] .btn-reset-cookies { background: #f5f5f7; color: #1d1d1f; }
            .btn-reset-cookies:hover { background: #ff4b2b; color: white; box-shadow: 0 5px 15px rgba(255, 75, 43, 0.3); transform: scale(1.05); }

            @media (max-width: 850px) { .footer-container { grid-template-columns: 1fr; } .footer-bottom, .footer-social-wrapper { grid-column: span 1; } }
        </style>

        <footer class="lumy-footer" id="lumy-footer-permanent">
            <div class="footer-container">
                <div class="footer-bento-card footer-brand">
                    <h3>LUMY CORP.</h3>
                    <p>L'unité d'élite pour les passionnés de systèmes. Créons ensemble l'informatique souveraine sous LumyOS.</p>
                    
                    <div class="contact-group">
                        <p class="contact-label">Support Technique</p>
                        <a href="mailto:support@lumycorp.com" class="footer-contact-link">support@lumycorp.com</a>
                    </div>

                    <div class="contact-group" style="margin-top:8px;">
                        <p class="contact-label">Sécurité & Données</p>
                        <a href="mailto:security@lumycorp.com" class="footer-contact-link">security@lumycorp.com</a>
                    </div>

                    <div class="contact-group" style="margin-top:8px;">
                        <p class="contact-label">Nous contacter</p>
                        <a href="mailto:contact@lumycorp.com" class="footer-contact-link">contact@lumycorp.com</a>
                    </div>
                </div>

                <div class="footer-bento-card footer-nav">
                    <h4>Navigation</h4>
                    <ul>
                        <li><a href="index.html">Accueil</a></li>
                        <li><a href="missions.html">Missions</a></li>
                        <li><a href="avancement.html">État LumyOS</a></li>
                    </ul>
                </div>

                <div class="footer-bento-card footer-nav">
                    <h4>Protocole</h4>
                    <ul>
                        <li><a href="contact.html">Contact</a></li>
                        <li><a href="mention legal.html">Protocoles Légaux</a></li>
                        <li><button class="btn-reset-cookies" id="resetSignalBtn">RESET SIGNAL</button></li>
                    </ul>
                </div>

                <div class="footer-social-wrapper">
                    <div class="footer-social-bar">
                        <a href="https://discord.gg/rafnuWBaYk" target="_blank"><i class="fab fa-discord"></i></a>
                        <a href="https://www.facebook.com/profile.php?id=61577497438561"><i class="fab fa-facebook-f"></i></a>
                        <a href="https://www.reddit.com/r/lumy_corporation/"><i class="fab fa-reddit-alien"></i></a>
                        <a href="#"><i class="fab fa-tiktok"></i></a>
                        <a href="https://www.instagram.com/lumy_corporation/"><i class="fab fa-instagram"></i></a>
                        <a href="https://www.youtube.com/channel/UCVrshDBH5LeavlB78M9WJQg"><i class="fab fa-youtube"></i></a>
                        <a href="https://www.linkedin.com/company/lumy-corporation/"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>

                <div class="footer-bottom">
                    <p class="footer-info">
                        © 2026 <strong>LUMY CORPORATION</strong> — Association Loi 1901 à but non lucratif<br>
                        <strong>RNA :</strong> W633005785 — <strong>SIREN :</strong> 102 450 350 — <strong>SIRET :</strong> 102 450 350  00016<br>
                        <strong>APE :</strong> 9499Z<br>
                        Siège Social : Issoire (63500), France
                    </p>
                    <p class="footer-credits">
                    </p>
                </div>
            </div>
        </footer>
        `;
        document.body.insertAdjacentHTML('beforeend', footerHTML);

        const resetBtn = document.getElementById('resetSignalBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                localStorage.removeItem('lumy_cookies');
                window.location.reload();
            });
        }
    };

    if (document.readyState === "complete" || document.readyState === "interactive") {
        injectLumyFooter();
    } else {
        document.addEventListener("DOMContentLoaded", injectLumyFooter);
    }
})();
