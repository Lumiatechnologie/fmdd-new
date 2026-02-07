<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InscriptionNotificationNaim extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $inscription;

    public function __construct($inscription)
    {
        $this->inscription = $inscription;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Nouvelle inscription: {$this->inscription->prenom} {$this->inscription->nom}",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.inscription_naim',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
