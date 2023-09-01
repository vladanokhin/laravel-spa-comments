<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property integer $id
 * @property string $message
 * @property User $user
 * @property Comment $children
 * @property Comment $parent
 * @property File $files
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
      'message',
    ];

    /**
     * Get author of comment
     * @return BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get all children comments
     * @return HasMany
     */
    public function children()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

    /**
     * Get parent comment
     * @return BelongsTo
     */
    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }

    /**
     * Get files
     * @return HasMany
     */
    public function files()
    {
        return $this->hasMany(File::class);
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
