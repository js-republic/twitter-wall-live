# twitter-wall-live
Ce projet sert à afficher un écran de tweet mis à jour en live pendant des événements (conférence, etc)

# Installation

Tout d'abord, il faut veiller à avoir un environement NodeJS fonctionnel. Pour cela vous pouvez utiliser [NVM](https://github.com/creationix/nvm) et installer de préférence une des dernières versions.

Puis installer le package manager `yarn` en global. Pour cela, taper :
`npm i yarn -g`

Les pré-requis étant terminés. Vous pouvez désormais cloner le répository et vous y rendre grâce au terminal. Une fois dedans, taper les commandes :
- `yarn install` afin de télécharger l'ensemble des dépendances du projet
- `yarn start` afin de démarrer le projet

Si la variable d'environement `NODE_ENV` est égal à `development`, la commande `yarn start` démarra le projet en mode de développement, avec watch des fichiers, tests unitaires et redémarrage du serveur node à chaque modification.
Si la variable d'environement `NODE_ENV` est égal à `production`, la commande `yarn start` démarre le projet comme si il était en production.

Note: Pour l'instant le back-end NodeJS retourne des tweets mockés pour éviter d'exploser nos quotas d'API twitter. Il faudra ne pas oublier de remettre twitter quand on déploira en prod.
  
La version de production de l'application est déployée sur Amazon Elastic BeanStalk à cette url :
http://twitter-wall.eu-central-1.elasticbeanstalk.com/

Le déploiment s'éffectue pour l'heure à la main par Mathieu.

## Documentation

Il est possible de générer une documentation de la partie front à l'aide de l'outils compodoc. Pour ce faire, taper la commande :
- `yarn compodoc`

Dans le terminal. Un dossier *documentation* va alors se créer à la racine du projet. A l'intérieur, vous retrouverez un *index.html* que vous pouvez ouvrir avec un navigateur et commencer l'exploration du projet Front.

## Reste à faire

Non trié par ordre de priorité.

- [ ] Terminer le carousel de tweet
- [ ] Re-design tweet card
- [ ] Gérer les images dans les tweets
- [ ] Gérer les liens dans les tweets
- [ ] Gérer les vidéos dans les tweets
- [ ] Mettre en valeur les retweets de tweet
- [ ] Ameliorer la connexion à l'API tweeter pour éviter de créer une connexion par ouverture de navigateur
- [ ] Développer l'interface d'administration

