<div class="col-md-12 container table-responsive">
<table class="table">
  <thead>
    <tr>
      <th scope="col" style="width: 41.6%" class="col-place-name">Entreprise</th>
      <th scope="col" style="width: 41.6%" class="col-place-location">Adresse</th>
      <th scope="col" style="width: 16.8%" class="col-place-action">Action</th>
    </tr>
  </thead>
  <tbody>
    @foreach($places as $place)
    <tr>
      <th scope="row" class="col-place-name">
        <a href="{{ route('places.show', ['place' => $place->slug]) }}" class="text-dark">{{ $place->name }}</a>
      </th>
      <td class="col-place-location">
        <span class="text-nowrap">{{ $place->complete_address }}</span>
      </td>
      <td class="col-place-action">
        <a class="btn btn-sm btn-outline-secondary" href="{{ route('places.show', ['place' => $place->slug]) }}">👀</a>
        @can('do-moderation')
          <a class="btn btn-sm btn-outline-primary" href="{{ route('places.edit', ['place' => $place->slug]) }}">✏️</a>
          <a class="btn btn-sm btn-outline-danger" href="{{ route('places.delete', ['place' => $place->slug]) }}">🗑</a>
        @endcan
      </td>
    </tr>
    @endforeach
  </tbody>
</table>
</div>