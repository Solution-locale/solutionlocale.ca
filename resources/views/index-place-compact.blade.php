<div class="col-md-8 offset-md-2 container table-responsive">
<table class="table">
  <thead>
    <tr>
      <th scope="col" style="width: 41.6%">Entreprise</th>
      <th scope="col" style="width: 41.6%">Ville (Région)</th>
      <th scope="col" style="width: 16.8%">Action</th>
    </tr>
  </thead>
  <tbody>
    @foreach($places as $place)
    <tr>
      <th scope="row">
        <a href="{{ route('places.show', ['place' => $place->slug]) }}" class="font-weight-bold d-sm-block d-md-none">{{ $place->name }}</a>
        <span class="font-weight-bold d-none d-md-block">{{ $place->name }}</span>
      </th>
      <td>
        <span class="text-nowrap">{{ $place->city }}</span>
        <span class="text-nowrap">({{ $place->region->name }})</span>
      </td>
      <td>
        <a class="btn btn-sm btn-outline-secondary" href="{{ route('places.show', ['place' => $place->slug]) }}">Voir</a>
        @can('do-moderation')
          <a class="btn btn-sm btn-outline-primary" href="{{ route('places.edit', ['place' => $place->slug]) }}">✏️</a>
          <a class="btn btn-sm btn-outline-danger" href="{{ route('moderation.delete', ['place' => $place->slug]) }}">🗑</a>
        @endcan
      </td>
    </tr>
    @endforeach
  </tbody>
</table>
</div>