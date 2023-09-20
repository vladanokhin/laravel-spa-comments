<?php

namespace App\Http\Controllers\Comments;

use App\Http\Controllers\Controller;
use App\Http\Requests\UploadAvatarRequest;
use App\Http\Resources\AvatarResource;
use App\Models\Avatar;
use Illuminate\Support\Facades\Storage;
use Image;

class UploadAvatarController extends Controller
{
    public function __invoke(UploadAvatarRequest $request)
    {
        $image = $request['avatar'];
        $fileName = $image->hashName();
        $path = "avatars/$fileName";
        $avatarFile = Image::make($image)->resize(
            config('image.width'),
            config('image.height')
        );
        Storage::put($path, $avatarFile->stream());

        $avatar = Avatar::create([
            'name' => $fileName,
            'url' => Storage::url($path),
        ]);

        return AvatarResource::collection([$avatar]);
    }
}
