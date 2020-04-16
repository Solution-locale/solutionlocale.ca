<div class="card border-danger mb-3">
  <div class="card-header">Fiche rejetée</div>
  <div class="card-body">
    <p>Cette fiche à été rejetée le {{ $place->rejection->created_at->tz('America/Montreal')->toDatetimeString() }}, par {{ $place->rejection->user->name }}, avec cette raison: « {{ $place->rejection->reason }} ». Elle est offerte en consultation pour les modérateurs seulement.</p>
    <p>Pour la réactiver, visitez la liste des fiches rejetés de l'administration.</p>
  </div>
</div>