@extends('layouts.public')

@section('page-title')
La fée des dents - Solution locale
@endsection

@section('content')
<main role="main">
  <div class="album py-5 bg-light">
      <div class="col-md-10 offset-md-1">
        <div class="card">
          <div class="card-header">
            <h1>La fée des dents</h1>
            <h3>Partout au Québec</h3>
          </div>
          <div class="card-body">
            <h3>
              <span class="badge badge-primary">Livraison discrète</span>
            </h3>

            <h4>
              <span class="badge badge-secondary">Santé et hygiène</span> <span class="badge badge-secondary">Soins fantastiques</span>
            </h4>

            <h6>
              L'entreprise est un commerce de proximité au sein d'une municipalité
            </h6>

            <p class="card-text mt-5">
              <b>Zone de service: </b> Tout le Québec
            </p>

            <p class="card-text">
              <b>Page Facebook: </b> <a href="https://facebook.com/solutionlocale" target="_blank">https://facebook.com/solutionlocale</a>
            </p>
          </div>

          <div class="card-footer">
            Si vous trouvez une erreur, ou désirez effectuer une modification, <a href="https://www.facebook.com/Solutionlocale/" target="_blank">contactez-nous par Facebook</a>!
          </div>
        </div>
      </div>
  </div>
</main>
@endsection
