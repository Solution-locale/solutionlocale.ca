@extends('layouts.public')

@section('page-title')
    Nouvelle entreprise - {{ config('app.name', '') }}
@endsection

@section('content')
    <main role="main">
        <div class="album py-5 bg-light">
            <div class="col-md-6 offset-md-3">
                <div class="card mb-3 text-white bg-info">
                    <div class="card-header">
                        <b>Informations importantes</b>
                    </div>
                    <div class="card-body">
                        <h6><b>Commerces et services essentiels uniquement</b></h6>
                        <p>Afin d'être affichés sur le site, les produits et services offerts doivent appartenir aux
                            catégories proposées. Cette liste est inspirée de la liste des commerces essentiels fournie
                            par le gouvernement du Québec.</p>
                        <p>L’équipe de Solution locale se garde le droit de modifier les catégories en fonction de
                            l’évolution de la crise de la COVID-19 au Québec.</p>

                        <h6><b>Approvisionnement sécuritaire</b></h6>
                        <p>Votre mode de distribution doit être 100% sans contact : paiement sans contact avec carte à
                            puce ou en ligne, livraison ou collecte sans contact directement avec le client.</p>

                        <h6><b>Achat local</b></h6>
                        <p>Notre initiative vise à soutenir les entreprises locales dans un souci de vitalité économique
                            et sociale de nos municipalités régionales, le tout dans le respect de l’environnement.</p>
                        <p>Notre initiative citoyenne repose sur des ressources limitées, merci de votre compréhension
                            quant au délai de traitement des inscriptions.</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        Ajout d'une entreprise au répertoire
                    </div>

                    <div class="card-body">
                        @if (session('status'))
                            <div class="alert alert-success" role="alert">
                                {{ session('status') }}
                            </div>
                        @endif

                        @if ($errors->any())
                            <div class="alert alert-danger" role="alert">
                                <p>Merci de corriger les erreurs suivantes:</p>
                                <ul>
                                    @foreach($errors->all() as $message)
                                        <li>{!! $message !!}</li>
                                    @endforeach
                                    <li>
                                        Prenez soins de renseigner de nouveau l'adresse complète de votre
                                        entreprise.
                                    </li>
                                </ul>
                            </div>
                        @endif

                        <div class="alert alert-info">
                            Un astérisque (*) dénote une information obligatoire!
                        </div>

                        <form method="POST" action="{{ route('places.store-public') }}">
                            @csrf
                            @honeypot

                            <div class="form-group row">
                                <label for="name" class="col-md-3 col-form-label text-md-right">
                                    Nom de l'entreprise *
                                </label>
                                <div class="col-md-9">
                                    <input id="name" type="text"
                                           class="form-control @error('name') is-invalid @enderror"
                                           name="name"
                                           value="{{ old('name') }}"
                                           required
                                           autocomplete="name"
                                           autofocus>

                                    @error('name')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{!! $message !!}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="categories" class="col-md-3 col-form-label text-md-right">
                                    Catégorie *
                                </label>
                                <div class="col-md-9">
                                    <div class="form-check form-check-inline">
                                        <ul class="categories tree">
                                            @foreach($categories as $category)
                                                <li>
                                                    <input class="form-check-input"
                                                           name="categories[]"
                                                           type="checkbox"
                                                           id="inlineCategoryCheckbox{{ $category->id }}"
                                                           value="{{ $category->id }}"
                                                           @if(!empty(old('categories')) && in_array($category->id, old('categories'))) CHECKED @endif>
                                                    <label class="form-check-label"
                                                           for="inlineCategoryCheckbox{{ $category->id }}">
                                                        {{ $category->name }}
                                                    </label>
                                                    <ul>
                                                        @foreach($category->children as $category_children)
                                                            <li>
                                                                <input class="form-check-input"
                                                                       name="categories[]"
                                                                       type="checkbox"
                                                                       id="inlineCategoryCheckbox{{ $category_children->id }}"
                                                                       value="{{ $category_children->id }}"
                                                                       @if(!empty(old('categories')) && in_array($category_children->id, old('categories'))) CHECKED @endif>
                                                                <label class="form-check-label"
                                                                       for="inlineCategoryCheckbox{{ $category_children->id }}">
                                                                    {{ $category_children->name }}
                                                                </label>
                                                            </li>
                                                        @endforeach
                                                    </ul>
                                                </li>
                                            @endforeach
                                        </ul>
                                    </div>
                                    @error('categories')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{!! $message !!}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="placeType" class="col-md-3 col-form-label text-md-right">
                                    Type d'entreprise *</label>
                                <div class="col-md-9">
                                    @foreach(App\PlaceType::all() as $type)
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input"
                                                   name="placeType[]"
                                                   type="checkbox"
                                                   id="inlinePlaceTypeCheckbox{{ $type->id }}"
                                                   value="{{ $type->id }}"
                                                   @if(!empty(old('placeType')) && in_array($type->id, old('placeType'))) CHECKED @endif>
                                            <label class="form-check-label"
                                                   for="inlinePlaceTypeCheckbox{{ $type->id }}">
                                                {{ $type->name }}
                                            </label>
                                        </div>
                                    @endforeach

                                    @error('placeType')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{!! $message !!}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="deliveryType" class="col-md-3 col-form-label text-md-right">
                                    Mode de distribution *
                                </label>

                                <div class="col-md-9">
                                    @foreach(App\DeliveryType::all() as $type)
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input"
                                                   name="deliveryType[]"
                                                   type="checkbox"
                                                   id="inlineDeliveryTypeCheckbox{{ $type->id }}"
                                                   value="{{ $type->id }}"
                                                   @if(!empty(old('deliveryType')) && in_array($type->id, old('deliveryType'))) CHECKED @endif>
                                            <label class="form-check-label"
                                                   for="inlineDeliveryTypeCheckbox{{ $type->id }}">{{ $type->name }}</label>
                                        </div>
                                    @endforeach

                                    @error('deliveryType')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{!! $message !!}</strong>
                                     </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="deliveryType"
                                       class="col-md-3 col-form-label text-md-right">
                                    Adresse de l'entreprise *
                                </label>
                                <div class="col-md-9">
                                    <input type="text"
                                           class="form-control"
                                           id="inputAddress"
                                           placeholder="1234 rue de l'achat local"
                                           name="address[line1]"
                                           required=""
                                           value="{{ old('address.line1') }}">
                                    <input type="text"
                                           class="form-control mt-2"
                                           id="inputAddress2"
                                           placeholder="Appartement, etc. (optionnel) "
                                           name="address[line2]"
                                           value="{{ old('address.line2') }}">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="inputCity" class="col-md-3 col-form-label text-md-right">
                                    Ville *
                                </label>
                                <div class="col-md-9">
                                    <input type="text"
                                           class="form-control"
                                           id="inputCity"
                                           placeholder="Sainte-Geneviève-de-Batiscan"
                                           name="city"
                                           required=""
                                           value="{{ old('city') }}">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="inputProvince" class="col-md-3 col-form-label text-md-right">
                                    &nbsp;
                                </label>
                                <div class="form-group col-md-6">
                                    <label for="inputProvince">Province</label>
                                    <input type="text"
                                           class="form-control"
                                           id="inputProvince"
                                           readonly=""
                                           value="Québec">
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="inputPostalCode">
                                        Code postal *
                                    </label>
                                    <input type="text"
                                           class="form-control"
                                           id="inputPostalCode"
                                           placeholder="H0H 0H0"
                                           name="postalCode"
                                           required=""
                                           value="{{ old('postalCode') }}">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="hideAddress" class="col-md-3 col-form-label text-md-right">
                                    Cacher l'adresse
                                </label>
                                <div class="col-md-9">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input"
                                               name="hideAddress"
                                               type="checkbox"
                                               id="inlineHideAddressCheckbox"
                                               @if(!empty(old('hideAddress'))) CHECKED @endif>
                                        <small id="passwordHelpBlock" class="form-text text-muted">
                                            Si votre entreprise n'a <b>pas</b> besoin d'afficher son adresse
                                            (par ex. : vente exclusivement en ligne), cochez cette case.
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="region_id" class="col-md-3 col-form-label text-md-right">
                                    Région administrative *
                                </label>

                                <div class="col-md-9">
                                    <select class="custom-select" name="region_id" id="region">
                                        <option>Choisir une région</option>
                                        @foreach(App\Region::all() as $region)
                                            <option value="{{ $region->id }}"
                                                    @if(old('region_id') == $region->id) SELECTED @endif>
                                                {{ $region->name }}
                                            </option>
                                        @endforeach
                                    </select>

                                    @error('region')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{!! $message !!}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="rcm_id" class="col-md-3 col-form-label text-md-right">
                                    MRC *
                                </label>

                                <div class="col-md-9">
                                    <select class="custom-select" name="rcm_id" id="rcm_id">
                                        <option>Veuillez d'abord choisir une rgion administrative</option>
                                        @foreach(App\Rcm::all() as $rcm)
                                            <option data-region="{{ $rcm->region_id }}" value="{{ $rcm->id }}" @if(old('rcm_id') === $rcm->id) SELETED @endif>
                                                {{ $rcm->name }}
                                            </option>
                                        @endforeach
                                    </select>

                                    @error('region')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{!! $message !!}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="phoneNumber" class="col-md-3 col-form-label text-md-right">
                                    No. de tél.
                                </label>

                                <div class="col-md-9">
                                    <input id="phoneNumber" type="text"
                                           class="form-control @error('phoneNumber') is-invalid @enderror"
                                           name="phoneNumber"
                                           value="{{ old('phoneNumber') }}"
                                           autocomplete="phoneNumber"
                                           autofocus>

                                    @error('phoneNumber')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{!! $message !!}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="additionnalPhoneNumber"
                                       class="col-md-3 col-form-label text-md-right">
                                    No. de tél. add.
                                </label>
                                <div class="col-md-9">
                                    <input id="additionnalPhoneNumber" type="text"
                                           class="form-control @error('additionnalPhoneNumber') is-invalid @enderror"
                                           name="additionnalPhoneNumber"
                                           value="{{ old('additionnalPhoneNumber') }}"
                                           autocomplete="additionnalPhoneNumber" autofocus>

                                    @error('additionnalPhoneNumber')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{!! $message !!}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="email"
                                       class="col-md-3 col-form-label text-md-right">
                                    Courriel
                                </label>

                                <div class="col-md-9">
                                    <input id="email" type="text"
                                           class="form-control @error('email') is-invalid @enderror"
                                           name="email"
                                           value="{{ old('email') }}"
                                           autocomplete="email"
                                           autofocus>

                                    @error('email')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{!! $message !!}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="url" class="col-md-3 col-form-label text-md-right">
                                    Adresse web
                                </label>

                                <div class="col-md-9">
                                    <input id="url" type="text"
                                           class="form-control @error('url') is-invalid @enderror"
                                           name="url"
                                           value="{{ old('url') }}"
                                           placeholder="Ex.: https://solutionlocale.ca" 
                                           autocomplete="url" autofocus>

                                    @error('url')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{!! $message !!}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="facebook_url" class="col-md-3 col-form-label text-md-right">
                                    Adresse de page Facebook
                                </label>

                                <div class="col-md-9">
                                    <input id="facebook_url" type="text"
                                           class="form-control @error('facebook_url') is-invalid @enderror"
                                           name="facebook_url"
                                           value="{{ old('facebook_url') }}"
                                           placeholder="Ex.: https://www.facebook.com/Solutionlocale/" 
                                           autocomplete="facebook_url" autofocus>

                                    @error('facebook_url')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{!! $message !!}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="deliveryZone" class="col-md-3 col-form-label text-md-right">
                                    Secteur desservi pour la livraison à domicile
                                </label>
                                <div class="col-md-9">
                                    <textarea id="deliveryZone"
                                        class="form-control @error('deliveryZone') is-invalid @enderror"
                                        name="deliveryZone">{{ old('deliveryZone') }}</textarea>

                                    @error('deliveryZone')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{!! $message !!}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group row">
                                <span class="col-md-5"></span>
                                <button type="submit" class="btn btn-primary">Envoyer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
@endsection

@section('scripts-body')
<script src="{{ asset('js/rcm-filler.js') }}"></script>
@endsection
