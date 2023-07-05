<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

/**
 * @property integer $id
 * @property string $message
 * @property User $user
 * @property Comment $children
 * @property Comment $parent
 * @property \Carbon $created_at
 * @property \Carbon $updated_at
 * @mixin \Eloquent
 */
class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
      'message',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function children()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }

    /**
     * Comments without parents, i.e. basic comments
     * @param Builder $query
     * @return void
     */
    public function scopeBase(Builder $query)
    {
        $query->whereNull('parent_id');
    }
}
