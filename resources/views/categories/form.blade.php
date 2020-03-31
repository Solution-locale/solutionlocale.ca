<div class="form-group row">
    <label for="name" class="col-md-3 col-form-label text-md-right">
        Nom
    </label>

    <div class="col-md-9">
        <input
            id="name"
            type="text"
            class="form-control @error('name') is-invalid @enderror"
            name="name"
            value="{{ old('name', $category->name) }}"
            autocomplete="name"
            required
            autofocus>

        @error('name')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
        @enderror

    </div>
</div>

<div class="form-group">
    <label for="categories">Catégorie parent</label>
    <select class="form-control" name="parent_id">
        @foreach($categories as $category)
            <option value="{{$category->id}}" @if ($category->is_parent_category(old('parent_id',$category->parent_id)) === true) selected @endif>{{ $category->name }}</option>
        @endforeach
    </select>
</div>

<div class="form-group row">
    <span class="col-md-5"></span>
    <button type="submit" class="btn btn-primary">
        {{ $btn_text  }}
    </button>
</div>
