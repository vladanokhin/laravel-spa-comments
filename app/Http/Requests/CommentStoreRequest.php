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

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|min:3|max:30|alpha_num:ascii|unique:users,name',
            'email' => 'required|email|unique:users,email',
            'url' => 'url|nullable',
            'message' => 'required|string|min:3|max:250',
            'reply' => 'integer|nullable',
            'files.*' => 'file|max:100|mimes:txt'
        ];
    }
}
