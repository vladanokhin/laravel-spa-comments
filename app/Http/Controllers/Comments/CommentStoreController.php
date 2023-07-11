<?php

namespace App\Http\Controllers\Comments;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommentStoreRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
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
        $user = User::firstOrCreate($request->except(['message', 'reply']));
        $comment = $user->comments()->create([
            'message' => $request->get('message'),
        ]);

        $parentComment = Comment::find($request->get('reply'));
        if($parentComment)
            $parentComment->children()->save($comment);

        return CommentResource::make($comment);
    }
}
