<label>Vue</label>
<div class="btn-group btn-group-toggle" data-toggle="buttons">
    <label class="btn btn-secondary @if($view === 'grid') active @endif">
        <a href="{{ \App\Http\Controllers\PublicController::getViewUrl('grille') }}">Grille</a>
    </label>
    <label class="btn btn-secondary @if($view === 'cards') active @endif">
        <a href="{{ \App\Http\Controllers\PublicController::getViewUrl('liste') }}">Liste</a>
    </label>
    <label class="btn btn-secondary @if($view === 'compact') active @endif">
        <a href="{{ \App\Http\Controllers\PublicController::getViewUrl('compact') }}">Compact</a>
    </label>
</div>
<style>.btn-secondary a { color: white; text-decoration: none; }</style>