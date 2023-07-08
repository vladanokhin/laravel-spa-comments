<?php

namespace App\Http\Resources;


use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'message' => $this->message,
            'children' => $this->when(
                !$request->routeIs('comments.create'),
                self::collection($this->children)
            ),
            'user' => UserResource::make($this->user),
            'date' => $this->created_at,
        ];
    }
}
