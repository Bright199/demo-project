<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'attendees',
        'price',
        'date',
        'location',
        'photo',
        'description',
        'user_id'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function booked(){
        return $this->hasMany(BookedEvent::class, 'event_id');
    }
}
