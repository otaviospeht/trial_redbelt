<?php

namespace Database\Seeders;

use App\Models\Incident;
use App\Models\IncidentSeverity;
use App\Models\IncidentType;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class IncidentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Incident::factory()
            ->count(10)
            ->state(new Sequence(
                fn ($sequence) => [
                    'status' => rand(0, 1),
                    'incident_severity_id' => IncidentSeverity::all()->random()->id,
                    'incident_type_id' => IncidentType::all()->random()->id,
                ]
            ))
            ->create();
    }
}
