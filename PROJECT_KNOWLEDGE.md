# MYNCO - Documentation Complète du Projet

## 📋 Vue d'ensemble du projet

**Mynco** est une plateforme SaaS de création de portails clients pour freelancers, développée par Anthony Carayon (CEO d'AC Global Group, basé à Dubaï).

### Vision et Mission
- **Problème résolu :** Les freelancers ont besoin d'outils intuitifs, abordables et complets pour gérer leurs projets clients
- **Solution :** Plateforme tout-en-un pour créer des portails clients professionnels
- **Positionnement :** Alternative simple et accessible aux solutions complexes/chères du marché

### Workflow

Le freelance qui utilise mynco crée un nouveau projet, celà génère un lien personnalisé qu'il envoie à son client. Cela constitue un espace commun pour qu'ils puissent communiquer tout les deux à travers un chat. Dans ce chat, possibilité au freelance d'envoyer un devis généré automatiquement (successessions de modales avec des questions simple à la création du projet : deadline, prix, intitulé du produit + détails). Le client le reçois dans le chat et peut soit accepter, demander une révision ou le reffuser. Le Freelance peut créer une todolist qui envoie une notification dans le chat pour le client quand une case est cochée, pour lui montrer l'avancement du projet. Il ne vois pas les étapes a venir, juste une barre de progression. Pendant le travail, le client et le freelance peuvent continuer à communiquer ensemble. Une fois le boulot derminé, le freelance drag and drop les fichiers dans le chat, ce qui génère une preview avec Watermark pour le client, qui peut consulter et valider (ou demander une ou plusieurs révisions, si le freelance l'a permis dans la configuration du devis) avant de télécharger. Cela l'envoie d'abord vers une page de paiement où il pourra s'aquiter du paiement avant de pouvoir télécharger. Une fois le téléchargement fait, le freelance reçois la notification et le projet est en "done!". Le freelance peut donc l'archiver, ce qui à pour effet de désactiver le lien. Les fichiers sont concervés dans l'archive pendant un mois quand on à le plan pro ou team et sont supprimés en plan "starter" gratuit. Le plan starter prend une commission de 2% sur les ventes (utilisation de Stripe connect) on ne prend pas de commission sur le plan Pro et Team. Le plan Starter crée un espace Freelance/Client brandé Mynco (couleurs, logo) le plan Pro offre des personnalisation de couleurs (espace autre que le vert mynco) avec possibilité de mettre son logo. Le plan team offre un branding complet avec suppression totale du branding et des mentions mynco si souhaité (peut être proposer d'utiliser un sous domaine pour générer des liens client en "machin.nomdedomainedufreelance.com/client ? a voir si c'est possible)

---

## 🏗️ Architecture Technique

### Structure des Déploiements
- **Landing page :** `mynco.app` (déployé depuis la racine `/`)
- **Dashboard :** `dashboard.mynco.app` (déployé depuis `/dashboard/`)
- **Hébergement :** Vercel avec déploiements automatiques depuis GitHub

### Technologies Utilisées
- **Frontend :** HTML5, CSS3, JavaScript ES6+ (modules)
- **Backend :** Firebase (Auth, Firestore, Analytics)
- **Styling :** CSS custom avec variables CSS, responsive design
- **Icons :** SVG intégrés, pas d'icon fonts
- **Fonts :** Inter (Google Fonts)

### Structure des Fichiers
```
mynco/
├── assets/                    # Assets globaux
│   ├── css/                  # Styles par page
│   ├── js/                   # Scripts globaux
│   └── images/               # Assets images
├── dashboard/                # Application dashboard (sous-domaine)
│   ├── assets/              # Assets spécifiques dashboard
│   │   ├── components/      # Composants JS réutilisables
│   │   ├── css/            # Styles dashboard
│   │   └── js/             # Scripts dashboard
│   ├── *.html              # Pages dashboard
│   └── vercel.json         # Config Vercel dashboard
├── auth/                     # Pages d'authentification
├── components/               # Composants HTML globaux
├── *.html                   # Pages principales
└── vercel.json              # Config Vercel racine
```

---

## 🎨 Système de Design

### Palette de Couleurs
```css
:root {
    --mint-primary: #00D084;     /* Vert mint principal */
    --mint-dark: #00B86F;        /* Vert mint foncé */
    --mint-light: #E6F9F2;       /* Vert mint clair */
    --text-dark: #1A202C;        /* Texte principal */
    --text-gray: #718096;        /* Texte secondaire */
    --bg-light: #F7FAFC;         /* Arrière-plan clair */
    --white: #FFFFFF;            /* Blanc */
}
```

### Logo et Identité
- **Logo principal :** Toucan stylisé + texte "mynco"
- **Tailles :** 50x50px (header), 60x60px (sidebar), 50x50px (footer)
- **Alignement :** Horizontal (toucan à gauche, texte à droite)
- **Couleur :** Vert mint (`--mint-primary`)

### Typographie
- **Font :** Inter (300, 400, 500, 600, 700)
- **Optimisations :** `font-smoothing: antialiased`, `text-rendering: optimizeLegibility`

---

## 🚀 Fonctionnalités Implémentées

### Landing Page (mynco.app)
- **Header responsive** avec navigation et CTA
- **Hero section** avec proposition de valeur
- **Section Features** avec grille de fonctionnalités
- **Section How it works** (étapes)
- **Section Pricing** avec plans tarifaires
- **Footer complet** avec liens et réseaux sociaux
- **Cookie banner** avec gestion des préférences

### Dashboard (dashboard.mynco.app)
- **Sidebar responsive** avec mode collapsed (icônes uniquement)
- **Logo toucan** qui s'adapte (complet/réduit à "m")
- **Menu utilisateur** avec dropdown (profil, billing, déconnexion)
- **Système de notifications** avec dropdown et badge
- **Indicateurs visuels** pour messages clients en attente
- **Navigation adaptative** avec tooltips en mode collapsed
- **Grilles de stats** et **cartes projets** avec indicateurs
- **Page team** complète avec gestion des membres

### Authentification
- **Pages signin/signup** avec Firebase Auth
- **Redirection automatique** post-authentification
- **Gestion des erreurs** et **fallbacks**
- **Déconnexion directe** (sans modal) vers landing page

### Pages Utilitaires
- **About :** Histoire d'Anthony et AC Global Group
- **Status :** Page de statut des services en temps réel
- **Changelog :** Historique des mises à jour avec filtres
- **Contact, Privacy, Terms, etc.**

---

## 🧩 Composants et Architecture

### Composants Réutilisables
1. **Sidebar (`sidebar.js`)**
   - Mode collapsed/expanded
   - Tooltips en mode réduit
   - Menu utilisateur avec positioning adaptatif
   - Indicateurs de notifications

2. **Topbar (`topbar.js`)**
   - Recherche globale
   - Système de notifications complet
   - Bouton d'action principal configurable
   - Responsive mobile

3. **Layout (`layout.js`)**
   - Gestion responsive sidebar/topbar
   - Variables CSS dynamiques (`--sidebar-width-calculated`)
   - Overlay mobile

4. **Footer (`footer.js`)**
   - Consistent sur toutes les pages
   - Liens et réseaux sociaux

### Système de Variables CSS
```css
:root {
    --sidebar-width-calculated: 240px; /* 70px en mode collapsed */
}
```
- **Usage :** Synchronisation layout sidebar/topbar/content
- **Gestion JS :** Mise à jour via `document.documentElement.style.setProperty()`

---

## 💼 Logique Métier Importante

### Système de Plans (Pricing)
1. **Starter Plan ($0/mois)**
   - 1 portail client
   - Fonctionnalités de base

2. **Pro Plan ($19/mois)**
   - Portails illimités
   - Team collaboration

3. **Team (Contact)**
   - Solutions sur mesure
   - **LOGIQUE IMPORTANTE :** Le plan reste "Pro" tant que le premier collaborateur n'a pas accepté l'invitation à rejoindre l'équipe

### Gestion d'Équipe
- **Invitations en attente :** Statut spécial avec animation
- **Rôles :** Owner, Admin, Member
- **Statuts :** En ligne/absent avec indicateurs visuels
- **Permissions :** Système granulaire (à développer)

### Notifications et Indicateurs
- **Types de notifications :**
  - Projets complétés
  - Messages clients
  - Mises à jour système
- **Indicateurs visuels :**
  - Badge rouge clignotant sur onglet "Projects"
  - Pastilles sur cartes projets
  - Bordures colorées pour urgence

---

## 🎯 Système de Notifications Avancé

### Notifications Dashboard
- **Dropdown animé** avec slideDown
- **Badge dynamique** avec compteur
- **Types :** Succès, messages, système
- **Actions :** Marquer comme lu, voir tout
- **Position fixe :** 10px du bord droit

### Indicateurs Messages Clients
- **Pastille rouge** avec icône chat
- **Animation bounce** pour attirer l'attention
- **Positionnement :** -6px du bas pour éviter les tags de statut
- **Gradient background** subtil rouge sur cartes projets

---

## 🔧 Problèmes Techniques Résolus

### Espacement Sidebar/Topbar
- **Problème :** Gap de 240px entre sidebar et topbar
- **Cause :** Double margin (parent + enfant)
- **Solution :** Variables CSS unifiées + suppression margins redondants

### Ombres Coupées
- **Problème :** Box-shadows des cartes tronquées
- **Cause :** `overflow-x: hidden` sur body et grilles
- **Solution :** `overflow: visible !important` + padding compensatoire

### CSS Manquants
- **Problème :** Fichiers CSS corrompus/manquants pour pages utilitaires
- **Solution :** Récupération depuis GitHub avec `git show HEAD:path`

### Sidebar Responsive
- **Problème :** Sidebar disparaît complètement sur mobile
- **Solution :** Mode "collapsed" (icônes) au lieu de masquage total

---

## 🔥 Configuration Firebase

### Fichiers de Configuration
- **Dashboard :** `dashboard/assets/js/firestore-config.js`
- **Landing :** `assets/js/firestore-config.js` (si nécessaire)

### Services Utilisés
- **Authentication :** Connexion/déconnexion utilisateurs
- **Analytics :** Tracking usage
- **Firestore :** Base de données (préparé pour futur)

### Fonction Globale
```javascript
window.signOutUser = async function() {
    await signOut(auth);
    window.location.href = '/'; // Redirection landing
}
```

---

## 📱 Responsive Design

### Breakpoints
- **Desktop :** > 1024px
- **Tablet :** 768px - 1024px  
- **Mobile :** < 768px

### Adaptations Sidebar
- **Desktop :** Mode collapsed avec icônes + tooltips
- **Mobile :** Overlay avec backdrop
- **Transitions :** 0.3s ease pour toutes les animations

### Adaptations Layout
- **Grid responsives :** `repeat(auto-fit, minmax(300px, 1fr))`
- **Espacement adaptatif :** Padding/margins réduits sur mobile
- **Touch-friendly :** Boutons minimum 44px sur mobile

---

## 🎨 Optimisations de Rendu

### Polices Plus Nettes
```css
body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-feature-settings: "liga" 1, "kern" 1;
}
```

### Images et SVG
```css
img, svg {
    image-rendering: -webkit-optimize-contrast;
    image-rendering: optimize-contrast;
    image-rendering: crisp-edges;
}
```

### Scrollbars Customisées
- **Couleur :** Vert mint
- **Largeur :** 8px
- **Hover :** Plus foncé

---

## 🚦 Système de Statut Projets

### États Possibles
- **Active :** Projet en cours (vert)
- **Pending :** En attente réponse client (orange)
- **Completed :** Terminé (vert foncé)

### Indicateurs Spéciaux
- **has-pending-message :** Classe pour projets avec messages clients
- **Bordure rouge gauche :** Messages urgents
- **Animation pulse :** Pastille notification

---

## 📊 Structure de Données (Inférée)

### Utilisateur
```javascript
{
    id: "user_id",
    name: "Anthony Carayon",
    email: "anthony@mynco.app",
    avatar: "A", // Initiale ou URL
    plan: "pro",
    company: "AC Global Group"
}
```

### Projet
```javascript
{
    id: "project_id",
    name: "Bakery Website Redesign",
    client: "Martin's Bakery",
    status: "active|pending|completed",
    price: 2500,
    progress: 75, // %
    hasPendingMessage: true,
    lastActivity: "Files sent 2 days ago"
}
```

### Notification
```javascript
{
    id: "notif_id",
    type: "success|message|system",
    title: "Project completed!",
    message: "Mobile App Mockups...",
    time: "2 minutes ago",
    read: false
}
```

---

## 🔮 Fonctionnalités Prévues (Non Implémentées)

### Court Terme
- **Système de projets complet :** CRUD projets
- **Chat client intégré :** Remplacement des indicateurs
- **Upload de fichiers :** Système de partage
- **Facturation automatique :** Intégration Stripe

### Moyen Terme  
- **Templates de projets :** Réutilisation configurations
- **API publique :** Intégrations tierces
- **Webhooks :** Notifications externes
- **White-label :** Personnalisation client

### Long Terme
- **Mobile app :** iOS/Android
- **Intégrations :** Slack, Notion, etc.
- **AI Features :** Suggestions automatiques
- **Multi-langue :** i18n complet

---

## 🐛 Bugs Connus et Limitations

### Limitations Actuelles
- **Données factices :** Tout est en dur (pas de vraie DB)
- **Authentification :** Firebase configuré mais pas utilisé
- **Mobile :** Sidebar overlay non implémentée
- **Performance :** Pas d'optimisations avancées

### Bugs Mineurs
- **404 favicon :** Icône manquante
- **Console warnings :** Quelques erreurs JS mineures
- **Cache navigateur :** Parfois nécessaire de vider

---

## 🎯 Prochaines Priorités Recommandées

### P0 (Critique)
1. **Implémentation authentification réelle**
2. **Base de données projets/utilisateurs**
3. **Système de paiement Stripe**

### P1 (Important)
1. **CRUD projets complet**
2. **Upload/partage fichiers**
3. **Notifications push réelles**

### P2 (Améliorations)
1. **Templates projets**
2. **Reporting avancé**
3. **Intégrations tierces**

---

## 📝 Notes Importantes pour Développeurs

### Conventions de Code
- **Nommage :** camelCase JavaScript, kebab-case CSS/HTML
- **Structure :** Composants réutilisables, séparation claire
- **Comments :** Français OK, mais code en anglais

### Variables CSS Importantes
```css
--sidebar-width-calculated  /* Largeur sidebar dynamique */
--mint-primary             /* Couleur principale */
--text-dark                /* Texte principal */
```

### Événements Personnalisés
```javascript
window.dispatchEvent(new CustomEvent('sidebarToggle', { 
    detail: { isCollapsed: this.isCollapsed } 
}));
```

### Fonctions Globales Importantes
```javascript
window.signOutUser()       /* Déconnexion Firebase */
window.firebaseAuth        /* Instance Firebase Auth */
window.Sidebar             /* Classe Sidebar */
window.Topbar              /* Classe Topbar */
```

---

## 🏢 Contexte Business - AC Global Group

### Entreprises du Groupe
1. **Mynco :** SaaS portails clients freelancers
2. **RefSpring :** SaaS gestion affiliation/partenariats
3. **Kyora International :** Plateforme immobilier (dev/archi/invest)
4. **White Sole Capital :** Véhicule financier investissements
5. **Business Acquisition :** Acquisition/valorisation entreprises

### Localisation
- **Siège :** Dubaï, Émirats Arabes Unis
- **Focus géographique :** Asie, Moyen-Orient
- **CEO :** Anthony Carayon

### Vision
- **Mission :** Solutions SaaS pour problèmes réels entrepreneurs
- **Valeurs :** Simplicité, impact positif, résolution de problèmes
- **Approche :** "Built by entrepreneurs, for entrepreneurs"

---

## 📞 Contact et Support

### Emails Configurés
- **hello@mynco.app :** Contact général
- **anthony@mynco.app :** CEO direct
- **status@mynco.app :** Statut services
- **changelog@mynco.app :** Mises à jour produit

### Réseaux Sociaux
- **LinkedIn :** /company/mynco
- **Twitter/X :** @myncoapp  
- **GitHub :** antho8101/mynco

---

## 🔄 Historique des Modifications Récentes

### Session Actuelle (Décembre 2024)
1. **Logo header corrigé :** Toucan 50x50px aligné gauche
2. **Espacement about.css :** Section headers avec gaps corrects
3. **Déconnexion simplifiée :** Suppression modal, redirection directe
4. **CSS restaurés :** Tous les fichiers CSS récupérés depuis GitHub
5. **Sidebar responsive :** Mode collapsed au lieu de disparition
6. **Système notifications :** Complet avec dropdown et indicateurs
7. **Optimisations rendu :** Polices nettes, scrollbars custom
8. **Corrections multiples :** Espacement, ombres, alignements

### Patterns de Commits
- **"fix:"** Corrections bugs
- **"feat:"** Nouvelles fonctionnalités  
- **"improvement:"** Améliorations UX/UI
- **"bug fixes:"** Corrections multiples

---

## 🎯 Points d'Attention Développeurs

### Performance
- **Éviter :** ResizeObserver loops infinies
- **Préférer :** Variables CSS vs JavaScript
- **Optimiser :** Animations CSS vs JS

### Responsive
- **Mobile-first :** Partir du mobile vers desktop
- **Sidebar :** Overlay mobile, collapsed desktop
- **Touch :** Minimum 44px pour boutons

### Maintenance
- **CSS :** Éviter !important sauf cas exceptionnel
- **JS :** Préférer addEventListener vs onclick
- **Git :** Commits atomiques avec messages descriptifs

---

## 🔚 Conclusion

Mynco est un projet ambitieux avec une vision claire et une exécution soignée. L'architecture est solide, le design cohérent, et les bases techniques permettent une évolution sereine vers un produit SaaS complet.

Les prochaines étapes critiques sont l'implémentation de la vraie authentification, de la base de données, et du système de paiement pour transformer ce prototype impressionnant en produit commercial viable.

**Bonne continuation à l'équipe ! 🚀**

---

*Document créé le 28 juin 2025 - Version 1.0*
*Auteur : Assistant Claude (session de développement avec Anthony)*
*Statut : Complet et à jour* 