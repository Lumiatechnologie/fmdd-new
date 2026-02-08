<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #ffffff; background-color: #0b0d0f; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #121417; border-radius: 12px; overflow: hidden; border: 1px solid #2d333b;">
        
        <!-- Header Section -->
        <div style="padding: 30px; text-align: left;">
            <p style="font-size: 1.1em; color: #e1e4e8; margin-top: 0;">Bonjour {{ $inscription->prenom }} {{ $inscription->nom }},</p>
            <h2 style="color: #ffffff; font-size: 1.4em; margin: 20px 0;">✅ Votre inscription est confirmée avec succès !</h2>
        </div>

        <!-- QR Code Section 1 -->
        <div style="padding: 0 30px 30px 30px;">
            <p style="font-weight: bold; font-size: 1.1em; margin-bottom: 20px;">
                🚪 QR Code pour accéder à l'événement
            </p>
            <div style="background-color: #ffffff; padding: 20px; display: inline-block; border-radius: 12px; margin-bottom: 10px;">
                <img src="{{ $message->embedData($qrEntryData, 'qr_entry.png') }}" width="250" height="250" style="display: block; border-radius: 4px;" />
            </div>
            <p style="color: #8b949e; font-size: 0.9em; margin-top: 5px;">(QR Code Accès)</p>
        </div>

        <!-- QR Code Section 2 -->
        <div style="padding: 0 30px 30px 30px;">
            <p style="font-weight: bold; font-size: 1.1em; margin-bottom: 20px;">
                📲 Votre CV – QR Code personnalisé
            </p>
            <div style="background-color: #ffffff; padding: 20px; display: inline-block; border-radius: 12px; margin-bottom: 10px;">
                <img src="{{ $message->embedData($qrCvData, 'qr_cv.png') }}" width="250" height="250" style="display: block; border-radius: 4px;" />
            </div>
            <p style="color: #8b949e; font-size: 0.9em; margin-top: 5px;">(QR Code CV)</p>
        </div>

        <!-- Info Section -->
        <div style="padding: 30px; background-color: #1c2128; border-top: 1px solid #2d333b;">
            <p style="font-weight: bold; font-size: 1.2em; margin-top: 0; color: #58a6ff;">🚀 Prochaine étape</p>
            
            <div style="margin-top: 20px;">
                <p style="margin: 10px 0; font-size: 1.1em;">
                    📅 <strong>Date :</strong> samedi 14 février 2026
                </p>
                <p style="margin: 10px 0; font-size: 1.1em;">
                    📍 <strong>Lieu :</strong> IFIAG Casablanca
                </p>
                <p style="margin: 10px 0; font-size: 1.1em;">
                    📍 <strong>Heure :</strong> Merci de vous présenter le jour de l’événement à 15h00.
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div style="padding: 30px; border-top: 1px solid #2d333b; background-color: #121417;">
            <p style="margin: 0; font-size: 1.1em;">
                Cordialement,<br>
                <strong style="color: #ffffff;">L'équipe FMDD Job Day.</strong>
            </p>
            <p style="font-size: 0.8em; color: #484f58; margin-top: 30px; text-align: center;">
                ID inscription: {{ $inscription->id }}
            </p>
        </div>
    </div>
</body>
</html>
