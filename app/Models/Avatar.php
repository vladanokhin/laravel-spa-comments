<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Avatar
 *
 * @property integer $id
 * @property string $name
 * @property string $url
 * @property User $user
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property int|null $user_id
 * @method static \Illuminate\Database\Eloquent\Builder|Avatar newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Avatar newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Avatar query()
 * @method static \Illuminate\Database\Eloquent\Builder|Avatar whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Avatar whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Avatar whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Avatar wherePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Avatar whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Avatar whereUserId($value)
 * @mixin \Eloquent
 */
class Avatar extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'url',
    ];

    /**
     * Get user
     * @return BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
