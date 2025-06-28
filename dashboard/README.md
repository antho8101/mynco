# Mynco Dashboard

Dashboard pour l'offre Team de Mynco, déployé sur `dashboard.mynco.app`.

## Structure

```
dashboard/
├── assets/
│   ├── css/
│   │   ├── dashboard.css
│   │   ├── team.css
│   │   └── globals.css
│   ├── js/
│   │   ├── dashboard.js
│   │   ├── team.js
│   │   └── firestore-config.js
│   └── images/
│       └── logo.svg
├── index.html
├── team.html
├── vercel.json
└── README.md
```

## Déploiement

Ce projet est configuré pour être déployé sur Vercel comme projet séparé.

1. Connecter le dossier `dashboard/` à un nouveau projet Vercel
2. Configurer le domaine personnalisé `dashboard.mynco.app`
3. Le build se fait automatiquement depuis ce dossier

## Fonctionnalités

- **Dashboard principal** : Vue d'ensemble des projets et statistiques
- **Gestion d'équipe** : Invitation, gestion des rôles, permissions
- **Authentification Firebase** : Connexion sécurisée
- **Interface responsive** : Compatible mobile et desktop

## Développement local

Pour tester en local, ouvrir `index.html` dans un navigateur. Le mode développement mocke un utilisateur pour éviter les problèmes d'authentification. 