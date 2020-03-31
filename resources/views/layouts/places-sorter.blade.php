<form method="get">
    <div class="form-group">    
        <label for="trierpar">Trier par</label>
        <div id="loading" class="d-none">Chargement en cours... veuillez patienter.</div>
        <select class="form-control" id="trierpar" name="trierpar">
            <option value="nom" @if(request('trierpar') === 'nom') selected @endif>Nom d'entreprise</option>
            <option value="ville" @if(request('trierpar') === 'ville') selected @endif>Ville</option>
            <option value="plus-recent" @if(request('trierpar') === 'plus-recent') selected @endif>Plus récent</option>
            <option value="livraison" @if(request('trierpar') === 'livraison') selected @endif>Offrant la livraison</option>
        </select>
    </div>
</form>