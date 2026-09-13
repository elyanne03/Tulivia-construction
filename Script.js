// Affichage et comportement du bouton de retour en haut
const backToTop =
    document.getElementById("backToTop");
window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
        backToTop.style.display = "flex";
    } else {
        backToTop.style.display = "none";
    }
});
backToTop.addEventListener("click", function (event) {
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
// Barre de recherche des produits
const searchForm =
    document.querySelector(".search-bar");
const searchInput =
    document.getElementById("searchInput");
const searchResult =
    document.getElementById("searchResult");
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const recherche =
        searchInput.value
        .trim()
        .toLowerCase();
    if (recherche === "") {
        searchResult.textContent =
            "Veuillez entrer le nom d'un produit.";
        return;
    }
    // Produits disponibles
    const produits = [
        "ciment",
        "fer",
        "acier",
        "peinture",
        "brique",
        "sable",
        "gravier"
    ];
    const produitTrouve =
        produits.find(function (produit) {
            return produit.includes(recherche);
        });
    if (produitTrouve) {
        searchResult.textContent =
            "Produit trouvé : " +
            produitTrouve;
    } else {
        searchResult.textContent =
            "Aucun produit trouvé pour : " +
            recherche;
    }
});

// Soumission du formulaire de contact
const contactForm =
    document.getElementById("contactForm");
const formMessage =
    document.getElementById("formMessage");
contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const nom =
        document.getElementById("name").value;
    formMessage.textContent =
        "Merci " +
        nom +
        " ! Votre message a été envoyé avec succès.";
    contactForm.reset();
});

// Ouverture, fermeture et soumission du formulaire de devis
const quoteModal =
    document.getElementById("quoteModal");
const quoteForm =
    document.getElementById("quoteForm");
const quoteMessage =
    document.getElementById("quoteMessage");
document.querySelectorAll(".quote-trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
        quoteModal.classList.add("is-open");
        quoteModal.setAttribute("aria-hidden", "false");
        document.getElementById("quoteName").focus();
    });
});
function closeQuoteModal() {
    quoteModal.classList.remove("is-open");
    quoteModal.setAttribute("aria-hidden", "true");
}
document.getElementById("quoteClose").addEventListener("click", closeQuoteModal);
quoteModal.addEventListener("click", function (event) {
    if (event.target === quoteModal) {
        closeQuoteModal();
    }
});
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && quoteModal.classList.contains("is-open")) {
        closeQuoteModal();
    }
});
quoteForm.addEventListener("submit", function (event) {
    event.preventDefault();
    quoteMessage.textContent = "Merci ! Votre demande de devis a bien été envoyée.";
    quoteForm.reset();
});

// Mémorisation des préférences de langue et de devise
const languageSelect =
    document.getElementById("languageSelect");
const currencySelect =
    document.getElementById("currencySelect");
const localeTrigger =
    document.getElementById("localeTrigger");
const localeControls =
    document.getElementById("localeControls");
const savedLanguage =
    localStorage.getItem("tuliviaLanguage");
const savedCurrency =
    localStorage.getItem("tuliviaCurrency");
if (savedLanguage) {
    languageSelect.value = savedLanguage;
    document.documentElement.lang = savedLanguage;
}
if (savedCurrency) {
    currencySelect.value = savedCurrency;
}
languageSelect.addEventListener("change", function () {
    localStorage.setItem("tuliviaLanguage", languageSelect.value);
    updateLocaleLabel();
    document.documentElement.lang = languageSelect.value;
});
currencySelect.addEventListener("change", function () {
    localStorage.setItem("tuliviaCurrency", currencySelect.value);
    updateLocaleLabel();
});
function updateLocaleLabel() {
    const langue = languageSelect.value === "en" ? "English" : "Français";
    localeTrigger.textContent = langue + " - " + currencySelect.value.toUpperCase();
}
updateLocaleLabel();
localeTrigger.addEventListener("click", function () {
    const isOpen = !localeControls.hidden;
    localeControls.hidden = isOpen;
    localeTrigger.setAttribute("aria-expanded", String(!isOpen));
});
document.addEventListener("click", function (event) {
    if (!event.target.closest(".locale-picker")) {
        localeControls.hidden = true;
        localeTrigger.setAttribute("aria-expanded", "false");
    }
});
// Animation des compteurs statistiques au défilement
const statistiques =
    document.querySelectorAll("[data-target]");
let animationStarted = false;
window.addEventListener("scroll", function () {
    const section =
        document.querySelector(".tarifs");
    const position =
        section.getBoundingClientRect().top;
    if (
        position <
        window.innerHeight - 100
        &&
        !animationStarted
    ) {
        animationStarted = true;
        statistiques.forEach(function (stat) {
            const cible =
                Number(
                    stat.getAttribute(
                        "data-target"
                    )
                );
            let nombre = 0;
            const increment =
                Math.max(
                    1,
                    Math.ceil(
                        cible / 50
                    )
                );
            const compteur =
                setInterval(function () {
                    nombre += increment;
                    if (nombre >= cible) {
                        nombre = cible;
                        clearInterval(compteur);
                    }
                    stat.textContent =
                        nombre + "+";
                }, 30);
        });
    }
});

// Sélection rapide d'un produit depuis sa carte
const productButtons =
    document.querySelectorAll(
        ".product-button"
    );
productButtons.forEach(function (button) {
    button.addEventListener(
        "click",
        function () {
            const nomProduit =
                button
                .parentElement
                .querySelector("h3")
                .textContent;
            alert(
                "Vous avez sélectionné : " +
                nomProduit
            );
        }
    );
});
// Transition d'apparition de la page au chargement
window.addEventListener("load", function () {
    document.body.style.opacity = "0";
    setTimeout(function () {
        document.body.style.transition =
            "opacity 0.5s ease";
        document.body.style.opacity = "1";
    }, 100);
});