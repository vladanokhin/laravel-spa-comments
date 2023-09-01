<?php

namespace App\Http\Controllers\Comments;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommentStoreRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\File;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
        $user = User::firstOrCreate($request->except(['message', 'reply', 'files']));
        $comment = $user->comments()->create([
            'message' => $request->get('message'),
        ]);

        $parentComment = Comment::find($request->get('reply'));
        if($parentComment)
            $parentComment->children()->save($comment);

        // Store files
        if($request->has('files')) {
            foreach ($request['files'] as $file) {
                $comment->files()->create([
                    'name' => $file->getClientOriginalName(),
                    'path' => $file->store('comments'),
                ]);
            }
        }

        return CommentResource::make($comment);
    }
}
