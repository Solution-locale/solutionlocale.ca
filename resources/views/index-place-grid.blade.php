<div class="col-md-12">
  <div class="row">
  @foreach($places as $place)
    <div class="col-md-4">
      <div class="card mb-3">
        {{--<img src="/images/solutionlocale-placeholder.png" class="card-img-top" alt="{{ $place->name }}">--}}
        <div class="card-body">
          <h5 class="card-title font-weight-bold">{{ $place->name }}</h5>
          <p class="card-text">
            <span class="text-nowrap">{{ $place->city }}</span><br />
            <span class="text-nowrap">({{ $place->region->name }})</span>
          </p>
          <a href="{{ route('places.show', ['place' => $place->slug]) }}" class="btn btn-primary">Voir</a>
        </div>
      </div>
    </div>
  @endforeach
  </div>
</div>