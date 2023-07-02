<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         User::factory(30)
             ->has(Comment::factory(rand(1, 10)))
             ->create();

        // Set the parent comment randomly
         $comments = Comment::all()->filter(fn ($c) => rand(0,1) == 1);
         foreach ($comments as $comment) {
             $randomComment = $comments->whereNotIn('id', $comment->id)
                                        ->random();

             $comment->parent()->associate($randomComment);
             $comment->save();
         }
    }
}
