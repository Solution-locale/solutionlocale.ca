<div class="col-md-8 offset-md-2">
  <div class="card mb-4 shadow-sm">
    {{-- <img src="/images/solutionlocale-placeholder.png" class="bd-placeholder-img card-img-top" alt="Solution locale"> --}}
    <div class="card-body">
      <h4 class="card-title text-center">{{ $place->name }}</h4>
      <h5 class="text-center mb-3"><i class="fas fa-map-marker-alt"></i> {{ $place->city }} ({{ $place->region->name }})</h5>

      @if($place->delivery->isNotEmpty())
      <p class="card-text">
        <i class="fas fa-shopping-cart"></i> {{ $place->delivery->implode('name', ', ') }}
      </p>
      @endif

      @if($place->categories->isNotEmpty())
      <p class="card-text">
        <i class="fas fa-tags"></i> {{ $place->categories->implode('name', ', ') }}
      </p>
      @endif

      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <a class="btn btn-sm btn-outline-secondary" href="{{ route('places.show', ['place' => $place->slug]) }}">Plus de détails</a>
          @can('do-moderation')
          <a class="btn btn-sm btn-outline-primary" href="{{ route('places.edit', ['place' => $place->slug]) }}">✏️</a>
          <a class="btn btn-sm btn-outline-danger" href="{{ route('moderation.delete', ['place' => $place->slug]) }}">🗑</a>
          @endcan
        </div>
      </div>
    </div>
  </div>
</div>