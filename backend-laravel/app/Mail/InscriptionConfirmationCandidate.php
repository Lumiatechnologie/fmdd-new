<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InscriptionConfirmationCandidate extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $inscription;
    public $qrEntry;
    public $qrCv;

    public function __construct($inscription, $qrEntry, $qrCv)
    {
        $this->inscription = $inscription;
        $this->qrEntry = $qrEntry;
        $this->qrCv = $qrCv;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '📩 Confirmation de votre inscription – JOB DAY FMDD',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.inscription_candidate',
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
