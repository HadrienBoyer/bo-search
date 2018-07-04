# bo-search

> Test technique Bird Office

> Auteur : Hadrien Boyer <hello@hadrien.co>

> Librairies/Technologies utilisées : SASS, VueJS, Bootstrap-Vue et Vue-Resource.

## Installation de la Build

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Structure du projet

```
.
├── dist/                     # fichiers packagés
├── src/
│   ├── main.js               # fichier d'entrée de l'application
│   ├── BoSearch.vue          # composant principal de l’application
│   └── assets/               # assets du projet (traité par webpack)
├── index.html                # template index.html
├── README.md                 # fichier README
├── webpack.config.js         # fichier de configuration de webpack
└── package.json              # infos sur le package et ses dépendances
```

# DOCUMENTATION:

## Installer et tester le projet
Chargez le fichier « index.html » et le dossier « /dist/ » et ses fichiers sur votre serveur et lancez « index.html ».

Vous pouvez aussi utiliser ce code et modifier la valeur de l’attribut href en fonction de la localisation de vos fichiers :

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>bo-search</title>
    <link rel="stylesheet" href="./dist/main.css">
  </head>
  <body>
    <div id="app"></div>
    <script src="./dist/build.js"></script>
  </body>
</html>
```

> NB : vous pouvez changer votre API ID en modifiant la propriété « api_ID » de BoSearch.vue.

## Fonctionnement
Tapez vos mots clés dans la barre de recherche et cliquez sur « Rechercher », ou appuyez sur la touche « Entrée » de votre clavier.

