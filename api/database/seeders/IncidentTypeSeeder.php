<?php

namespace Database\Seeders;

use App\Models\IncidentType;
use Illuminate\Database\Seeder;

class IncidentTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        IncidentType::query()->insert([
            ['created_at' => now(), 'description' => 'Alarme'],
            ['created_at' => now(), 'description' => 'Incidente'],
            ['created_at' => now(), 'description' => 'Outros'],
        ]);
    }
}
