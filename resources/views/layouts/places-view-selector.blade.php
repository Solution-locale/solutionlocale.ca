<label>Vue</label>
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
</div>
<style>.btn-secondary a { color: white; text-decoration: none; }</style>