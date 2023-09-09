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
        $attributes = [];

        // Replacing attributes on a file name. Example, "file.0" to "some.txt"
        if($this['files']) {
            foreach($this['files'] as $key => $file) {
                $attributes['files.' . $key] = ' file "'. $file->getClientOriginalName() . '"';
            }
        }

        return $attributes;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name'    => 'required|string|min:3|max:30|alpha_num:ascii|unique:users,name',
            'email'   => 'required|email|unique:users,email',
            'url'     => 'url|nullable',
            'message' => 'required|string|min:3|max:250',
            'reply'   => 'integer|nullable',
            'files'   => 'max:5',
            'files.*' => 'file|max:100|mimes:txt',
            'avatar'  => 'file|max:5000|mimes:jpg,png,gif'
        ];
    }
}
