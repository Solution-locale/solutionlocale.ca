@component('mail::message')
# Vos régions ont besoin de vous!

Vous recevez ce courriel parceque vous êtes modérateur assignés à une ou plusieurs régions sur Solution Locale.

Ce message est pour vous avertir qu'il y a certaines fiches dans vos régions qui demandez à être vérifié!

@foreach($moderation_queue as $region)
- {{ $region->name }}: {{ $region->waiting_for_moderation }} fiches en attente
@endforeach

@component('mail::button', ['url' => 'https://solutionlocale.ca/approbations'])
Me rendre vers l'interface de modération
@endcomponent

Merci,<br>
L'équipe de Solution Locale
@endcomponent
