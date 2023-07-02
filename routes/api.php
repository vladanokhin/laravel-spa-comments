<?php

use App\Http\Controllers\Comments\CommentStoreController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'comments'], function () {
    Route::post('/new', CommentStoreController::class)->name('comments.create');
});
