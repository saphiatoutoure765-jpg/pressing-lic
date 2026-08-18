<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
<h2>Merci pour votre commande !</h2>
<p>Bonjour {{ $ticket->user->name }},</p>
<p>Votre commande #{{ $ticket->id }} a bien été reçue et sera bientôt traitée.</p>

<table border="1" cellpadding="8" style="border-collapse: collapse;">
    <tr>
        <th>Service</th>
        <th>Quantité</th>
        <th>Prix unitaire</th>
    </tr>
    @foreach($ticket->services as $service)
        <tr>
            <td>{{ $service->libelle }}</td>
            <td>{{ $service->pivot->quantite }}</td>
            <td>{{ $service->prix_unitaire }} FCFA</td>
        </tr>
    @endforeach
</table>

<p>Nous vous informerons dès que votre commande sera prête.</p>
<p>Pressing LIC</p>
</body>
</html>
