<?php

use App\Http\Controllers\Comments\CommentListController;
use App\Http\Controllers\Comments\CommentStoreController;
use App\Http\Controllers\Comments\DeleteAvatarController;
use App\Http\Controllers\Comments\DeleteFileController;
use App\Http\Controllers\Comments\ShowFileController;
use App\Http\Controllers\Comments\UploadAvatarController;
use App\Http\Controllers\Comments\UploadFileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => '/comments'], function () {
    Route::post('/new', CommentStoreController::class)->name('comments.create');
    Route::get('/', CommentListController::class)->name('comments.list');

    Route::group(['prefix' => '/files'], function () {
        Route::get('/show/{file}', ShowFileController::class)->name('comments.files.show');
        Route::post('/upload', UploadFileController::class)->name('comments.files.upload');
        Route::post('/upload/avatar', UploadAvatarController::class)->name('comments.files.upload.avatar');
        Route::post('/delete/{file}', DeleteFileController::class)->name('comments.file.delete');
        Route::post('/delete/avatar/{avatar}', DeleteAvatarController::class)->name('comments.avatar.delete');
    });
});
