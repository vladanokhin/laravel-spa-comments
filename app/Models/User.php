<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $name
 * @property string $email
 * @property string $url
 * @property  Comment[] $comments
 * @property \Carbon $created_at
 * @property \Carbon $updated_at
 * @mixin \Eloquent
 */
class User extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'url'
    ];

    public function comments() {
        return $this->hasMany(Comment::class);
    }
}
