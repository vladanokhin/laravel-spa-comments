<?php

namespace App\Http\Controllers\Comments;

use App\Http\Controllers\Controller;
use App\Http\Requests\UploadFileRequest;
use App\Http\Resources\FileResource;
use App\Models\File;

class UploadFileController extends Controller
{
    public function __invoke(UploadFileRequest $request)
    {
        $files = [];
        foreach ($request['files'] as $file) {
            $files[] = File::create([
                'name' => $file->getClientOriginalName(),
                'path' => $file->store('comments'),
            ]);
        }

        return FileResource::collection($files);
    }
}
