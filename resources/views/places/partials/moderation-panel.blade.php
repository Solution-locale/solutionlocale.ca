<div class="card border-info mb-1">
  <div class="card-header">Options de modération</div>
  <div class="card-body text-info">
    @if($place->is_closed)<div class="alert alert-info">Cette fiche est en mode "fermé".</div>@endif
    <div class="btn-group" role="group" aria-label="Basic example">
      <a class="btn btn-outline-primary" href="{{ route("places.edit", $place->slug) }}" role="button" target="_blank">✏️</a>
      @if(!$place->is_approved)
      <a class="btn btn-outline-primary" href="{{ route('approvals.create', ['place' => $place->slug]) }}" role="button">✅</a>
      @endif
      @if($place->is_closed)
        <a class="btn btn-outline-info" href="{{ route('places.close', ['place' => $place->slug]) }}" role="button"><i class="fas fa-lock-open"></i></a>
      @else
        <a class="btn btn-outline-info" href="{{ route('places.close', ['place' => $place->slug]) }}" role="button"><i class="fas fa-lock"></i></a>
      @endif
      <a class="btn btn-outline-danger" href="{{ route('places.delete', ['place' => $place->slug]) }}" role="button">🗑</a>
    </div>
  </div>
</div>