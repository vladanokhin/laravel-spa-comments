<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommentStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    public function attributes()
    {
        return [
            'clear_message' => 'message',
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name'          => 'required|string|min:3|max:30|alpha_num:ascii|unique:users,name',
            'email'         => 'required|email|unique:users,email',
            'url'           => 'url|nullable',
            'clear_message' => 'required|string|min:3|max:250',
            'message'       => 'required|string',
            'reply'         => 'integer|nullable',
            'files.*'       => 'integer|exists:files,id',
            'avatar'        => 'integer|exists:avatars,id'
        ];
    }
}
