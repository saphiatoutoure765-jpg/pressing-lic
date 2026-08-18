<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
<h2>Votre commande est prête !</h2>
<p>Bonjour {{ $ticket->user->name }},</p>
<p>Votre commande #{{ $ticket->id }} est prête à être récupérée.</p>
<p>Vous trouverez votre reçu en pièce jointe.</p>
<p>Pressing LIC</p>
</body>
</html>
