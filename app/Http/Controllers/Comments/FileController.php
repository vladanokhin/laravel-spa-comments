<?php

namespace App\Http\Controllers\Comments;

use App\Http\Controllers\Controller;
use App\Http\Resources\FileResource;
use App\Models\File;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function __invoke(File $file)
    {
        if(Storage::missing($file->path))
            return response()->json(['data' => ['errors' => ['file' => 'File not found in the cloud.']]], 404);

        return FileResource::make($file);
    }
}
