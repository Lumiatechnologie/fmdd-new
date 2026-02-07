<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <p>Bonjour {{ $inscription->prenom }},</p>

    <p style="font-size: 1.1em; font-weight: bold; color: #10b981;">✅ Votre inscription est confirmée avec succès !</p>

    <div style="margin-top: 25px;">
        <p style="font-weight: bold; margin-bottom: 10px;">🚪 QR Code pour accéder à l’événement</p>
        <div style="border: 1px solid #e5e7eb; padding: 15px; display: inline-block; border-radius: 8px; background-color: #f9fafb;">
            <img src="data:image/svg+xml;base64,{{ $qrEntry }}" width="200" height="200" style="display: block;" />
        </div>
        <p style="font-size: 0.8em; color: #6b7280; margin-top: 5px;">(QR Code Accès)</p>
    </div>

    <div style="margin-top: 25px;">
        <p style="font-weight: bold; margin-bottom: 10px;">📲 Votre CV – QR Code personnalisé</p>
        <div style="border: 1px solid #e5e7eb; padding: 15px; display: inline-block; border-radius: 8px; background-color: #f9fafb;">
            <img src="data:image/svg+xml;base64,{{ $qrCv }}" width="200" height="200" style="display: block;" />
        </div>
        <p style="font-size: 0.8em; color: #6b7280; margin-top: 5px;">(QR Code CV)</p>
    </div>

    <div style="margin-top: 30px; padding: 20px; background-color: #eff6ff; border-radius: 8px; border: 1px solid #bfdbfe;">
        <p style="font-weight: bold; margin-top: 0; color: #1e40af; font-size: 1.1em;">🚀 Prochaine étape</p>
        <p style="margin: 5px 0;"><strong>📅 Date :</strong> samedi 14 février 2026</p>
        <p style="margin: 5px 0;"><strong>📍 Lieu :</strong> IFIAG Casablanca</p>
        <p style="margin: 5px 0;"><strong>⏰ Heure :</strong> Merci de vous présenter le jour de l’événement à 15h00.</p>
    </div>

    <p style="margin-top: 30px;">Cordialement,<br>
    <strong>L’équipe FMDD Job Day.</strong></p>

    <p style="font-size: 0.7em; color: #9ca3af; margin-top: 40px; border-top: 1px solid #f3f4f6; pt-10;">ID inscription: {{ $inscription->id }}</p>
</body>
</html>
