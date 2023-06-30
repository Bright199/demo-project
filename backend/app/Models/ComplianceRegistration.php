<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComplianceRegistration extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'company_name',
        'company_address',
        'date',
        'file',
    ];
}
