<?php

namespace App\Http\Controllers\Comments;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommentStoreRequest;
use App\Http\Resources\CommentResource;
use App\Models\Avatar;
use App\Models\Comment;
use App\Models\File;
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

        // Add files
        $this->addFilesToComment($comment, $request);

        // Add avatar
        $this->addAvatarToUser($user, $request);

        return CommentResource::make($comment);
    }

    private function addFilesToComment(Comment $comment, CommentStoreRequest $request)
    {
        if($request->has('files')) {
            foreach ($request['files'] as $fileId) {
                $comment->files()->save(File::findOrFail($fileId));
            }
        }
    }

    private function addAvatarToUser(User $user, CommentStoreRequest $request)
    {
        if($request->has('avatar')) {
            $user->avatar()->save(Avatar::findOrFail($request->get('avatar')));
        }
    }
}
