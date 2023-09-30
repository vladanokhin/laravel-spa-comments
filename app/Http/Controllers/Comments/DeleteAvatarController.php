<?php

namespace App\Http\Controllers\Comments;

use App\Events\DeletingFile;
use App\Http\Controllers\Controller;
use App\Http\Resources\AvatarResource;
use App\Models\Avatar;

class DeleteAvatarController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return AvatarResource
     */
    public function __invoke(Avatar $avatar)
    {
        $avatar->delete();
        DeletingFile::dispatch("avatars/$avatar->name");

        return AvatarResource::make($avatar);
    }
}
