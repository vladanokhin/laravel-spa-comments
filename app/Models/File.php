<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property integer $id
 * @property string $name
 * @property string $path
 * @property Comment $comment
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class File extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'path',
    ];

    /**
     * Get comment
     * @return BelongsTo
     */
    public function comment()
    {
       return $this->belongsTo(Comment::class);
    }
}
