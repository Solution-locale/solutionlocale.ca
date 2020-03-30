<header>
      <div class="collapse bg-soloc" id="navbarHeader">
        <div class="container">
          <div class="row">
            <div class="col-sm-8 col-md-7 py-4">
              <h4 class="text-white">À propos</h4>
              <p class="text-white">Dans le contexte de distanciation sociale imposée par la COVID-19, le répertoire de <em>Solution locale</em> met en relation nos commerces locaux avec la population actuellement en isolement. En achetant local, nous nous assurerons de sauvegarder le plus de nos commerces locaux possibles durant et après la crise, en plus de nous approvisionner en nourriture et produits essentiels en toute sécurité ! Une initiative citoyenne!</p>
              <p class="text-white">Ce répertoire est une initiative citoyenne rendue possible grâce à la mobilisation de la population et des organismes et acteurs socio-économiques de chacune des régions participantes.</p>
              <p class="text-white"><em>Solution locale</em> n'est pas responsable des méthodes d’échange utilisées par les commerces et mise sur la confiance et la solidarité des entrepreneurs et entrepreneuses à l'égard de la santé de leurs clients et clientes.</p>
            </div>
            <div class="col-sm-4 offset-md-1 py-4">
              <h4 class="text-white">Médias sociaux</h4>
              <ul class="list-unstyled">
                <li><a href="https://www.facebook.com/Solutionlocale/" class="text-white" target="_blank">Facebook</a></li>
                <li><a href="https://github.com/Solution-locale/solutionlocale.ca" class="text-white" target="_blank">Github</a></li>
              </ul>
              @auth
              <h4 class="text-white">Meta</h4>
              <ul class="list-unstyled">
                @can("access-backend")
                <li><a href="/home" class="text-white">Administration</a></li>
                @endcan
              </ul>
              @endauth
            </div>
          </div>
        </div>
      </div>
      <div class="navbar navbar-dark bg-soloc shadow-sm">
        <div class="container d-flex justify-content-between">
          <a href="/" class="navbar-brand d-flex align-items-center">
            <img src="/images/solution-locale-logo.png" alt="Solution locale" class="soloc-logo" />
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </header>