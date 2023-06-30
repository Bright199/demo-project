<?php

namespace App\Http\Controllers;

use App\Models\BookedEvent;
use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events =
            Event::where('user_id', Auth::id())
            ->withCount('booked')
            ->get();
        return response()->json($events);
    }
    public function allEvents()
    {
       $events = '';
        if (Auth::check()) {
            $events =
                Event::where('user_id', '!=', Auth::id())->withCount('booked')->get();
        } else {
            $events =
                Event::withCount('booked')->get();
        }
        return response()->json($events);
    }


    public function create(Request $request)
    {

        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric|gt:0',
            'date' => 'required',
            'location' => 'required|string',
            'attendees' => 'required|integer|gt:0',
            'file' => 'required|file|mimes:jpeg,png,jpg',

        ]);

        $file = $request->file('file');
        $fileName = $request->file('file')->hashName();
        $file->storeAs('/images/events/', $fileName, 'public');

        $eventData = $request->all();
        $eventData['photo'] = $fileName;
        $eventData['user_id'] = Auth::id();

        $event = Event::create($eventData);

        return response()->json($event);
    }

    public function makeReservation(Request $request)
    {
        $event_id = $request->id;

        $ticket_number = rand(100000, 999999) . str_replace(' ', '', Auth::user()->name);
        BookedEvent::create([
            'user_id' => Auth::id(),
            'ticket_number' => $ticket_number,
            'event_id' => $event_id
        ]);

        return response()->json($ticket_number);
    }

    public function fetchTickets(){
        $user = Auth::user();
        $events = $user->bookings()->with('event')->get();
        return response()->json($events);
    }
}
