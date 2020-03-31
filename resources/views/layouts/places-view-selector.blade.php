<label class="d-block">Mode d'affichage</label>
<div class="btn-group btn-group-toggle" data-toggle="buttons">
    <label class="btn btn-secondary @if(request('vue', 'liste') === 'grille') active @endif">
        <a href="{{ \App\Http\Controllers\PublicController::getViewUrl('grille') }}">Grille</a>
    </label>
    <label class="btn btn-secondary @if(request('vue', 'liste') === 'liste') active @endif">
        <a href="{{ \App\Http\Controllers\PublicController::getViewUrl('liste') }}">Liste</a>
    </label>
    <label class="btn btn-secondary @if(request('vue', 'liste') === 'compact') active @endif">
        <a href="{{ \App\Http\Controllers\PublicController::getViewUrl('compact') }}">Compact</a>
    </label>
    <label class="btn btn-secondary">
        <a href="#" onclick="window.print();return false;">Impression</a>
    </label>
</div>
<style>.btn-secondary a { color: white; text-decoration: none; }</style>
<div class="mb-3 d-sm-block d-md-none"></div>