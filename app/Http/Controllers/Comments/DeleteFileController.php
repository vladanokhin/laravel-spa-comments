<?php

namespace App\Http\Controllers\Comments;

use App\Events\DeletingFile;
use App\Http\Controllers\Controller;
use App\Http\Resources\FileResource;
use App\Models\File;

class DeleteFileController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return FileResource
     */
    public function __invoke(File $file)
    {
        $file->delete();
        DeletingFile::dispatch($file->path);

        return FileResource::make($file);
    }
}
