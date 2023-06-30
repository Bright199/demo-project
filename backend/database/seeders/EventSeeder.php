<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events =
            [
                [
                    'title' => 'Test Event',
                    'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis optio, eligendi illo nisi velit eius suscipit deserunt laudantium sed! Totam optio dolores quidem hic soluta itaque consectetur eos, ex at!',
                    'price' => 22.3,
                    'attendees' => 2,
                    'date' => 'June 29, 2023 4:30 PM',
                    'location' => 'Toronto avenue Road',
                    'photo' => 'event.jpg',
                    'user_id' => 1
                ],
                [
                    'title' => 'Test Event2',
                    'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis optio, eligendi illo nisi velit eius suscipit deserunt laudantium sed! Totam optio dolores quidem hic soluta itaque consectetur eos, ex at!',
                    'price' => 223.3,
                    'attendees' => 222,
                    'date' => 'Jan 29, 2023 4:30 PM',
                    'location' => 'Canada street road',
                    'photo' => 'event.jpg',
                    'user_id' => 2
                ]
            ];


        Event::insert(
            $events
        );
    }
}
