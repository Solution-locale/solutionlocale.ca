@extends('layouts.public')

@section('page-title')
Équipe et partenaires
@endsection

@section('social-image', '/images/equipe/social.png')

@section('content')
<main role="main">
  <div class="album py-5 bg-light">
    <div class="container">
        <h1 class="text-center mb-5">Équipe et partenaires</h1>

        <h2 class="text-center mb-3">Citoyennes et citoyens à l'origine de l’initiative</h2>

        <div class="row text-center">
            <div class="col-xl-3 col-sm-6 mb-5">
                <div class="bg-white rounded shadow-sm py-5 px-4"><img src="/images/equipe/bio-aaCloutier.jpg" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm">
                    <h5 class="mb-0">Andrée-Ann Cloutier</h5>
                    <span class="small text-muted">Conceptrice graphique</span><br>
                    <span class="small text-uppercase text-muted">Sainte-Thècle</span>
                </div>
            </div>

            <div class="col-xl-3 col-sm-6 mb-5">
                <div class="bg-white rounded shadow-sm py-5 px-4"><img src="/images/equipe/bio-sDesmeules.jpg" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm">
                    <h5 class="mb-0">Stéphanie Desmeules</h5>
                    <span class="small text-muted">Architecte paysagiste, attachée politique et recherchiste en environnement</span><br>
                    <span class="small text-uppercase text-muted">Saint-Denis-de-Brompton</span>
                </div>
            </div>

            <div class="col-xl-3 col-sm-6 mb-5">
                <div class="bg-white rounded shadow-sm py-5 px-4"><img src="/images/equipe/bio-sDufresne.jpg" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm">
                    <h5 class="mb-0">Stéphanie Dufresne</h5>
                    <span class="small text-muted">Elle a généré l’étincelle de départ ♥️</span><br>
                    <span class="small text-uppercase text-muted">Saint-Étienne-des-Grès</span>
                </div>
            </div>

            <div class="col-xl-3 col-sm-6 mb-5">
                <div class="bg-white rounded shadow-sm py-5 px-4"><img src="/images/equipe/bio-fPoisson.jpg" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm">
                    <h5 class="mb-0">François Poisson</h5>
                    <span class="small text-muted">Comédien, militant environnemental</span><br>
                    <span class="small text-uppercase text-muted">Bécancour</span>
                </div>
            </div>
        </div>

        <div class="row text-center">
            <div class="col-xl-3 col-sm-6 mb-5 offset-md-1">
                <div class="bg-white rounded shadow-sm py-5 px-4"><img src="/images/equipe/bio-jpmurray.jpg" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm">
                    <h5 class="mb-0">Jean-Philipppe Murray</h5>
                    <span class="small text-muted">Animateur de vie spirituelle et d'engagement communautaire</span><br>
                    <span class="small text-uppercase text-muted">Sainte-Geneviève-de-Batiscan</span>
                </div>
            </div>

            <div class="col-xl-3 col-sm-6 mb-5">
                <div class="bg-white rounded shadow-sm py-5 px-4"><img src="/images/equipe/bio-gRajotteSauriol.jpeg" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm">
                    <h5 class="mb-0">Geneviève Rajotte Sauriol</h5>
                    <span class="small text-muted">Consultante en communication</span><br>
                    <span class="small text-uppercase text-muted">Saint-Élie-de-Caxton</span>
                </div>
            </div>

            <div class="col-xl-3 col-sm-6 mb-5">
                <div class="bg-white rounded shadow-sm py-5 px-4"><img src="/images/equipe/bio-iTremblay.jpg" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm">
                    <h5 class="mb-0">Isadora Tremblay</h5>
                    <span class="small text-muted">Conseillère en développement durable</span><br>
                    <span class="small text-uppercase text-muted">Saint-Stanislas</span>
                </div>
            </div>
        </div>

        <h2 class="text-center mb-3 mt-5">Modérateurs bénévoles</h2>

        <h3 class="text-center mb-3">À venir</h3>

        <h2 class="text-center mb-3 mt-5">Partenaires</h2>

        <h3 class="text-center mb-3">À venir</h3>
    </div>
  </div>
</main>
@endsection