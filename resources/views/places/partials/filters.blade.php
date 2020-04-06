<form class="form-inline">
    <label class="sr-only" for="name">Name</label>
    <input type="text" class="form-control mb-2 mr-sm-2" id="name" name="name" placeholder="Nom"
        value="{{ app('request')->input('name') }}">

    <label class="sr-only" for="region_id">Région</label>
    <select class="custom-select mb-2 mr-sm-2" name="region_id" id="region_id">
        <option>Région</option>
        @foreach($regions as $idRegion => $nameRegion)
            <option value="{{ $idRegion }}" @if(app('request')->input('region_id') == $idRegion) selected @endif>{{ $nameRegion }}</option>
        @endforeach
    </select>

    <div class="form-check mb-2 mr-sm-2">
        <input type="hidden" name="is_approved" value="0" />
        <input class="form-check-input" type="checkbox" id="is_approved" name="is_approved" value="1"
            {{ app('request')->input('is_approved') ? 'checked':'' }}/>
        <label class="form-check-label" for="is_approved">
            Approuvé
        </label>
    </div>

    <div class="form-check mb-2 mr-sm-2">
        <input type="hidden" name="is_closed" value="0" />
        <input class="form-check-input" type="checkbox" id="is_closed" name="is_closed" value="1"
            {{ app('request')->input('is_closed') ? 'checked':'' }}/>
        <label class="form-check-label" for="is_closed">
            Fermé
        </label>
    </div>

    <button type="submit" class="btn btn-primary mb-2">Filtrer</button>
</form>
