# Pierre Landry (Pas de Angular en entreprise)

## Comment lancer l'application (VF) ? 
Dans un premier temps il vous faut lancer la commande suivante :
'npm install'

Puis vous n'avez plus qu'à lancer votre serveur local à l'aide de la commande :
'ng serve'

## Description de la structure et des choix de librairies tierces, d'organisation du code
## L'API PandaScore

Cette API permet de récupérer (presque) en temps réel des informations sur des matches, des leagues ou des rencontres e-sportives sur plusieurs jeux comme CSGO, LOL, Dota... Dans notre cas nous utilisons cette API pour récupérer des matches sur CSGO.

## La structure

 - Au cœur même de notre application, on peut retrouver toutes les variables d'environnement permettant la bonne connexion entre notre application Angular et FireBase. Si vous vous rendez dans le fichier 'environment.ts' vous y retrouverez toutes ses variables.
 - Dans notre 'App.module.ts' vous y retrouvez tous les imports des modules dont nous avons besoin pour le bon fonctionnement de notre architecture. On peut y voir plusieurs imports de modules internes et externes à Angular.
 - 'App-routing.module.ts' permet de faire nos routes pour appeler ou nous rendre sur nos différentes pages ou composants. 
 - On retrouve des composants classiques d'Angular pour bien décomposer l'application et permettre une éventuelle réutilisation de ses composants à plusieurs endroits donc sur d'autres pages. Ils sont faits d'un fichier TypeScript qui définit le comportement et la logique du composant, et d'un fichier HTML qui définit la structure et la présentation du composant.
 - On utilise également un dossier nommé 'services' dans le quel on va créer des services (exemple : 'pandascore.service.ts'). L'utilité est de pouvoir appeler rapidement et facilement, via une simple déclaration dans le 'constructor', plusieurs fonctionnalités très utiles. Dans notre cas on a créé des services pour la connexion avec l'API "PandaScore" ou encore la connexion et l'enregistrement d'une personne sur notre application.
 - Pour joindre tout ceci, nous avons créer un fichier 'interfaces.ts' se trouvant dans le dossier 'models', qui sert à définir la structure et le type des objets utilisés dans le code, afin d'améliorer la lisibilité, la maintenabilité et la détection d'erreurs lors du développement de l'application.

## Choix de librairies tierces, d'organisation du code

- Pour faciliter le développement l'utilisation de 'Material Angular' (https://material.angular.io/) a été d'une grande aide.
Material Angular est une bibliothèque d'interface utilisateur (UI) pour Angular qui implémente les principes du Material Design de Google. Elle fournit des composants préfabriqués, des styles et des fonctionnalités pour créer des applications web esthétiquement attrayantes, cohérentes et réactives, facilitant ainsi le développement d'interfaces utilisateur modernes et conviviales.
- L'utilisation de 'Ngx-pagination' a été importante pour pouvoir effectuer la pagination des différents tableaux. 'Ngx-pagination' est une bibliothèque tierce populaire pour Angular qui fournit des fonctionnalités de pagination pour afficher et gérer des ensembles de données volumineux dans une interface utilisateur. Elle permet de diviser les données en pages, d'afficher une navigation de pagination et de gérer les événements de pagination, offrant ainsi une expérience utilisateur plus fluide lors de la navigation à travers les résultats de données.
- Et "Firestore" a permis de faire la connexion avec notre "fake" base de données. C'est un module spécifique qui permet l'intégration de Firestore, la base de données de Firebase, dans une application Angular. Il fournit des fonctionnalités pour effectuer des opérations CRUD (Create, Read, Update, Delete) sur la base de données Firestore, ainsi que des fonctionnalités avancées telles que les requêtes, la gestion en temps réel des données et l'authentification utilisateur.

## Les fonctionnalités de votre application

L'application offre la possibilité de se connecter, mais également de créer un nouveau compte. Il vous faudra respecter certaines mesures dans les formulaires mis à disposition (comme par exemple, le mot de passe doit être composé d'un certains de caractères...).
Une fois la connexion réalisée, vous serez redirigés vers notre dashboard. Sur ce dashboard vous allez y trouver deux listes comportant des matches professionnels sur le jeu CSGO. La liste de gauche vous permet de voir les matches en cours (qui sont entrains de se dérouler). Et sur la liste de droite, vous y trouverez les matches futurs.
Vous pouvez cliquer sur un match dans les listes pour obtenir plus d'informations sur celui-ci.
La barre de navigation en haut est composée de deux redirections. La première redirection 'CSGO Superstars' vous permet de vous rendre sur la liste de matches décrit ci-dessus. Et la seconde redirection "CSGO Team Build" permet de vous amener vers une nouvelle page de création de recherche d'équipe pour jouer.
"CSGO Team Build" va vous permettre de créer votre propre recherche à partir de plusieurs informations à remplir. Mais également à voir au sein d'une liste toutes les recherches qui ont été créées par vous ou d'autres utilisateurs. La modification et la suppression sont possibles.
L'application offre également la possibilité de vous déconnecter si vous le souhaitez, en cliquant sur votre profil en haut à droite dans la barre de navigation.

# AngularFirebaseApi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
