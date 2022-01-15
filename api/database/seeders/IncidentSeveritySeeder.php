<?php

namespace Database\Seeders;

use App\Models\IncidentSeverity;
use Illuminate\Database\Seeder;

class IncidentSeveritySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        IncidentSeverity::query()->insert([
            ['created_at' => now(), 'description' => 'Baixa', 'color' => '#3BAFDA'],
            ['created_at' => now(), 'description' => 'Média', 'color' => '#F7B84B'],
            ['created_at' => now(), 'description' => 'Alta', 'color' => '#F1556C'],
        ]);
    }
}
