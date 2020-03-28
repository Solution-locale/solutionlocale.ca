# solutionlocale.ca

Dans le contexte de distanciation sociale imposée par la COVID-19, le répertoire de Solution locale met en relation nos commerces locaux avec la population actuellement en isolement. En achetant local, nous nous assurerons de sauvegarder le plus de nos commerces locaux possibles durant et après la crise, en plus de nous approvisionner en nourriture et produits essentiels en toute sécurité ! Une initiative citoyenne!

Ce répertoire est une initiative citoyenne rendue possible grâce à la mobilisation de la population et des organismes et acteurs socio-économiques de chacune des régions participantes.

Solution locale n'est pas responsable des méthodes d’échange utilisées par les commerces et mise sur la confiance et la solidarité des entrepreneurs et entrepreneuses à l'égard de la santé de leurs clients et clientes.

## Contributions
See [CONTRIBUTING.md](CONTRIBUTING.md).

The whole projet, code-wise, will be kept and organized in english in an effort to make it open to more and more developer if needed. Speak french if you'd like, we'll just keep commits and changelog in english for now at least!

## Changelog
See [CHANGELOG.md](CHANGELOG.md).

## Communication language
The web site is, at least for now, focused for a french speaking population and as such, we think we'll get more francophone collaborators. But since it's not a requirement, we decided to make any issues, commits and comments in english to facilitate future collaboration with any one from the community.

## Running the project in developper mode

Run `git submodule add https://github.com/Laradock/laradock.git`

Copy laradock-env-example into laradock/.env

To run project locally in docker on your local machine, run the following commands in the project's folder

```bash
cd laradock
docker-compose up -d nginx mysql phpmyadmin
docker-compose exec workspace bash
composer install
npm install
```

Then, create the solutionlocale database and run the migrations and seeds.

Then, the project runs at localhost on your machine. A PHPMyAdmin instance is available on port 8888.
