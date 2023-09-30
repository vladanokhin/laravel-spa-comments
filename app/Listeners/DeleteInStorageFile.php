<?php

namespace App\Listeners;

use App\Events\DeletingFile;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Throwable;

class DeleteInStorageFile implements ShouldQueue
{
    /**
     * The number of times the queued listener may be attempted.
     *
     * @var int
     */
    public $tries = 2;

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param DeletingFile $event
     * @return void
     */
    public function handle(DeletingFile $event): void
    {
        if(Storage::exists($event->filePath)) {
            Storage::delete($event->filePath);
            Log::info('Deleted file', ['file' => $event->filePath]);
        }
    }

    /**
     * Handle a job failure.
     */
    public function failed(DeletingFile $event, Throwable $exception): void
    {
        Log::error('Failed removing file in storage', ['exception' => $exception]);
    }
}
