<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
<h1>Reçu — Pressing LIC</h1>
<p><strong>Ticket #{{ $ticket->id }}</strong></p>
<p>Client : {{ $ticket->user->name }}</p>
<p>Date : {{ $ticket->created_at->format('d/m/Y') }}</p>

<table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%;">
    <tr>
        <th>Service</th>
        <th>Quantité</th>
        <th>Prix unitaire</th>
        <th>Sous-total</th>
    </tr>
    @php $total = 0; @endphp
    @foreach($ticket->services as $service)
        @php $sousTotal = $service->prix_unitaire * $service->pivot->quantite; $total += $sousTotal; @endphp
        <tr>
            <td>{{ $service->libelle }}</td>
            <td>{{ $service->pivot->quantite }}</td>
            <td>{{ $service->prix_unitaire }} FCFA</td>
            <td>{{ $sousTotal }} FCFA</td>
        </tr>
    @endforeach
    <tr>
        <td colspan="3"><strong>Total</strong></td>
        <td><strong>{{ $total }} FCFA</strong></td>
    </tr>
</table>
</body>
</html>
