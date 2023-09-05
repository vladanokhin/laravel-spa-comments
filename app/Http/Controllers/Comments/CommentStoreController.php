<?php

namespace App\Http\Controllers\Comments;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommentStoreRequest;
use App\Http\Resources\CommentResource;
use App\Models\Avatar;
use App\Models\Comment;
use Illuminate\Support\Facades\Storage;
use Image;
use App\Models\User;

class CommentStoreController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return CommentResource
     */
    public function __invoke(CommentStoreRequest $request)
    {
        $user = User::firstOrCreate($request->only(['name', 'email', 'url']));
        $comment = $user->comments()->create([
            'message' => $request->get('message'),
        ]);

        $parentComment = Comment::find($request->get('reply'));
        if($parentComment)
            $parentComment->children()->save($comment);

        // TODO move saving files in jobs

        // Store files
        if($request->has('files')) {
            foreach ($request['files'] as $file) {
                $comment->files()->create([
                    'name' => $file->getClientOriginalName(),
                    'path' => $file->store('comments'),
                ]);
            }
        }
        // Store user image
        if($request->has('avatar')) {
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
            $user->avatar()->save($avatar);
        }

        return CommentResource::make($comment);
    }
}
