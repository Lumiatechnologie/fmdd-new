<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #1e40af;">Nouvelle Inscription : JOB DAY FMDD</h2>
    <p>Bonjour M. Naim,</p>
    <p>Une nouvelle inscription a été enregistrée avec les détails suivants :</p>
    <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; width: 150px; background-color: #f9fafb;">Nom complet :</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">{{ $inscription->prenom }} {{ $inscription->nom }}</td>
        </tr>
        <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; background-color: #f9fafb;">Email :</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">{{ $inscription->email }}</td>
        </tr>
        <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; background-color: #f9fafb;">Téléphone :</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">{{ $inscription->telephone }}</td>
        </tr>
        <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; background-color: #f9fafb;">Message :</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">{{ $inscription->message ?? 'N/A' }}</td>
        </tr>
    </table>
    
    <p style="margin-top: 20px;">
        <strong>📄 CV du candidat :</strong> 
        <a href="{{ asset($inscription->cv_path) }}" style="color: #2563eb; text-decoration: underline;">Consulter le document</a>
    </p>

    <div style="margin-top: 30px; font-size: 0.8em; color: #6b7280; border-top: 1px solid #eee; padding-top: 10px;">
        ID Inscription : {{ $inscription->id }}<br>
        Envoyé par le système FMDD Automatic Notifications.
    </div>
</body>
</html>
