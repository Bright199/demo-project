<?php

namespace App\Http\Controllers;

use App\Models\ComplianceRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;

class ComplianceRegistrationController extends Controller
{
    public function create(Request $request)
    {
        // $encryptedData = $request->input('encryptedData');
        // $secretKey = 'compliance';
        // $decryptedData = Crypt::decryptString($encryptedData, $secretKey);
        // return response()->json($request->all());

       
        $request->validate([
            'company_name' => 'required|string',
            'company_address' => 'required|string',
            'file' => 'required|file|mimes:png,jpg,jpeg,pdf,doc,docx,txt,text',
            'date' => 'required'
        ]);

        $file = $request->file('file');
        $fileName = $request->file('file')->hashName();
        $file->storeAs('/images/compliance/', $fileName, 'public');

        $compliance = $request->all();
        $compliance['file'] = $fileName;
        $compliance['user_id'] = Auth::id();

        $record = ComplianceRegistration::where('user_id', $compliance['user_id'])->first();
        if (!$record) {
            ComplianceRegistration::create($compliance);
        }else{
            $record->update($compliance);
        }
    }

    // public function decryptData($encryptedData, $secretKey)
    // {
    //     $decryptedData = Crypt::decryptString($encryptedData, $secretKey);
    //     return json_decode($decryptedData, true);
    // }
}
