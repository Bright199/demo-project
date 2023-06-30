<?php

use App\Http\Controllers\ComplianceRegistrationController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [UsersController::class, 'logout']);
    Route::post('/create-event', [EventController::class, 'create']);
    Route::get('/fetch-events', [EventController::class, 'index']);
    Route::get('/fetch-tickets', [EventController::class, 'fetchTickets']);
    Route::post('/make-reservation', [EventController::class, 'makeReservation']);
    Route::post('/compliance-registration', [ComplianceRegistrationController::class, 'create']);
});

Route::get('/fetch-all-events', [EventController::class, 'allEvents']);
Route::post('/register', [UsersController::class, 'register']);
Route::post('/login', [UsersController::class, 'login']);
