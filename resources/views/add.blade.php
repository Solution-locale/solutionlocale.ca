@extends('layouts.public')

@section('content')
<main role="main">
  <div class="album py-5 bg-light">
      <div class="col-md-6 offset-md-3">
        <div class="card mb-3 text-white bg-info">
            <div class="card-header">
                <b>Informations importantes</b>
            </div>
            <div class="card-body">
                <h6><b>Produits essentiels uniquement</b></h6>
                <p>Afin d'être affichés sur le site, les produits offerts doivent appartenir à l’une des catégories suivantes : Produits d’épicerie - Mets cuisinés - Repas de restaurant - Médicaments et produits de pharmacie - Hygiène et produits naturels. </p>
                <p>Malgré les demandes, nous ne comptons pas élargir les catégories pour le moment. Notre initiative citoyenne repose sur des ressources limitées et nous nous concentrons sur les produits essentiels pour la population en isolement. Merci de votre compréhension! </p>

                <h6><b>Approvisionnement sécuritaire</b></h6>
                <p>Votre mode de distribution doit être 100% sans contact : paiement sans contact avec carte à puce ou en ligne, livraison ou collecte sans contact direct avec le client.</p>

                <h6><b>Commerces de proximité</b></h6>
                <p>Notre initiative vise à soutenir les entreprises québécoises qui offre des produits locaux ou essentiels dans un souci de vitalité économique et sociale de nos municipalités régionales, dans le respect de l’environnement.</p>
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
                    <li>Prenez soins de renseigner de nouveau l'adresse complète de votre entreprise.</li>
                </ul>
            </div>
            @endif

            <div class="alert alert-info">Un astérisque (*) dénote une information obligatoire!</div>
            
            <form method="POST" action="/entreprise/ajout">
                @csrf
                @honeypot

                <div class="form-group row">
                    <label for="name" class="col-md-3 col-form-label text-md-right">Nom de votre entreprise *</label>

                    <div class="col-md-9">
                        <input id="name" type="text" class="form-control @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>

                        @error('name')
                            <span class="invalid-feedback" role="alert">
                                <strong>{!! $message !!}</strong>
                            </span>
                        @enderror
                    </div>
                </div>

                <div class="form-group row">
                    <label for="categories" class="col-md-3 col-form-label text-md-right">Catégorie *</label>
                    
                    <div class="col-md-9">
                        @foreach(App\Category::all() as $categorie)
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" name="categories[]" type="checkbox" id="inlineCategoryCheckbox{{ $categorie->id }}" value="{{ $categorie->id }}" @if(!empty(old('categories')) && in_array($categorie->id, old('categories'))) CHECKED @endif>
                          <label class="form-check-label" for="inlineCategoryCheckbox{{ $categorie->id }}">{{ $categorie->name }}</label>
                        </div>
                        @endforeach

                        @error('categories')
                            <span class="invalid-feedback" role="alert">
                                <strong>{!! $message !!}</strong>
                            </span>
                        @enderror
                    </div>
                </div>

                <div class="form-group row">
                    <label for="placeType" class="col-md-3 col-form-label text-md-right">Type d'entreprise *</label>

                    <div class="col-md-9">
                        @foreach(App\PlaceType::all() as $type)
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" name="placeType[]" type="checkbox" id="inlinePlaceTypeCheckbox{{ $type->id }}" value="{{ $type->id }}" @if(!empty(old('placeType')) && in_array($type->id, old('placeType'))) CHECKED @endif>
                          <label class="form-check-label" for="inlinePlaceTypeCheckbox{{ $type->id }}">{{ $type->name }}</label>
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
                    <label for="deliveryType" class="col-md-3 col-form-label text-md-right">Mode de distribution *</label>

                    <div class="col-md-9">
                        @foreach(App\DeliveryType::all() as $type)
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" name="deliveryType[]" type="checkbox" id="inlineDeliveryTypeCheckbox{{ $type->id }}" value="{{ $type->id }}" @if(!empty(old('deliveryType')) && in_array($type->id, old('deliveryType'))) CHECKED @endif>
                          <label class="form-check-label" for="inlineDeliveryTypeCheckbox{{ $type->id }}">{{ $type->name }}</label>
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
                    <label for="address" class="col-md-3 col-form-label text-md-right">Adresse *</label>

                    <div class="col-md-9">
                        <input type="search" id="address" class="form-control" placeholder="Rechercher une adresse" />

                        <div class="alert alert-info mt-3" role="alert">
                            <p>Merci de vous assurer vous que votre adresse est complète (ex: numéro, rue et ville).</p>
                            <p>Adresse sélectionnée: <strong id="address-value">Aucune</strong></p>
                        </div>

                        <div class="alert alert-info mt-3" role="alert">
                            <p>Votre adresse n'a pas besoin d'être affichée ? (Commerce en ligne, etc.)</p>
                            
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" name="hideAddress" type="checkbox" id="hideAddressCheckbox">
                                <label class="form-check-label" for="hideAddressCheckbox">Cacher l'adresse du commerce</label>
                            </div>
                        </div>

                        <input type="hidden" id="address-data" name="addressjson" />

                        @error('address')
                            <span class="invalid-feedback" role="alert">
                                <strong>{!! $message !!}</strong>
                            </span>
                        @enderror
                    </div>
                </div>

                <div class="form-group row">
                    <label for="region_id" class="col-md-3 col-form-label text-md-right">Région administrative *</label>

                    <div class="col-md-9">
                        <select class="custom-select" name="region_id" id="region">
                            @foreach(App\Region::all() as $region)
                            <option value="{{ $region->id }}" @if(old('region_id') == $region->id) SELECTED @endif>{{ $region->name }}</option>
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
                    <label for="phoneNumber" class="col-md-3 col-form-label text-md-right">No. de tél.</label>

                    <div class="col-md-9">
                        <input id="phoneNumber" type="text" class="form-control @error('phoneNumber') is-invalid @enderror" name="phoneNumber" value="{{ old('phoneNumber') }}" autocomplete="phoneNumber" autofocus>

                        @error('phoneNumber')
                            <span class="invalid-feedback" role="alert">
                                <strong>{!! $message !!}</strong>
                            </span>
                        @enderror
                    </div>
                </div>

                <div class="form-group row">
                    <label for="additionnalPhoneNumber" class="col-md-3 col-form-label text-md-right">No. de tél. add.</label>

                    <div class="col-md-9">
                        <input id="additionnalPhoneNumber" type="text" class="form-control @error('additionnalPhoneNumber') is-invalid @enderror" name="additionnalPhoneNumber" value="{{ old('additionnalPhoneNumber') }}" autocomplete="additionnalPhoneNumber" autofocus>

                        @error('additionnalPhoneNumber')
                            <span class="invalid-feedback" role="alert">
                                <strong>{!! $message !!}</strong>
                            </span>
                        @enderror
                    </div>
                </div>

                <div class="form-group row">
                    <label for="email" class="col-md-3 col-form-label text-md-right">Courriel</label>

                    <div class="col-md-9">
                        <input id="email" type="text" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" autocomplete="email" autofocus>

                        @error('email')
                            <span class="invalid-feedback" role="alert">
                                <strong>{!! $message !!}</strong>
                            </span>
                        @enderror
                    </div>
                </div>

                <div class="form-group row">
                    <label for="url" class="col-md-3 col-form-label text-md-right">Adresse web</label>

                    <div class="col-md-9">
                        <input id="url" type="text" class="form-control @error('url') is-invalid @enderror" name="url" value="{{ old('url') }}" autocomplete="url" autofocus>

                        <div class="alert alert-secondary mt-3" role="alert">
                            Vous pouvez entrer n'importe quelle adresse web, <strong>incluant celle de votre page Facebook</strong>! 
                        </div>

                        @error('url')
                            <span class="invalid-feedback" role="alert">
                                <strong>{!! $message !!}</strong>
                            </span>
                        @enderror
                    </div>
                </div>

                <div class="form-group row">
                    <label for="deliveryZone" class="col-md-3 col-form-label text-md-right">Secteur desservi pour la livraison à domicile</label>

                    <div class="col-md-9">
                        <textarea id="deliveryZone" class="form-control @error('deliveryZone') is-invalid @enderror" name="deliveryZone">{{ old('deliveryZone') }}</textarea>

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
